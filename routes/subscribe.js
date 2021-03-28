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

  router.post('/', async (req, res, next) => {
    try {
      const subscriber = new Subscriber(req.body);
      const savedSubscriber = await subscriber.save();
      if (savedSubscriber) {
        req.flash(
          'success',
          `Thank you ${req.body.name} you are successfully subscribed with ${req.body.email}`
        );
        return res.redirect('/register');
      }
      // In case it failed to save create a custom error.
      return next(new Error('Failed to subscribe for an unknown reason'));
    } catch (err) {
      req.flash('error', 'The user name or email is already in use');
      console.log(err);
      return res.redirect('register');
    }
  });

  return router;
};
