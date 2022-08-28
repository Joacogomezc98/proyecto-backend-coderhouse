import UsersMongo from "../daos/users/usersDaoMongoDb.js"

let instance = null

export default class UsersRepo {
    constructor() {
        this.dao = UsersMongo.getInstance()
    }

    // INICIA LA INSTANCIA DE UN USUARIO
    static getInstance(){
        if(!instance){
            instance = new UsersRepo()
        }
        return instance
     }

     // TRAE TODOS LOS USUARIOS
     async getAll(){
        const dtos = await this.dao.getAll()
        return dtos
    }

    // TRAE UN USUARIO POR ID
    async getById(id){
        const dtos = await this.dao.getById(id)
        return dtos
    }

    // ELIMINA UN USUARIO
    async deleteById(id){
        const dtos = await this.dao.deleteById(id)
        return dtos
    }

    // CREA UN USUARIO
    async create(item){
        const dtos = await this.dao.create(item)
        return dtos
    }

// TRAE UN USUARIO POR SU NOMBRE
   async getByName(name){
    const dtos = await this.dao.getByName(name)
    return dtos
   }


}