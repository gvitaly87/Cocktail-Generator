const mongoose = require('mongoose');

const drinkSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true, lowercase: true, index: true, unique: true },
  baseAlcohol: [{ name: { type: String, index: true }, measure: { type: String, trim: true } }],
  ingredients: [{ name: { type: String, index: true }, measure: { type: String, trim: true } }],
  glassType: String,
  recipe: String,
  imgPath: String,
  width: Number,
  height: Number,
  meta: {
    votes: Number,
    favs: Number,
  },
});

module.exports = mongoose.model('Drink', drinkSchema);
