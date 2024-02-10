const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
      trim: true,
      maxlength: 25,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    passcode: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    role: { type: String, default: "admin" },
    mobile: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
