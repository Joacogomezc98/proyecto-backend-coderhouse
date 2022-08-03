import { productosApi } from "../daos/index.js";

export const getProducts = () => {
    return productosApi.getAll()
    .then(data => {return data})
}

export const getProduct = ({id}) => {
    return productosApi.getById(id)
        .then(idProd => {
            // Verifico que el producto exista
            return idProd
        })
        
}

export const createProduct = ({datos}) => {
    const newProduct = datos
        let newProd
        return productosApi.create(newProduct)
            .then(saveProduct => {return saveProduct})
}

export const updateProduct = ({id, datos}) => {

        return productosApi.modifyProduct(datos, id)
            .then((response) => {return response})
            .catch(err => console.log(err))
}

export const deleteProduct = (req, res) => {
    const administrador = req.body.admin

    if (!administrador) {
        res.send({ error: "Request not authorized" })
    } else {

        const id = req.params.id

        productosApi.deleteById(id)
            .then(deletedProd => {
                if (deletedProd) {
                    res.send("The product has been deleted")
                } else {
                    res.send("Sorry, product was not found!")
                }

            })

    }
}