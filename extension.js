const vscode = require("vscode");
const { writeFileSync } = require("fs");
const { DEFAULT_COLORS, THEME_PATH, TOAST } = require("./constants");
const { Theme } = require("./theme");
const {
  toString,
  getConfig,
  isAffected,
  mixColors,
  changeBrightness,
  toast,
  reloadWindow,
  onConfigChange,
} = require("./utils");

const changeTheme = () => {
  let [accentTheme, brightness, accent] = getConfig([
    "accentTheme",
    "backgroundBrightness",
    "accentColor",
  ]);

  let bg = changeBrightness(
    accentTheme
      ? mixColors(DEFAULT_COLORS.accentBackground, accent)
      : getConfig("backgroundColor"),
    brightness
  );

  let newTheme = new Theme(bg, accent);
  writeFileSync(THEME_PATH, toString(newTheme));

  toast(TOAST.MESSAGE, TOAST.ACTION).then(
    (res) => res === TOAST.ACTION && reloadWindow()
  );
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const disposable = onConfigChange(({ affectsConfiguration }) => {
    const affected = isAffected(affectsConfiguration);
    affected && changeTheme();
    context.subscriptions.push(disposable);
  });
}
exports.activate = activate;
