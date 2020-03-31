const cheerio = require('cheerio');
const request = require('request-promise');
const Nightmare = require('nightmare');


const nightmare = Nightmare({ show: true })
const url = 'https://www.indeed.com'
// let theData = []


module.exports = {
    runThatIsh: async (title, location) => {
        
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

        let theData = []

        let yoData = await nightmare
        .goto(url)
        .wait('body')
        .click('input#text-input-what')
        .type('input#text-input-what', `${title}`)
        .click('input#text-input-where')
        .type('input#text-input-where', '')
        .click('button.icl-WhatWhere-button')
        .wait('div.jobsearch-SerpJobCard')
        .evaluate(() => document.querySelector('body').innerHTML)
        .end()
        .then(async response => {
            let result = await getData(response)
            theData.push(result)
            console.log('theData', theData);
            return theData
        }).catch(err => {
            console.log(err);
        })
    

    console.log('yoData right before return', yoData);
    return yoData
    }
}