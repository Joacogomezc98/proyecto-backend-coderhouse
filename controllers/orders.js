import { ordersApi } from "../daos/index.js"

// CREA UNA NUEVA ORDEN Y LA GUARDA EN LA DB
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