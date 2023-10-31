const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const convert = require("color-convert");

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
  const [h, s, _] = convert.hex.hsl(color);
  const newColor = convert.hsl.hex(h, s, brightness);
  return `#${newColor}`;
};

const DEFAULT_THEME = {
  name: "Night Operator",
  $schema: "vscode://schemas/color-theme",
  colors: {
    "activityBar.background": "#0f111a",
    "activityBar.border": "#0f111a00",
    "breadcrumb.background": "#0f111a00",
    "breadcrumbPicker.background": "#0f111a",
    "debugToolBar.background": "#0f111a",
    "dropdown.background": "#0f111a",
    "tab.border": "#0f111a",
    "tab.inactiveBackground": "#0f111a",
    "titleBar.activeBackground": "#0f111a",
    "titleBar.border": "#0f111a00",
    "titleBar.inactiveBackground": "#0f111a",
    "sideBar.background": "#0f111a",
    "sideBar.border": "#0f111a60",
    "sideBarSectionHeader.background": "#0f111a40",
    "sideBarSectionHeader.border": "#0f111a60",
    "statusBar.background": "#0f111a",
    "statusBar.border": "#0f111a60",
    "scrollbar.shadow": "#0f111a00",
    "settings.checkboxBackground": "#0f111a",
    "menu.background": "#0f111a",
    "settings.dropdownBackground": "#0f111a",
    "settings.numberInputBackground": "#0f111a",
    "settings.textInputBackground": "#0f111a",
    "statusBar.noFolderBackground": "#0f111a",
    "notifications.background": "#0f111a",
    "panel.background": "#0f111a",
    "list.activeSelectionBackground": "#0f111a",
    "list.hoverBackground": "#0f111a",
    "editorWidget.background": "#0f111a",
    "editorOverviewRuler.border": "#0f111a",
    "editorSuggestWidget.background": "#0f111a",
    "editorGroupHeader.tabsBackground": "#0f111a",
    "editorBracketMatch.background": "#0f111a",
    "editorHoverWidget.background": "#0f111a",
    "editor.background": "#0f111a",

    "input.background": "#80cbc412",
    "statusBarItem.hoverBackground": "#80cbc420",
    "activityBarBadge.background": "#80cbc4",
    "breadcrumb.activeSelectionForeground": "#80cbc4",
    "editor.selectionBackground": "#80cbc430",
    "peekViewResult.selectionBackground": "#80cbc430",
    "statusBarItem.remoteBackground": "#80cbc4",
    "tab.activeBorder": "#80cbc4",
    "textLink.foreground": "#80cbc4",
    "pickerGroup.foreground": "#80cbc4",
    "progressBar.background": "#80cbc4",
    "scrollbarSlider.activeBackground": "#80cbc4",
    "selection.background": "#80cbc4",
    "settings.headerForeground": "#80cbc4",
    "settings.modifiedItemIndicator": "#80cbc4",
    "menu.selectionForeground": "#80cbc4",
    "menubar.selectionForeground": "#80cbc4",
    "notificationLink.foreground": "#80cbc4",
    "panelTitle.activeBorder": "#80cbc4",
    "list.highlightForeground": "#80cbc4",
    "list.inactiveSelectionForeground": "#80cbc4",
    "list.activeSelectionForeground": "#80cbc4",
    "editorSuggestWidget.highlightForeground": "#80cbc4",
    "editorWidget.resizeBorder": "#80cbc4",
    "editorIndentGuide.activeBackground1": "#80cbc490",
    "editorOverviewRuler.findMatchForeground": "#80cbc4",
    "editor.findMatchBorder": "#80cbc4",

    "editorSuggestWidget.selectedBackground": "#00000050",
    "editor.findMatchHighlightBackground": "#00000050",
    "terminalCursor.background": "#000000",
    "minimap.background": "#00000000",
    "menu.selectionBorder": "#00000030",
    "listFilterWidget.background": "#00000030",
    "badge.background": "#00000030",
    "menubar.selectionBorder": "#00000030",
    "list.inactiveSelectionBackground": "#00000030",
    "peekView.border": "#00000030",
    "widget.shadow": "#00000030",
    "listFilterWidget.noMatchesOutline": "#00000030",
    "listFilterWidget.outline": "#00000030",
    "menubar.selectionBackground": "#00000030",
    "editor.findMatchBackground": "#000000",
    "statusBarItem.remoteForeground": "#000000",
    "activityBarBadge.foreground": "#000000",
    "menu.selectionBackground": "#00000050",

    "sideBar.foreground": "#8f93a2",
    "breadcrumb.foreground": "#8f93a2dd",
    "titleBar.inactiveForeground": "#8f93a2",
    "peekViewEditorGutter.background": "#8f93a205",
    "menu.border": "#8f93a220",
    "list.focusBackground": "#8f93a220",
    "statusBar.foreground": "#8f93a290",
    "input.placeholderForeground": "#8f93a260",
    "editorWhitespace.foreground": "#8f93a240",
    "breadcrumb.focusForeground": "#8f93a2",
    "editorSuggestWidget.foreground": "#8f93a2",
    "panelTitle.inactiveForeground": "#8f93a2",
    "tab.unfocusedActiveForeground": "#8f93a2",
    "textLink.activeForeground": "#8f93a2",
    "activityBar.foreground": "#8f93a2",
    "settings.dropdownForeground": "#8f93a2",
    "menu.foreground": "#8f93a2",
    "list.focusForeground": "#8f93a2",
    "editorLink.activeForeground": "#8f93a2",
    "sideBarTitle.foreground": "#8f93a2",
    "titleBar.activeForeground": "#8f93a2",
    "settings.numberInputForeground": "#8f93a2",
    "menu.separatorBackground": "#8f93a2",
    "settings.checkboxForeground": "#8f93a2",
    "settings.textInputForeground": "#8f93a2",
    "peekViewTitleDescription.foreground": "#8f93a260",
    "peekViewResult.background": "#8f93a205",
    "peekViewEditor.background": "#8f93a205",
    "notifications.foreground": "#8f93a2",
    "inputOption.activeBackground": "#8f93a230",
    "editorMarkerNavigation.background": "#8f93a205",
    "peekViewTitle.background": "#8f93a205",
    "panel.border": "#8f93a210",
    "inputOption.activeBorder": "#8f93a230",

    "tab.inactiveForeground": "#ffffff",

    "button.background": "#717cb450",
    "peekViewEditor.matchHighlightBackground": "#717cb450",
    "peekViewResult.matchHighlightBackground": "#717cb450",

    "tab.unfocusedActiveBorder": "#ffffff50",
    "badge.foreground": "#ffffffaa",
    "tab.hoverBackground": "#ffffff10",
    "tab.activeForeground": "#ffffff",
    "statusBar.debuggingForeground": "#ffffff",
    "list.hoverForeground": "#ffffff",
    "input.border": "#ffffff10",
    focusBorder: "#ffffff00",
    "editorSuggestWidget.border": "#ffffff10",
    "editorHoverWidget.border": "#ffffff10",
    "dropdown.border": "#ffffff10",
    "terminal.ansiWhite": "#ffffff",
    "tab.hoverBorder": "#ffffff",
    "panelTitle.activeForeground": "#ffffff",
    "editor.findMatchHighlightBorder": "#ffffff30",
    "terminal.ansiBrightWhite": "#ffffff",
    "tab.hoverForeground": "#ffffff",
    "editorLineNumber.activeForeground": "#ffffffdd",
    "editorIndentGuide.background1": "#ffffff10",
    "editor.lineHighlightBackground": "#ffffff10",
    "editorLineNumber.foreground": "#ffffff19",
    "editorGroup.border": "#ffffff10",

    "editorRuler.foreground": "#3b3f51",
    "input.foreground": "#e0e4eb",
    "inputValidation.errorBorder": "#ff537050",
    "inputValidation.infoBorder": "#82aaff50",
    "inputValidation.warningBorder": "#ffcb6b50",
    "scrollbarSlider.background": "#bec4d815",
    "scrollbarSlider.hoverBackground": "#bec4d830",
    "statusBar.debuggingBackground": "#c792ea",
    "tab.activeModifiedBorder": "#525975",
    "tree.indentGuidesStroke": "#3b3f51",
    "terminal.background": "#00000000",
    "terminal.ansiBlue": "#82aaff",
    "terminal.ansiBrightBlue": "#82aaff",
    "terminal.ansiBrightCyan": "#89ddff",
    "terminal.ansiBrightGreen": "#c3e88d",
    "terminal.ansiBrightMagenta": "#c792ea",
    "terminal.ansiBrightRed": "#ff5370",
    "terminal.ansiBrightBlack": "#464b5d",
    "terminal.ansiBrightYellow": "#ffcb6b",
    "terminal.ansiCyan": "#89ddff",
    "terminal.ansiGreen": "#c3e88d",
    "terminal.ansiMagenta": "#c792ea",
    "terminal.ansiBlack": "#000000",
    "terminal.ansiRed": "#ff5370",
    "terminal.ansiYellow": "#ffcb6b",
    "terminalCursor.foreground": "#ffcb6b",
    "diffEditor.insertedTextBackground": "#c3e88d15",
    "diffEditor.removedTextBackground": "#ff537020",
    "editor.foreground": "#e0e4eb",
    "editor.selectionHighlightBackground": "#ffcc0020",
    "editorBracketMatch.border": "#ffcc0050",
    "editorCursor.foreground": "#ffcc00",
    "editorError.foreground": "#ff537070",
    "editorGutter.addedBackground": "#49e67d9a",
    "editorGutter.deletedBackground": "#ff36629a",
    "editorGutter.modifiedBackground": "#82aaff60",
    "editorInfo.foreground": "#82aaff70",
    "editorOverviewRuler.errorForeground": "#ff537040",
    "editorOverviewRuler.infoForeground": "#82aaff40",
    "editorOverviewRuler.warningForeground": "#ffcb6b40",
    "editorWarning.foreground": "#ffcb6b70",
    "editorWidget.border": "#ff0000",
    "extensionButton.prominentBackground": "#c3e88d90",
    "extensionButton.prominentHoverBackground": "#c3e88d",
    "gitDecoration.conflictingResourceForeground": "#ffcb6b90",
    "gitDecoration.deletedResourceForeground": "#ff537090",
    "gitDecoration.ignoredResourceForeground": "#52597590",
    "gitDecoration.modifiedResourceForeground": "#9dbbfcc4",
    "gitDecoration.untrackedResourceForeground": "#c3e88d90",
  },
  tokenColors: [
    {
      scope: "comment",
      settings: {
        foreground: "#697098",
        fontStyle: "italic",
      },
    },
    {
      scope: "string",
      settings: {
        foreground: "#80CBC4",
      },
    },
    {
      scope: "string.quoted",
      settings: {
        foreground: "#80CBC4",
      },
    },
    {
      scope: "string.unquoted",
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: "support.constant.math",
      settings: {
        foreground: "#FFCB6B",
      },
    },
    {
      scope: ["constant.numeric", "constant.character.numeric"],
      settings: {
        foreground: "#F78C6C",
      },
    },
    {
      scope: [
        "constant.language",
        "punctuation.definition.constant",
        "variable.other.constant",
      ],
      settings: {
        foreground: "#82AAFF",
      },
    },
    {
      scope: ["constant.character", "constant.other"],
      settings: {
        foreground: "#82AAFF",
      },
    },
    {
      scope: "constant.character.escape",
      settings: {
        foreground: "#F78C6C",
      },
    },
    {
      scope: ["string.regexp", "string.regexp keyword.other"],
      settings: {
        foreground: "#80CBC4",
      },
    },
    {
      scope: "meta.function punctuation.separator.comma",
      settings: {
        foreground: "#EEFFFF",
      },
    },
    {
      scope: "variable",
      settings: {
        foreground: "#FFCB6B",
      },
    },
    {
      scope: ["punctuation.accessor", "keyword"],
      settings: {
        foreground: "#C792EA",
      },
    },
    {
      scope: [
        "storage",
        "storage.type",
        "meta.var.expr storage.type",
        "storage.type.property.js",
        "storage.type.property.ts",
        "storage.type.property.tsx",
        "meta.class meta.method.declaration meta.var.expr storage.type.js",
      ],
      settings: {
        foreground: "#C792EA",
      },
    },
    {
      scope: ["entity.name.class", "meta.class entity.name.type.class"],
      settings: {
        foreground: "#FFCB6B",
      },
    },
    {
      scope: "entity.other.inherited-class",
      settings: {
        foreground: "#A9C77D",
      },
    },
    {
      scope: "entity.name.function",
      settings: {
        foreground: "#82AAFF",
      },
    },
    {
      scope: "variable.parameter",
      settings: {
        foreground: "#7986E7",
      },
    },
    {
      scope: ["punctuation.definition.tag", "meta.tag"],
      settings: {
        foreground: "#64748b",
      },
    },
    {
      scope: [
        "entity.name.tag support.class.component",
        "meta.tag.other.html",
        "meta.tag.other.js",
        "meta.tag.other.tsx",
        "entity.name.tag.tsx",
        "entity.name.tag.js",
        "entity.name.tag",
        "meta.tag.js",
        "meta.tag.tsx",
        "meta.tag.html",
      ],
      settings: {
        foreground: "#FF5572",
      },
    },
    {
      scope: "entity.other.attribute-name",
      settings: {
        foreground: "#FFCB6B",
      },
    },
    {
      scope: "entity.name.tag.custom",
      settings: {
        foreground: "#FFCB6B",
      },
    },
    {
      scope: ["support.function", "support.constant"],
      settings: {
        foreground: "#82AAFF",
      },
    },
    {
      scope: "support.constant.meta.property-value",
      settings: {
        foreground: "#89DDFF",
      },
    },
    {
      scope: ["support.type", "support.class"],
      settings: {
        foreground: "#FFCB6B",
      },
    },
    {
      scope: "support.variable.dom",
      settings: {
        foreground: "#FFCB6B",
      },
    },
    {
      scope: "invalid",
      settings: {
        foreground: "#FFFFFF",
        background: "#FF2C83",
      },
    },
    {
      scope: "invalid.deprecated",
      settings: {
        foreground: "#FFFFFF",
        background: "#D3423E",
      },
    },
    {
      scope: "keyword.operator",
      settings: {
        foreground: "#89DDFF",
      },
    },
    {
      scope: "keyword.operator.relational",
      settings: {
        foreground: "#C792EA",
      },
    },
    {
      scope: "keyword.operator.assignment",
      settings: {
        foreground: "#C792EA",
      },
    },
    {
      scope: "comment.line.double-slash",
      settings: {
        foreground: "#697098",
      },
    },
    {
      scope: "object",
      settings: {
        foreground: "#CDEBF7",
      },
    },
    {
      scope: "constant.language.null",
      settings: {
        foreground: "#FF5874",
      },
    },
    {
      scope: "meta.brace",
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: "meta.delimiter.period",
      settings: {
        foreground: "#C792EA",
      },
    },
    {
      scope: "constant.language.boolean",
      settings: {
        foreground: "#FF5874",
      },
    },
    {
      scope: "object.comma",
      settings: {
        foreground: "#FFFFFF",
      },
    },
    {
      scope: "variable.parameter.function",
      settings: {
        foreground: "#89DDFF",
      },
    },
    {
      scope: [
        "support.type.vendored.property-name",
        "support.constant.vendored.property-value",
        "support.type.property-name",
        "meta.property-list entity.name.tag",
      ],
      settings: {
        foreground: "#80CBC4",
      },
    },
    {
      scope: "meta.property-list entity.name.tag.reference",
      settings: {
        foreground: "#FF5572",
      },
    },
    {
      scope: "constant.other.color.rgb-value punctuation.definition.constant",
      settings: {
        foreground: "#F78C6C",
      },
    },
    {
      scope: "constant.other.color",
      settings: {
        foreground: "#FFEB95",
      },
    },
    {
      scope: "keyword.other.unit",
      settings: {
        foreground: "#FFEB95",
      },
    },
    {
      scope: "meta.selector",
      settings: {
        foreground: "#C792EA",
      },
    },
    {
      scope: "entity.other.attribute-name.id",
      settings: {
        foreground: "#FAD430",
      },
    },
    {
      scope: "meta.property-name",
      settings: {
        foreground: "#80CBC4",
      },
    },
    {
      scope: ["entity.name.tag.doctype", "meta.tag.sgml.doctype"],
      settings: {
        foreground: "#C792EA",
        fontStyle: "italic",
      },
    },
    {
      scope: "punctuation.definition.parameters",
      settings: {
        foreground: "#D9F5DD",
      },
    },
    {
      scope: "keyword.control.operator",
      settings: {
        foreground: "#89DDFF",
      },
    },
    {
      scope: [
        "variable.instance",
        "variable.other.instance",
        "variable.reaedwrite.instance",
        "variable.other.readwrite.instance",
      ],
      settings: {
        foreground: "#FF5572",
      },
    },
    {
      scope: ["variable.other.property", "variable.other.object.property"],
      settings: {
        foreground: "#89DDFF",
      },
    },
    {
      scope: "entity.name.function",
      settings: {
        foreground: "#82AAFF",
      },
    },
    {
      scope: ["keyword.operator.comparison", "keyword.operator.logical"],
      settings: {
        foreground: "#89DDFF",
      },
    },
    {
      scope: [
        "support.constant",
        "keyword.other.special-method",
        "keyword.other.new",
      ],
      settings: {
        foreground: "#89DDFF",
      },
    },
    {
      scope: "support.function",
      settings: {
        foreground: "#89DDFF",
      },
    },
    {
      scope: "invalid.broken",
      settings: {
        foreground: "#020E14",
        background: "#F78C6C",
      },
    },
    {
      scope: "invalid.unimplemented",
      settings: {
        foreground: "#FFFFFF",
        background: "#8BD649",
      },
    },
    {
      scope: "invalid.illegal",
      settings: {
        foreground: "#FFFFFF",
        background: "#EC5F67",
      },
    },
    {
      scope: "variable.language",
      settings: {
        foreground: "#FF5572",
      },
    },
    {
      scope: "support.variable.property",
      settings: {
        foreground: "#89DDFF",
      },
    },
    {
      scope: "variable.function",
      settings: {
        foreground: "#82AAFF",
      },
    },
    {
      scope: "variable.interpolation",
      settings: {
        foreground: "#EC5F67",
      },
    },
    {
      scope: "meta.function-call",
      settings: {
        foreground: "#82AAFF",
      },
    },
    {
      scope: "punctuation.section.embedded",
      settings: {
        foreground: "#D3423E",
      },
    },
    {
      scope: [
        "punctuation.terminator.expression",
        "punctuation.definition.arguments",
        "punctuation.definition.array",
        "punctuation.section.array",
        "meta.array",
      ],
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: [
        "punctuation.definition.list.begin",
        "punctuation.definition.list.end",
        "punctuation.separator.arguments",
        "punctuation.definition.list",
      ],
      settings: {
        foreground: "#D9F5DD",
      },
    },
    {
      scope: "string.template meta.template.expression",
      settings: {
        foreground: "#D3423E",
      },
    },
    {
      scope: "string.template punctuation.definition.string",
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: "italic",
      settings: {
        foreground: "#C792EA",
        fontStyle: "italic",
      },
    },
    {
      scope: "bold",
      settings: {
        foreground: "#FFCB6B",
        fontStyle: "bold",
      },
    },
    {
      scope: "quote",
      settings: {
        foreground: "#697098",
        fontStyle: "italic",
      },
    },
    {
      scope: "raw",
      settings: {
        foreground: "#80CBC4",
      },
    },
    {
      scope: "variable.assignment.coffee",
      settings: {
        foreground: "#89DDFF",
      },
    },
    {
      scope: "variable.parameter.function.coffee",
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: "variable.assignment.coffee",
      settings: {
        foreground: "#89DDFF",
      },
    },
    {
      scope: "variable.other.readwrite.cs",
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: ["entity.name.type.class.cs", "storage.type.cs"],
      settings: {
        foreground: "#82AAFF",
      },
    },
    {
      scope: "entity.name.type.namespace.cs",
      settings: {
        foreground: "#B2CCD6",
      },
    },
    {
      scope: [
        "entity.name.tag.css",
        "entity.name.tag.less",
        "entity.name.tag.custom.css",
      ],
      settings: {
        foreground: "#FF5572",
      },
    },
    {
      scope: [
        "entity.name.tag.wildcard.css",
        "entity.name.tag.wildcard.less",
        "entity.name.tag.wildcard.scss",
        "entity.name.tag.wildcard.sass",
      ],
      settings: {
        foreground: "#FF5572",
      },
    },
    {
      scope: [
        "keyword.other.unit.css",
        "constant.length.units.css",
        "keyword.other.unit.less",
        "constant.length.units.less",
        "keyword.other.unit.scss",
        "constant.length.units.scss",
        "keyword.other.unit.sass",
        "constant.length.units.sass",
      ],
      settings: {
        foreground: "#FFEB95",
      },
    },
    {
      scope:
        "meta.attribute-selector.css entity.other.attribute-name.attribute",
      settings: {
        foreground: "#F78C6C",
      },
    },
    {
      scope: [
        "source.js source.css meta.property-list",
        "source.js source.css punctuation.section",
        "source.js source.css punctuation.terminator.rule",
        "source.js source.css punctuation.definition.entity.end.bracket",
        "source.js source.css punctuation.definition.entity.begin.bracket",
        "source.js source.css punctuation.separator.key-value",
        "source.js source.css punctuation.definition.attribute-selector",
        "source.js source.css meta.property-list",
        "source.js source.css meta.property-list punctuation.separator.comma",
        "source.ts source.css punctuation.section",
        "source.ts source.css punctuation.terminator.rule",
        "source.ts source.css punctuation.definition.entity.end.bracket",
        "source.ts source.css punctuation.definition.entity.begin.bracket",
        "source.ts source.css punctuation.separator.key-value",
        "source.ts source.css punctuation.definition.attribute-selector",
        "source.ts source.css meta.property-list",
        "source.ts source.css meta.property-list punctuation.separator.comma",
        "source.jsx source.css punctuation.section",
        "source.jsx source.css meta.property-list",
        "source.jsx source.css punctuation.terminator.rule",
        "source.jsx source.css punctuation.definition.entity.end.bracket",
        "source.jsx source.css punctuation.definition.entity.begin.bracket",
        "source.jsx source.css punctuation.separator.key-value",
        "source.jsx source.css punctuation.definition.attribute-selector",
        "source.jsx source.css meta.property-list",
        "source.jsx source.css meta.property-list punctuation.separator.comma",
        "source.tsx source.css punctuation.section",
        "source.tsx source.css punctuation.terminator.rule",
        "source.tsx source.css punctuation.definition.entity.end.bracket",
        "source.tsx source.css punctuation.definition.entity.begin.bracket",
        "source.tsx source.css punctuation.separator.key-value",
        "source.tsx source.css punctuation.definition.attribute-selector",
        "source.tsx source.css meta.property-list",
        "source.tsx source.css meta.property-list punctuation.separator.comma",
      ],
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: [
        "source.elixir support.type.elixir",
        "source.elixir meta.module.elixir entity.name.class.elixir",
      ],
      settings: {
        foreground: "#82AAFF",
      },
    },
    {
      scope: "source.elixir entity.name.function",
      settings: {
        foreground: "#FFCB6B",
      },
    },
    {
      scope: [
        "source.elixir constant.other.symbol.elixir",
        "source.elixir constant.other.keywords.elixir",
      ],
      settings: {
        foreground: "#82AAFF",
      },
    },
    {
      scope: "source.elixir punctuation.definition.string",
      settings: {
        foreground: "#A9C77D",
      },
    },
    {
      scope: [
        "source.elixir variable.other.readwrite.module.elixir",
        "source.elixir variable.other.readwrite.module.elixir punctuation.definition.variable.elixir",
      ],
      settings: {
        foreground: "#FFCB6B",
      },
    },
    {
      scope: "source.elixir .punctuation.binary.elixir",
      settings: {
        foreground: "#C792EA",
      },
    },
    {
      scope: "source.go meta.function-call.go",
      settings: {
        foreground: "#DDDDDD",
      },
    },
    {
      scope: "variable.qraphql",
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: "entity.other.attribute-name.id.html",
      settings: {
        foreground: "#FFCB6B",
      },
    },
    {
      scope: "punctuation.definition.tag.html",
      settings: {
        foreground: "#64748b",
      },
    },
    {
      scope: "meta.tag.sgml.doctype.html",
      settings: {
        foreground: "#C792EA",
        fontStyle: "italic",
      },
    },
    {
      scope: "meta.class entity.name.type.class.js",
      settings: {
        foreground: "#FFCB8B",
      },
    },
    {
      scope: "meta.method.declaration storage.type.js",
      settings: {
        foreground: "#82AAFF",
        fontStyle: "normal",
      },
    },
    {
      scope: ["terminator.js", "terminator.ts"],
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: [
        "meta.js punctuation.definition.js",
        "meta.ts punctuation.definition.js",
      ],
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: [
        "entity.name.type.instance.jsdoc",
        "entity.name.type.instance.phpdoc",
      ],
      settings: {
        foreground: "#EEFFFF",
      },
    },
    {
      scope: ["variable.other.jsdoc", "variable.other.phpdoc"],
      settings: {
        foreground: "#78CCF0",
      },
    },
    {
      scope: [
        "variable.other.meta.import.js",
        "variable.other.meta.import.ts",
        "meta.import.js variable.other",
        "meta.import.ts variable.other",
        "variable.other.meta.export.js",
        "variable.other.meta.export.ts",
        "meta.export.js variable.other",
        "meta.export.ts variable.other",
      ],
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: "variable.parameter.function.js,variable.parameter.function.ts",
      settings: {
        foreground: "#7986E7",
      },
    },
    {
      scope: ["variable.other.readwrite.js", "variable.other.readwrite.ts"],
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: [
        "meta.jsx.children",
        "meta.jsx.children.js",
        "meta.jsx.children.tsx",
      ],
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: [
        "variable.other.object.js",
        "variable.other.object.ts",
        "variable.other.object.tsx",
        "variable.other.object.jsx",
        "meta.object-literal.key.ts",
        "meta.object-literal.key.tsx",
        "meta.object-literal.key.js",
        "meta.object-literal.key.jsx",
        "variable.object.property.ts",
        "variable.object.property.tsx",
        "variable.object.property.js",
        "variable.object.property.jsx",
      ],
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: [
        "variable.js",
        "variable.other.js",
        "variable.ts",
        "variable.other.ts",
      ],
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: ["entity.name.type.js", "entity.name.type.module.js"],
      settings: {
        foreground: "#FFCB8B",
      },
    },
    {
      scope: ["support.class.js", "support.class.ts"],
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: "support.type.property-name.json",
      settings: {
        foreground: "#80CBC4",
        fontStyle: "italic",
      },
    },
    {
      scope: ["punctuation", "meta.brace.round.js", "meta.brace.square.js"],
      settings: {
        foreground: "#BF616A",
      },
    },
    {
      scope: "support.constant.json",
      settings: {
        foreground: "#FFCB6B",
      },
    },
    {
      scope: "meta.structure.dictionary.value.json string.quoted.double",
      settings: {
        foreground: "#C3E88D",
        fontStyle: "italic",
      },
    },
    {
      scope: "string.quoted.double.json punctuation.definition.string.json",
      settings: {
        foreground: "#C3E88D",
        fontStyle: "italic",
      },
    },
    {
      scope:
        "meta.structure.dictionary.json meta.structure.dictionary.value constant.language",
      settings: {
        foreground: "#FF5874",
        fontStyle: "italic",
      },
    },
    {
      scope: "variable.other.ruby",
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: "constant.language.symbol.hashkey.ruby",
      settings: {
        foreground: "#89DDFF",
      },
    },
    {
      scope: "entity.name.tag.less",
      settings: {
        foreground: "#FF5572",
      },
    },
    {
      scope:
        "meta.attribute-selector.less entity.other.attribute-name.attribute",
      settings: {
        foreground: "#F78C6C",
      },
    },
    {
      scope: "markup.heading",
      settings: {
        foreground: "#82B1FF",
      },
    },
    {
      scope: "markup.italic",
      settings: {
        foreground: "#C792EA",
        fontStyle: "italic",
      },
    },
    {
      scope: "markup.bold",
      settings: {
        foreground: "#FFCB6B",
        fontStyle: "bold",
      },
    },
    {
      scope: "markup.quote",
      settings: {
        foreground: "#697098",
        fontStyle: "italic",
      },
    },
    {
      scope: "markup.inline.raw",
      settings: {
        foreground: "#C3E88D",
      },
    },
    {
      scope: ["markup.underline.link", "markup.underline.link.image"],
      settings: {
        foreground: "#FF869A",
      },
    },
    {
      scope: ["markup.meta.attribute-list"],
      settings: {
        foreground: "#A9C77D",
      },
    },
    {
      scope: "markup.admonition",
      settings: {
        fontStyle: "bold",
      },
    },
    {
      scope: "markup.list.bullet",
      settings: {
        foreground: "#D9F5DD",
      },
    },
    {
      scope: ["markup.superscript", "markup.subscript"],
      settings: {
        fontStyle: "italic",
      },
    },
    {
      scope: [
        "string.other.link.title.markdown",
        "string.other.link.description.markdown",
      ],
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: [
        "punctuation.definition.string.markdown",
        "punctuation.definition.string.begin.markdown",
        "punctuation.definition.string.end.markdown",
        "meta.link.inline.markdown punctuation.definition.string",
      ],
      settings: {
        foreground: "#82B1FF",
      },
    },
    {
      scope: ["punctuation.definition.metadata.markdown"],
      settings: {
        foreground: "#FF5572",
      },
    },
    {
      scope: ["beginning.punctuation.definition.list.markdown"],
      settings: {
        foreground: "#82B1FF",
      },
    },
    {
      scope: "entity.name.function.asciidoc",
      settings: {
        foreground: "#F78C6C",
      },
    },
    {
      scope: "variable.other.php",
      settings: {
        foreground: "#BEC5D4",
      },
    },
    {
      scope: "support.class.php",
      settings: {
        foreground: "#FFCB8B",
      },
    },
    {
      scope: "meta.function-call.php punctuation",
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: "variable.other.global.php",
      settings: {
        foreground: "#FFCB6B",
      },
    },
    {
      scope: "variable.other.global.php punctuation.definition.variable",
      settings: {
        foreground: "#FFCB6B",
      },
    },
    {
      scope: "constant.language.python",
      settings: {
        foreground: "#FF5874",
      },
    },
    {
      scope: [
        "variable.parameter.function.python",
        "meta.function-call.arguments.python",
      ],
      settings: {
        foreground: "#7986E7",
      },
    },
    {
      scope: ["meta.function-call.python", "meta.function-call.generic.python"],
      settings: {
        foreground: "#B2CCD6",
      },
    },
    {
      scope: "punctuation.python",
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: "entity.name.function.decorator.python",
      settings: {
        foreground: "#FFCB6B",
      },
    },
    {
      scope: "source.python variable.language.special",
      settings: {
        foreground: "#8EACE3",
      },
    },
    {
      scope: [
        "variable.scss",
        "variable.sass",
        "variable.parameter.url.scss",
        "variable.parameter.url.sass",
      ],
      settings: {
        foreground: "#DDDDDD",
      },
    },
    {
      scope: [
        "source.css.scss meta.at-rule variable",
        "source.css.sass meta.at-rule variable",
      ],
      settings: {
        foreground: "#82AAFF",
      },
    },
    {
      scope: [
        "source.css.scss meta.at-rule variable",
        "source.css.sass meta.at-rule variable",
      ],
      settings: {
        foreground: "#BEC5D4",
      },
    },
    {
      scope: [
        "meta.attribute-selector.scss entity.other.attribute-name.attribute",
        "meta.attribute-selector.sass entity.other.attribute-name.attribute",
      ],
      settings: {
        foreground: "#F78C6C",
      },
    },
    {
      scope: ["entity.name.tag.scss", "entity.name.tag.sass"],
      settings: {
        foreground: "#FF5572",
      },
    },
    {
      scope: [
        "variable.other.readwrite.alias.ts",
        "variable.other.readwrite.alias.tsx",
        "variable.other.readwrite.ts",
        "variable.other.readwrite.tsx",
        "variable.other.object.ts",
        "variable.other.object.tsx",
        "variable.object.property.ts",
        "variable.object.property.tsx",
        "variable.other.ts",
        "variable.other.tsx",
        "variable.tsx",
        "variable.ts",
      ],
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: ["entity.name.type.ts", "entity.name.type.tsx"],
      settings: {
        foreground: "#78CCF0",
      },
    },
    {
      scope: ["support.class.node.ts", "support.class.node.tsx"],
      settings: {
        foreground: "#82AAFF",
      },
    },
    {
      scope: [
        "meta.type.parameters.ts entity.name.type",
        "meta.type.parameters.tsx entity.name.type",
      ],
      settings: {
        foreground: "#EEFFFF",
      },
    },
    {
      scope: [
        "meta.import.ts punctuation.definition.block",
        "meta.import.tsx punctuation.definition.block",
        "meta.export.ts punctuation.definition.block",
        "meta.export.tsx punctuation.definition.block",
      ],
      settings: {
        foreground: "#E0E4EB",
      },
    },
    {
      scope: [
        "meta.decorator punctuation.decorator.ts",
        "meta.decorator punctuation.decorator.tsx",
      ],
      settings: {
        foreground: "#82AAFF",
      },
    },
    {
      scope: "meta.tag.js meta.jsx.children.tsx",
      settings: {
        foreground: "#82AAFF",
      },
    },
    {
      scope: "entity.name.tag.yaml",
      settings: {
        foreground: "#89DDFF",
      },
    },
    {
      scope: "variable.parameter.handlebars",
      settings: {
        foreground: "#BEC5D4",
      },
    },
    {
      scope:
        "entity.other.attribute-name.handlebars variable.parameter.handlebars",
      settings: {
        foreground: "#FFCB6B",
      },
    },
    {
      scope: "entity.other.attribute-name.handlebars",
      settings: {
        foreground: "#89DDFF",
      },
    },
    {
      scope:
        "entity.other.attribute-value.handlebars variable.parameter.handlebars",
      settings: {
        foreground: "#7986E7",
      },
    },
    {
      scope: [
        "meta.tag.js meta.embedded.expression.js punctuation.section.embedded.begin.js",
        "meta.tag.js meta.embedded.expression.js punctuation.section.embedded.end.js",
        "meta.property-list.css meta.property-value.css variable.other.less",
        "punctuation.section.embedded.begin.js.jsx",
        "punctuation.section.embedded.end.js.jsx",
        "meta.property-list.scss variable.scss",
        "meta.property-list.sass variable.sass",
        "keyword.operator.logical",
        "keyword.operator.arithmetic",
        "keyword.operator.bitwise",
        "keyword.operator.increment",
        "keyword.operator.ternary",
        "keyword.operator.comparison",
        "keyword.operator.assignment",
        "keyword.operator.operator",
        "keyword.operator.or.regexp",
        "keyword.operator.expression.in",
        "keyword.operator.type",
        "punctuation.section.embedded.js",
        "punctuation.definintion.string",
      ],
      settings: {
        fontStyle: "italic",
      },
    },
    {
      scope: [
        "keyword.other.unit",
        "support.type.property-name.css",
        "support.type.vendored.property-name.css",
        "support.constant.vendored.property-value.css",
        "meta.import.ts meta.block.ts variable.other.readwrite.alias.ts",
        "meta.import.tsx meta.block.tsx variable.other.readwrite.alias.tsx",
        "meta.import.js variable.other",
        "meta.export.ts meta.block.ts variable.other.readwrite.alias.ts",
        "meta.export.tsx meta.block.tsx variable.other.readwrite.alias.tsx",
        "meta.export.js variable.other",
        "entity.name.function.ts",
        "entity.name.function.tsx",
        "support.type.primitive",
        "entity.name.tag.yaml",
        "entity.other.attribute-name",
        "meta.tag.sgml.doctype.html",
        "entity.name.tag.doctype",
        "meta.tag.sgml.doctype",
        "entity.name.tag.custom",
        "source.js.jsx keyword.control.flow.js",
        "support.type.property.css",
        "support.function.basic_functions",
        "constant.other.color.rgb-value.hex.css",
        "constant.other.rgb-value.css",
        "variable.assignment.coffee",
        "support.function.basic_functions",
        "keyword.operator.expression.typeof",
        "punctuation.section.embedded",
        "keyword.operator.type.annotation",
        "variable.object.property.ts",
        "variable.object.property.js",
        "variable.object.property.jsx",
        "variable.object.property.tsx",
        "assignment.coffee",
        "entity.name.type.ts",
        "support.constant.math",
        "meta.object-literal.key",
        "meta.var.expr storage.type",
        "variable.scss",
        "variable.sass",
        "variable.other.less",
        "variable.parameter.url.scss",
        "variable.parameter.url.sass",
        "parameter",
        "string",
        "italic",
        "quote",
        "keyword",
        "storage",
        "language",
        "constant.language",
        "variable.language",
        "type .function",
        "type.function",
        "storage.type.class",
        "type.var",
        "meta.parameter",
        "variable.parameter",
        "meta.parameters",
        "keyword.control",
        "modifier",
        "this",
        "comment",
      ],
      settings: {
        fontStyle: "italic",
      },
    },
    {
      scope: "token.info-token",
      settings: {
        foreground: "#6796E6",
      },
    },
    {
      scope: "token.warn-token",
      settings: {
        foreground: "#CD9731",
      },
    },
    {
      scope: "token.error-token",
      settings: {
        foreground: "#F44747",
      },
    },
    {
      scope: "token.debug-token",
      settings: {
        foreground: "#B267E6",
      },
    },
  ],
};

const DEFAULT_COLORS = {
  accentBackground: "#07090d",
  background: "#0f111a",
  accent: "#80cbc4",
};
const THEME_PATH = path.join(
  __dirname,
  "themes",
  "night-operator-color-theme.json"
);

const changeTheme = () => {
  let accentTheme = vscode.workspace
    .getConfiguration()
    .get(`nightOperatorTheme.accentTheme`);

  let brightness = vscode.workspace
    .getConfiguration()
    .get(`nightOperatorTheme.backgroundBrightness`);

  if (accentTheme) return createAccentTheme();

  let bg = changeBrightness(
    vscode.workspace
      .getConfiguration()
      .get(`nightOperatorTheme.backgroundColor`),
    brightness
  );

  let accent = vscode.workspace
    .getConfiguration()
    .get(`nightOperatorTheme.accentColor`);

  let theme = JSON.stringify(Object.assign({}, DEFAULT_THEME));
  let newTheme = theme
    .split(`${DEFAULT_COLORS.background}`)
    .join(bg)
    .split(`${DEFAULT_COLORS.accent}`)
    .join(accent);
  fs.writeFileSync(THEME_PATH, newTheme);
  const RELOAD = "Reload Window";
  vscode.window
    .showInformationMessage("Reload VS Code to see changes.", RELOAD)
    .then((res) => {
      res === RELOAD &&
        vscode.commands.executeCommand("workbench.action.reloadWindow");
    });
};

const createAccentTheme = () => {
  let accent = vscode.workspace
    .getConfiguration()
    .get(`nightOperatorTheme.accentColor`);
  let brightness = vscode.workspace
    .getConfiguration()
    .get(`nightOperatorTheme.backgroundBrightness`);
  let bg = changeBrightness(
    mixColors(DEFAULT_COLORS.accentBackground, accent),
    brightness
  );
  let theme = JSON.stringify(Object.assign({}, DEFAULT_THEME));
  let newTheme = theme
    .split(`${DEFAULT_COLORS.background}`)
    .join(bg)
    .split(`${DEFAULT_COLORS.accent}`)
    .join(accent);
  fs.writeFileSync(THEME_PATH, newTheme);
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log(THEME_PATH);
  vscode.window.showInformationMessage("Night Operator Theme: Ready");

  const disposable = vscode.workspace.onDidChangeConfiguration(
    ({ affectsConfiguration: affects }) => {
      const affected =
        affects("nightOperatorTheme.backgroundColor") ||
        affects("nightOperatorTheme.accentColor") ||
        affects("nightOperatorTheme.accentTheme") ||
        affects("nightOperatorTheme.backgroundBrightness");
      affected && changeTheme();
      context.subscriptions.push(disposable);
    }
  );
}
exports.activate = activate;
