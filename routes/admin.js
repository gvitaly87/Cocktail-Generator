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

  router.get('/definitions', (req, res) => {
    // res.json(definitions);
    Definition.find({}, (err, definitions) => {
      if (err) {
        res.sendStatus(404);
      }
      res.json(definitions);
    });
  });

  return router;
};
