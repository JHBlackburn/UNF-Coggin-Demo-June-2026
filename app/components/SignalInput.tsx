import { Binary, Radio } from "lucide-react";

type SignalInputProps = {
  value: string;
  onChange: (value: string) => void;
  onEncode: () => void;
};

export function SignalInput({ value, onChange, onEncode }: SignalInputProps) {
  return (
    <section className="command-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Civilian Message Intake</p>
          <h2>Plain Text Signal</h2>
        </div>
        <Binary aria-hidden="true" className="panel-icon" size={24} />
      </div>
      <label className="field-label" htmlFor="plain-text-message">
        Message to encode
      </label>
      <textarea
        id="plain-text-message"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type the message the world needs to hear..."
        spellCheck="false"
      />
      <button className="primary-action" type="button" onClick={onEncode}>
        <Radio aria-hidden="true" size={18} />
        Encode Signal
      </button>
    </section>
  );
}
