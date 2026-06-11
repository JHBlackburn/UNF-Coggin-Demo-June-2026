import { Clipboard, Octagon, Play } from "lucide-react";

type TransmissionControlsProps = {
  canCopy: boolean;
  canPlay: boolean;
  canStop: boolean;
  onCopy: () => void;
  onPlay: () => void;
  onStop: () => void;
};

export function TransmissionControls({
  canCopy,
  canPlay,
  canStop,
  onCopy,
  onPlay,
  onStop,
}: TransmissionControlsProps) {
  return (
    <section className="control-strip" aria-label="Transmission controls">
      <button type="button" onClick={onCopy} disabled={!canCopy}>
        <Clipboard aria-hidden="true" size={18} />
        Copy Transmission
      </button>
      <button type="button" onClick={onPlay} disabled={!canPlay}>
        <Play aria-hidden="true" size={18} />
        Play Signal
      </button>
      <button type="button" onClick={onStop} disabled={!canStop}>
        <Octagon aria-hidden="true" size={18} />
        Stop Signal
      </button>
    </section>
  );
}
