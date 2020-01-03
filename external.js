let packages;

if (process.env.NODE_ENV === "development") {
  packages = {
    ky: {
      copy: [{ from: "umd.js", to: "/" }],
      scripts: {
        variableName: "ky",
        path: "umd.js",
      },
    },
    "prop-types": {
      copy: [{ from: "prop-types.js", to: "/" }],
      scripts: {
        variableName: "PropTypes",
        path: "prop-types.js",
      },
    },
    react: {
      copy: [{ from: "umd/react.development.js", to: "/" }],
      scripts: {
        variableName: "React",
        path: "react.development.js",
      },
    },
    "react-dom": {
      copy: [{ from: "umd/react-dom.development.js", to: "/" }],
      scripts: {
        variableName: "ReactDOM",
        path: "react-dom.development.js",
      },
    },
    "webextension-polyfill": {
      copy: [{ from: "dist/browser-polyfill.js", to: "/" }],
      scripts: {
        variableName: "browser",
        path: "browser-polyfill.js",
      },
    },
  };
}

if (process.env.NODE_ENV === "production") {
  packages = {
    ky: {
      copy: [{ from: "umd.js", to: "/" }],
      scripts: {
        variableName: "ky",
        path: "umd.js",
      },
    },
    "prop-types": {
      copy: [{ from: "prop-types.min.js", to: "/" }],
      scripts: {
        variableName: "PropTypes",
        path: "prop-types.min.js",
      },
    },
    react: {
      copy: [{ from: "umd/react.production.min.js", to: "/" }],
      scripts: {
        variableName: "React",
        path: "react.production.min.js",
      },
    },
    "react-dom": {
      copy: [{ from: "umd/react-dom.production.min.js", to: "/" }],
      scripts: {
        variableName: "ReactDOM",
        path: "react-dom.production.min.js",
      },
    },
    "webextension-polyfill": {
      copy: [{ from: "dist/browser-polyfill.min.js", to: "/" }],
      scripts: {
        variableName: "browser",
        path: "browser-polyfill.min.js",
      },
    },
  };
}

module.exports = packages;
