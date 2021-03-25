const express = require('express');

const router = express.Router();

const Drink = require('../../models/DrinkModel');
const Subscriber = require('../../models/SubscriberModel');
const TeamMember = require('../../models/TeamMemberModel');

// Export as a function so we can pass it args
module.exports = () => {
  // gallery api with added pagination
  router.get('/gallery', async (req, res, next) => {
    const { page = 1, limit = 12 } = req.query;
    try {
      const drinkList = await Drink.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Drink.countDocuments();
      res.json({ drinkList, totalPages: Math.ceil(count / limit), currentPage: page });
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
