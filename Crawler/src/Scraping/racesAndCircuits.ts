import { Page } from "puppeteer";
import { Circuit } from "../types/Circuit";
import { Race } from "../types/Race";
import { formatDate } from "../Utils/formatDate";
import { createNew as createNewRace } from "../Service/races";
import { createNew as createNewCircuit } from "../Service/circuits";
const CRAWL_SELECTOR = require("../constants").CRAWL;

const storeRacesAndCircuits = async (race: Race, circuit: Circuit) => {
  const newCircuit = (await createNewCircuit(circuit)) as Circuit;
  race.date = formatDate(race.date);
  race.races_info = newCircuit.id;
  return await createNewRace(race);
};


export const getRacesAndCircuits = async (
  seasonURL: string,
  page: Page
) => {
  await page.goto(seasonURL);
  await page.waitForSelector(CRAWL_SELECTOR.RACE_URLS);
  const raceUrls = await page.$$eval(CRAWL_SELECTOR.RACE_URLS, (races) => {
    races.shift();
    return races.map((race) => {
      return { link: race.href, location: race.textContent.trim() };
    });
  });
  for (let raceUrl of raceUrls) {
    await page.goto(raceUrl.link);
    await page.waitForSelector(CRAWL_SELECTOR.RACE_DATE);
    let circuit: Circuit = {
      location: raceUrl.location,
      name: await page.$eval(
        CRAWL_SELECTOR.CIRCUIT_NAME,
        (circuitName) => circuitName.textContent.split(",")[0]
      ),
    };
    let race: Race = await page.$eval(CRAWL_SELECTOR.RACE_DATE, (raceDate) => {
      return { date: raceDate.textContent };
    });
    const newRace = await storeRacesAndCircuits(race, circuit) as Race;
  }
};
