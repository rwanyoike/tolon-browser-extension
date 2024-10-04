import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

import { Header, type HeaderProps } from "./Header";
import * as css from "./Header.css";

test("loads <Header /> and clicks buttons", async () => {
  const setSource = vi.fn();
  const sources = [
    { name: "1", handleSearch: vi.fn(), theme: "no-op" },
    { name: "2", handleSearch: vi.fn(), theme: "no-op" },
  ];
  const props: HeaderProps = {
    currentSource: sources[1],
    onSourceChange: setSource,
    sources: sources,
  };
  const user = userEvent.setup();
  render(<Header {...props} />);
  const buttons = screen.getAllByTestId("site-button");
  expect(buttons.length).toBe(sources.length);
  for (let idx = 0; idx < buttons.length; idx++) {
    expect(buttons[idx]).toBeInTheDocument();
    expect(buttons[idx]).toBeVisible();
    expect(buttons[idx]).toHaveTextContent(sources[idx].name);
  }
  expect(buttons[1]).toHaveClass(css.buttonActive);
  await user.click(buttons[0]);
  expect(setSource).toHaveBeenCalledWith(sources[0]);
});
