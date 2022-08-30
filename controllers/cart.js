import { carritoApi, productosApi } from "../daos/index.js";
import { cartInfoMail, mailTransporter } from "../helpers/nodemailer.js";
import { whatsappMessage } from "../helpers/twilio.js";
import { logger } from "../helpers/log4js.js";
import { loggerFile } from "../helpers/log4js.js";
import { isAuth, loggedUser } from "../middlewares/authValidation.js";
import { createOrder } from "./orders.js";

// CREA UN CARRITO Y DEVUELVE EL ID
export const createCart = (req, res) => {
    const newCart = {
        timestamp: new Date(),
        products: []
    }

    carritoApi.create(newCart)
        .then(savedCart => res.status(200).send(`Your cart ID: ${savedCart.id}`))
        .catch(() => res.status(500).send('Internal server error'))
}

// VACIA UN CARRITO Y LO ELIMINA
export const emptyCart = (req, res) => {
    const id = req.params.id

    carritoApi.deleteById(id)
        .then(deletedCart => {
            if (deletedCart) {
                res.status(200).send("The cart has been deleted")
            } else {
                res.status(404).send({ error: "Cart was not found!" })
            }
        })
}

// LISTAR TODOS LOS PRODUCTOS GUARDADOS EN EL CARRITO
export const listCart = (req, res) => {
    const id = req.params.id

    carritoApi.getById(id)
        .then(cart => res.status(200).send(cart.products))
        .catch(() => res.status(404).send({error: 'No products found'}))
}

//ENVIAR EL CONTENDIO DEL CARRITO POR MAIL Y WHATSAPP
export const checkoutCart = (req, res) => {
    const id = req.params.id
    const username = loggedUser.name
    const email = loggedUser.username

    carritoApi.getById(id)
        .then((cart) => {
            if(cart){
                try {
                    mailTransporter.sendMail(cartInfoMail({ email, username, cart }))
                    whatsappMessage({email, username, cart})
                    createOrder(cart, email)
                    carritoApi.deleteById(id)
                    res.status(200).send('Cart checked out')
                } catch (err) {
                    logger.error(err)
                    loggerFile.error(err)
                }
            }else{
                res.status(404).send({error: 'Cart not found'})
            }
        })
}

//AGREGA UN PRODUCTO AL CARRITO POR ID
export const addToCart = (req, res) => {
    const id = req.params.id

    const prodID = req.body.id

    productosApi.getById(prodID)
        .then((product) => {
            carritoApi.addProduct(id, product)
                .then(() => res.status(200).send("Product added"))
                .catch(() => res.status(404).send({error: "Cart not found"}))
        })
        .catch(() => res.status(404).send({error: "Product not found"}))
}

// ELIMINAR UN PRODUCTO DEL CARRITO POR SU ID DE CARRITO Y DE PRODUCTO
export const deleteFromCart = (req, res) => {
    const cartID = req.params.id
    const prodID = req.params.id_prod

    carritoApi.deleteProduct(cartID, prodID)

        .then(cart => res.status(200).send(`${cart} has been deleted from the cart`))
        .catch(() => res.status(404).send({errro: 'Not found'}))
}
