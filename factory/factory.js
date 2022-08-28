import ProductsRepo from "../repositories/productsRepo.js";
import CarritosRepo from "../repositories/carritosRepo.js";
import UsersRepo from "../repositories/usersRepo.js"
import MessagesRepo from "../repositories/messagesRepo.js";
import OrdersRepo from "../repositories/ordersRepo.js";

let instance = null
export default class Factory {

    // CREA INSTANCIAD E LA FACTORY
    static getInstance() {
        if (!instance) {
            instance = new Factory()
        }
        return instance
    }
    // CREA UNA INSTQANCIA DE LA COLECCION SOLICITADA
    create(db, name) {
        switch (name) {
            case 'Productos':
                return ProductsRepo.getInstance(db)
            case 'Carritos':
                return CarritosRepo.getInstance(db)
            case 'Usuarios':
                return UsersRepo.getInstance()
            case 'Mensajes':
                return MessagesRepo.getInstance()
            case 'Order':
                return OrdersRepo.getInstance()
            default:
                break;
        }
    }
}

