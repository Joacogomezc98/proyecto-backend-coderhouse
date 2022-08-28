import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export default class ContenedorMongo {
    // SE REQUIERE LA COLECCION A UTILIZAR Y SU SCHEMA CORRESPONDIENTE
    constructor(collection, schema){
        this.collection = mongoose.model(collection, schema)
        this.mongoConnect()
    }
    //CONEXION A MONGODB
    async mongoConnect() {
        try{
            mongoose.connect(process.env.MONGO_STORE_CREDENTIALS,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log("connected to MongoDB")
        }
        catch (error){
            console.log(error)
        }
    }
    
    // TRAE TODOS LOS ELEMENTOS DE LA COLECCION SOLICITADA
    async getAll() {
        try{
            const items = await this.collection.find()
            return items
        }catch(e){
            throw new Error(e)
        }
    }
    // TRAE UN UNICO ELEMENTO DE LA COLECCION POR SU ID
    async getById(id) {
        try{
            const item = await this.collection.findOne({'_id': id})
            return item
        }catch(e){
            throw new Error()
        }
    }

    // ELIMINA EL ELEMENTO SOLICITADO POR SU ID
    async deleteById(id) {
        try{
            const deletedItem = await this.collection.findOneAndDelete({"_id": id})
            return deletedItem
        }catch(e){
            throw new Error("Id not found")
        }
    }

    // CREA UN NUEVO ELEMENTO EN LA COLLECION
    async create(item){
        try{
            const newItem = await this.collection.create(item)
            return newItem
        }catch(e){
            throw new Error(`Error saving: ${e}`)
        }
    }

}