import CarritosFirebase from "../daos/carritos/CarritosDaoFirebase.js";
import CarritosMongo from "../daos/carritos/CarritosDaoMongoDb.js";

let instance = null

export default class CarritosRepo {
    //INICIO UNA INSTANCIA DEPENDIENDO DE LA BASE DE DATOS QUE SE DESEA UTILIZAR
    constructor(db) {
        if (db === 'mongodb') {
            this.dao = CarritosMongo.getInstance()
        } else {
            this.dao = CarritosFirebase.getInstance()
        }
    }

    // INICIO LA INSTANCIA DEL CARRITO
    static getInstance(db) {
        if (!instance) {
            instance = new CarritosRepo(db)
        }
        return instance
    }

    // TRAIGO TODOS LOS CARRITOS
    async getAll() {
        const dtos = await this.dao.getAll()
        return dtos
    }

    // TRAIGO EL CARRITO SOLICITADO POR ID
    async getById(id) {
        const dtos = await this.dao.getById(id)
        return dtos
    }

    // ELIMINO EL CARRITO POR ID
    async deleteById(id) {
        const dtos = await this.dao.deleteById(id)
        return dtos
    }

    // CREO UN NUEVO CARRITO
    async create(item) {
        const dtos = await this.dao.create(item)
        return dtos
    }

    // AGREGO UN NUEVO PRODUCTO AL CARRITO
    async addProduct(id, product) {
        const dtos = await this.dao.addProduct(id, product)
        return dtos
    }

    //ELIMINO EL PRODUCTO INDICADO DEL CARRITO
    async deleteProduct(cartID, prodID) {
        const dtos = await this.dao.deleteProduct(cartID, prodID)
        return dtos
    }


}