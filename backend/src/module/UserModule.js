const  mongoose =  require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
    },
    img: {
      type: String,
      default: "https://e7.pngegg.com/pngimages/419/473/png-clipart-computer-icons-user-profile-login-user-heroes-sphere-thumbnail.png",
    },
    city: {
      type: String,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    user_type: {
      type: String,  //lease. user, admin
      default: "user",
    }
  },
  { timestamps: true }
);

module.exports =  mongoose.model("User", UserSchema);
