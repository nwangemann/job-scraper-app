const theData = require('../scrapers/indeedScraper')
const {runThatIsh} = require('../scrapers/indeedScraper')

module.exports = {
    sendScrape: (req, res, next) => {
        res.status(200).send(theData)
    },
    searchScrape: async (req, res, next) => {
        const { title, location } = req.body
        let result = await runThatIsh(title, location)
        res.status(200).send(result)
    }
}