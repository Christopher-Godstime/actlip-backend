const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    head: String,
    content: String,
    images: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("news", newsSchema);
