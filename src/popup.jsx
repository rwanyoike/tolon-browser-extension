import React from "react";
import ReactDOM from "react-dom";
// import browser from "webextension-polyfill";

import "normalize.css";
import "./popup.css";

import App from "./App";
import src from "./sources";

const DEFAULT_OPTIONS = { darkMode: false };

(async () => {
  let prevOptions = DEFAULT_OPTIONS;
  let query = "www.example.com/";

  if (typeof browser === "object") {
    prevOptions = await browser.storage.local.get(DEFAULT_OPTIONS);
    const queryInfo = { active: true, currentWindow: true };
    const tabs = await browser.tabs.query(queryInfo);
    // See: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns
    const urlPattern = /(http|https):\/\//;
    if (tabs.length && urlPattern.test(tabs[0].url)) {
      const { host, pathname, search } = new URL(tabs[0].url);
      // Don't include the URL scheme or hash. They filter-out results. This
      // will also affect hash-navigated webpage results.
      query = `${host}${pathname}${search}`;
    } else {
      query = null;
    }
  }

  const element = (
    <App
      prevOptions={prevOptions}
      query={query}
      sources={Object.keys(src)}
      src={src}
    />
  );

  ReactDOM.render(element, document.getElementById("root"));
})();
