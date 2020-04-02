const cheerio = require("cheerio");
const Nightmare = require("nightmare");
const fs = require('fs');

module.exports = {
    glassDoorScrape: async (title, location) => {
      let nightmare = Nightmare({ show: true });
  
      let getData = html => {
        data = [];
        const $ = cheerio.load(html);
        $("li.jl").each((row, raw_element) => {
          let title = $(raw_element).find("a.jobTitle").text();
          let link = $(raw_element).find("a.jobLink").attr('href');
          let company = $(raw_element).find("div.jobEmpolyerName").text();
          let location = $(raw_element).find("span.loc").text();
          let description = $(raw_element).find("span.salaryText").text();
          let date = $(raw_element).find("span.minor").text();
  
          if (title) {
            data.push({
              title: title,
              link: link,
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
        .goto(`https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${title}&locT=C&locId=1133904&locKeyword=${location}&srs=RECENT_SEARCHES`)
        .wait('body')
        .evaluate(() => document.querySelector("body").innerHTML)
        .end()
        .then(async response => {
            // console.log('response', response)
          let result = await getData(response);
          console.log('glassdoor', result)
          let dataStep = JSON.stringify(result, null, 2)
          fs.writeFileSync('glassdoor_scraped_data.json', dataStep);
        })
        .catch(err => {
          console.log(err);
        });
    
      nightmare.end();
  
    }
  };
  