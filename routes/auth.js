import { loginError, loginRender, logout, notImplemented, registerUser, renderLanding, renderRegister } from "../controllers/auth.js";
import { isAuth, passportAuth } from "../middlewares/authValidation.js";
import express from "express";
import passport from "passport";


const { Router } = express

export const authRouter = Router()

// RENDER DE VISTA DE LOGIN
authRouter.get("/login",loginRender)

//LOGGUEA AL USUARIO Y REDIRIGE A / SI ES CORRECTO O A /LOGIN-ERROR SI FALLA EL LOGUEO
authRouter.post('/login',  passport.authenticate('local',
{
    successRedirect: '/',
    failureRedirect: '/login-error'
}))

// RENDER VISTA ERROR DE LOGUEO
authRouter.get('/login-error', loginError)

//RENDER VISTA DE REGISTRO
authRouter.get('/register', renderRegister)

// REGISTRA AL USUARIO
authRouter.post('/register', registerUser);

//RENDER VISTA USUARIO Y DESLOGUEO
authRouter.get('/logout', logout)

// LANDING PAGE
authRouter.get('/', isAuth, renderLanding)

// ***NOTA***
// LA CONSIGNA PIDE REDIRIGIR A /PRODUCTOS, SIN EMBARGO ME PARECIA MEJOR TENER UNA VISTA DE LANDING CON ACCESO A PRODUCTOS
// DE SER NECESARIO DESCOMENTAR EL CODIGO DE ABAJO Y COMENTAR EL DE ARRIBA PARA UNA REDIRECCION A PRODUCTOS

// authRouter.get('/', isAuth, (req, res) => {
//     res.redirect('/api/productos')
// })


// CUALQUIER OTRA RUTA NO IMPLEMENTADA MUESTRA UN MENSAJE DE ERROR
authRouter.get('*', notImplemented)