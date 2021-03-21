const express = require('express');

const router = express.Router();

const Drink = require('../../models/DrinkModel');
const Subscriber = require('../../models/SubscriberModel');
const TeamMember = require('../../models/TeamMemberModel');

// Export as a function so we can pass it args
module.exports = () => {
  router.get('/gallery', async (req, res, next) => {
    try {
      const drinkList = await Drink.find({});
      res.json(drinkList);
    } catch (err) {
      return next(err);
    }
  });

  router.get('/subscribers', async (req, res, next) => {
    try {
      const subscriberList = await Subscriber.find({});
      res.json(subscriberList);
    } catch (err) {
      return next(err);
    }
  });

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
