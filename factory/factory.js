import ProductsRepo from "../repositories/productsRepo.js";
import CarritosRepo from "../repositories/carritosRepo.js";
import UsersRepo from "../repositories/usersRepo.js"

let instance = null
export default class Factory {

    static getInstance() {
        if (!instance) {
            instance = new Factory()
        }
        return instance
    }

    create(db, name) {
        switch (name) {
            case 'Productos':
                return ProductsRepo.getInstance(db)
            case 'Carritos':
                return CarritosRepo.getInstance(db)
            case 'Usuarios':
                return UsersRepo.getInstance()
            default:
                break;
        }
    }
}

