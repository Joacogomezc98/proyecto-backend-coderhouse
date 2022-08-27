import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    author: {
        email: {type: String, required: true, max: 100},
        avatar: {type: String, required: true}
    },
    timestamp: {type: Date, required: true},
    text: {type: String, required: true, max: 140}
})

export default messagesSchema
