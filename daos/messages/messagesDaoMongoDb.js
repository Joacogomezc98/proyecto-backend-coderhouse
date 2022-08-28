import messagesSchema from "../../schemas/messageSchema.js";
import ContenedorMongo from "../../contenedores/contenedorMongoDb.js";

let instance = null
class MessagesMongo extends ContenedorMongo {
    constructor() {
        super('messages', messagesSchema)
    }

    static getInstance(){
        if(!instance){
            instance = new MessagesMongo()
        }
        return instance
    }

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