import { productosApi } from "../daos/index.js";

// TRAE TODOS LOS PRODUCTOS DE LA DB
export const allProducts = (req, res) => {
    productosApi.getAll()
    .then(data => res.status(200).send(data))
    .catch(() => res.status(500).send({error: 'Server error'}))
}

// TRAE EL PRODUCTO SOLICITADO POR ID
export const productById = (req, res) => {
    const id = req.params.id

    productosApi.getById(id)
        .then(idProd => {
            // Verifico que el producto exista
            res.status(200).send(idProd)
        })
        .catch(() => {res.status(404).send({ error: "Product not found" })}
        )
}

// CREA EL PRODUCTO REQUERIDO
export const addProduct = (req, res) => {
    const newProduct = req.body
    newProduct.timestamp = new Date()

    const administrador = newProduct.admin

    if (!administrador) {
        res.status(401).send({ error: "Request not authorized" })
    } else {
        productosApi.create(newProduct)
            .then(saveProduct => res.status(200).send(saveProduct))
            .catch(() => res.status(500).send({error: 'Server error'}))
    }
}

// ACTUALIZA EL PRODUCTO REEMPLAZANDOLO POR EL PRODUCTO ENVIADO POR BODY
export const upadteProduct = (req, res) => {
    const modProduct = req.body

    const administrador = modProduct.admin

    modProduct.timestamp = new Date()

    if (!administrador) {
        res.status(401).send({ error: "Request not authorized" })
    } else {
        const id = req.params.id
        productosApi.modifyProduct(modProduct, id)
            .then((response) => res.status(200).send(response))
            .catch(() => res.status(500).send({error: 'Server error'}))
    }
}

// ELIMINA EL PRODUCTO SOLICITADO
export const deleteProduct = (req, res) => {
    const administrador = req.body.admin

    if (!administrador) {
        res.status(401).send({ error: "Request not authorized" })
    } else {

        const id = req.params.id

        productosApi.deleteById(id)
            .then(deletedProd => {
                if (deletedProd) {
                    res.status(200).send("The product has been deleted")
                } else {
                    res.status(404).send("Sorry, product was not found!")
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
                res.status(200).send(products)
            }else {
                res.status(404).send({error: 'No products for this category'})
            }
        })
        .catch(() => {res.status(500).send({ error: "Oops Something went wrong" })})
}