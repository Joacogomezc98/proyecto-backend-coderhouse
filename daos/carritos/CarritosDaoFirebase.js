import ContenedorFirebase from  "../../contenedores/contenedorFirebase.js"
import {FieldValue} from 'firebase-admin/firestore'
// DEPRECADO -------------------------

let instance = null
class CarritosFirebase extends ContenedorFirebase {
    constructor(){
       super('carritos')
    }

     static getInstance(){
        if(!instance){
            instance = new CarritosFirebase()
        }
        return instance
     }


     async deleteProduct(cartID, prodID){
        try {
            const doc = this.query.doc(cartID)
            const getDoc = await this.query.doc(cartID).get()
            let item = await doc.update({
                products: getDoc.data().products.filter(products => products.id !== prodID)
            });
            console.log("se elimino el producto", item)
            return item
        }catch(e) {
            throw new Error(`Error al listar por id: ${e}`)

        }
     }


    async addProduct(id, product) {
        try {
            const doc = this.query.doc(id)
            let item = await doc.update({
                products: FieldValue.arrayUnion(product)
            });
            console.log("se agrego el producto", item)
        }catch(e) {
            console.log(e)
        }
    } 
}

export default CarritosFirebase
