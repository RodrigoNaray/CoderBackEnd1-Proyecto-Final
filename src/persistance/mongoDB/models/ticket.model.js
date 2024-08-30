import mongoose from "mongoose";

const ticketCollection = "ticket";

const ticketSchema = new mongoose.Schema({
  code: { type: String, required: true },
  purchase_datatime: {type: String, default: Date.now() },
  amount: {type: Number, required: true},
  purchaser: {type: String, required: true},
});

ticketSchema.pre("find", function (){
  this.populate("products.product")
})

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
