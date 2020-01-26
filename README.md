# Tolon Browser Extension

[![Travis (.org)](https://img.shields.io/travis/rwanyoike/tolon)](https://travis-ci.org/rwanyoike/tolon)
[![GitHub](https://img.shields.io/github/license/rwanyoike/tolon)](LICENSE)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/mohaijbbfgjjjjbhffgaifcnookdihmk)](https://chrome.google.com/webstore/detail/tolon/mohaijbbfgjjjjbhffgaifcnookdihmk)
[![Mozilla Add-on](https://img.shields.io/amo/v/tolon)](https://addons.mozilla.org/en-US/firefox/addon/tolon/)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> Find page related website discussions. On Hacker News and Reddit.

Tolon is a browser extension to help you find discussions around the pages you're looking at on the web.

![_](https://i.imgur.com/cWbFOKD.png)

While viewing a webpage, invoking Tolon will have it _query the page URL_ and present a list of results to discussion threads.

Available sources:

- [Hacker News](https://news.ycombinator.com/) (social news)
- [Reddit](https://www.reddit.com/) (social news)

## Installation

Tolon is mostly JavaScript plus a little CSS. There are no trackers. No data is sent (aside from the URL query) or shared. All of the code can be inspected here on GitHub.

These are Tolon's permissions:

```json
"permissions": [
  "activeTab",
  "storage"
]
```

[activeTab](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions#activeTab_permission):

This is necessary to be able to:

- To find out which tab is currently active.
- To query the page URL.

storage:

This is used to persist extension's settings.

### Chromium

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/mohaijbbfgjjjjbhffgaifcnookdihmk)](https://chrome.google.com/webstore/detail/tolon/mohaijbbfgjjjjbhffgaifcnookdihmk)

You can install the latest version [manually](https://github.com/rwanyoike/tolon/releases), or from the [Chrome Web Store](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm). It's expected that Tolon is compatible with any Chromium-based browsers.

### Firefox

[![Mozilla Add-on](https://img.shields.io/amo/v/tolon)](https://addons.mozilla.org/en-US/firefox/addon/tolon/)

[Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tolon/) web site.

## Workflow

```shell
$ git clone https://github.com/rwanyoike/tolon
$ cd tolon
$ npm install
$ NODE_ENV=development npm run build
```

Find the compiled browser extension under `dist/`.

## Other Similar Extensions

- [Discussed Elsewhere](https://github.com/jsuar/discussed-elsewhere)
- [Newsit](https://github.com/benwinding/newsit)

## Attribution

- Icon by [Asier Bilbo](https://thenounproject.com/asierbilbo) from the [Noun Project](https://thenounproject.com).
