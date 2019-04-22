// +-Refer to this:------------------------------------------+
// | https://pokemongo.gamepress.gg/legacy-pokemon-move-list |
// +---------------------------------------------------------+

// Dependencies
const puppeteer = require('puppeteer');

// Params
const url = "https://pokemongo.gamepress.gg/legacy-pokemon-move-list";
const sel = "#sort-table > tbody";

// Main Process
module.exports = async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const result = await page.$eval(sel, tbody => {
    const getMoves = td => {
      if (td.textContent == "-- ") return [];
      return [...td.children[0].children[0].children]
        .map(li => li.textContent.toUpperCase().replace(/\s/g, "_"));
    };
    return [...tbody.children]
      .map(tr => {
        const num = tr.children[0].children[0].href.split("/").pop();
        const moves = [
          ...getMoves(tr.children[1]).map(m => [m, "fast"]),
          ...getMoves(tr.children[2]).map(m => [m, "charge"])
        ];
        return {num, moves};
      })
      .reduce((acc, {num, moves}) => {
        acc[num] = moves;
        return acc;
      }, {});
  });

  return result;

};
