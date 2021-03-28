const express = require('express');

const router = express.Router();
const Drink = require('../models/DrinkModel');

const getRandomEntry = require('../services/getRandomEntry');
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
        const randDrink = await getRandomEntry(Drink);
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
      if (drink) {
        return res.render('layout', { pageTitle: `${drink.name}`, template: 'single-item', drink });
      } else {
        req.flash('error', "We're sorry, the drink doesn't exist in our database");
        return res.render('layout', {
          pageTitle: 'Gallery',
          template: 'gallery',
        });
      }
    } catch (err) {
      return next(err);
    }
  });
  return router;
};
