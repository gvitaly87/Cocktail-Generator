const express = require('express');
const UserModel = require('../models/UserModel');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

// Export as a function so we can pass it args
module.exports = () => {
  router.get('/', (req, res) => {
    res.render('layout', {
      pageTitle: 'Register',
      template: 'register',
      success: req.query.success,
    });
  });

  router.post('/', async (req, res, next) => {
    try {
      // Fill in the schema from the form fields
      const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      // TODO: check if user already exists in db
      // Mongodb functionality provided for save
      const savedUser = await user.save();
      if (savedUser) return res.redirect('/registration?success=true');
      // If there is no user
      return next(new Error('Failed to save user'));
    } catch (err) {
      return next(err);
    }
  });

  return router;
};