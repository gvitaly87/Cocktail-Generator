const express = require('express');

const router = express.Router();

const Subscriber = require('../models/SubscriberModel');

// Export as a function so we can pass it args
module.exports = () => {
  router.get('/', (req, res) => {
    res.render('pages/admin', {
      pageTitle: 'Admin',
    });
  });

  return router;
};
