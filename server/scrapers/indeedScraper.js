const cheerio = require("cheerio");
const request = require("request-promise");
const Nightmare = require("nightmare");

const nightmare = Nightmare({ show: true });
const url = "https://www.indeed.com";

nightmare
  .goto(url)
  .wait("body")
  .click("input#text-input-what")
  .type("input#text-input-what", "Web Developer")
  .click("input#text-input-where")
  .type("input#text-input-where", "")
  .click("button.icl-WhatWhere-button")
  .wait("div.jobsearch-SerpJobCard")
  .evaluate(() => document.querySelector("body").innerHTML)
  .end()
  .then(response => {
    console.log(getData(response));
  })
  .catch(err => {
    console.log(err);
  });

let getData = html => {
    data = [];
    const $ = cheerio.load(html)
    $('div.jobsearch-SerpJobCard').each((row, raw_element) => {
        let title = $(raw_element).find('div.title a').attr('title');
        let link = $(raw_element).find('div.title a').attr('href')
        let company = $(raw_element).find('div.sjcl div span.company').text();
        let location = $(raw_element).find('div.sjcl div.recJobLoc').attr('data-rc-loc')
        let description = $(raw_element).find('div.summary ul li').text()
        let date = $(raw_element).find('span.date').text()

const Nightmare = require("nightmare");
const fs = require('fs');


module.exports = {
  indeedScrape: async (title, location) => {
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
            date: date,
            website: 'Indeed'
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
        fs.writeFileSync('indeed_scraped_data.json', dataStep);
      })
      .catch(err => {
        console.log(err);
      });
  
    nightmare.end();

  }
};

        if(title) {
            data.push({
                title: title,
                link: 'https://www.indeed.com' + link,
                company: company,
                location: location,
                description: description,
                date: date

            })
        }
    })
    return data
}

module.exports = {
    theData: theData
}

