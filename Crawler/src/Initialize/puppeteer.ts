import puppeteer, { Browser } from "puppeteer";

const puppeteerBrowserOption = {
  headless: false,
  defaultViewport: null,
};

export const startBrowser = async () => {
  let browser: Browser = await puppeteer.launch(puppeteerBrowserOption);
  return browser;
};
