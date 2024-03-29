import ContenedorMongo from '../../contenedores/contenedorMongoDb.js'
import ProductosSchema from '../../schemas/productosSchema.js'
import mongoose from "mongoose";

let instance = null
class ProductosMongo extends ContenedorMongo {
    constructor() {
        super('productos', ProductosSchema)
    }
    
    // CREA UNA INSTANCIA DE PRODUCTOS
    static getInstance() {
        if (!instance) {
            instance = new ProductosMongo()
        }
        return instance
    }

    // MODIFICA EL PRODUCTO
    async modifyProduct(modProduct, id) {
        try {
            await this.collection.findOneAndUpdate({ "_id": mongoose.Types.ObjectId(id) },modProduct)
            return ("Product Edited Successfully")
        } catch (e) {
            console.log(e)
            return ("This Id does not belong to a product")
        }
    }

    // TRAE LOS PRODUCTOS FILTRADOS POR CATEGORIA
    async getByCategory(category) {
        try {
            const item = await this.collection.find({ 'category': category })
            return item
        } catch (e) {
            throw new Error()
        }
    }

}

export default ProductosMongo
