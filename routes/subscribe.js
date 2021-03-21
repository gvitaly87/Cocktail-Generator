const express = require('express');

const router = express.Router();

// Export as a function so we can pass it args
module.exports = () => {
  router.get('/', (req, res) => {
    res.render('pages/subscribe', {
      pageTitle: 'Subscribe',
    });
  });

  return router;
};
