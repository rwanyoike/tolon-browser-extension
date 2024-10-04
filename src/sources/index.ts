import type * as ty from "../types";
import hackerNews from "./hacker-news";
import reddit from "./reddit";

export const getSources = (): ty.Source[] => {
  return [hackerNews, reddit];
};
