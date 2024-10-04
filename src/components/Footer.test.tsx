import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

import { Footer, type FooterProps } from "./Footer";

test("loads <Footer /> and clicks buttons", async () => {
  const setIndex = vi.fn();
  const props: FooterProps = {
    currentIndex: 1,
    onIndexChange: setIndex,
    pageCount: 3,
    searchHits: "∞",
  };
  const user = userEvent.setup();
  render(<Footer {...props} />);
  const prevButton = screen.getByTestId("prev-button");
  const nextButton = screen.getByTestId("next-button");
  const hitsButton = screen.getByTestId("hits-button");
  for (const button of [prevButton, nextButton, hitsButton]) {
    expect(button).toBeInTheDocument();
    expect(button).toBeVisible();
  }
  expect(prevButton).toHaveTextContent(/Previous/i);
  expect(nextButton).toHaveTextContent(/Next/i);
  expect(hitsButton).toHaveTextContent(props.searchHits);
  await user.click(prevButton);
  expect(setIndex).toHaveBeenCalledWith(-1);
  await user.click(nextButton);
  expect(setIndex).toHaveBeenCalledWith(+1);
});

test("check Previous button is disabled", async () => {
  const props: FooterProps = {
    currentIndex: 0,
    onIndexChange: vi.fn(),
    pageCount: 3,
    searchHits: "∞",
  };
  render(<Footer {...props} />);
  const prevButton = screen.getByTestId("prev-button");
  const nextButton = screen.getByTestId("next-button");
  expect(prevButton).toBeDisabled();
  expect(nextButton).not.toBeDisabled();
});

test("check Next button is disabled", async () => {
  const props: FooterProps = {
    currentIndex: 2,
    onIndexChange: vi.fn(),
    pageCount: 3,
    searchHits: "∞",
  };
  render(<Footer {...props} />);
  const prevButton = screen.getByTestId("prev-button");
  const nextButton = screen.getByTestId("next-button");
  expect(prevButton).not.toBeDisabled();
  expect(nextButton).toBeDisabled();
});
