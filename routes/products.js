import express from "express";
import { addProduct, allProducts, deleteProduct, filterProducts, productById, upadteProduct } from "../controllers/products.js";
import { isAuth } from "../middlewares/authValidation.js";

const { Router } = express
export const productsRouter = Router()

// DEVOLVER TODOS LOS PRODS
productsRouter.get('/', isAuth, allProducts)

//DEVOLVER PRODUCTOS SEGUN SU CATEGORIA

productsRouter.get('/category/:categoria', filterProducts)

// DEVOLVER PROD SEGUN ID
productsRouter.get('/:id', productById)

// RECIBE Y AGREGA UN PRODUCTO, LO DEVUELVE CON SU ID ASIGNADO
productsRouter.post('/',addProduct)

// RECIBE Y ACTUALIZA UN PRODUCTO SEGUN SU ID
productsRouter.put('/:id',upadteProduct)

// ELIMINA UN PRODUCTO SEGUN SU ID
productsRouter.delete('/:id', deleteProduct)