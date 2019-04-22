// Dependencies
const MasterParser = require('./MasterParser.js');

// Helpers
const now = () => (new Date()).valueOf();

// Main Process
(async () => {

  const mp = new MasterParser();
  const beg = now();

  console.log("Scraping Pokemon Go Master data file...");
  await mp.init();

  console.log("Saving data...");
  mp.save(`${process.cwd()}/src/db/`);
  
  const elapsed = (now() - beg) / 1000;
  console.log(`Scrapeage took ${elapsed}s`);
  process.exit();

})();
