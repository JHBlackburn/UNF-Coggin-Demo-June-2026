import type { PlaybackSettings } from "~/lib/settings/localSettings";

export type MorseTimingSegment = {
  type: "tone" | "silence";
  durationMs: number;
};

type PlaybackCallbacks = {
  onStart?: () => void;
  onEnd?: () => void;
  onStop?: () => void;
};

export function createMorseTimingPlan(
  morseMessage: string,
  speedWpm: number,
): MorseTimingSegment[] {
  const unitMs = 1200 / speedWpm;
  const words = morseMessage.trim().split(/\s*\/\s*/).filter(Boolean);
  const segments: MorseTimingSegment[] = [];

  words.forEach((word, wordIndex) => {
    const characters = word.split(/\s+/).filter(Boolean);

    characters.forEach((character, characterIndex) => {
      const symbols = Array.from(character);

      symbols.forEach((symbol, symbolIndex) => {
        if (symbol === ".") {
          segments.push({ type: "tone", durationMs: unitMs });
        } else if (symbol === "-") {
          segments.push({ type: "tone", durationMs: unitMs * 3 });
        } else {
          segments.push({ type: "silence", durationMs: unitMs * 3 });
        }

        if (symbolIndex < symbols.length - 1) {
          segments.push({ type: "silence", durationMs: unitMs });
        }
      });

      if (characterIndex < characters.length - 1) {
        segments.push({ type: "silence", durationMs: unitMs * 3 });
      }
    });

    if (wordIndex < words.length - 1) {
      segments.push({ type: "silence", durationMs: unitMs * 7 });
    }
  });

  return segments;
}

export class MorsePlaybackService {
  private audioContext?: AudioContext;
  private activeOscillators: OscillatorNode[] = [];
  private endTimer?: number;
  private callbacks?: PlaybackCallbacks;
  private stoppedByOperator = false;

  async play(
    morseMessage: string,
    settings: PlaybackSettings,
    callbacks: PlaybackCallbacks = {},
  ) {
    this.stop(false);
    const timingPlan = createMorseTimingPlan(morseMessage, settings.speedWpm);

    if (timingPlan.length === 0 || typeof window === "undefined") {
      return;
    }

    this.callbacks = callbacks;
    this.stoppedByOperator = false;
    const audioWindow = window as typeof window & {
      webkitAudioContext?: typeof AudioContext;
    };
    const AudioContextConstructor =
      audioWindow.AudioContext || audioWindow.webkitAudioContext;

    if (!AudioContextConstructor) {
      return;
    }

    this.audioContext = new AudioContextConstructor();

    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }

    const masterGain = this.audioContext.createGain();
    masterGain.gain.value = settings.volume;
    masterGain.connect(this.audioContext.destination);

    let cursor = this.audioContext.currentTime;

    timingPlan.forEach((segment) => {
      const durationSeconds = segment.durationMs / 1000;

      if (segment.type === "tone" && this.audioContext) {
        const oscillator = this.audioContext.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.value = settings.toneFrequencyHz;
        oscillator.connect(masterGain);
        oscillator.start(cursor);
        oscillator.stop(cursor + durationSeconds);
        this.activeOscillators.push(oscillator);
      }

      cursor += durationSeconds;
    });

    const totalDurationMs = timingPlan.reduce(
      (duration, segment) => duration + segment.durationMs,
      0,
    );

    callbacks.onStart?.();
    this.endTimer = window.setTimeout(() => {
      this.disposeAudio();

      if (!this.stoppedByOperator) {
        callbacks.onEnd?.();
      }
    }, totalDurationMs + 80);
  }

  stop(emitCallback = true) {
    if (!this.audioContext && !this.endTimer) {
      return;
    }

    this.stoppedByOperator = true;
    this.disposeAudio();

    if (emitCallback) {
      this.callbacks?.onStop?.();
    }
  }

  private disposeAudio() {
    if (this.endTimer) {
      window.clearTimeout(this.endTimer);
      this.endTimer = undefined;
    }

    this.activeOscillators.forEach((oscillator) => {
      try {
        oscillator.stop();
      } catch {
        // Oscillators throw if already stopped by their scheduled end time.
      }
    });

    this.activeOscillators = [];
    void this.audioContext?.close();
    this.audioContext = undefined;
  }
}
