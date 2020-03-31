const cheerio = require("cheerio");
const Nightmare = require("nightmare");
const fs = require('fs');


module.exports = {
  runScrape: async (title, location) => {
    let nightmare = Nightmare({ show: false });

    let getData = html => {
      data = [];
      const $ = cheerio.load(html);
      $("div.jobsearch-SerpJobCard").each((row, raw_element) => {
        let title = $(raw_element).find("div.title a").attr("title");
        let link = $(raw_element).find("div.title a").attr("href");
        let company = $(raw_element).find("div.sjcl div span.company").text();
        let location = $(raw_element).find("div.sjcl div.recJobLoc").attr("data-rc-loc");
        let description = $(raw_element).find("div.summary ul li").text();
        let date = $(raw_element).find("span.date").text();

        if (title) {
          data.push({
            title: title,
            link: "https://www.indeed.com" + link,
            company: company,
            location: location,
            description: description,
            date: date
          });
        }
      });
      return data;
    };
    let final = await nightmare
      .goto(`https://www.indeed.com/jobs?q=${title}&l=${location}`)
      .wait('body')
      .wait("div.jobsearch-SerpJobCard")
      .evaluate(() => document.querySelector("body").innerHTML)
      .end()
      .then(async response => {
        let result = await getData(response);
        let dataStep = JSON.stringify(result, null, 2)
        fs.writeFileSync('scraped_data.json', dataStep);
      })
      .catch(err => {
        console.log(err);
      });
  
    nightmare.end();

  }
};

