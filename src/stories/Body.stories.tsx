import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import * as css from "../App.css";
import { Body } from "../components/Body";
import samples from "../sources/sample-site/test-data/results.jsx.json";

const meta = {
  title: "Components/Body",
  component: Body,
  decorators: [
    (Story) => (
      <div className={css.container}>
        <Story />
      </div>
    ),
  ],
  args: {
    onErrorRemove: fn(),
  },
} satisfies Meta<typeof Body>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UnsetQuery: Story = {
  args: {
    query: null,
    items: undefined,
    error: null,
  },
};

export const HasError: Story = {
  args: {
    query: "www.example.com/",
    items: undefined,
    error: new Error("Failed in some way"),
  },
};

export const UnsetResults: Story = {
  args: {
    query: "www.example.com/",
    items: undefined,
    error: null,
  },
};

export const NoResults: Story = {
  args: {
    query:
      "www.example.com/questions/40477245/et-quo-quam-voluptates-ut-voluptatem-iste-nemo-nam-repellendus",
    items: [],
    error: null,
  },
};

export const FewResults: Story = {
  args: {
    query: "www.example.com/",
    items: samples.slice(0, 3),
    error: null,
  },
};

export const Default: Story = {
  args: {
    query: "www.example.com/",
    items: samples,
    error: null,
  },
};
