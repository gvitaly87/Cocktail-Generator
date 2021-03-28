const express = require('express');
const UserModel = require('../models/UserModel');
const router = express.Router();

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
      // Mongodb functionality provided for save
      const savedUser = await user.save();
      if (savedUser) {
        req.flash(
          'success',
          `Thank you ${req.body.name} you are successfully Registered with ${req.body.email}`
        );
        return res.redirect('/register');
      }
      // If there is no user
      return next(new Error('Failed to save user'));
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
