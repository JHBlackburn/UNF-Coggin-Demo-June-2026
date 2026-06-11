import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "COMMAND LINK INTERRUPTED";
  let details = "An unexpected command-center error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "SIGNAL NOT FOUND" : "SYSTEM ERROR";
    details =
      error.status === 404
        ? "The requested command channel could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <h1 className="text-3xl font-black uppercase tracking-[0.12em] text-red-300">
        {message}
      </h1>
      <p className="mt-4 max-w-2xl text-slate-300">{details}</p>
      {stack && (
        <pre className="mt-6 w-full overflow-x-auto border border-red-400/40 bg-black/60 p-4 text-red-100">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
