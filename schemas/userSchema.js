import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    imgUrl: { type: String, required: true },



})

export default UserSchema
