import { useEffect, useMemo, useRef, useState } from "react";
import type { Route } from "./+types/_index";
import { CommandShell } from "~/components/CommandShell";
import { MorseOutputPanel } from "~/components/MorseOutputPanel";
import { SignalBeacon } from "~/components/SignalBeacon";
import { SignalInput } from "~/components/SignalInput";
import { StatusConsole, type ConsoleEntry } from "~/components/StatusConsole";
import { TransmissionControls } from "~/components/TransmissionControls";
import { encodeMorseMessage } from "~/lib/morse/morseEncoder";
import { MorsePlaybackService } from "~/lib/playback/morsePlayback";
import {
  DEFAULT_SETTINGS,
  loadSettings,
  type PlaybackSettings,
} from "~/lib/settings/localSettings";

type TransmissionStatus =
  | "SYSTEM READY"
  | "SIGNAL ENCODED"
  | "TRANSMITTING"
  | "TRANSMISSION COPIED"
  | "TRANSMISSION HALTED"
  | "NO SIGNAL DETECTED";

const DEFAULT_LOG: ConsoleEntry[] = [
  {
    label: "BOOT",
    message: "Earth Defense comms array awaiting civilian text.",
  },
  {
    label: "UPLINK",
    message: "No external transmission channels are armed in this build.",
  },
];

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Earth Defense Comms Command Center" },
    {
      name: "description",
      content:
        "Convert plain text into emergency Morse Code transmissions with copy and playback controls.",
    },
  ];
}

export default function IndexRoute() {
  const [settings, setSettings] =
    useState<PlaybackSettings>(DEFAULT_SETTINGS);
  const [message, setMessage] = useState(DEFAULT_SETTINGS.defaultMessage);
  const [status, setStatus] = useState<TransmissionStatus>("SYSTEM READY");
  const [consoleLog, setConsoleLog] = useState<ConsoleEntry[]>(DEFAULT_LOG);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isClientReady, setIsClientReady] = useState(false);
  const playbackRef = useRef<MorsePlaybackService | null>(null);
  const hasOperatorEditedMessage = useRef(false);

  const encodedSignal = useMemo(
    () => encodeMorseMessage(message),
    [message],
  );

  const hasSignal = encodedSignal.hasSignal;

  useEffect(() => {
    const storedSettings = loadSettings();
    setSettings(storedSettings);

    if (!hasOperatorEditedMessage.current) {
      setMessage(storedSettings.defaultMessage);
    }

    setIsClientReady(true);
  }, []);

  useEffect(() => {
    playbackRef.current = new MorsePlaybackService();

    return () => {
      playbackRef.current?.stop();
    };
  }, []);

  function addConsoleEntry(label: string, entryMessage: string) {
    setConsoleLog((entries) =>
      [{ label, message: entryMessage }, ...entries].slice(0, 5),
    );
  }

  function handleEncode() {
    if (!hasSignal) {
      setStatus("NO SIGNAL DETECTED");
      addConsoleEntry("SCAN", "No usable characters detected in the input.");
      return;
    }

    setStatus("SIGNAL ENCODED");
    addConsoleEntry(
      "ENCODE",
      `Encoded ${encodedSignal.normalizedText.length} characters into Morse transmission format.`,
    );
  }

  async function handleCopy() {
    if (!hasSignal) {
      setStatus("NO SIGNAL DETECTED");
      addConsoleEntry("COPY", "Copy blocked because no Morse output exists.");
      return;
    }

    try {
      await navigator.clipboard.writeText(encodedSignal.morse);
      setStatus("TRANSMISSION COPIED");
      addConsoleEntry("COPY", "Morse payload copied to the local clipboard.");
    } catch {
      setStatus("NO SIGNAL DETECTED");
      addConsoleEntry(
        "COPY",
        "Clipboard access failed. Check browser permissions and try again.",
      );
    }
  }

  async function handlePlay() {
    if (!hasSignal) {
      setStatus("NO SIGNAL DETECTED");
      addConsoleEntry("AUDIO", "Playback blocked because no Morse output exists.");
      return;
    }

    await playbackRef.current?.play(encodedSignal.morse, settings, {
      onStart: () => {
        setIsTransmitting(true);
        setStatus("TRANSMITTING");
        addConsoleEntry(
          "AUDIO",
          `Broadcasting at ${settings.speedWpm} WPM and ${settings.toneFrequencyHz} Hz.`,
        );
      },
      onEnd: () => {
        setIsTransmitting(false);
        setStatus("SIGNAL ENCODED");
        addConsoleEntry("AUDIO", "Transmission completed. Beacon standing by.");
      },
      onStop: () => {
        setIsTransmitting(false);
        setStatus("TRANSMISSION HALTED");
        addConsoleEntry("AUDIO", "Transmission halted by operator command.");
      },
    });
  }

  function handleStop() {
    playbackRef.current?.stop();
  }

  return (
    <CommandShell activeRoute="console">
      <span
        aria-hidden="true"
        className="ready-probe"
        data-testid="console-ready"
      >
        {isClientReady ? "ready" : "booting"}
      </span>
      <section className="command-grid">
        <div className="transmitter-stack">
          <SignalInput
            value={message}
            onChange={(nextMessage) => {
              hasOperatorEditedMessage.current = true;
              setMessage(nextMessage);
            }}
            onEncode={handleEncode}
          />
          <MorseOutputPanel result={encodedSignal} />
          <TransmissionControls
            canCopy={hasSignal}
            canPlay={hasSignal && !isTransmitting}
            canStop={hasSignal && isTransmitting}
            onCopy={handleCopy}
            onPlay={handlePlay}
            onStop={handleStop}
          />
        </div>

        <aside className="status-stack" aria-label="Transmission status">
          <SignalBeacon isActive={isTransmitting} />
          <StatusConsole status={status} entries={consoleLog} />
          <div className="telemetry-panel" data-testid="settings-summary">
            <p className="eyebrow">Local Playback Profile</p>
            <dl>
              <div>
                <dt>Speed</dt>
                <dd>{settings.speedWpm} WPM</dd>
              </div>
              <div>
                <dt>Tone</dt>
                <dd>{settings.toneFrequencyHz} Hz</dd>
              </div>
              <div>
                <dt>Volume</dt>
                <dd>{Math.round(settings.volume * 100)}%</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>
    </CommandShell>
  );
}
