import ContenedorFirebase from "../../contenedores/contenedorFirebase.js"

let instance = null
class ProductosFirebase extends ContenedorFirebase {
    constructor() {
        super('productos')
    }

    static getInstance(){
        if(!instance){
            instance = new ProductosFirebase()
        }
        return instance
     }


    async modifyProduct(modProduct, id) {
        try {
            const doc = this.query.doc(id)
            let item = await doc.update(modProduct);
            console.log("se actualizo", item)
        }catch(e) {
            console.log(e)
        }
    } 
}

export default ProductosFirebase
