import UserSchema from "../../schemas/userSchema.js";
import ContenedorMongo from "../../contenedores/contenedorMongoDb.js";

class UsersMongo extends ContenedorMongo {
    constructor() {
        super('users', UserSchema)
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