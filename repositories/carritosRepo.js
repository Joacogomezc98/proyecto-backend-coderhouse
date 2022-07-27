import CarritosFirebase from "../daos/carritos/CarritosDaoFirebase.js";
import CarritosMongo from "../daos/carritos/CarritosDaoMongoDb.js";

let instance = null

export default class CarritosRepo {
    constructor(db) {
        if(db === 'mongodb'){
            this.dao = CarritosMongo.getInstance()
        }else{
            this.dao = CarritosFirebase.getInstance()
        }
    }

    static getInstance(){
        if(!instance){
            instance = new CarritosRepo()
        }
        return instance
     }

     async getAll(){
        const dtos = await this.dao.getAll()
        return dtos
    }

    async getById(id){
        const dtos = await this.dao.getById(id)
        return dtos
    }

    async deleteById(id){
        const dtos = await this.dao.deleteById(id)
        return dtos
    }

    async create(item){
        const dtos = await this.dao.create(item)
        return dtos
    }

    async addProduct(id, product){
        const dtos = await this.dao.addProduct(id, product)
        return dtos
    }

    async deleteProduct(cartID, prodID){
        const dtos = await this.dao.deleteProduct(cartID, prodID)
        return dtos
    }


}