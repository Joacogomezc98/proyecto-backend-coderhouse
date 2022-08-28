import ProductosFirebase from "../daos/productos/ProductosDaoFirebase.js"
import ProductosMongo from "../daos/productos/ProductosDaoMongoDb.js"

let instance = null

export default class ProductsRepo {
    // INICIA UNA INSTANCIA DEPENDIENDO DE LA BASE DE DATOS QUE SE DESEA UTILIZAR
    constructor(db) {
        if(db === 'mongodb'){
            this.dao = ProductosMongo.getInstance()
        }else{
            this.dao = ProductosFirebase.getInstance()
        }
    }

    // INSTANCIA DE PRODUCTOS
    static getInstance(db){
        if(!instance){
            instance = new ProductsRepo(db)
        }
        return instance
     }

    // TRAE TODOS LOS PRODUCTOS
    async getAll(){
        const dtos = await this.dao.getAll()
        return dtos
    }

    // TRAE EL PRODUCTO REQUERIDO
    async getById(id){
        const dtos = await this.dao.getById(id)
        return dtos
    }

    // TRAE TODOS LOS PRODUCTOS DE UNA CATEGORIA
    async getByCategory(category){
        const dtos = await this.dao.getByCategory(category)
        return dtos
    }

    // ELIMINA UN PRODUCTO
    async deleteById(id){
        const dtos = await this.dao.deleteById(id)
        return dtos
    }

    // CREA UN NUEVO PRODUCTO
    async create(item){
        const dtos = await this.dao.create(item)
        return dtos
    }

    // MODIFICA LOS DATOS DE UN PRODUCTO
    async modifyProduct(modProduct, id){
        const dtos = await this.dao.modifyProduct(modProduct, id)
        return dtos
    }

}