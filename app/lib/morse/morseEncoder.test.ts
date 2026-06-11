import { describe, expect, it } from "vitest";
import { encodeMorseMessage } from "./morseEncoder";

describe("encodeMorseMessage", () => {
  it("converts plain text to International Morse Code", () => {
    expect(encodeMorseMessage("HELLO WORLD").morse).toBe(
      ".... . .-.. .-.. --- / .-- --- .-. .-.. -..",
    );
  });

  it("preserves clear word separator behavior", () => {
    expect(encodeMorseMessage("EARTH   DEFENSE").morse).toBe(
      ". .- .-. - .... / -.. . ..-. . -. ... .",
    );
  });

  it("returns no signal for empty input", () => {
    const result = encodeMorseMessage("   ");

    expect(result.morse).toBe("");
    expect(result.hasSignal).toBe(false);
  });

  it("replaces unsupported characters with a consistent placeholder", () => {
    const result = encodeMorseMessage("A😀B");

    expect(result.morse).toBe(".- ? -...");
    expect(result.unsupportedCharacters).toEqual(["😀"]);
  });
});
