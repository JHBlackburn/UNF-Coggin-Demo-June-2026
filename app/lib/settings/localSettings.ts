export type PlaybackSettings = {
  speedWpm: number;
  toneFrequencyHz: number;
  volume: number;
  defaultMessage: string;
};

type SettingsStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export const SETTINGS_STORAGE_KEY = "earth-defense-comms-settings";

export const DEFAULT_SETTINGS: PlaybackSettings = {
  speedWpm: 18,
  toneFrequencyHz: 620,
  volume: 0.55,
  defaultMessage: "WE ARE STILL HERE",
};

export function loadSettings(storage = getBrowserStorage()) {
  if (!storage) {
    return DEFAULT_SETTINGS;
  }

  return deserializeSettings(storage.getItem(SETTINGS_STORAGE_KEY));
}

export function saveSettings(
  settings: PlaybackSettings,
  storage = getBrowserStorage(),
) {
  const safeSettings = clampPlaybackSettings(settings);

  if (storage) {
    storage.setItem(SETTINGS_STORAGE_KEY, serializeSettings(safeSettings));
  }

  return safeSettings;
}

export function resetSettings(storage = getBrowserStorage()) {
  if (storage) {
    storage.removeItem(SETTINGS_STORAGE_KEY);
  }

  return DEFAULT_SETTINGS;
}

export function serializeSettings(settings: PlaybackSettings) {
  return JSON.stringify(clampPlaybackSettings(settings));
}

export function deserializeSettings(serializedSettings: string | null) {
  if (!serializedSettings) {
    return DEFAULT_SETTINGS;
  }

  try {
    const parsedSettings = JSON.parse(serializedSettings) as Partial<
      Record<keyof PlaybackSettings, unknown>
    >;

    return clampPlaybackSettings({
      speedWpm:
        typeof parsedSettings.speedWpm === "number"
          ? parsedSettings.speedWpm
          : DEFAULT_SETTINGS.speedWpm,
      toneFrequencyHz:
        typeof parsedSettings.toneFrequencyHz === "number"
          ? parsedSettings.toneFrequencyHz
          : DEFAULT_SETTINGS.toneFrequencyHz,
      volume:
        typeof parsedSettings.volume === "number"
          ? parsedSettings.volume
          : DEFAULT_SETTINGS.volume,
      defaultMessage:
        typeof parsedSettings.defaultMessage === "string"
          ? parsedSettings.defaultMessage
          : DEFAULT_SETTINGS.defaultMessage,
    });
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function clampPlaybackSettings(
  settings: PlaybackSettings,
): PlaybackSettings {
  return {
    speedWpm: clamp(Math.round(settings.speedWpm), 8, 32),
    toneFrequencyHz: clamp(Math.round(settings.toneFrequencyHz), 300, 1000),
    volume: clamp(Number(settings.volume.toFixed(2)), 0, 1),
    defaultMessage: settings.defaultMessage.slice(0, 180),
  };
}

function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}

function getBrowserStorage(): SettingsStorage | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window.localStorage;
}
