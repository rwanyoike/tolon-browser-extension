import { render, screen, within } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import samples from "../sources/sample-site/test-data/results.jsx.json";
import { Body, type BodyProps } from "./Body";

test("loads <Body /> with unset query", async () => {
  const props: BodyProps = {
    query: null,
    error: null,
    onErrorRemove: vi.fn(),
    items: undefined,
  };
  render(<Body {...props} />);
  const message = screen.getByTestId("message");
  expect(message).toBeInTheDocument();
  expect(message).toBeVisible();
  expect(message).toHaveTextContent(/i don't work on special pages/i);
});

test("loads <Body /> with an error", async () => {
  const props: BodyProps = {
    query: "www.example.com/",
    error: Error("Failed in some way"),
    onErrorRemove: vi.fn(),
    items: undefined,
  };
  render(<Body {...props} />);
  const message = screen.getByTestId("message");
  expect(message).toBeInTheDocument();
  expect(message).toBeVisible();
  expect(message).toHaveTextContent(/failed in some way/i);
});

test("loads <Body /> with unset results", async () => {
  const props: BodyProps = {
    query: "www.example.com/",
    error: null,
    onErrorRemove: vi.fn(),
    items: undefined,
  };
  render(<Body {...props} />);
  const message = screen.getByTestId("message");
  expect(message).toBeInTheDocument();
  expect(message).toBeVisible();
  expect(message).toHaveTextContent(/loading.../i);
});

test("loads <Body /> with no results", async () => {
  const props: BodyProps = {
    query: "www.example.com/",
    error: null,
    onErrorRemove: vi.fn(),
    items: [],
  };
  render(<Body {...props} />);
  const message = screen.getByTestId("message");
  expect(message).toBeInTheDocument();
  expect(message).toBeVisible();
  expect(message).toHaveTextContent(/found no threads matching/i);
});

test("loads <Body /> with some results", async () => {
  const results = samples.slice(0, 2);
  const props: BodyProps = {
    query: "www.example.com/",
    error: null,
    onErrorRemove: vi.fn(),
    items: results,
  };
  render(<Body {...props} />);
  const articles = screen.getAllByTestId("result");
  expect(articles.length).toBe(results.length);
  for (let idx = 0; idx < articles.length; idx++) {
    expect(articles[idx]).toBeInTheDocument();
    expect(articles[idx]).toBeVisible();
    const title = within(articles[idx]).getByTestId("result-title");
    const url = within(articles[idx]).getByTestId("result-url");
    expect(title).toHaveTextContent(results[idx].thread.title);
    expect(url).toHaveTextContent(results[idx].url);
  }
});
