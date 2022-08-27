import { productosApi } from "../daos/index.js";

export const allProducts = (req, res) => {
    productosApi.getAll()
    .then(data => res.send(data))
}

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