import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import * as css from "../App.css";
import { Header } from "../components/Header";

const sources = [
  { name: "Hacker News", handleSearch: fn(), theme: "no-op" },
  { name: "Reddit", handleSearch: fn(), theme: "no-op" },
  { name: "Twitter / 𝕏", handleSearch: fn(), theme: "no-op" },
];

const meta = {
  title: "Components/Header",
  component: Header,
  decorators: [
    (Story) => (
      <div className={css.container}>
        <Story />
      </div>
    ),
  ],
  args: {
    onSourceChange: fn(),
    sources: sources,
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentSource: sources[1],
  },
};
