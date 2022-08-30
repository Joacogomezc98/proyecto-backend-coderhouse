import { loginError, loginRender, logout, notImplemented, registerUser, renderLanding, renderRegister } from "../controllers/auth.js";
import { isAuth, passportAuth } from "../middlewares/authValidation.js";
import express from "express";
import passport from "passport";


const { Router } = express

export const authRouter = Router()

/**
 * @swagger
 * /login:
 *  get:
 *      summary: Render vista login
 *      tags: [Auth]
 *      responses:
 *          200:
 *              description: Vista login
 * 
 */
authRouter.get("/login",loginRender)

/**
 * @swagger
 * /login:
 *  post:
 *      summary: Loguea al usuario y redirige a / si es correcto o a /login-error si falla
 *      tags: [Auth]
 *      responses:
 *          200:
 *              description: redirect
 *          500:
 *              description: login error
 */
authRouter.post('/login',  passport.authenticate('local',
{
    successRedirect: '/',
    failureRedirect: '/login-error'
}))

/**
 * @swagger
 * /login-error:
 *  get:
 *      summary: Render vista error de logueo
 *      tags: [Auth]
 *      responses:
 *          200:
 *              description: Vista error de logueo
 */
authRouter.get('/login-error', loginError)

/**
 * @swagger
 * /register:
 *  get:
 *      summary: Render vista registro
 *      tags: [Auth]
 *      responses:
 *          200:
 *              description: Vista registro
 */
authRouter.get('/register', renderRegister)

/**
 * @swagger
 * /register:
 *  post:
 *      summary: Registro de usuario
 *      tags: [Auth]
 *      responses:
 *          200:
 *              description: Usuario registrado
 *          500:
 *              description: register error
 */
authRouter.post('/register', registerUser);

/**
 * @swagger
 * /register:
 *  get:
 *      summary: Desloguea al usuario terminando la sesion
 *      tags: [Auth]
 *      responses:
 *          200:
 *              description: Vista logout
 */
authRouter.get('/logout', logout)


/**
 * @swagger
 * /:
 *  get:
 *      summary: Vista principal de la api
 *      tags: [Auth]
 *      responses:
 *          200:
 *              description: Vista landing
 */
authRouter.get('/', isAuth, renderLanding)

// ***NOTA***
// LA CONSIGNA PIDE REDIRIGIR A /PRODUCTOS, SIN EMBARGO ME PARECIA MEJOR TENER UNA VISTA DE LANDING CON ACCESO A PRODUCTOS
// DE SER NECESARIO DESCOMENTAR EL CODIGO DE ABAJO Y COMENTAR EL DE ARRIBA PARA UNA REDIRECCION A PRODUCTOS

// authRouter.get('/', isAuth, (req, res) => {
//     res.redirect('/api/productos')
// })


/**
 * @swagger
 * /*:
 *  get:
 *      summary: Rutas no implementadas
 *      tags: [Auth]
 *      responses:
 *          501:
 *              description: Ruta no implementada
 */
authRouter.get('*', notImplemented)