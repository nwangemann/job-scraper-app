const cheerio = require("cheerio");
const Nightmare = require("nightmare");
const fs = require('fs');

module.exports = {
  diceScrape: async (title, location) => {
    let nightmare = Nightmare({ show: true });

    let getData = html => {
      data = [];
      const $ = cheerio.load(html);
      $("div.search-card").each((row, raw_element) => {
        let title = $(raw_element).find("a.card-title-link").text();
        let link = $(raw_element).find("a.card-title-link").attr('href');
        let company = $(raw_element).find("div.ng-star-inserted").text();
        let location = $(raw_element).find("div.card-company span").text();
        let description = $(raw_element).find("div.card-description").text();
        let date = $(raw_element).find("span.posted-date").text();

        if (title) {
          data.push({
            title: title,
            link: link,
            company: company,
            location: location,
            description: description,
            date: date,
            website: 'Dice'
          });
        }
      });
      return data;
    };
    let final = await nightmare
      .goto(`https://www.dice.com/jobs?q=${title}&location=${location}`)
      .wait('body')
      .evaluate(() => document.querySelector("body").innerHTML)
      .end()
      .then(async response => {
        let result = await getData(response);
        console.log('result', result)
        let dataStep = JSON.stringify(result, null, 2)
        fs.writeFileSync('dice_scraped_data.json', dataStep);
      })
      .catch(err => {
        console.log(err);
      });
  
    nightmare.end();

  }
};

