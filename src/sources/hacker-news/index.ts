import { formatDistanceToNowStrict } from "date-fns";
import ky from "ky";

import type * as ty from "../../types";
import theme from "./index.css";

const SOURCE_URL = "https://news.ycombinator.com";
const SEARCH_URL = "https://hn.algolia.com";

interface Response {
  hits: {
    author: string;
    created_at_i: number;
    num_comments: number;
    objectID: string;
    points: number;
    title: string;
    url: string;
  }[];
  nbHits: number;
  nbPages: number;
  page: number;
}

const handleSearch = async (
  url: string,
  session: ty.Session,
): Promise<ty.Results> => {
  // Ref: https://hn.algolia.com/api
  const params = new URLSearchParams();
  params.set("query", `"${url}"`);
  params.set("hitsPerPage", "20");
  params.set("numericFilters", "num_comments>0");
  params.set("restrictSearchableAttributes", "url");
  params.set("tags", "story");
  // If set, we want the next page
  if ({}.hasOwnProperty.call(session, "page")) {
    const nextPage = (+session.page + 1).toString();
    params.set("page", nextPage);
  }

  const getOptions = {
    searchParams: params,
    retry: 1,
    timeout: 10000 /* 10s */,
  };
  const response: Response = await ky
    .get(`${SEARCH_URL}/api/v1/search`, getOptions)
    .json();

  const results = [];
  const data = response;
  for (let idx = 0; idx < data.hits.length; idx += 1) {
    const result = data.hits[idx];
    const created = new Date(result.created_at_i * 1000);
    const distanceToNow = formatDistanceToNowStrict(created, {
      addSuffix: true,
    });
    results.push({
      id: result.objectID,
      thread: {
        title: result.title,
        url: `${SOURCE_URL}/item?id=${result.objectID}`,
      },
      url: result.url,
      meta: [
        {
          item: "points",
          text: `${result.points.toLocaleString()} points`,
        },
        {
          item: "comments",
          text: `${result.num_comments.toLocaleString()} comments`,
          url: `${SOURCE_URL}/item?id=${result.objectID}`,
        },
        {
          item: "created",
          text: `submitted ${distanceToNow}`,
          title: created.toISOString(),
        },
        {
          item: "author",
          text: `by ${result.author}`,
          url: `${SOURCE_URL}/user?id=${result.author}`,
        },
      ],
    });
  }

  return {
    results: results,
    searchHits: data.nbHits.toString(),
    hasNext: data.page + 1 < data.nbPages,
    session: {
      page: data.page.toString(),
    },
  };
};

export default {
  name: "Hacker News",
  handleSearch: handleSearch,
  theme: theme,
} satisfies ty.Source;
