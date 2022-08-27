import { ordersApi } from "../daos/index.js"

export const createOrder = async (cart, email ) => {

    const totalOrders = await ordersApi.getAll()
    
    const newOrder = {
        items: cart.products,
        orderNumber: parseInt( totalOrders.length + 1),
        timestamp: new Date(),
        status: 'Generada',
        email: email
    }

    ordersApi.create(newOrder)
    .then(() => console.log(`New order created with order number: ${newOrder.orderNumber}`))
    
}