import ContenedorMongo from "../../contenedores/contenedorMongoDb.js";
import OrderSchema from "../../schemas/orderSchema.js";

let instance = null

class OrdersMongo extends ContenedorMongo {
    constructor() {
        super('orders', OrderSchema)
    }
    // CREA UNA INSTANCIA DE ORDENES
    static getInstance(){
        if(!instance){
            instance = new OrdersMongo()
        }
        return instance
     }


}

export default OrdersMongo