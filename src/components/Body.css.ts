import { globalStyle, style } from "@vanilla-extract/css";

import * as theme from "../App.theme.css";

export const container = style({
  height: "425px",
  overflow: "auto",
  padding: "1rem 0", // 16px
});

globalStyle(`${container} a[href]`, {
  textDecorationThickness: "1px",
  textUnderlineOffset: "2px",

  color: theme.vars.body.linkColor,
});

export const message = style({
  padding: "0 0.625rem", // 10px
  wordBreak: "break-word",
});

export const button = style({
  all: "unset",
  cursor: "pointer",
  outline: "revert",
  padding: "0.5rem", // 8px
  whiteSpace: "nowrap",
  display: "block",
  marginTop: "1rem", // 16px

  backgroundColor: theme.vars.header.backgroundColor,
});

export const result = style({
  padding: "0 0.625rem", // 10px

  selectors: {
    "&:not(:last-child)::after": {
      borderBottom: "1px solid",
      content: "",
      display: "block",
      margin: "1rem 0", // 16px

      borderBottomColor: theme.vars.body.borderColor,
    },
  },
});

export const title = style({});

globalStyle(`${title} a[href]`, {
  fontSize: "1.125rem", // 18px

  color: theme.vars.body.titleColor,
});

export const url = style({
  margin: "0.25rem 0 0", // 4px
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "pre",
});

globalStyle(`${url} a[href]`, {
  fontSize: "0.8rem", // 12px

  color: theme.vars.body.urlColor,
});

export const meta = style({
  fontSize: "0.9rem", // 14px
});

globalStyle(`${meta} > div`, {
  display: "inline-block",
  margin: "0.25rem 0 0", // 4px
});

globalStyle(`${meta} > div:not(:first-child)::before`, {
  content: "|",
  margin: "0 0.25rem", // 4px
});

globalStyle(".meta__points", {
  color: theme.vars.body.pointsColor,
});
