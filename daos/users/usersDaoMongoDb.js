import UserSchema from "../../schemas/userSchema.js";
import ContenedorMongo from "../../contenedores/contenedorMongoDb.js";

let instance = null
class UsersMongo extends ContenedorMongo {
    constructor() {
        super('users', UserSchema)
    }

    static getInstance(){
        if(!instance){
            instance = new UsersMongo()
        }
        return instance
     }


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