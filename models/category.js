import mongoose, { schema } from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {type:string, required:true},
    image_url: {type:string, required:true},
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now},
});
 
const Category = mongoose.model("Category", CategorySchema);

export default Category;
 