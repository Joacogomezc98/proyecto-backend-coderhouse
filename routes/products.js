import express from "express";
import { addProduct, allProducts, deleteProduct, filterProducts, productById, upadteProduct } from "../controllers/products.js";
import { isAuth } from "../middlewares/authValidation.js";

const { Router } = express
export const productsRouter = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      Productos:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *                  description: Titulo del producto
 *              price:
 *                  type: integer
 *                  description: Precio de mercado del producto
 *              stock:
 *                  type: integer
 *                  description: Cantidad de stock del producto
 *              thumbnail:
 *                  type: string
 *                  description: url de la imagen del producto
 *              timestamp:
 *                  type: date
 *                  description: Fecha de creacion del producto
 *              category:
 *                  type: string
 *                  description: Categoria del producto
 *          required:
 *              - title
 *              - price
 *              - stock
 *              - thumbnail
 *              - timestamp
 *              - category
 *          example:
 *              title: SMIRNOFF ICE APPLE 473ml
 *              price: 200
 *              stock: 100
 *              thumbnail: http://www.puroescabio.com.ar/web/image/product.template/74947/image_256/%5B4860%5D%20SMIRNOFF%20ICE%20473ml?unique=1e17d14
 *              timestamp: 2022-07-27T04:31:54.134+00:00
 *              category: VODKA     
 */

// ROUTES --------------------------------------------------------------------------------------------------

/**
 * @swagger
 * /api/productos/:
 *  get:
 *      summary: Muestra todos los productos de la DB
 *      tags: [Producto]
 *      responses:
 *          200:
 *              description: Devuelve el listado de productos
 *          500:
 *              description: Server error
 */
productsRouter.get('/', isAuth, allProducts)

/**
 * @swagger
 * /api/productos/category/:categoria:
 *  get:
 *      summary: Muestra todos los productos de la categoria definida
 *      parameters:
 *          - in: path
 *            required: true
 *            name: categoria
 *            schema:
 *              type: string
 *      tags: [Producto]
 *      responses:
 *          200:
 *              description: Devuelve el listado de productos
 *          404:
 *              description: No products for this category
 *          500:
 *              description: Sever error
 */
productsRouter.get('/category/:categoria', isAuth, filterProducts)

/**
 * @swagger
 * /api/productos/:id:
 *  get:
 *      summary: Busca un producto por su ID
 *      parameters:
 *          - in: path
 *            required: true
 *            name: id
 *            schema:
 *              type: string
 *      tags: [Producto]
 *      responses:
 *          200:
 *              description: Devuelve el producto
 *          404:
 *              description: Product not found
 */
productsRouter.get('/:id', isAuth, productById)

/**
 * @swagger
 * /api/productos/:
 *  post:
 *      summary: recibe y agrega un producto
 *      tags: [Producto]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      example:
 *                          title: SMIRNOFF ICE APPLE 473ml
 *                          price: 200
 *                          stock: 100
 *                          thumbnail: http://www.puroescabio.com.ar/web/image/product.template/74947/image_256/%5B4860%5D%20SMIRNOFF%20ICE%20473ml?unique=1e17d14
 *                          timestamp: 2022-07-27T04:31:54.134+00:00
 *                          category: VODKA
 *                          admin: true
 *      responses:
 *          200:
 *              description: Se devuelve el nuevo producto
 *          500:
 *              description: Server error
 *          401:
 *              description: Request not authorized
 */

productsRouter.post('/', addProduct)

/**
 * @swagger
 * /api/productos/:id:
 *  put:
 *      summary: Edita un producto
 *      tags: [Producto]
 *      parameters:
 *          - in: path
 *            required: true
 *            name: id
 *            schema:
 *              type: string
 *            example:
 *              62e0bfba1ab86f90a7d68834
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      example:
 *                          title: SMIRNOFF ICE APPLE 473ml
 *                          price: 300
 *                          stock: 200
 *                          thumbnail: http://www.puroescabio.com.ar/web/image/product.template/74947/image_256/%5B4860%5D%20SMIRNOFF%20ICE%20473ml?unique=1e17d14
 *                          timestamp: 2022-07-27T04:31:54.134+00:00
 *                          category: VODKA
 *                          admin: true
 *      responses:
 *          200:
 *              description: Se devuelve el producto modificado
 *          401:
 *              description: Request not authorized
 *          500:
 *              description: Server error
 */
productsRouter.put('/:id', upadteProduct)

/**
 * @swagger
 * /api/productos/:id:
 *  delete:
 *      summary: Elimina un producto
 *      tags: [Producto]
 *      parameters:
 *          - in: path
 *            required: true
 *            name: id
 *            schema:
 *              type: string
 *            example:
 *              62e0bfba1ab86f90a7d68834
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      example:
 *                          admin: true
 *      responses:
 *          200:
 *              description: Mensaje de validacions
 *          401:
 *              description: Request not authorized
 *          404:
 *              description: Product not found
 */
productsRouter.delete('/:id', deleteProduct)