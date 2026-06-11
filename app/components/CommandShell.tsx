import { Link } from "react-router";
import { RadioTower, SlidersHorizontal } from "lucide-react";

type CommandShellProps = {
  activeRoute: "console" | "settings";
  children: React.ReactNode;
};

export function CommandShell({ activeRoute, children }: CommandShellProps) {
  return (
    <main className="command-shell">
      <div className="scanline" aria-hidden="true" />
      <header className="command-header">
        <div>
          <p className="eyebrow">Emergency Broadcast Array 07</p>
          <h1>Earth Defense Comms Command Center</h1>
          <p className="header-copy">
            Convert civilian text into emergency dots-and-dashes transmission
            format.
          </p>
        </div>
        <nav className="command-nav" aria-label="Command navigation">
          <Link
            className={activeRoute === "console" ? "nav-link active" : "nav-link"}
            to="/"
          >
            <RadioTower aria-hidden="true" size={18} />
            Console
          </Link>
          <Link
            className={
              activeRoute === "settings" ? "nav-link active" : "nav-link"
            }
            to="/settings"
          >
            <SlidersHorizontal aria-hidden="true" size={18} />
            Settings
          </Link>
        </nav>
      </header>
      {children}
    </main>
  );
}
