import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Main } from "../App";
import hackerNews from "../sources/hacker-news";
import reddit from "../sources/reddit";
import sampleSite from "../sources/sample-site";
import samples from "../sources/sample-site/test-data/results.jsx.json";

const mockHandleSearch = (start: number, end: number) => {
  const results = samples.slice(start, end);
  return {
    results: results,
    searchHits: results.length.toString(),
    hasNext: true,
    session: {},
  };
};

const meta = {
  title: "Main",
  component: Main,
  args: {
    sources: [
      {
        name: hackerNews.name,
        handleSearch: fn(async () => mockHandleSearch(0, 6)),
        theme: hackerNews.theme,
      },
      {
        name: reddit.name,
        handleSearch: fn(async () => mockHandleSearch(6, 12)),
        theme: reddit.theme,
      },
      {
        name: "Twitter / 𝕏",
        handleSearch: fn(async () => mockHandleSearch(12, 15)),
        theme: sampleSite.theme,
      },
    ],
  },
} satisfies Meta<typeof Main>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    query: "www.example.com/",
  },
};
