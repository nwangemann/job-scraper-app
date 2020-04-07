const cheerio = require("cheerio");
const Nightmare = require("nightmare");
const fs = require('fs');

module.exports = {
    usajobsScrape: async (title, location) => {
      let nightmare = Nightmare({ show: true });
  
      let getData = html => {
      let data = [];
        const $ = cheerio.load(html);
        $("div.usajobs-search-result--core").each((row, raw_element) => {
          let title = $(raw_element).find("a.usajobs-search-result--core__title").text();
          let link = $(raw_element).find("a.search-joa-link").attr('href');
          let company = $(raw_element).find("h4.usajobs-search-result--core__agency").text();
          let location = $(raw_element).find("span.usajobs-search-result--core__location-link").text();
          let description = $(raw_element).find("li.usajobs-search-result--core__item").text();
          let date = $(raw_element).find("p.usajobs-search-result--core__closing-date").text();
  
        //   console.log('data', title)
          if (title) {
            data.push({
              title: title,
              link: link,
              company: company,
              location: location,
              description: description,
              date: date,
              website: 'usajobs'
            });
          }
        });
        return data;
      };
      let final = await nightmare
        // .goto(`https://www.usajobs.gov/Search?jt=${title}&l=${location}`) 
        .goto(`https://www.usajobs.gov/Search/?l=${location}&p=1&k=${title}`) 
        .wait('body')
        .evaluate(() => document.querySelector("body").innerHTML)
        .end()
        .then(async response => {
            // console.log('response', response)
          let result = await getData(response);
            console.log('usajobs', result)
          let dataStep = JSON.stringify(result, null, 2)
          fs.writeFileSync('usajobs_scraped_data.json', dataStep);
        })
        .catch(err => {
          console.log(err);
        });
    
      nightmare.end();
  
    }
  };
  