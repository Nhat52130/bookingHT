const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const HotelSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },

  cheapestPrice: {
    type: Number, 
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  lat: {
    type: Number,
  },
  long: {
    type: Number,
  },
  slug: {
    type: String,
    slug: "name",
  },
});
mongoose.plugin(slug);

module.exports = mongoose.model("Hotel", HotelSchema);
