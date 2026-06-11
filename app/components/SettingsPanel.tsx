import { RotateCcw, Save } from "lucide-react";
import { useEffect, useState } from "react";
import {
  clampPlaybackSettings,
  type PlaybackSettings,
} from "~/lib/settings/localSettings";

type SettingsPanelProps = {
  notice: string;
  settings: PlaybackSettings;
  onSave: (settings: PlaybackSettings) => void;
  onReset: () => void;
};

export function SettingsPanel({
  notice,
  settings,
  onSave,
  onReset,
}: SettingsPanelProps) {
  const [draft, setDraft] = useState(settings);

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  function updateDraft<Value extends keyof PlaybackSettings>(
    key: Value,
    value: PlaybackSettings[Value],
  ) {
    setDraft((current) => clampPlaybackSettings({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(clampPlaybackSettings(draft));
  }

  return (
    <section className="settings-layout">
      <form className="command-panel settings-panel" onSubmit={handleSubmit}>
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Local Preference Bay</p>
            <h2>Playback Settings</h2>
          </div>
          <span className="status-chip">{notice}</span>
        </div>

        <label className="range-field" htmlFor="speed-wpm">
          <span>Playback speed</span>
          <strong>{draft.speedWpm} WPM</strong>
          <div className="range-control">
            <input
              id="speed-wpm"
              name="speedWpm"
              type="range"
              min="8"
              max="32"
              value={draft.speedWpm}
              onChange={(event) =>
                updateDraft("speedWpm", Number(event.target.value))
              }
            />
            <input
              aria-label="Playback speed value"
              type="number"
              min="8"
              max="32"
              value={draft.speedWpm}
              onChange={(event) =>
                updateDraft("speedWpm", Number(event.target.value))
              }
            />
          </div>
        </label>

        <label className="range-field" htmlFor="tone-frequency">
          <span>Tone frequency</span>
          <strong>{draft.toneFrequencyHz} Hz</strong>
          <div className="range-control">
            <input
              id="tone-frequency"
              name="toneFrequencyHz"
              type="range"
              min="300"
              max="1000"
              step="10"
              value={draft.toneFrequencyHz}
              onChange={(event) =>
                updateDraft("toneFrequencyHz", Number(event.target.value))
              }
            />
            <input
              aria-label="Tone frequency value"
              type="number"
              min="300"
              max="1000"
              step="10"
              value={draft.toneFrequencyHz}
              onChange={(event) =>
                updateDraft("toneFrequencyHz", Number(event.target.value))
              }
            />
          </div>
        </label>

        <label className="range-field" htmlFor="volume">
          <span>Volume</span>
          <strong>{Math.round(draft.volume * 100)}%</strong>
          <div className="range-control">
            <input
              id="volume"
              name="volume"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={draft.volume}
              onChange={(event) =>
                updateDraft("volume", Number(event.target.value))
              }
            />
            <input
              aria-label="Volume value"
              type="number"
              min="0"
              max="1"
              step="0.05"
              value={draft.volume}
              onChange={(event) =>
                updateDraft("volume", Number(event.target.value))
              }
            />
          </div>
        </label>

        <label className="field-label" htmlFor="default-message">
          Optional default starting message
        </label>
        <input
          id="default-message"
          name="defaultMessage"
          type="text"
          value={draft.defaultMessage}
          onChange={(event) => updateDraft("defaultMessage", event.target.value)}
          placeholder="WE ARE STILL HERE"
        />

        <div className="settings-actions">
          <button className="primary-action" type="submit">
            <Save aria-hidden="true" size={18} />
            Save Preferences
          </button>
          <button className="secondary-action" type="button" onClick={onReset}>
            <RotateCcw aria-hidden="true" size={18} />
            Reset Defaults
          </button>
        </div>
      </form>

      <aside className="settings-brief">
        <p className="eyebrow">Scope Lock</p>
        <h2>Local console only</h2>
        <p>
          Preferences stay in this browser. No API keys, email relays, outbound
          message services, or server-side delivery routes are part of this
          version.
        </p>
      </aside>
    </section>
  );
}
