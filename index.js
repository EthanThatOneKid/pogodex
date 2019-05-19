// Dependencies
const express = require('express');
const path = require('path');

// Globals
const port = process.env.PORT || 80;

// Main Process
(() => {

  const app = express();
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  app.listen(port);
  console.log(`Listening on port ${port}...`);

})();
