const cheerio = require("cheerio");
const Nightmare = require("nightmare");
const fs = require('fs');

module.exports = {
  linkedinScrape: async (title, location) => {
    let nightmare = Nightmare({ show: false });

    let getData = html => {
      data = [];
      const $ = cheerio.load(html);
      $("li.job-result-card").each((row, raw_element) => {
        let title = $(raw_element).find("h3.result-card__title").text();
        let link = $(raw_element).find("a.result-card__full-card-link").attr('href');
        let company = $(raw_element).find("a.result-card__subtitle-link").text();
        let location = $(raw_element).find("span.job-result-card__location").text();
        let description = $(raw_element).find("p.job-result-card__snippet").text();
        let date = $(raw_element).find("time.job-result-card__listdate--new").text();
        let logo = $(raw_element).find("img.result-card__image").attr('src')

        if (title) {
          data.push({
            title: title,
            link: link,
            company: company,
            location: location,
            description: description,
            date: date,
            logo: logo
          });
        }
      });
      return data;
    };
    let final = await nightmare
      .goto(`https://www.linkedin.com/jobs/search?keywords=${title}&location=${location}&trk=homepage-basic_jobs-search-bar_search-submit&redirect=false&position=1&pageNum=0`)
      .wait('body')
      .evaluate(() => document.querySelector("body").innerHTML)
      .end()
      .then(async response => {
        //   console.log('response', response)
        let result = await getData(response);
        console.log('result', result)
        let dataStep = JSON.stringify(result, null, 2)
        fs.writeFileSync('linkedin_scraped_data.json', dataStep);
      })
      .catch(err => {
        console.log(err);
      });
  
    nightmare.end();

  }
};

