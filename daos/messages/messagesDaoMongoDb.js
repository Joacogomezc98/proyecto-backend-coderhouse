import messagesSchema from "../../schemas/messageSchema.js";
import ContenedorMongo from "../../contenedores/contenedorMongoDb.js";

let instance = null
class MessagesMongo extends ContenedorMongo {
    constructor() {
        super('messages', messagesSchema)
    }
    // CREA UNA INSTANCIA DE MENSAJES
    static getInstance(){
        if(!instance){
            instance = new MessagesMongo()
        }
        return instance
    }
    // TRAE LOS MENSAJES GENERADOS POR CIERTO USUARIO POR EMAIL
    async getMessagesById(email){
        try{
            const messages = await this.collection.find({"author.email": email})
            return messages
        } catch(err) {
            throw new Error()
        }
    } 

}

export default MessagesMongo