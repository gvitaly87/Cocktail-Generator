const express = require('express');

const router = express.Router();

const apiRoute = require('./api/v0');

const imgArr = require('../data/images');
// Export as a function so we can pass it args
module.exports = () => {
  router.get('/', (req, res) => {
    // render calls the view engine
    // looks for the page at the path, passes variable pageTitle
    res.render('pages/index', { pageTitle: 'Index' });
  });

  router.use('/api', apiRoute());

  return router;
};
