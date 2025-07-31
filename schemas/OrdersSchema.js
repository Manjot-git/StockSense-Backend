const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
},
 { timestamps: true } // adds createdAt & updatedAt
);

module.exports = { OrdersSchema };