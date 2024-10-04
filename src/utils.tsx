import browser from "webextension-polyfill";

export const getBrowserTabUrl = async () => {
  const queryInfo = { active: true, currentWindow: true };
  const tabs = await browser.tabs.query(queryInfo);
  // See: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns
  const urlPattern = /(http|https):\/\//;
  if (tabs.length && tabs[0].url !== undefined) {
    if (urlPattern.test(tabs[0].url)) {
      // Don't include the URL scheme or hash. They filter-out results. This
      // will also affect hash-navigated webpage results (FIXME!).
      const url = new URL(tabs[0].url);
      return `${url.host}${url.pathname}${url.search}`;
    }
  }
  return null;
};
