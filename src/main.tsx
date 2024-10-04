import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "modern-normalize/modern-normalize.css";

import "./main.css";
import { Main } from "./App";

import { getSources } from "./sources";
import { getBrowserTabUrl } from "./utils";

(async () => {
  const sources = getSources();
  const query = await getBrowserTabUrl();
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Main sources={sources} query={query} />
    </StrictMode>,
  );
})();
