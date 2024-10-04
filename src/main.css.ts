import { globalStyle } from "@vanilla-extract/css";

globalStyle(":root", {
  colorScheme: "light dark",
});

globalStyle("body", {
  fontSize: "100%",
});

globalStyle("#root", {
  width: "540px",
});
