import configs from "../configs.js";
import Factory from "../factory/factory.js";

const db = configs.db
let factory = Factory.getInstance()

let productosApi = factory.create(db, 'Productos')
let carritoApi = factory.create(db, 'Carritos')
let usersApi = factory.create(db, 'Usuarios')
let messagesApi = factory.create(db, 'Mensajes')
let ordersApi = factory.create(db, 'Order')

export {productosApi, carritoApi, usersApi, messagesApi, ordersApi}