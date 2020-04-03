const {indeedScrape} = require('../scrapers/indeedScraper')
const {diceScrape} = require('../scrapers/diceScraper')
const {zrScrape} = require('../scrapers/zrScraper')
const {glassDoorScrape} = require('../scrapers/glassdoorScraper')
const {linkedinScrape} = require('../scrapers/linkedinScraper')

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
    },
    searchZr: async (req, res, next) => {
        const {title, location} = req.body
        let result = await zrScrape(title, location)
        let rawdata = fs.readFileSync('zr_scraped_data.json');
        let dataObj = JSON.parse(rawdata);
        res.status(200).send(dataObj);
    },
    searchGlassdoor: async (req, res, next) => {
        const {title, location} = req.body
        let result = await glassDoorScrape(title, location)
        let rawdata = fs.readFileSync('glassdoor_scraped_data.json');
        let dataObj = JSON.parse(rawdata);
        res.status(200).send(dataObj);
    },
    searchLinkedin: async (req, res, next) => {
        const {title, location} = req.body
        let result = await linkedinScrape(title, location)
        let rawdata = fs.readFileSync('linkedin_scraped_data.json');
        let dataObj = JSON.parse(rawdata);
        res.status(200).send(dataObj);
    }
}