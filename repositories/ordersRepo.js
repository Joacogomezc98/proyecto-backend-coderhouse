import OrdersMongo from "../daos/ordenes/OrdersDaoMongoDb.js";

let instance = null

export default class OrdersRepo {
    constructor() {
        this.dao = OrdersMongo.getInstance()
    }

    // INSTANCIA DE ORDENES
    static getInstance() {
        if(!instance){
            instance = new OrdersRepo()
        }
        return instance
    }

    // CREA UNA NUEVA ORDEN
    async create(item){
        const dtos = await this.dao.create(item)
        return dtos
    }

    // TRAE TODAS LAS ORDENES
    async getAll(){
        const dtos = await this.dao.getAll()
        return dtos
    }
}