const mongoose = require("mongoose");


const calculatePriority = async function () {
  const count = await this.model('Currency').countDocuments();
  return count + 1;
};

const currencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: false,
    },
    priority: {
      type: Number,
      required: false,
      default: calculatePriority,
    },
    iso_code: {
      type: String,
      required: true,
    },
    exchange_rate: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      lowercase: true,
      enum: ["show", "hide"],
      default: "show",
    },
    live_exchange_rates: {
      type: String,
      lowercase: true,
      enum: ["show", "hide"],
      default: "show",
    },
  },
  {
    timestamps: true,
  }
);

const Currency = mongoose.model("Currency", currencySchema);
module.exports = Currency;
