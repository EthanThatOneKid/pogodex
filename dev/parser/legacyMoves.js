// +-Refer to this:------------------------------------------+
// | https://pokemongo.gamepress.gg/legacy-pokemon-move-list |
// +---------------------------------------------------------+

// Dependencies
const cheerio = require('cheerio'),
      fetch = require('node-fetch');

// Params
const url = "https://pokemongo.gamepress.gg/legacy-pokemon-move-list";
const sel = "#sort-table > tbody";

// Main Process
module.exports = async () => {

  const req = await fetch(url);
  const html_doc = await req.text();
  const $ = cheerio.load(html_doc);

  const rows = $(sel).children().get().length;

  console.log(rows)

};
