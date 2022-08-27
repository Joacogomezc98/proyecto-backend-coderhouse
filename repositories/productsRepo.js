import ProductosFirebase from "../daos/productos/ProductosDaoFirebase.js"
import ProductosMongo from "../daos/productos/ProductosDaoMongoDb.js"

let instance = null

export default class ProductsRepo {
    constructor(db) {
        if(db === 'mongodb'){
            this.dao = ProductosMongo.getInstance()
        }else{
            this.dao = ProductosFirebase.getInstance()
        }
    }

    static getInstance(db){
        if(!instance){
            instance = new ProductsRepo(db)
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

    async getByCategory(category){
        const dtos = await this.dao.getByCategory(category)
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

    async modifyProduct(modProduct, id){
        const dtos = await this.dao.modifyProduct(modProduct, id)
        return dtos
    }

}