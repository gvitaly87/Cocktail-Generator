require('dotenv').config();
const mongoose = require('mongoose');

// Import seed data
const drinkSeed = require(`./seeds/drinks`);
const teamSeed = require(`./seeds/team`);
const subsSeed = require(`./seeds/subscribers`);

// Define model
const Image = require(`./models/DrinkModel`);
const Subscriber = require(`./models/SubscriberModel`);
const TeamMember = require(`./models/TeamMemberModel`);

/*******************************/
/* Mongoose/MongoDB Connection */
/*******************************/

mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

var db = mongoose.connection;

db.on('error', function (error) {
  console.log(`Connection Error: ${error.message}`);
});

db.once('open', function () {
  console.log('Connected to DB...');
});

// Image.insertMany(drinkSeed, function (error, definition) {
//   console.log('Data import completed.');
//   mongoose.connection.close();
// });

TeamMember.insertMany(teamSeed, function (error, definition) {
  console.log('Data import completed.');
  mongoose.connection.close();
});

// Subscriber.insertMany(subsSeed, function (error, definition) {
//   console.log('Data import completed.');
//   mongoose.connection.close();
// });
