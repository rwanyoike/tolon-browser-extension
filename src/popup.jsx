import React from "react";
import ReactDOM from "react-dom";

import "normalize.css";
import "./popup.css";

import App from "./App";

const element = (
  <App searchQuery="http://example.com" sourcesDict={{}} sourcesList={[]} />
);
ReactDOM.render(element, document.getElementById("root"));
