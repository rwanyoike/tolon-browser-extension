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
  let searchQuery = null;
  if (tabs.length) {
    searchQuery = tabs[0].url;
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
