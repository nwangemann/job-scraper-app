const cheerio = require("cheerio");
const Nightmare = require("nightmare");
const url = "https://www.indeed.com";
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

    //this is currently an async-await function. It's much quicker as a normal function (only seems to work well that way if the nightmare object on line 10 is set to Nightmare({show: false}) so if this is changed from an await to a normal function, that should be changed at the same time)

    nightmare
      .goto(url)
      .wait("body")
      .click("input#text-input-what")
      .type("input#text-input-what", `${title}`)
      .click("input#text-input-where")
      .type("input#text-input-where", ``)
      .click("button.icl-WhatWhere-button")
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

