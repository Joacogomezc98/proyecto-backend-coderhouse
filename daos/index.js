import ProductosFirebase from "./productos/ProductosDaoFirebase.js";
import ProductosMongo from "./productos/ProductosDaoMongoDb.js";
import CarritosFirebase from "./carritos/CarritosDaoFirebase.js";
import CarritosMongo from "./carritos/CarritosDaoMongoDb.js";
import configs from "../configs.js";
import UsersMongo from "./users/usersDaoMongoDb.js";

const db = configs.db

let productosApi
let carritoApi
let usersApi

switch (db) {
    case 'mongodb':
        productosApi = new ProductosMongo()
        carritoApi = new CarritosMongo()
        usersApi = new UsersMongo()
        break

    case 'firebase':
        productosApi = new ProductosFirebase()
        carritoApi = new CarritosFirebase()
        break
}

export {productosApi, carritoApi, usersApi}