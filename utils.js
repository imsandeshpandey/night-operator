const convert = require("color-convert");
const toString = JSON.stringify;
const vscode = require("vscode");
const { TRIGGER_KEYS } = require("./constants");

/**
 *
 * @param {string\string[]} keys
 * @returns
 */

const getConfig = (keys) => {
  if (Array.isArray(keys)) {
    return keys.map((key) =>
      vscode.workspace.getConfiguration().get(`nightOperatorTheme.${key}`)
    );
  }
  return vscode.workspace.getConfiguration().get(`nightOperatorTheme.${keys}`);
};

/**
 * @param {(section: string, resource?: vscode.Uri | undefined) => boolean} affects
 * @param {string[]} keys
 * @returns {boolean}
 */
const isAffected = (affects) => {
  const keys = Object.keys(TRIGGER_KEYS);
  return keys.some((key) => affects(`nightOperatorTheme.${key}`));
};

/**
 *
 * @param {string} color1
 * @param {string} color2
 * @returns
 */
const mixColors = (color1, color2) => {
  const [_, s, l] = convert.hex.hsl(color1);
  const h = convert.hex.hsl(color2)[0];
  const color = convert.hsl.hex(h, s, l);
  return `#${color}`;
};

/**
 *
 * @param {string} color
 * @param {number} brightness
 * @returns
 */
const changeBrightness = (color, brightness) => {
  const [h, s] = convert.hex.hsl(color);
  const newColor = convert.hsl.hex(h, s, brightness);
  return `#${newColor}`;
};

const toast = vscode.window.showInformationMessage;

const reloadWindow = () =>
  vscode.commands.executeCommand("workbench.action.reloadWindow");

const onConfigChange = vscode.workspace.onDidChangeConfiguration;

module.exports = {
  toString,
  getConfig,
  isAffected,
  mixColors,
  changeBrightness,
  toast,
  reloadWindow,
  onConfigChange,
};
