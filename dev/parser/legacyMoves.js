// +-Refer to this:------------------------------------------+
// | https://pokemongo.gamepress.gg/legacy-pokemon-move-list |
// +---------------------------------------------------------+

// Dependencies
const cheerio = require('cheerio'),
      fetch = require('node-fetch');

// Helpers
const numScraper = el => Number(el.attribs.href.split("/").pop());

// Params
const url = "https://pokemongo.gamepress.gg/legacy-pokemon-move-list";
const sels = {
  "num": "#sort-table > tbody > tr > td.views-field.views-field-field-pokemon-image.views-align-center.views-field-title > a",
  "fast": "#sort-table > tbody > tr > td.views-field.views-field-field-legacy-quick-moves.views-align-left.views-field-field-exclusive-quick-moves > div > ul",
  "charge": "#sort-table > tbody > tr > td.views-field.views-field-field-legacy-charge-moves.views-align-left.views-field-field-exclusive-charge-moves > div > ul"
};

// Main Process
module.exports = async () => {

  const req = await fetch(url);
  const html_doc = await req.text();
  const $ = cheerio.load(html_doc);

  const result = $(sels.num)
    .get()
    .filter((el, i) => i % 2 == 1)
    .map(numScraper)
    .reduce((acc, cur) => {
      acc[cur] = {"fast": [], "charge": []};
      return acc;
    }, {});

  const fastMoves = $(sels.fast)
    .get()
    .map(i => $(i).text());

  //const rows = $(sels[0]).length;//[];
  // $(sel).each(() => {
  //   const data = $(this);
  //   rows.push(data)
  // });

  console.log(fastMoves)

};
