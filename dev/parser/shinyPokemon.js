// +-Refer to this:-----------------------------------------+
// | https://pokemongo.gamepress.gg/pokemon-go-shinies-list |
// +--------------------------------------------------------+

// Dependencies
const puppeteer = require('puppeteer');

// Params
const url = "https://pokemongo.gamepress.gg/pokemon-go-shinies-list";
const sel = "#sort-table > tbody";

// Main Process
module.exports = async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const result = await page.$eval(sel, tbody => {
    return [...tbody.children]
      .map(tr => tr.children[0].children[0].href.split("/").pop());
  });

  return result;

};
