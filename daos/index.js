import configs from "../configs.js";
import Factory from "../factory/factory.js";

// OBTIENE LA BASE DE DATOS QUE SE DESEA UTILIZAR DESDE EL ARCHIVO CONFIGS
const db = configs.db

// CREA UNA INSTANCIA DE FACTORY
let factory = Factory.getInstance()

// SE DEFINE UNA VARIABLE PARA UTILIZAR CADA UNA DE LAS COLECCIONES
let productosApi = factory.create(db, 'Productos')
let carritoApi = factory.create(db, 'Carritos')
let usersApi = factory.create(db, 'Usuarios')
let messagesApi = factory.create(db, 'Mensajes')
let ordersApi = factory.create(db, 'Order')

export {productosApi, carritoApi, usersApi, messagesApi, ordersApi}