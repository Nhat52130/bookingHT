const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  leaveId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: { type: String },
  phone: { type: Number },
  rooms: [
    {
      roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rooms",
      },
      quantity: { Number },
      total: {
        type: Number,
      },
      price: Number,
      roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
    },
  ],
  active: {
    type: Boolean,
    default: false,
  },
  modifiedOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
