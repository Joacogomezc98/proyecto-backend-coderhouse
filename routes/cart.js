import express from "express";
import { addToCart, checkoutCart, createCart, deleteFromCart, emptyCart, listCart } from "../controllers/cart.js";
import { isAuth } from "../middlewares/authValidation.js";

const { Router } = express
export const cartRouter = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      Carritos:
 *          type: object
 *          properties:
 *              timestamp:
 *                  type: date
 *                  description: Fecha de creacion del carrito
 *              products:
 *                  type: array
 *                  description: productos agregados al carrito
 *          required:
 *              - timestamp
 *              - products
 *          example:
 *              timestamp: 2022-07-28T04:31:54.134+00:00
 *              products:
 *                  - title: SMIRNOFF ICE APPLE 473ml
 *                    price: 200
 *                    stock: 100
 *                    thumbnail: http://www.puroescabio.com.ar/web/image/product.template/74947/image_256/%5B4860%5D%20SMIRNOFF%20ICE%20473ml?unique=1e17d14
 *                    timestamp: 2022-07-27T04:31:54.134+00:00
 *                    category: VODKA    
 *                   
 */

// ROUTES --------------------------------------------------------------------------------------------------

/**
 * @swagger
 * /api/carrito/:
 *  post:
 *      summary: crea un nuevo carrito
 *      tags: [Carritos]
 *      responses:
 *          200:
 *              description: Devuelve el ID del nuevo carrito
 */
cartRouter.post('/', createCart)

/**
 * @swagger
 * /api/carrito/:id:
 *  delete:
 *      summary: Elimina un carrito
 *      tags: [Carritos]
 *      parameters:
 *          - in: path
 *            required: true
 *            name: id
 *            schema:
 *              type: string
 *            example:
 *              62e0bfba1ab86f90a7d68834
 *      responses:
 *          200:
 *              description: Mensaje de validacions
 */
cartRouter.delete('/:id', emptyCart )

/**
 * @swagger
 * /api/carrito/:id/productos:
 *  get:
 *      summary: Muestra todos los productos del carrito seleccionado
 *      parameters:
 *          - in: path
 *            required: true
 *            name: id
 *            schema:
 *              type: string
 *            example:
 *              62e0bfba1ab86f90a7d68834
 *      tags: [Carritos]
 *      responses:
 *          200:
 *              description: Devuelve el listado de productos del carrito
 */
cartRouter.get("/:id/productos", isAuth, listCart)

/**
 * @swagger
 * /api/carrito/checkout/:id:
 *  post:
 *      summary: Realiza la orden del carrito, envia mail y lo elimina
 *      parameters:
 *          - in: path
 *            required: true
 *            name: id
 *            schema:
 *              type: string
 *            example:
 *              62e0bfba1ab86f90a7d68834
 *      tags: [Carritos]
 *      responses:
 *          200:
 *              description: Mensaje de confirmacion
 */
cartRouter.post('/checkout/:id' ,checkoutCart)

/**
 * @swagger
 * /api/carrito/:id/productos:
 *  post:
 *      summary: Agrega un producto al carrito
 *      parameters:
 *          - in: path
 *            required: true
 *            name: id
 *            schema:
 *              type: string
 *            example:
 *              62e0bfba1ab86f90a7d68834
 *      tags: [Carritos]
 *      responses:
 *          200:
 *              description: Muestra el carrito con el nuevo producto
 */
cartRouter.post("/:id/productos", addToCart)

/**
 * @swagger
 * /api/carrito/:id/productos/:id_prod:
 *  delete:
 *      summary: Elimina un producto del carrito
 *      tags: [Carritos]
 *      parameters:
 *          - in: path
 *            required: true
 *            name: id
 *            schema:
 *              type: string
 *            example:
 *              62e0bfba1ab86f90a7d68834
 *          - in: path
 *            required: true
 *            name: id_prod
 *            schema:
 *              type: string
 *            example:
 *              62e0bfba1ab86f90a7d68834
 *      responses:
 *          200:
 *              description: Mensaje de validacion
 */
cartRouter.delete("/:id/productos/:id_prod", deleteFromCart)
