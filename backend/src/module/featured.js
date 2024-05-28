const mongoose = require("mongoose");

const FeaturedSchema = new mongoose.Schema({
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
    },
    icon: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },

});
module.exports = mongoose.model("Featured", FeaturedSchema);