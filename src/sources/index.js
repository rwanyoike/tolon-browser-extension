import hackerNews from "./hacker-news";
import reddit from "./reddit";
// import sampleSite from "./sample-site";

const ACTIVE_SOURCES = [
  hackerNews,
  reddit,
  // sampleSite,
];

const sources = {};
for (let idx = 0; idx < ACTIVE_SOURCES.length; idx += 1) {
  sources[ACTIVE_SOURCES[idx].name] = ACTIVE_SOURCES[idx];
}

export default sources;
