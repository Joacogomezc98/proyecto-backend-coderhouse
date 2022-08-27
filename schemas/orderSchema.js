import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    items: {type: Array, required: true, max: 100},
    orderNumber: {type: Number, required: true},
    timestamp: {type: Date, required: true},
    status: {type: String, required: true},
    email: {type: String, required: true}
})

export default OrderSchema