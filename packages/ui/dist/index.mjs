// Button.tsx
var Button = (props) => {
  const { onClick } = props;
  return /* @__PURE__ */ React.createElement("button", {
    onClick
  }, "Boop");
};

// ThemeIcon.tsx
var ThemeIcon = (props) => {
  const { theme, setTheme } = props;
  return /* @__PURE__ */ React.createElement("button", {
    type: "button",
    className: "bg-gray-200 dark:bg-gray-800 rounded p-3 h-10 w-10",
    onClick: () => setTheme(theme === "dark" ? "light" : "dark")
  }, /* @__PURE__ */ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "currentColor",
    className: "h-4 w-4 text-gray-800 dark:text-gray-200"
  }, theme === "dark" ? /* @__PURE__ */ React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
  }) : /* @__PURE__ */ React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
  })));
};

// KPreview.tsx
var KPreview = (props) => {
  const { srcDoc } = props;
  return /* @__PURE__ */ React.createElement("div", {
    style: { height: "100%" }
  }, /* @__PURE__ */ React.createElement("iframe", {
    width: "100%",
    height: "100%",
    className: "iframe",
    srcDoc
  }));
};

// KEditor.tsx
import MonacoEditor from "@monaco-editor/react";
var KEditor = (props) => {
  const { onMount, onChange, defaultValue } = props;
  return /* @__PURE__ */ React.createElement("div", {
    className: "h-full"
  }, /* @__PURE__ */ React.createElement(MonacoEditor, {
    onMount,
    theme: "vs-dark",
    onChange,
    defaultLanguage: "javascript",
    defaultValue
  }));
};
export {
  Button,
  KEditor,
  KPreview,
  ThemeIcon
};
//# sourceMappingURL=index.mjs.map