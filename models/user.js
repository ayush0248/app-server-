import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    phone: { type: String, required: true, unique: true},
    adress: {type: String},
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now},
});
 
const User = mongoose.model("User", userSchema);

export default User;
