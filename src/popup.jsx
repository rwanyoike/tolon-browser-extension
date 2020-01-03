import React from "react";
import ReactDOM from "react-dom";

import "normalize.css";
import "./popup.css";

import App from "./App";
import sources from "./sources";

const element = (
  <App
    searchQuery="http://example.com"
    sourcesDict={sources}
    sourcesList={Object.keys(sources)}
  />
);
ReactDOM.render(element, document.getElementById("root"));
