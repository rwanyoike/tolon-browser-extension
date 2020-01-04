import hackerNews from "./hacker-news";
import reddit from "./reddit";

const ACTIVE_SOURCES = [hackerNews, reddit];

const sources = {};
for (let idx = 0; idx < ACTIVE_SOURCES.length; idx += 1) {
  sources[ACTIVE_SOURCES[idx].name] = ACTIVE_SOURCES[idx];
}

export default sources;
