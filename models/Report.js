const mongoose = require("mongoose");

const Report = new mongoose.Schema({
  reportDetails: [
    {
      userID: { type: String, required: true },
      marketID: { type: String, required: true },
      marketName: { type: String, required: true },
      cmdtyID: { type: String, required: true },
      marketType: { type: String, default: "Mandi" },
      cmdtyName: { type: String, required: true },
      priceUnit: { type: String, required: true, default: "Kg" },
      convFctr: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Report", Report);
