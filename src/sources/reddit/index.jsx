import ky from "ky";
import { timeAgo } from "../../utils";

import "./index.css";

const SOURCE_URL = "https://www.reddit.com";
const SEARCH_URL = SOURCE_URL;

async function handleSearch(url, session) {
  const results = [];

  // Ref: https://www.reddit.com/wiki/search
  const searchParams = new URLSearchParams();
  searchParams.set("q", `url:"${url}" self:no`);
  searchParams.set("sort", "top");
  searchParams.set("t", "all");
  searchParams.set("limit", 20);
  // If set, we want the next page
  if ({}.hasOwnProperty.call(session, "after")) {
    searchParams.set("after", session.after);
  }

  const response = await ky
    .get(`${SEARCH_URL}/search.json`, {
      searchParams,
      retry: 1,
      timeout: 10000, // 10s
    })
    .json();

  const { data } = response;
  for (let idx = 0; idx < data.children.length; idx += 1) {
    const result = data.children[idx];
    const created = new Date(result.data.created_utc * 1000);
    results.push({
      id: result.data.id,
      thread: {
        title: result.data.title,
        url: `${SOURCE_URL}${result.data.permalink}`,
      },
      url: result.data.url,
      meta: [
        {
          item: "points",
          text: `${result.data.score.toLocaleString()} points`,
        },
        {
          item: "comments",
          text: `${result.data.num_comments.toLocaleString()} comments`,
          url: `${SOURCE_URL}${result.data.permalink}`,
        },
        {
          item: "created",
          text: `submitted ${timeAgo(created)}`,
          title: created.toISOString(),
        },
        {
          item: "author",
          text: `by ${result.data.author}`,
          url: `${SOURCE_URL}/user/${result.data.author}`,
        },
        {
          item: "subreddit",
          text: `to ${result.data.subreddit_name_prefixed}`,
          url: `${SOURCE_URL}/${result.data.subreddit_name_prefixed}`,
        },
      ],
    });
  }

  return {
    results,
    hits: "∞",
    hasNext: data.after !== null,
    session: {
      after: data.after,
    },
  };
}

export default {
  name: "Reddit",
  handleSearch,
};
