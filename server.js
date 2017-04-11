'use strict';

const xRay = require('x-ray');
// const request = require('request');
const fs = require('fs');
const crawler = new require("js-crawler");

const xray = new xRay();

let urlToScrape = 'https://www.morele.net/procesor-intel-core-i7-6800k-3-4ghz-15-mb-box-bx80671i76800k-774253/';

function scrape(url){
  xray(url, 'body#catalog_product',
    [{
      name: 'h1.page-title',
      images: ['div.owl-carousel a@href'],
      price: 'div#product_price_brutto@content'
      // specs: xray('div.technical-specification', [{
      //   specName: 'div.table-info-inner.name',
      //   specData: 'div.table-info-inner.'
      // }])
    }])
    // (function(err, obj) {
    //   if (err) console.log(err);
    //   console.log(obj);
    // })
    .write('results.json');
}

// var wat = scrape(urlToScrape);

new crawler()
  .configure({
    depth: 3,
    maxConcurrentRequests: 3
  }).crawl("https://www.morele.net/", function onSuccess(page) {
    scrape(page.url);
  });
