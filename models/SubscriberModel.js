const mongoose = require('mongoose');

const subscriberSchema = mongoose.Schema({
  email: String,
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
