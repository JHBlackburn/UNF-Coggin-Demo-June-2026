import { ScanLine } from "lucide-react";
import type { MorseEncodeResult } from "~/lib/morse/morseEncoder";

type MorseOutputPanelProps = {
  result: MorseEncodeResult;
};

export function MorseOutputPanel({ result }: MorseOutputPanelProps) {
  return (
    <section className="command-panel output-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Encoded Transmission</p>
          <h2>Morse Output</h2>
        </div>
        <ScanLine aria-hidden="true" className="panel-icon" size={24} />
      </div>
      <output data-testid="morse-output" aria-live="polite">
        {result.morse || "Awaiting encoded signal..."}
      </output>
      {result.unsupportedCharacters.length > 0 && (
        <p className="warning-copy" data-testid="unsupported-warning">
          Unsupported characters replaced with ?. Check payload before broadcast:
          {" "}
          {result.unsupportedCharacters.join(" ")}
        </p>
      )}
    </section>
  );
}
