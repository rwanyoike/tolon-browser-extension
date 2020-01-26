import ky from "ky";
import { timeAgo } from "../../utils";

import "./index.css";

const SOURCE_URL = "https://news.ycombinator.com";
const SEARCH_URL = "https://hn.algolia.com";

async function handleSearch(url, session) {
  const results = [];

  const searchParams = new URLSearchParams();
  searchParams.set("query", `"${url}"`);
  searchParams.set("hitsPerPage", 20);
  searchParams.set("numericFilters", "num_comments>0");
  searchParams.set("restrictSearchableAttributes", "url");
  searchParams.set("tags", "story");
  // If set, we want the next page
  if ({}.hasOwnProperty.call(session, "page")) {
    searchParams.set("page", session.page + 1);
  }

  const response = await ky
    .get(`${SEARCH_URL}/api/v1/search`, {
      searchParams,
      retry: 1,
      timeout: 10000, // 10s
    })
    .json();

  const data = response;
  for (let idx = 0; idx < data.hits.length; idx += 1) {
    const result = data.hits[idx];
    const created = new Date(result.created_at_i * 1000);
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
          text: `submitted ${timeAgo(created)}`,
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
    results,
    hits: data.nbHits,
    hasNext: data.page + 1 < data.nbPages,
    session: {
      page: data.page,
    },
  };
}

export default {
  name: "Hacker News",
  handleSearch,
};
