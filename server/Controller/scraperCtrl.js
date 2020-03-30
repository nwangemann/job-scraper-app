const theData = require('../scrapers/indeedScraper')

module.exports = {
    sendScrape: (req, res, next) => {
        res.status(200).send(theData)
    }
}