import ContenedorMongo from '../../contenedores/contenedorMongoDb.js'
import ProductosSchema from '../../schemas/productosSchema.js'

let instance = null
class ProductosMongo extends ContenedorMongo {
    constructor(){
        super('productos', ProductosSchema)
     }

     static getInstance(){
        if(!instance){
            instance = new ProductosMongo()
        }
        return instance
     }

     async modifyProduct(modProduct, id) {
         try{
             await this.collection.updateOne({"_id": id},{$set: {title: modProduct.title},
             $set:{price: modProduct.price},
             $set:{thumbnail: modProduct.thumbnail},
             $set:{timestamp: modProduct.timestamp},
             $set:{stock: modProduct.stock}})
             return ("Product Edited Successfully")
         }catch(e){
             console.log(e)
             return("This Id does not belong to a product")
         }
     }

}

export default ProductosMongo
