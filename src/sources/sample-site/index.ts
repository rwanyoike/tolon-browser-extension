import { formatDistanceToNowStrict } from "date-fns";

import type * as ty from "../../types";
import theme from "./index.css";
import samples from "./test-data/results.raw.json";

const SOURCE_URL = "https://www.example.com";

// Used to simulate a thrown error
let throwError = true;

type Response = {
  itemCount: number;
  page: number;
  pageCount: number;
  items: {
    id: string;
    title: string;
    permalink: string;
    url: string;
    points: number;
    comments: number;
    created: string;
    author: string;
  }[];
};

/**
 * Search function to query a webpage URL.
 *
 * @param url The webpage URL.
 * @param session A previous session.
 * @returns The search result.
 */
const handleSearch = async (
  url: string,
  session: ty.Session,
): Promise<ty.Results> => {
  const params = new URLSearchParams();
  params.set("query", url);
  params.set("sort", "top");
  // Use `session` to pass context between calls
  if ({}.hasOwnProperty.call(session, "page")) {
    const nextPage = (+session.page + 1).toString();
    params.set("page", nextPage);
  }

  // // Example call to a search API, with a timeout
  // const getOptions = {
  //   searchParams: searchParams,
  //   retry: 1,
  //   timeout: 10000 /* 10s */,
  // };
  // const response: Response = await ky
  //   .get(`${SEARCH_URL}/api/search`, getOptions)
  //   .json();

  const page = +(params.get("page") || 1);
  const perPage = 6;
  const pageCount = Math.ceil(samples.length / perPage);
  const start = (page - 1) * perPage;
  const end = Math.min(page * perPage, samples.length);
  const items = samples.slice(start, end);

  // On page 2, simulate an error once
  if (page === 2 && throwError) {
    throwError = false;
    const error = new Error("Failed in some way");
    error.name = "SimulatedError";
    throw error;
  }

  // Example response from a search API
  const response: Response = {
    itemCount: samples.length,
    page: page,
    pageCount: pageCount,
    items: items,
  };

  // Loop through the response, results
  const results = [];
  const data = response.items;
  for (let idx = 0; idx < data.length; idx += 1) {
    const result = data[idx];
    const created = new Date(result.created);
    const distanceToNow = formatDistanceToNowStrict(created, {
      addSuffix: true,
    });
    results.push({
      id: result.id,
      thread: {
        title: result.title,
        url: result.permalink,
      },
      url: result.url,
      meta: [
        {
          item: "points",
          text: `${result.points} points`,
        },
        {
          item: "comments",
          text: `${result.comments} comments`,
          url: `${SOURCE_URL}/comments?id=${result.id}`,
        },
        {
          item: "created",
          text: `submitted ${distanceToNow}`,
          title: created.toISOString(),
        },
        {
          item: "author",
          text: `by ${result.author}`,
          url: `${SOURCE_URL}/user?id=XX`,
        },
      ],
    });
  }

  return {
    results: results,
    searchHits: response.itemCount.toString(),
    hasNext: response.page < response.pageCount,
    session: {
      page: response.page.toString(),
    },
  };
};

export default {
  name: "Sample Site",
  handleSearch: handleSearch,
  theme: theme,
} satisfies ty.Source;
