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

}

export default MessagesMongo