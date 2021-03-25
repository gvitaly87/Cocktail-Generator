const express = require('express');

const router = express.Router();
const Drink = require('../models/DrinkModel');
// Export as a function so we can pass it args
module.exports = () => {
  router.get('/', async (req, res) => {
    const { random = false } = req.query;
    if (!random) {
      res.render('layout', {
        pageTitle: 'Gallery',
        template: 'gallery',
      });
    } else {
      const count = await Drink.countDocuments();
      const random = Math.floor(Math.random() * count);
      const randDrink = await Drink.findOne().skip(random).exec();
      res.send(randDrink);
    }
  });

  return router;
};
