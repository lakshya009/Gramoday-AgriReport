const mongoose = require("mongoose");

const FinalReport = new mongoose.Schema(
  {
    marketID: { type: String, required: true },
    marketName: { type: String, required: true },
    cmdtyID: { type: String, required: true },
    cmdtyName: { type: String, required: true },
    users: [{ type: String, required: true }],
    priceUnit: { type: String, required: true, default: "kg" },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FinalReport", FinalReport);
