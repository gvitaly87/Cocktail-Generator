const express = require('express');

const router = express.Router();

// TODO: remove images.json after updating all the apis
const galleryJSON = require('../../data/images.json');

const Subscriber = require('../../models/SubscriberModel');
const TeamMember = require('../../models/TeamMemberModel');

// Export as a function so we can pass it args
module.exports = () => {
  // TODO: update the cocktail api
  router.get('/gallery', (req, res) => {
    // render calls the view engine
    // looks for the page at the path, passes variable pageTitle
    res.json(galleryJSON);
  });

  router.get('/subscribers', async (req, res, next) => {
    try {
      const subscriberList = await Subscriber.find({});
      res.json(subscriberList);
    } catch (err) {
      return next(err);
    }
  });

  // TODO: update the members api
  router.get('/members', async (req, res, next) => {
    try {
      const memberList = await TeamMember.find({});
      res.json(memberList);
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
