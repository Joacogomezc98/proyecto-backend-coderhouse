import express from "express";
import { addToCart, checkoutCart, createCart, deleteFromCart, emptyCart, listCart } from "../controllers/cart.js";
import { isAuth } from "../middlewares/authValidation.js";

const { Router } = express
export const cartRouter = Router()

// CREA UN CARRITO Y DEVUELVE EL ID
cartRouter.post('/', createCart)

//VACIA UN CARRITO Y LO ELIMINA
cartRouter.delete('/:id', emptyCart )

// LISTAR TODOS LOS PRODUCTOS GUARDADOS EN EL CARRITO
cartRouter.get("/:id/productos", isAuth, listCart)

//ENVIA POR MAIL Y WHATSAPP EL CONTENDIO DEL CARRITO
cartRouter.post('/checkout/:id', checkoutCart)

//AGREGAR UN PRODUCTO AL CARRITO POR SU ID

cartRouter.post("/:id/productos", addToCart)

// ELIMINAR UN PRODUCTO DEL CARRITO POR SU ID DE CARRITO Y DE PRODUCTO

cartRouter.delete("/:id/productos/:id_prod", deleteFromCart)
