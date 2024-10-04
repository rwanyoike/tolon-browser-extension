import { assignVars, style } from "@vanilla-extract/css";

import * as theme from "./App.theme.css";

export const container = style({
  vars: assignVars(theme.vars, theme.light),

  fontSize: "1rem",
  lineHeight: "1.2",

  backgroundColor: theme.vars.root.backgroundColor,
  color: theme.vars.root.textColor,

  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: assignVars(theme.vars, theme.dark),
    },
  },
});
