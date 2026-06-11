import morse from "@ozdemirburak/morse-code-translator";

const INVALID_PLACEHOLDER = "?";

export type MorseEncodeResult = {
  input: string;
  normalizedText: string;
  morse: string;
  hasSignal: boolean;
  unsupportedCharacters: string[];
};

export function encodeMorseMessage(input: string): MorseEncodeResult {
  const normalizedText = normalizePlainText(input);

  if (!normalizedText) {
    return {
      input,
      normalizedText,
      morse: "",
      hasSignal: false,
      unsupportedCharacters: [],
    };
  }

  const unsupportedCharacters = getUnsupportedCharacters(normalizedText);
  const morseOutput = morse
    .encode(normalizedText, { invalid: INVALID_PLACEHOLDER })
    .replace(/\s+\/\s+/g, " / ")
    .replace(/\s+/g, " ")
    .trim();

  return {
    input,
    normalizedText,
    morse: morseOutput,
    hasSignal: morseOutput.length > 0,
    unsupportedCharacters,
  };
}

export function normalizePlainText(input: string) {
  return input.replace(/\s+/g, " ").trim().toUpperCase();
}

function getUnsupportedCharacters(input: string) {
  const unsupported = new Set<string>();

  for (const character of input) {
    if (/\s/.test(character)) {
      continue;
    }

    const encodedCharacter = morse.encode(character, {
      invalid: INVALID_PLACEHOLDER,
    });

    if (encodedCharacter === INVALID_PLACEHOLDER) {
      unsupported.add(character);
    }
  }

  return Array.from(unsupported);
}
