import mongoose, { schema } from "mongoose";

const userSchema = new mongoose.Schema({
    phone: {type:string, required:true, unique:true},
    adress: {type:string},
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now},
});
 
const User = mongoose.model("User", userSchema);

export default User;
