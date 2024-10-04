import { style } from "@vanilla-extract/css";

import * as theme from "../App.theme.css";

export const container = style({
  display: "flex",
  gap: "0.625rem", // 10px
  justifyContent: "space-between",
  padding: "0 0.625rem", // 10px

  backgroundColor: theme.vars.header.backgroundColor,
});

export const inner = style({
  display: "flex",
  gap: "0.625rem", // 10px
  overflow: "auto",
});

export const button = style({
  all: "unset",
  cursor: "pointer",
  outline: "revert",
  padding: "0.5rem 0", // 8px
  whiteSpace: "nowrap",

  ":disabled": {
    opacity: "0.5",
  },
});

export const buttonActive = style([
  button,
  {
    borderBottom: "0.25rem solid", // 4px
    paddingBottom: "0.25rem", // 4px

    borderBottomColor: theme.vars.header.buttonActiveColor,
  },
]);
