import React from "react";
import ReactDOM from "react-dom";
import browser from "webextension-polyfill";

import "normalize.css";
import "typeface-source-sans-pro";
import "./popup.css";

import App from "./App";
import sources from "./sources";

(async () => {
  const queryInfo = { active: true, currentWindow: true };
  const tabs = await browser.tabs.query(queryInfo);
  // See: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns
  const urlPattern = /(http|https):\/\//;
  let searchQuery = null;
  if (tabs.length && urlPattern.test(tabs[0].url)) {
    const { host, pathname, search } = new URL(tabs[0].url);
    // Don't include the URL scheme or hash. They filter inexact results
    // TODO(sources): This will break hash-navigated webpage results? Move
    // check to the source handleSearch() functions?
    searchQuery = `${host}${pathname}${search}`;
  }
  const element = (
    <App
      searchQuery={searchQuery}
      sourcesDict={sources}
      sourcesList={Object.keys(sources)}
    />
  );
  ReactDOM.render(element, document.getElementById("root"));
})();
