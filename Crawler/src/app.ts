const initializeKnex = require('./initialize/knex')
import { startCrawl } from "./Scraping"

const app = async () => {
    initializeKnex();
    await startCrawl();
}

app()
