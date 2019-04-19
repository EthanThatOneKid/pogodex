// Dependencies
// const MasterParser = require('./MasterParser.js');
const legacyMoves = require('./legacyMoves.js');

// Main Process
(async () => {

  await legacyMoves();

  // const mp = new MasterParser();
  //
  // console.log("Scraping Pokemon Go Master data file...");
  // await mp.init();
  //
  // console.log("Saving data...");
  // mp.save(`${process.cwd()}/src/db/`);

  console.log("All done!!!")
  process.exit();

})();
