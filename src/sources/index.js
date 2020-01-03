import sample from "./sample-site";

const ACTIVE_SOURCES = [sample];

const sources = {};
for (let idx = 0; idx < ACTIVE_SOURCES.length; idx += 1) {
  sources[ACTIVE_SOURCES[idx].name] = ACTIVE_SOURCES[idx];
}

export default sources;
