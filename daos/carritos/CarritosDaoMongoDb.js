import ContenedorMongo from "../../contenedores/contenedorMongoDb.js"
import CarritosSchema from "../../schemas/carritosSchema.js"
import mongoose from "mongoose";


let instance = null
class CarritosMongo extends ContenedorMongo {
    constructor(){
        super("carritos", CarritosSchema)
     }

     //AGREGA UN PRODUCTO AL CARRITO
     async addProduct(id, product){
         try{
             const updatedCart =  await this.collection.findOneAndUpdate({"_id": id},{$push: {"products": product}})
             return updatedCart
         }catch(e){
             throw new Error(e)
         }
     }

     //CREA UNA INSTANCIA DE CARRITO
     static getInstance(){
        if(!instance){
            instance = new CarritosMongo()
        }
        return instance
     }

     //ELIMINA UN PRODUCTO DEL CARRITO
     async deleteProduct(cartID, prodID){
         try{
             const deletedCart = await this.collection.findOneAndUpdate({"_id": cartID},{$pull: {products:{"_id": mongoose.Types.ObjectId(prodID)}}},{ safe: true, multi: false })
             return deletedCart
         }catch(e){
             throw new Error(e)
         }
     }

}

export default CarritosMongo