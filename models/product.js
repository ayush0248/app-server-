import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    name: {type:String, required:true},
    image_url: {type:String, required:true},
    price: {type:Number, required:true},
    ar_uri:{type:String},
    description: {type:String, required:true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required:true},
    
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now},
});
 
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
 