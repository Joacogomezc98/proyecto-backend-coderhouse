import { loginError, loginRender, logout, notImplemented, registerUser, renderLanding, renderRegister } from "../controllers/auth.js";
import { isAuth, passportAuth } from "../middlewares/authValidation.js";
import express from "express";
import passport from "passport";


const { Router } = express

export const authRouter = Router()

authRouter.get("/login",loginRender)

authRouter.post('/login',  passport.authenticate('local',
{
    successRedirect: '/',
    failureRedirect: '/login-error'
}))

authRouter.get('/login-error', loginError)

authRouter.get('/register', renderRegister)

authRouter.post('/register', registerUser);

authRouter.get('/logout', logout)

// LANDING PAGE
authRouter.get('/', isAuth, renderLanding)

// ANY OTHER ROUTE
authRouter.get('*', notImplemented)