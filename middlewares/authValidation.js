import bcrypt from 'bcrypt'
import passport from 'passport'
import { Strategy } from 'passport-local'
import express from "express";
import { usersApi } from '../daos/index.js';
import { logger, loggerFile } from '../helpers/log4js.js';

const app = express()

const LocalStrategy = Strategy

export var loggedUser = {}

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

passport.serializeUser((usuario, done) => {
    done(null, usuario.username);
})

passport.deserializeUser((nombre, done) => {
    usersApi.getByName(nombre)
        .then((data) => done(null, data));

});

export const passportAuth = () => (
    passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login-error'
    })
)


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

const verifyPass = async (usuario, password) => {

    const match = await bcrypt.compare(password, usuario.password)
    return match

}

export const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}