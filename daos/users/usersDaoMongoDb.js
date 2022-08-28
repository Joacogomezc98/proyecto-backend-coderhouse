import UserSchema from "../../schemas/userSchema.js";
import ContenedorMongo from "../../contenedores/contenedorMongoDb.js";

let instance = null
class UsersMongo extends ContenedorMongo {
    constructor() {
        super('users', UserSchema)
    }

    // CREA UNA INSTANCIA DE USUARIOS
    static getInstance(){
        if(!instance){
            instance = new UsersMongo()
        }
        return instance
     }

    // TRAE UN USUARIO POR SU NOMBRE
    async getByName(nombre) {
        try {
            const item = await this.collection.findOne({ 'username': nombre })
            return item
        } catch (e) {
            console.log(e)

        }
    }

}

export default UsersMongo