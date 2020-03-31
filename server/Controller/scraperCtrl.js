const {indeedScrape} = require('../scrapers/indeedScraper')
const {diceScrape} = require('../scrapers/diceScraper')
const fs = require('fs');

module.exports = {
    searchIndeed: async (req, res, next) => {
        const { title, location } = req.body
        let result = await indeedScrape(title, location)
        let rawdata = fs.readFileSync('indeed_scraped_data.json');
        let dataObj = JSON.parse(rawdata);
        res.status(200).send(dataObj)
    },
    searchDice:  async (req, res, next) => {
        const { title, location } = req.body
        let result = await diceScrape(title, location)
        let rawdata = fs.readFileSync('dice_scraped_data.json');
        let dataObj = JSON.parse(rawdata);
        res.status(200).send(dataObj)
    }
}