// Dependencies
const MasterParser = require('./MasterParser.js');

// Main Process
(async () => {
  
  const mp = new MasterParser();

  console.log("Scraping Pokemon Go Master data file...");
  await mp.init();

  console.log("Saving data...");
  mp.save(`${process.cwd()}/src/db/`);

  process.exit();

})();
