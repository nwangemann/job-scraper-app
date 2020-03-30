const cheerio = require('cheerio');
const request = require('request-promise');
const Nightmare = require('nightmare');


const nightmare = Nightmare({ show: true })
const url = 'https://www.indeed.com'

nightmare
    .goto(url)
    .wait('body')
    .click('input#text-input-what')
    .type('input#text-input-what', 'Web Developer')
    .click('input#text-input-where')
    .type('input#text-input-where', '')
    .click('button.icl-WhatWhere-button')
    .wait('div.jobsearch-SerpJobCard')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then(response => {
        console.log(getData(response));
    }).catch(err => {
        console.log(err);
    })

let getData = html => {
    data = [];
    const $ = cheerio.load(html)
    $('div.jobsearch-SerpJobCard').each((row, raw_element) => {
        let title = $(raw_element).find('div.title a').attr('title');
        let link = $(raw_element).find('div.title a').attr('href')
        let company = $(raw_element).find('div.sjcl div span.company').text();
        let location = $(raw_element).find('div.sjcl div.recJobLoc').attr('data-rc-loc')
        let description = $(raw_element).find('div.summary ul li').text()
        let date =$(raw_element).find('span.date').text()



        if(title) {
            data.push({
                title: title,
                link: link,
                company: company,
                location: location,
                description: description,
                date: date

            })
        }
    })
    console.log('data', data)
    return data
}
