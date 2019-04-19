// +-Refer to this:------------------------------------------+
// | https://pokemongo.gamepress.gg/legacy-pokemon-move-list |
// +---------------------------------------------------------+

// Dependencies
const cheerio = require('cheerio'),
      fetch = require('node-fetch');

// Main Process
module.exports = async () => {

  const url = "https://pokemongo.gamepress.gg/legacy-pokemon-move-list";
  const req = await fetch(url);
  const html_doc = await req.text();
  const $ = cheerio.load(html_doc);
  console.log($);

};
