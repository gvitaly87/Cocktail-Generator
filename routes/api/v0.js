const express = require('express');

const router = express.Router();

const galleryJSON = require('../../data/images.json');
// Export as a function so we can pass it args
module.exports = () => {
  router.get('/', (req, res) => {
    // render calls the view engine
    // looks for the page at the path, passes variable pageTitle
    res.json(galleryJSON);
  });
  router.get('/:version', (req, res) => {
    // render calls the view engine
    // looks for the page at the path, passes variable pageTitle
    res.json(galleryJSON);
    console.log(req.params.version);
  });
  return router;
};
