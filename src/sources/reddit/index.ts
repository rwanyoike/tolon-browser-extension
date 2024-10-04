import { formatDistanceToNowStrict } from "date-fns";
import ky from "ky";

import type * as ty from "../../types";
import theme from "./index.css";

const SOURCE_URL = "https://www.reddit.com";
const SEARCH_URL = SOURCE_URL;

type Response = {
  data: {
    children: {
      data: {
        id: string;
        created_utc: number;
        title: string;
        permalink: string;
        url: string;
        score: string;
        num_comments: string;
        author: string;
        subreddit_name_prefixed: string;
      };
    }[];
    after: string;
  };
};

const handleSearch = async (
  url: string,
  session: ty.Session,
): Promise<ty.Results> => {
  // Ref: https://www.reddit.com/wiki/search
  const params = new URLSearchParams();
  params.set("q", `url:"${url}" self:no`);
  params.set("sort", "top");
  params.set("t", "all");
  params.set("limit", "20");
  // If set, we want the next page
  if ({}.hasOwnProperty.call(session, "after")) {
    const nextPage = session.after.toString();
    params.set("after", nextPage);
  }

  const getOptions = {
    searchParams: params,
    retry: 1,
    timeout: 10000 /* 10s */,
  };
  const response: Response = await ky
    .get(`${SEARCH_URL}/search.json`, getOptions)
    .json();

  const results = [];
  const data = response.data;
  for (let idx = 0; idx < data.children.length; idx += 1) {
    const result = data.children[idx].data;
    const created = new Date(result.created_utc * 1000);
    const distanceToNow = formatDistanceToNowStrict(created, {
      addSuffix: true,
    });
    results.push({
      id: result.id,
      thread: {
        title: result.title,
        url: `${SOURCE_URL}${result.permalink}`,
      },
      url: result.url,
      meta: [
        {
          item: "points",
          text: `${result.score.toLocaleString()} points`,
        },
        {
          item: "comments",
          text: `${result.num_comments.toLocaleString()} comments`,
          url: `${SOURCE_URL}${result.permalink}`,
        },
        {
          item: "created",
          text: `submitted ${distanceToNow}`,
          title: created.toISOString(),
        },
        {
          item: "author",
          text: `by ${result.author}`,
          url: `${SOURCE_URL}/user/${result.author}`,
        },
        {
          item: "subreddit",
          text: `to ${result.subreddit_name_prefixed}`,
          url: `${SOURCE_URL}/${result.subreddit_name_prefixed}`,
        },
      ],
    });
  }

  return {
    results: results,
    searchHits: "∞",
    hasNext: data.after !== null,
    session: {
      after: data.after,
    },
  };
};

export default {
  name: "Reddit",
  handleSearch: handleSearch,
  theme: theme,
} satisfies ty.Source;
