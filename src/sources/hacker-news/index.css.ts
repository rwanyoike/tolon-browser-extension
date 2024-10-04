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
        backgroundColor: "hsla(19, 87%, 55%, 0.15)",
        buttonActiveColor: "hsl(19, 87%, 55%)",
      },
      body: {
        ...theme.light.body,
        pointsColor: "hsl(19, 87%, 55%)",
      },
      footer: {
        ...theme.dark.footer,
        backgroundColor: "hsla(19, 87%, 55%, 0.15)",
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
            backgroundColor: "hsla(19, 87%, 55%, 0.15)",
            buttonActiveColor: "hsl(19, 87%, 55%)",
          },
          body: {
            ...theme.dark.body,
            pointsColor: "hsl(19, 87%, 55%)",
          },
          footer: {
            ...theme.dark.footer,
            backgroundColor: "hsla(19, 87%, 55%, 0.15)",
          },
        },
      ),
    },
  },
});
