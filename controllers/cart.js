import { carritoApi, productosApi } from "../daos/index.js";
import { cartInfoMail, mailTransporter } from "../helpers/nodemailer.js";
import { whatsappMessage } from "../helpers/twilio.js";
import { logger } from "../helpers/log4js.js";
import { loggerFile } from "../helpers/log4js.js";
import { loggedUser } from "../middlewares/authValidation.js";
import { createOrder } from "./orders.js";

// CREA UN CARRITO Y DEVUELVE EL ID
export const createCart = (req, res) => {
    const newCart = {
        timestamp: new Date(),
        products: []
    }

    carritoApi.create(newCart)
        .then(savedCart => res.send(`Your cart ID: ${savedCart.id}`))
}

// VACIA UN CARRITO Y LO ELIMINA
export const emptyCart = (req, res) => {
    const id = req.params.id

    carritoApi.deleteById(id)
        .then(deletedCart => {
            if (deletedCart) {
                res.send("The cart has been deleted")
            } else {
                res.send({ error: "Cart was not found!" })
            }
        })
}

// LISTAR TODOS LOS PRODUCTOS GUARDADOS EN EL CARRITO
export const listCart = (req, res) => {
    const id = req.params.id

    carritoApi.getById(id)
        .then(cart => res.send(cart.products))
        .catch(err => res.send(err))
}

//ENVIAR EL CONTENDIO DEL CARRITO POR MAIL Y WHATSAPP
//TODO: Agregar validacion
export const checkoutCart = (req, res) => {
    const id = req.params.id
    const username = loggedUser.name
    const email = loggedUser.username

    carritoApi.getById(id)
        .then((cart) => {
            try {
                mailTransporter.sendMail(cartInfoMail({ email, username, cart }))
                whatsappMessage({email, username, cart})
                createOrder(cart, email)
            } catch (err) {
                logger.error(err)
                loggerFile.error(err)
            }
        })
        .then(() => res.send('Cart checked out'))
        .then(() => carritoApi.deleteById(id))
}

//AGREGA UN PRODUCTO AL CARRITO POR ID
export const addToCart = (req, res) => {
    const id = req.params.id

    const prodID = req.body.id

    productosApi.getById(prodID)
        .then((product) => {
            carritoApi.addProduct(id, product)
                .then(() => res.send("Product added"))
                .catch((e) => res.send(e))
        })
        .catch((e) => res.send(e))
}

// ELIMINAR UN PRODUCTO DEL CARRITO POR SU ID DE CARRITO Y DE PRODUCTO
export const deleteFromCart = (req, res) => {
    const cartID = req.params.id
    const prodID = req.params.id_prod

    carritoApi.deleteProduct(cartID, prodID)

        .then(cart => res.send(`${cart} has been deleted from the cart`))
        .catch(resp => res.send(resp))
}
