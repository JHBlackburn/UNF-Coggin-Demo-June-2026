import { describe, expect, it } from "vitest";
import {
  DEFAULT_SETTINGS,
  SETTINGS_STORAGE_KEY,
  deserializeSettings,
  loadSettings,
  resetSettings,
  saveSettings,
  serializeSettings,
} from "./localSettings";

class MemoryStorage {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }

  removeItem(key: string) {
    this.values.delete(key);
  }
}

describe("local settings helpers", () => {
  it("serializes and deserializes playback preferences", () => {
    const serialized = serializeSettings({
      speedWpm: 22,
      toneFrequencyHz: 710,
      volume: 0.4,
      defaultMessage: "READY",
    });

    expect(deserializeSettings(serialized)).toEqual({
      speedWpm: 22,
      toneFrequencyHz: 710,
      volume: 0.4,
      defaultMessage: "READY",
    });
  });

  it("falls back to defaults when stored settings are invalid", () => {
    expect(deserializeSettings("not-json")).toEqual(DEFAULT_SETTINGS);
    expect(deserializeSettings(null)).toEqual(DEFAULT_SETTINGS);
  });

  it("clamps unsafe values while loading settings", () => {
    const serialized = JSON.stringify({
      speedWpm: 80,
      toneFrequencyHz: 20,
      volume: 5,
      defaultMessage: "X".repeat(220),
    });

    const settings = deserializeSettings(serialized);

    expect(settings.speedWpm).toBe(32);
    expect(settings.toneFrequencyHz).toBe(300);
    expect(settings.volume).toBe(1);
    expect(settings.defaultMessage).toHaveLength(180);
  });

  it("saves, loads, and resets preferences from storage", () => {
    const storage = new MemoryStorage();

    saveSettings(
      {
        speedWpm: 12,
        toneFrequencyHz: 550,
        volume: 0.25,
        defaultMessage: "LOCAL ONLY",
      },
      storage,
    );

    expect(storage.getItem(SETTINGS_STORAGE_KEY)).toContain("LOCAL ONLY");
    expect(loadSettings(storage)).toEqual({
      speedWpm: 12,
      toneFrequencyHz: 550,
      volume: 0.25,
      defaultMessage: "LOCAL ONLY",
    });
    expect(resetSettings(storage)).toEqual(DEFAULT_SETTINGS);
    expect(loadSettings(storage)).toEqual(DEFAULT_SETTINGS);
  });
});
