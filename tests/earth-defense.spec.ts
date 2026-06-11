import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.clear());
  await page.goto("/");
  await expect(page.getByLabel("Message to encode")).toBeVisible();
  await expect(page.getByTestId("console-ready")).toHaveText("ready");
});

test("user can enter text and see Morse output", async ({ page }) => {
  await page.getByLabel("Message to encode").fill("HELLO WORLD");

  await expect(page.getByTestId("morse-output")).toContainText(
    ".... . .-.. .-.. --- / .-- --- .-. .-.. -..",
  );
});

test("user can copy Morse output", async ({ page }) => {
  await page.getByLabel("Message to encode").fill("SOS");
  await expect(page.getByTestId("morse-output")).toHaveText("... --- ...");
  await page.getByRole("button", { name: "Copy Transmission" }).click();

  await expect(page.getByTestId("status-text")).toContainText(
    "TRANSMISSION COPIED",
  );
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe("... --- ...");
});

test("user can open settings, save preferences, and see them on the console", async ({
  page,
}) => {
  await page.getByRole("link", { name: "Settings" }).click();
  await page.getByLabel("Playback speed value").fill("24");
  await page.getByLabel("Tone frequency value").fill("740");
  await page.getByLabel("Volume value").fill("0.4");
  await page.getByLabel("Optional default starting message").fill("HOLD FAST");
  await page.getByRole("button", { name: "Save Preferences" }).click();
  await expect(page.getByText("LOCAL PROFILE SAVED")).toBeVisible();

  await page.getByRole("link", { name: "Console" }).click();

  await expect(page.getByTestId("settings-summary")).toContainText("24 WPM");
  await expect(page.getByTestId("settings-summary")).toContainText("740 Hz");
  await expect(page.getByLabel("Message to encode")).toHaveValue("HOLD FAST");
});

test("empty input disables copy and play actions", async ({ page }) => {
  await page.getByLabel("Message to encode").fill("");
  await expect(page.getByTestId("morse-output")).toContainText(
    "Awaiting encoded signal",
  );

  await expect(
    page.getByRole("button", { name: "Copy Transmission" }),
  ).toBeDisabled();
  await expect(page.getByRole("button", { name: "Play Signal" })).toBeDisabled();
});

test("visual transmitting state appears and stop halts it", async ({ page }) => {
  await page.getByLabel("Message to encode").fill("SOS SOS SOS SOS");
  await page.getByRole("button", { name: "Play Signal" }).click();

  await expect(page.getByTestId("signal-beacon")).toHaveAttribute(
    "data-active",
    "true",
  );

  await page.getByRole("button", { name: "Stop Signal" }).click();

  await expect(page.getByTestId("signal-beacon")).toHaveAttribute(
    "data-active",
    "false",
  );
  await expect(page.getByTestId("status-text")).toContainText(
    "TRANSMISSION HALTED",
  );
});

test("user can reset settings to defaults", async ({ page }) => {
  await page.getByRole("link", { name: "Settings" }).click();
  await page.getByLabel("Playback speed value").fill("24");
  await page.getByRole("button", { name: "Save Preferences" }).click();
  await page.getByRole("button", { name: "Reset Defaults" }).click();

  await expect(page.getByText("DEFAULT PROFILE RESTORED")).toBeVisible();
  await expect(page.getByLabel("Playback speed value")).toHaveValue("18");
  await expect(page.getByLabel("Tone frequency value")).toHaveValue("620");
  await expect(page.getByLabel("Volume value")).toHaveValue("0.55");
});
