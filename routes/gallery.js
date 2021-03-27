const express = require('express');

const router = express.Router();
const Drink = require('../models/DrinkModel');
// Export as a function so we can pass it args
module.exports = () => {
  router.get('/', async (req, res, next) => {
    const { random = false, search } = req.query;
    if (!random && !search) {
      res.render('layout', {
        pageTitle: 'Gallery',
        template: 'gallery',
      });
    } else if (search) {
      res.redirect(`/gallery/${search}`);
    } else {
      try {
        const count = await Drink.countDocuments();
        const random = Math.floor(Math.random() * count);
        const randDrink = await Drink.findOne().skip(random).exec();
        res.render('layout', {
          pageTitle: 'Random Drink',
          template: 'single-item',
          drink: randDrink,
        });
      } catch (err) {
        return next(err);
      }
    }
  });
  router.get('/:name', async (req, res, next) => {
    try {
      const drink = await Drink.findOne({ name: req.params.name });
      if (drink)
        return res.render('layout', { pageTitle: `${drink.name}`, template: 'single-item', drink });
      return next(new Error("The drink doesn't exist in our database"));
    } catch (err) {
      return next(err);
    }
  });
  return router;
};
