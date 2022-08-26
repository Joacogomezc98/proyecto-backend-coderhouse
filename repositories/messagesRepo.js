import MessagesMongo from "../daos/messages/messagesDaoMongoDB.js";

let instance = null

export default class MessagesRepo {
    constructor() {
        this.dao = MessagesMongo.getInstance()
    }

    static getInstance(){
        if(!instance){
            instance = new MessagesRepo()
        }
        return instance
     }

    async getAll(){
        const dtos = await this.dao.getAll()
        return dtos
    }

    async create(item){
        const dtos = await this.dao.create(item)
        return dtos
    }

}