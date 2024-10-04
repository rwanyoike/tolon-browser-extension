import { assignVars, style } from "@vanilla-extract/css";

import * as theme from "../../App.theme.css";

export default style({
  vars: assignVars(
    {
      header: theme.vars.header,
      body: theme.vars.body,
      footer: theme.vars.footer,
    },
    {
      header: {
        ...theme.light.header,
        backgroundColor: "hsla(124, 55%, 24%, 0.15)",
        buttonActiveColor: "hsl(124, 55%, 24%)",
      },
      body: {
        ...theme.light.body,
        pointsColor: "hsl(124, 55%, 24%)",
      },
      footer: {
        ...theme.light.footer,
        backgroundColor: "hsla(124, 55%, 24%, 0.15)",
      },
    },
  ),

  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: assignVars(
        {
          header: theme.vars.header,
          body: theme.vars.body,
          footer: theme.vars.footer,
        },
        {
          header: {
            ...theme.dark.header,
            backgroundColor: "hsla(122, 39%, 49%, 0.15)",
            buttonActiveColor: "hsl(122, 39%, 49%)",
          },
          body: {
            ...theme.dark.body,
            pointsColor: "hsl(122, 39%, 49%)",
          },
          footer: {
            ...theme.dark.footer,
            backgroundColor: "hsla(122, 39%, 49%, 0.15)",
          },
        },
      ),
    },
  },
});
