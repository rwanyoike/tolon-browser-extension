# Tolon Browser Extension

[![Travis (.org)](https://img.shields.io/travis/rwanyoike/tolon)](https://travis-ci.org/rwanyoike/tolon)
[![GitHub](https://img.shields.io/github/license/rwanyoike/tolon)](LICENSE)
[![Mozilla Add-on](https://img.shields.io/amo/v/tolon)](https://addons.mozilla.org/en-US/firefox/addon/tolon/)

> Find page related website discussions. On Hacker News and Reddit.

Tolon is a browser extension to help you find discussions around the pages you're looking at on the web.

![_](https://i.imgur.com/DhGBI6x.png)

While viewing a webpage, invoking Tolon will query the page URL against its _sources_ and present a list of results to discussion threads.

Available sources:

- [Hacker News](https://news.ycombinator.com/) (social news)
- [Reddit](https://old.reddit.com/) (social news)

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
- To query the page URL.

### Chromium

You can install the latest version [manually](https://github.com/rwanyoike/tolon/releases). It's expected that Tolon is compatible with any Chromium-based browsers.

### Firefox

[![Mozilla Add-on](https://img.shields.io/amo/v/tolon)](https://addons.mozilla.org/en-US/firefox/addon/tolon/)

[Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tolon/) web site.

## Workflow

```shell
git clone https://github.com/rwanyoike/tolon
cd tolon
yarn install
NODE_ENV=production yarn run build
```

Find the compiled browser extension under `dist/`.

## Other Similar Extensions

- [Discussed Elsewhere](https://github.com/jsuar/discussed-elsewhere)
- [Newsit](https://github.com/benwinding/newsit)

## Attribution

- Icon by [Asier Bilbo](https://thenounproject.com/asierbilbo) from the [Noun Project](https://thenounproject.com).
