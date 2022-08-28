import { productosApi } from "../daos/index.js";

// TRAE TODOS LOS PRODUCTOS DE LA DB
export const allProducts = (req, res) => {
    productosApi.getAll()
    .then(data => res.send(data))
}

// TRAE EL PRODUCTO SOLICITADO POR ID
export const productById = (req, res) => {
    const id = req.params.id

    productosApi.getById(id)
        .then(idProd => {
            // Verifico que el producto exista
            res.send(idProd)
        })
        .catch(() => {res.send({ error: "Product not found" })}
        )
}

// CREA EL PRODUCTO REQUERIDO
export const addProduct = (req, res) => {
    const newProduct = req.body
    newProduct.timestamp = new Date()

    const administrador = newProduct.admin

    if (!administrador) {
        res.send({ error: "Request not authorized" })
    } else {
        productosApi.create(newProduct)
            .then(saveProduct => res.send(saveProduct))

    }
}

// ACTUALIZA EL PRODUCTO REEMPLAZANDOLO POR EL PRODUCTO ENVIADO POR BODY
export const upadteProduct = (req, res) => {
    const modProduct = req.body

    const administrador = modProduct.admin

    if (!administrador) {
        res.send({ error: "Request not authorized" })

    } else {

        const id = req.params.id

        productosApi.modifyProduct(modProduct, id)
            .then((response) => res.send(response))
            .catch((response) => res.send(response))

    }
}

// ELIMINA EL PRODUCTO SOLICITADO
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

// TRAE LOS PRODUCTOS QUE ESTEN DENTRO DE LA CATEGORIA INDICADA POR LA RUTA
export const filterProducts = (req, res) => {
    const category = req.params.categoria

    productosApi.getByCategory(category)
        .then(products => {
            // Verifico que haya productos
            if(products.length > 0){
                res.send(products)
            }else {
                res.send({message: 'No products for this category'})
            }
        })
        .catch(() => {res.send({ error: "Oops Something went wrong" })})
}