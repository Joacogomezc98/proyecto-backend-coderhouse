import MessagesMongo from "../daos/messages/messagesDaoMongoDB.js";

let instance = null

export default class MessagesRepo {
    constructor() {
        this.dao = MessagesMongo.getInstance()
    }
    // MESSAGES INSTANCE
    static getInstance(){
        if(!instance){
            instance = new MessagesRepo()
        }
        return instance
     }

    // TRAE TODOS LOS MENSAJES
    async getAll(){
        const dtos = await this.dao.getAll()
        return dtos
    }

    // CREA UN NUEVO MENSAJE
    async create(item){
        const dtos = await this.dao.create(item)
        return dtos
    }

    // TRAE TODOS LOS MENSAJES DE UN USUARIO
    async getMessagesById(email){
        const dtos = await this.dao.getMessagesById(email)
        return dtos
    }

}