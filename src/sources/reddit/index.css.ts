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
        backgroundColor: "hsla(206, 100%, 41%, 0.15)",
        buttonActiveColor: "hsl(206, 100%, 41%)",
      },
      body: {
        ...theme.light.body,
        pointsColor: "hsl(206, 100%, 41%)",
      },
      footer: {
        ...theme.light.footer,
        backgroundColor: "hsla(206, 100%, 41%, 0.15)",
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
            backgroundColor: "hsla(203, 100%, 65%, 0.15)",
            buttonActiveColor: "hsl(203, 100%, 65%)",
          },
          body: {
            ...theme.dark.body,
            pointsColor: "hsl(203, 100%, 65%)",
          },
          footer: {
            ...theme.dark.footer,
            backgroundColor: "hsla(203, 100%, 65%, 0.15)",
          },
        },
      ),
    },
  },
});
