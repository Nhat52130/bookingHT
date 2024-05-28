const  mongoose = require("mongoose");

const slug = require("mongoose-slug-generator");

const RoomSchema = new mongoose.Schema(
  {
    Hotel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels",
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: "title",
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);
mongoose.plugin(slug)

module.exports =  mongoose.model("Room", RoomSchema);
