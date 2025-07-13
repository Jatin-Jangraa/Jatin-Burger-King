import mongoose from "mongoose";

const orderschima = new mongoose.Schema({
  customername:{ type:String,required:true },
 customerid:{type:String,required:true},
orderitems:[],
paymentmode:{type:String,required:true},
shippingcharges: {type:Number,required:true},
shippinginfo:{},
subtotal: {type:Number,required:true},
tax:{type:Number,required:true},
total:{type:Number,required:true},
 status: { type: String,
      default: "Processing",
      enum: ["Processing", "Shipped", "Delivered"],
    },
}
  ,
  { timestamps: true }
);

const OrderData = mongoose.model("OrderData", orderschima);

export default OrderData;