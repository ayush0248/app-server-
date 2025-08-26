import mongoose, { schema } from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {type:string, required:true},
    image_url: {type:string, required:true},
    price: {type:number, required:true},
    ar_uri:{type:string},
    description: {type:string, required:true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required:true},
    
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now},
});
 
const Product = mongoose.model("Product", ProductSchema);

export default Product;
 