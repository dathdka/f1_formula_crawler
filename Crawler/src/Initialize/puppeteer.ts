import puppeteer, { Browser } from "puppeteer";

const puppeteerBrowserOption = {
  headless: true,
  defaultViewport: null,
  executablePath: "/usr/bin/google-chrome",
  args: ["--no-sandbox"],
};

export const startBrowser = async () => {
  let browser: Browser = await puppeteer.launch(puppeteerBrowserOption);
  return browser;
};
