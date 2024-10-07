import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import * as css from "../App.css";
import { Footer } from "../components/Footer";

const meta = {
  title: "Components/Footer",
  component: Footer,
  decorators: [
    (Story) => (
      <div className={css.container}>
        <Story />
      </div>
    ),
  ],
  args: {
    onIndexChange: fn(),
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HasNext: Story = {
  args: {
    currentIndex: 0,
    pageCount: 3,
    searchHits: "7",
  },
};

export const HasPrevious: Story = {
  args: {
    currentIndex: 2,
    pageCount: 3,
    searchHits: "8",
  },
};

export const Default: Story = {
  args: {
    currentIndex: 1,
    pageCount: 3,
    searchHits: "9",
  },
};
