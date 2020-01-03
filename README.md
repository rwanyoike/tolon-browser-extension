# Tolon Browser Extension

[![Travis (.org)](https://img.shields.io/travis/rwanyoike/tolon)](https://travis-ci.org/rwanyoike/time2relax)
[![GitHub](https://img.shields.io/github/license/rwanyoike/tolon)](LICENSE)

> Find page related website discussions.

Tolon is a browser extension to help you find discussions around the pages you're looking at on the web.

![_](https://i.imgur.com/FjN0r75.png)

While viewing a webpage, invoking Tolon will query the page url against its _sources_ and present a list of paginated results to discussion threads.

Available sources:

- [Hacker News](https://news.ycombinator.com/) (social news)

## Installation

These are Tolon's required permissions:

```json
"permissions": [
  "activeTab"
]
```

[activeTab](https://browserext.github.io/browserext/#active-tab):

This is necessary to be able to:

- To find out which tab is currently active.
- To query the page url.

### Chromium

You can install the latest version [manually](https://github.com/rwanyoike/tolon/releases). It's expected that Tolon is compatible with any Chromium-based browsers.

## Workflow

```shell
git clone https://github.com/rwanyoike/tolon
cd tolon
yarn install
NODE_ENV=development yarn run build
```

Find the compiled browser extension under `dist/`.

## Attribution

- Icon by [Asier Bilbo](https://thenounproject.com/asierbilbo) from the [Noun Project](https://thenounproject.com).
