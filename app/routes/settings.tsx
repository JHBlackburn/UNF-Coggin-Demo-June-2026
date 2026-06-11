import { useEffect, useState } from "react";
import type { Route } from "./+types/settings";
import { CommandShell } from "~/components/CommandShell";
import { SettingsPanel } from "~/components/SettingsPanel";
import {
  DEFAULT_SETTINGS,
  loadSettings,
  resetSettings,
  saveSettings,
  type PlaybackSettings,
} from "~/lib/settings/localSettings";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Playback Settings | Earth Defense Comms Command Center" },
    {
      name: "description",
      content: "Local Morse Code playback preferences for the command console.",
    },
  ];
}

export default function SettingsRoute() {
  const [settings, setSettings] =
    useState<PlaybackSettings>(DEFAULT_SETTINGS);
  const [notice, setNotice] = useState("LOCAL PROFILE READY");

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  function handleSave(nextSettings: PlaybackSettings) {
    saveSettings(nextSettings);
    setSettings(nextSettings);
    setNotice("LOCAL PROFILE SAVED");
  }

  function handleReset() {
    const defaults = resetSettings();
    setSettings(defaults);
    setNotice("DEFAULT PROFILE RESTORED");
  }

  return (
    <CommandShell activeRoute="settings">
      <SettingsPanel
        notice={notice}
        settings={settings}
        onSave={handleSave}
        onReset={handleReset}
      />
    </CommandShell>
  );
}
