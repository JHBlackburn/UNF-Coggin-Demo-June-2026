export type ConsoleEntry = {
  label: string;
  message: string;
};

type StatusConsoleProps = {
  status: string;
  entries: ConsoleEntry[];
};

export function StatusConsole({ status, entries }: StatusConsoleProps) {
  return (
    <section className="status-console" aria-live="polite">
      <p className="eyebrow">Command Status</p>
      <h2 data-testid="status-text">{status}</h2>
      <div className="console-feed">
        {entries.map((entry, index) => (
          <p key={`${entry.label}-${index}`}>
            <span>{entry.label}</span>
            {entry.message}
          </p>
        ))}
      </div>
    </section>
  );
}
