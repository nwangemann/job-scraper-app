const cheerio = require("cheerio");
const Nightmare = require("nightmare");
const fs = require('fs');

module.exports = {
    zrScrape: async (title, location) => {
        let nightmare = Nightmare({ show: false })

        let getData = html => {
            data = [];
            const $ = cheerio.load(html);
            $("div.job_content").each((row, raw_element) => {
            let title = $(raw_element).find("span.just_job_title").text();
            let link = $(raw_element).find("a.t_job_link").attr("href");
            let company = $(raw_element).find("a.t_org_link").text();
            let location = $(raw_element).find("a.t_location_link").text();
            let description = $(raw_element).find("p.job_snippit a b").text();
            if (title) {
                data.push({
                  title: title,
                  link: link,
                  company: company,
                  location: location,
                  description: description
                  
                });
              }
            });
            return data;
        };
        let final = await nightmare
        .goto(`https://www.ziprecruiter.com/candidate/search?form=jobs-landing&search=${title}&location=${location}`)
        .wait('body')
        .evaluate(() => document.querySelector("body").innerHTML)
        .end()
        .then(async response => {
          let result = await getData(response);
          console.log('result', result)
          let dataStep = JSON.stringify(result, null, 2)
          fs.writeFileSync('zr_scraped_data.json', dataStep);
        })
        .catch(err => {
          console.log(err);
        });
    
      nightmare.end();
    }
}