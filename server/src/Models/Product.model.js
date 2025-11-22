import mongoose from 'mongoose'


const productschima = new mongoose.Schema(
    {

        name :{
            type:String,
            reqired:true,
        },

        price:{
            type:Number,
            reqired:true,
        },

        ingredients:{
            type:String,
            reqired:true,
        },

        available:{
            type:Boolean,
            default:true,
        },

        images:{
            type:[String],
            default:[]
        },



},
{timestamps:true}
);


const ProductData = mongoose.model("ProductData",productschima);

export default ProductData;
