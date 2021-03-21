const mongoose = require('mongoose');

const subscriberSchema = mongoose.Schema({
  name: String,
  email: String,
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
