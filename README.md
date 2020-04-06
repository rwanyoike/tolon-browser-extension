# Tolon (토론) Browser Extension

[![Travis (.org)](https://img.shields.io/travis/rwanyoike/tolon)](https://travis-ci.org/rwanyoike/tolon)
[![GitHub](https://img.shields.io/github/license/rwanyoike/tolon)](LICENSE)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/mohaijbbfgjjjjbhffgaifcnookdihmk)](https://chrome.google.com/webstore/detail/tolon/mohaijbbfgjjjjbhffgaifcnookdihmk)
[![Mozilla Add-on](https://img.shields.io/amo/v/tolon)](https://addons.mozilla.org/en-US/firefox/addon/tolon/)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> Find webpage discussions on Hacker News and Reddit.

Tolon is a browser extension that helps you find discussions around the pages you're looking at on the web. It works by searching [available sources](#usage) for URL submissions.

[Installation](#installation) | [Usage](#usage) | [Attribution](#attribution) | [Contributing](#contributing) | [License](#license) | [Similar Extensions](#similar-extensions)

| ![_](https://i.imgur.com/syASQfx.png) | ![_](https://i.imgur.com/06lpJWv.png) |
| ------------------------------------- | ------------------------------------- |
| ![_](https://i.imgur.com/y0Z85pE.png) | ![_](https://i.imgur.com/vNioIDh.png) |

## Installation

These are the extension's permissions:

```json
"permissions": [
  "activeTab",
  "storage"
]
```

**activeTab**:

This is necessary to be able to:

- Find out which tab is currently active.
- Query the webpage URL.

**storage**:

- Used to persist the extension settings.

### Chromium

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/mohaijbbfgjjjjbhffgaifcnookdihmk)](https://chrome.google.com/webstore/detail/tolon/mohaijbbfgjjjjbhffgaifcnookdihmk)

You can install the latest version [manually](https://github.com/rwanyoike/tolon/releases), or from the [Chrome Web Store](https://chrome.google.com/webstore/detail/tolon/mohaijbbfgjjjjbhffgaifcnookdihmk). It's expected that the extension is compatible with any Chromium-based browsers.

### Firefox

[![Mozilla Add-on](https://img.shields.io/amo/v/tolon)](https://addons.mozilla.org/en-US/firefox/addon/tolon/)

You can install the latest version from the [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tolon/) web site.

### npm Build

```shell
git clone https://github.com/rwanyoike/tolon
cd tolon
npm install
echo NODE_ENV=production | tee .env
npm run build
```

Find the compiled browser extension under `dist/`.

## Usage

While viewing a webpage, opening the extension will search available sources for URL submissions (discussion threads) and present a list of results.

Available sources:

- [Hacker News](https://news.ycombinator.com/) (social news)
- [Reddit](https://www.reddit.com/) (social news)
- [Sample Site](src/sources/sample-site/index.jsx) (template)

## Attribution

- Icon by [Asier Bilbo](https://thenounproject.com/asierbilbo) from [Noun Project](https://thenounproject.com).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [MIT License](./LICENSE).

## Similar Extensions

- [Discussed Elsewhere](https://github.com/jsuar/discussed-elsewhere)
- [Newsit](https://github.com/benwinding/newsit)
