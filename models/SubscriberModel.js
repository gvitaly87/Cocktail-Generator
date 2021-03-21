const mongoose = require('mongoose');
const emailValidator = require('email-validator');

const subscriberSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true },
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: { unique: true },
    validate: {
      validator: emailValidator.validate,
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
