import OrdersMongo from "../daos/ordenes/OrdersDaoMongoDb.js";

let instance = null

export default class OrdersRepo {
    constructor() {
        this.dao = OrdersMongo.getInstance()
    }

    static getInstance() {
        if(!instance){
            instance = new OrdersRepo()
        }
        return instance
    }

    async create(item){
        const dtos = await this.dao.create(item)
        return dtos
    }

    async getAll(){
        const dtos = await this.dao.getAll()
        return dtos
    }
}