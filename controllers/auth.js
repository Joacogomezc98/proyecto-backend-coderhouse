import { usersApi } from "../daos/index.js";
import { logger } from "../helpers/log4js.js";
import { loggerFile } from "../helpers/log4js.js";
import { mailTransporter, newUserMail } from "../helpers/nodemailer.js";
import { createHash } from "../middlewares/authValidation.js";

export const loginRender = (req, res) => {
    res.render('login')
}

export const loginError = (req, res) => {
    loggerFile.error("Login error!");
    logger.error("Login error!");
    res.render('login-error');
}

export const renderRegister = (req, res) => {
    res.render('register');
}

export const registerUser = async (req, res) => {
    const { email, password, nombre, direccion, edad, telefono, imagen } = req.body;

    const newUsuario = await usersApi.getByName(email)
        .then((data) => { return data });
    if (newUsuario) {
        res.render('register-error')
        logger.error(`${newUsuario} already exists as a user`);
        loggerFile.error(`${newUsuario} already exists as a user`);
    } else {
        await usersApi.create({
            username: email,
            password: await createHash(password),
            name: nombre,
            address: direccion,
            age: edad,
            phoneNumber: telefono,
            imgUrl: imagen
        });

        // EMAIL WITH DATA IS SENT TO ADMIN
        try {
            const info = await mailTransporter.sendMail(newUserMail({ email, password, nombre, direccion, edad, telefono, imagen }))
        } catch (err) {
            logger.error(err)
            loggerFile.error(err)
        }
        logger.info("success!");
        res.redirect('/login')
    }
}

export const logout = (req, res) => {
    res.render('logout', { user: req.user.username })
    logger.info("success!");
    req.session.destroy(err => {
        if (err) {
            logger.error('Logout error')
            loggerFile.error('Logout error')
            return res.json({ status: 'Logout ERROR', body: err })
        }
    })
}

export const renderLanding =(req, res) => {
    res.render('main', { user: req.user.username })
}

export const notImplemented = (req, res) => {
    res.send({
        error: "Route not implemented"
    })
}