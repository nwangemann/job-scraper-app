const theData = require('../scrapers/indeedScraper')
const {runScrape} = require('../scrapers/indeedScraper')
const fs = require('fs');



module.exports = {
    sendScrape: (req, res, next) => {
        res.status(200).send(theData)
    },
    searchScrape: async (req, res, next) => {
        const { title, location } = req.body
        let result = await runScrape(title, location)
        let rawdata = fs.readFileSync('scraped_data.json');
        let dataObj = JSON.parse(rawdata);
        console.log('dataObj', dataObj)
        res.status(200).send(dataObj)
    }
}