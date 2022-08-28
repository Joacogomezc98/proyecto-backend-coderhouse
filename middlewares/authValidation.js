import bcrypt from 'bcrypt'
import passport from 'passport'
import { Strategy } from 'passport-local'
import express from "express";
import { usersApi } from '../daos/index.js';
import { logger, loggerFile } from '../helpers/log4js.js';

const app = express()

const LocalStrategy = Strategy

export var loggedUser = {}

// ESTRATEGIA LOCAL PARA LOGIN
passport.use(new LocalStrategy(
    async (username, password, done) => {
        //Logica para validar si un usuario existe
        const existeUsuario = await usersApi.getByName(username)
            .then((data) => { return data })

        if (!existeUsuario) {
            logger.error('User not found')
            loggerFile.error('User not found')
            return done(null, false);
        } else if (!(await verifyPass(existeUsuario, password))) {
            logger.error('Invalid Password')
            loggerFile.error('Invalid Password')
            console.log(await verifyPass(existeUsuario, password))
            return done(null, false);
        } else {
            loggedUser = existeUsuario
            return done(null, existeUsuario);
        }

    }
))

// ENCRIPTACION DE PASSWORD
passport.serializeUser((usuario, done) => {
    done(null, usuario.username);
})

//DESENCRIPTACION DE PASSWORD
passport.deserializeUser((nombre, done) => {
    usersApi.getByName(nombre)
        .then((data) => done(null, data));

});

// FUNCION DE VALIDACION. SI ES CUMPLIDA REDIRIGE A LANDING SINO A PANTALLA DE ERROR
export const passportAuth = () => (
    passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login-error'
    })
)

// SE CREA EL HASH PARA LA CONTRASEÑA
export const createHash = async (password) => {
    const saltRouds = 10

    try {
        const salt = await bcrypt.genSalt(saltRouds)
        const hash = await bcrypt.hash(password, salt)
        return hash
    } catch (err) {
        logger.error(err)
        loggerFile.error(err)
    }
}

// VERIFICO SI LA CONTRASEÑA INGRESADA ES LA MISMA QUE LA DE LA BASE DE DATOS
const verifyPass = async (usuario, password) => {

    const match = await bcrypt.compare(password, usuario.password)
    return match

}

// MIDDLEWARE DE VALIDACION POR USER Y PASS. EN CASO DE QUE NO ESTE VALIDADO REDIRECCIONA A /LOGIN
export const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}