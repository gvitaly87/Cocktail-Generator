const express = require('express');

const router = express.Router();
const Subscriber = require('../models/SubscriberModel');

// Export as a function so we can pass it args
module.exports = () => {
  router.get('/', (req, res) => {
    res.render('layout', {
      pageTitle: 'Subscribe',
      template: 'subscribe',
      success: req.query.success,
    });
  });

  router.use(express.urlencoded({ extended: true }));

  router.post('/', async (req, res, next) => {
    try {
      const subscriber = new Subscriber(req.body);
      const savedSubscriber = await subscriber.save();
      if (savedSubscriber) return res.redirect('/subscribe?success=true');
      // In case it failed to save create a custom error.
      return next(new Error('Failed to subscribe for an unknown reason'));
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
