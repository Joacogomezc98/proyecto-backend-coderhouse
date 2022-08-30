import { usersApi } from "../daos/index.js";
import { logger } from "../helpers/log4js.js";
import { loggerFile } from "../helpers/log4js.js";
import { mailTransporter, newUserMail } from "../helpers/nodemailer.js";
import { createHash } from "../middlewares/authValidation.js";

// RENDERIZA LA VISTA DE LOGIN
export const loginRender = (req, res) => {
    res.status(200).render('login')
}

// SI HAY UN ERROR EN EL LOGGEO MUESTRA LA PANTALLA DE ERROR DE LOGIN
export const loginError = (req, res) => {
    loggerFile.error("Login error!");
    logger.error("Login error!");
    res.status(500).render('login-error');
}

// MUESTRA LA PANTALLA DE REGISTRO DE NUEVO USUARIO
export const renderRegister = (req, res) => {
    res.status(200).render('register');
}

// FUNCION QUE SE EJECUTA AL SUBIR EL FORMULARIO DE REGISTRO. DE HABER UN ERROR MUESTRA LA PANTALLA DE ERROR
// DE NO HABERLO REDIRECCIONA AL LOGIN HABIENDO GUARDADO EL NUEVO USUARIO
export const registerUser = async (req, res) => {
    const { email, password, nombre, direccion, edad, telefono, imagen } = req.body;

    const newUsuario = await usersApi.getByName(email)
        .then((data) => { return data });
    if (newUsuario) {
        res.status(500).render('register-error')
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
        res.status(200).redirect('/login')
    }
}

// TERMINA LA SESION
export const logout = (req, res) => {
    res.status(200).render('logout', { user: req.user.username })
    logger.info("success!");
    req.session.destroy(err => {
        if (err) {
            logger.error('Logout error')
            loggerFile.error('Logout error')
            return res.json({ status: 'Logout ERROR', body: err })
        }
    })
}

// RENDERIZA LA VISTA MAIN
export const renderLanding =(req, res) => {
    res.status(200).render('main', { user: req.user.username })
}

// SI EL USUARIO VA A UNA RUTA EN LA CUAL NO HAY NADA IMPLEMENTADO SE MUESTRA UN ERROR EN PANTALLA
export const notImplemented = (req, res) => {
    res.status(501).send({
        error: "Route not implemented"
    })
}