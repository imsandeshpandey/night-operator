const path = require("path");

const TRIGGER_KEYS = Object.freeze({
  accentTheme: "accentTheme",
  background: "background",
  accentColor: "accentColor",
  backgroundBrightness: "backgroundBrightness",
});

const DEFAULT_COLORS = Object.freeze({
  accentBackground: "#07090d",
  background: "#0f111a",
  accent: "#80cbc4",
});

const THEME_PATH = path.join(
  __dirname,
  "themes",
  "night-operator-color-theme.json"
);

const TOAST = Object.freeze({
  ACTION: "Reload Window",
  MESSAGE: "Reload VS Code to see changes.",
  TITLE: "Night Operator",
});

module.exports = {
  TRIGGER_KEYS,
  DEFAULT_COLORS,
  THEME_PATH,
  TOAST,
};
