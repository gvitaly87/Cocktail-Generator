const dotenv = require('dotenv').config();
const mongoose = require('./_connection.js');

const express = require('express');
const app = express();

const path = require('path');

const routes = require('./routes');

// Read the port from the environment
const PORT = process.env.PORT || 3000;

//Every time we see a app.use we apply a Middleware in express
//Returns the static asset as long as it is found in the specified folder.
app.use(express.static(path.join(__dirname, './public')));

//set ejs as the view engine for express
app.set('view engine', 'ejs');

app.use('/', (req, res, next) => {
  res.locals.siteName = 'Cocktail Drink Generator';
  next();
});

app.use('/', routes());

//404 Not Found page.
app.use((req, res, next) => {
  const err = new Error('Requested page could not be found');
  err.status = 404;
  next(err);
});

// Catch all the errors that might have occurred
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  // Save the error, but not display it to the user.
  console.error(err);
  // Default to a DB error
  const status = err.status || 500;
  res.locals.status = status;
  res.status(status);
  // Render the error page using the default layout
  res.render('pages/error', { pageTitle: `Error ${status}`, template: 'error' });
});

// Start a TCP server listening for connections on the given port and host
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
