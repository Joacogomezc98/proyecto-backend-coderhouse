import UsersMongo from "../daos/users/usersDaoMongoDb.js"

let instance = null

export default class UsersRepo {
    constructor() {
        this.dao = UsersMongo.getInstance()
    }

    static getInstance(){
        if(!instance){
            instance = new UsersRepo()
        }
        return instance
     }

     async getAll(){
        const dtos = await this.dao.getAll()
        return dtos
    }

    async getById(id){
        const dtos = await this.dao.getById(id)
        return dtos
    }

    async deleteById(id){
        const dtos = await this.dao.deleteById(id)
        return dtos
    }

    async create(){
        const dtos = await this.dao.create(item)
        return dtos
    }

   async getByName(name){
    const dtos = await this.dao.getByName(name)
    return dtos
   }


}