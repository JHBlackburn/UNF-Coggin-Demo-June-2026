import { describe, expect, it } from "vitest";
import { createMorseTimingPlan } from "./morsePlayback";

describe("createMorseTimingPlan", () => {
  it("turns dots and dashes into tone segments at the requested speed", () => {
    expect(createMorseTimingPlan(".-", 20)).toEqual([
      { type: "tone", durationMs: 60 },
      { type: "silence", durationMs: 60 },
      { type: "tone", durationMs: 180 },
    ]);
  });

  it("adds character and word spacing", () => {
    expect(createMorseTimingPlan(". . / -", 12)).toEqual([
      { type: "tone", durationMs: 100 },
      { type: "silence", durationMs: 300 },
      { type: "tone", durationMs: 100 },
      { type: "silence", durationMs: 700 },
      { type: "tone", durationMs: 300 },
    ]);
  });

  it("keeps unsupported placeholders silent instead of crashing", () => {
    expect(createMorseTimingPlan("?", 10)).toEqual([
      { type: "silence", durationMs: 360 },
    ]);
  });
});
