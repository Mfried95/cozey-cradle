const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;