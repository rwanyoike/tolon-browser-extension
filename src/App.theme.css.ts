import { createThemeContract } from "@vanilla-extract/css";

export const light = {
  root: {
    backgroundColor: "hsl(0, 0%, 100%)",
    textColor: "hsl(210, 0%, 10%)",
  },
  header: {
    backgroundColor: "hsla(0, 0%, 0%, 0.15)",
    buttonActiveColor: "hsla(0, 0%, 0%, 0.5)",
  },
  footer: {
    backgroundColor: "hsl(0, 0%, 100%)",
    backgroundImage: "initial",
  },
  body: {
    borderColor: "hsl(0, 0%, 87%)",
    linkColor: "hsl(208, 0%, 36%)",
    titleColor: "hsl(210, 0%, 10%)",
    urlColor: "hsl(208, 0%, 56%)",
    pointsColor: "hsl(210, 0%, 10%)",
  },
};

export const dark = {
  root: {
    backgroundColor: "hsl(0, 0%, 12%)",
    textColor: "hsl(0, 0%, 80%)",
  },
  header: {
    backgroundColor: "hsla(0, 0%, 100%, 0.15)",
    buttonActiveColor: "hsla(0, 0%, 100%, 0.5)",
  },
  footer: {
    backgroundColor: "initial",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04))",
  },
  body: {
    borderColor: "initial",
    linkColor: "hsl(208, 0%, 56%)",
    titleColor: "hsl(0, 0%, 80%)",
    urlColor: "hsl(208, 0%, 36%)",
    pointsColor: "hsl(0, 0%, 80%)",
  },
};

export const vars = createThemeContract(light);
