type SignalBeaconProps = {
  isActive: boolean;
};

export function SignalBeacon({ isActive }: SignalBeaconProps) {
  return (
    <section
      className={isActive ? "beacon-panel active" : "beacon-panel"}
      data-active={isActive ? "true" : "false"}
      data-testid="signal-beacon"
      aria-label="Signal beacon"
    >
      <p className="eyebrow">Transmission Beacon</p>
      <div className="beacon-array" aria-hidden="true">
        <div className="beacon-dish" />
        <div className="beacon-core" />
      </div>
      <strong>{isActive ? "TRANSMITTING" : "STANDBY"}</strong>
    </section>
  );
}
