import { carritoApi, productosApi, usersApi } from "./daos/index.js"
import configs from "./configs.js"
import express from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'
import session from 'express-session'
import bcrypt from 'bcrypt'
import passport from 'passport'
import { Strategy } from 'passport-local'
import handlebars from 'express-handlebars'
import MongoStore from "connect-mongo";
import { createTransport } from "nodemailer";
import parseArgs from "minimist";
import cluster from "cluster";
import { Server as HttpServer } from 'http'
import log4js from 'log4js'
import twilio from 'twilio'


const __dirname = dirname(fileURLToPath(import.meta.url));
const { Router } = express

const LocalStrategy = Strategy


const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/static', express.static(__dirname + '/public'))

const productRouter = Router()

const cartRouter = Router()

let loggedUser = {}

let minimistOptions = { alias: { m: 'mode' } }

//TWILLIO CREDENTIALS
const accountSid = 'AC80da446cc81a8c79a34de6fbb737444e'
const authToken = 'c8603ce3e361706042e1c09f00d03df1'
const twilioClient = new twilio(accountSid, authToken)

//MIDDLEWARES ----------------------------------------------------------------------
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
// SESSION CONFIG ----------------------------------------

app.use(cookieParser())
app.use(session({

    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://joacogomezc-coder:cote1234@cluster0.7fsut.mongodb.net?retryWrites=true&w=majority',
        ttl: 600
    }),
    secret: 'shhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }

}))

app.use(passport.initialize())
app.use(passport.session())

// AUTH METHODS ---------------------------------------------------------


const createHash = async (password) => {
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

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

// NODEMAILER CONFIGURATION --------------------------------------------------------------------------------

const TEST_MAIL = 'joacogomezc@gmail.com'

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'rmsafoezvdxwcher'
    },
});


const newUserMail = (data) => (
    {
        from: TEST_MAIL,
        to: TEST_MAIL,
        subject: 'Un nuevo usuario ha sido creado!',
        html: `<h1>New user created: ${data.email}</h1>
               <h2>The Following data is available for this user</h2>
               <ul>
                    <li>${data.nombre}</li>
                    <li>${data.direccion}</li>
                    <li>${data.edad}</li>
                    <li>${data.telefono}</li>
                    <li><img src='${data.imagen}'/></li>
               </ul>
        `
    }
)

const cartInfoMail = (data) => (
    {
        from: TEST_MAIL,
        to: TEST_MAIL,
        subject: `Nuevo pedido de ${data.username} - ${data.email}`,
        html: `<h1>cartID: ${data.cart._id}</h1>
               <h2>El carrito contiene los siguientes productos</h2>
               <ul>
                    ${data.cart.products.map((product) => (
            `<li>${product.title}</li>`
        ))}
               </ul>
        `
    }
)

//TWILIO WHATSAPP ------------------------------------------------------------------

const whatsappMessage = (data) => {
    twilioClient.messages.create({
        body: `Nuevo pedido de ${data.username} - ${data.email}
                Su pedido con el numero ${data.cart._id} ha sido recibido y esta en proceso.
                El carrito contiene los siguientes productos:
                        ${data.cart.products.map((product) => (
                        `- ${product.title}`
                        )
                        )}`,
        from: "whatsapp:+14155238886",
        to: `whatsapp:${loggedUser.phoneNumber}`
    })
        .then((message) => logger.info(message.sid))
        .catch((err) => {
            logger.error(err)
            loggerFile.error(err)
        })
}

// LOG CONFIGURATION---------------------------------------------------------

log4js.configure({
    appenders: {
        // defino dos soportes de salida de datos
        consola: { type: "console" },
        archivo: { type: "file", filename: "error.log" },
        archivo2: { type: 'file', filename: 'warn.log' },
        // defino sus niveles de logueo
        loggerConsola: {
            type: "logLevelFilter",
            appender: "consola",
            level: "info",
        },
        loggerArchivo: {
            type: "logLevelFilter",
            appender: "archivo",
            level: "error",
        },
        loggerArchivo2: {
            type: 'logLevelFilter',
            appender: 'archivo2',
            level: 'warn'
        }
    },
    categories: {
        default: {
            appenders: ["loggerConsola"],
            level: "all",
        },
        file: {
            appenders: ["loggerArchivo", 'loggerArchivo2'],
            level: "all",
        },
    },
});


const logger = log4js.getLogger();
const loggerFile = log4js.getLogger("file");


// LOGIN ROUTES -------------------------------------------------------------------------------------------

app.get("/login", (req, res) => {
    res.render('login')
})


app.post('/login', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login-error'
    })
)

app.get('/login-error', (req, res) => {
    loggerFile.error("Login error!");
    logger.error("Login error!");
    res.render('login-error');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
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
            const info = await transporter.sendMail(newUserMail({ email, password, nombre, direccion, edad, telefono, imagen }))
        } catch (err) {
            logger.error(err)
            loggerFile.error(err)
        }
        logger.info("success!");
        res.redirect('/login')
    }
});

app.get('/logout', (req, res) => {
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
)


// ----------------------------------------------------------

// SCREENS ENGINE ------------------------------------------------------------------------------------------

app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "views/partials"
}))

app.set("view engine", "hbs")
app.set("views", "./views")




// PRODUCTS -------------------------------------------------------------------------------------------------------

// DEVOLVER TODOS LOS PRODS
productRouter.get('/', isAuth, (req, res) => {

    productosApi.getAll()
        .then(data => res.send(data))

})

// DEVOLVER PROD SEGUN ID
productRouter.get('/:id', isAuth, (req, res) => {
    const id = req.params.id

    productosApi.getById(id)
        .then(idProd => {
            // Verifico que el producto exista
            res.send(idProd)
        })
        .catch(
            res.send({ error: "Product not found" })
        )

})

// RECIBE Y AGREGA UN PRODUCTO, LO DEVUELVE CON SU ID ASIGNADO
productRouter.post('/', (req, res) => {
    const newProduct = req.body
    newProduct.timestamp = new Date()

    const administrador = newProduct.admin

    if (!administrador) {
        res.send({ error: "Request not authorized" })
    } else {
        productosApi.create(newProduct)
            .then(saveProduct => res.send(saveProduct))

    }


})

// RECIBE Y ACTUALIZA UN PRODUCTO SEGUN SU ID
productRouter.put('/:id', (req, res) => {

    const modProduct = req.body

    const administrador = modProduct.admin

    if (!administrador) {
        res.send({ error: "Request not authorized" })

    } else {

        const id = req.params.id

        productosApi.modifyProduct(modProduct, id)
            .then((response) => res.send(response))
            .catch((response) => res.send(response))

    }

})

// ELIMINA UN PRODUCTO SEGUN SU ID
productRouter.delete('/:id', (req, res) => {

    const administrador = req.body.admin

    if (!administrador) {
        res.send({ error: "Request not authorized" })
    } else {

        const id = req.params.id

        productosApi.deleteById(id)
            .then(deletedProd => {
                if (deletedProd) {
                    res.send("The product has been deleted")
                } else {
                    res.send("Sorry, product was not found!")
                }

            })

    }

})

// CART --------------------------------------------------------------------------------------------------------------------

// CREA UN CARRITO Y DEVUELVE EL ID
cartRouter.post('/', (req, res) => {
    const newCart = {
        timestamp: new Date(),
        productos: []
    }

    carritoApi.create(newCart)
        .then(savedCart => res.send(`Your cart ID: ${savedCart.id}`))


})

//VACIA UN CARRITO Y LO ELIMINA
cartRouter.delete('/:id', (req, res) => {


    const id = req.params.id

    carritoApi.deleteById(id)
        .then(deletedCart => {
            if (deletedCart) {
                res.send("The cart has been deleted")
            } else {
                res.send({ error: "Cart was not found!" })
            }
        })

})

// LISTAR TODOS LOS PRODUCTOS GUARDADOS EN EL CARRITO
cartRouter.get("/:id/productos", isAuth, (req, res) => {

    const id = req.params.id

    carritoApi.getById(id)
        .then(cart => res.send(cart.productos))
        .catch(err => res.send(err))

})

//ENVIA POR MAIL Y WHATSAPP EL CONTENDIO DEL CARRITO
cartRouter.post('/checkout/:id', (req, res) => {

    const id = req.params.id
    const username = loggedUser.name
    const email = loggedUser.username

    carritoApi.getById(id)
        .then((cart) => {
            try {
                transporter.sendMail(cartInfoMail({ email, username, cart }))
                whatsappMessage({email, username, cart})
            } catch (err) {
                logger.error(err)
                loggerFile.error(err)
            }
        })
        .then(() => res.send('Cart checked out'))

})

//AGREGAR UN PRODUCTO AL CARRITO POR SU ID

cartRouter.post("/:id/productos", (req, res) => {

    const id = req.params.id

    const prodID = req.body.id

    productosApi.getById(prodID)
        .then((product) => {
            carritoApi.addProduct(id, product)
                .then(() => res.send("Product added"))
                .catch((e) => res.send(e))
        })
        .catch((e) => res.send(e))


})

// ELIMINAR UN PRODUCTO DEL CARRITO POR SU ID DE CARRITO Y DE PRODUCTO

cartRouter.delete("/:id/productos/:id_prod", (req, res) => {

    const cartID = req.params.id
    const prodID = req.params.id_prod

    carritoApi.deleteProduct(cartID, prodID)

        .then(cart => res.send(`${cart} has been deleted from the cart`))
        .catch(resp => res.send(resp))

})

// LANDING PAGE

app.get('/', isAuth, (req, res) => {
    res.render('main', { user: req.user.username })
})




//--------------------------------------------------------------------------------------------------------------------

// VARIABLES SERVIDOR
app.use('/api/productos', productRouter)

app.use('/api/carrito', cartRouter)

app.get('*', (req, res) => {
    res.send({
        error: "Route not implemented"
    })
})
const httpServer = new HttpServer(app)

const PORT = configs.port

const MODE = parseArgs(process.argv.slice(2), minimistOptions).mode || 'FORK'

if (MODE === 'CLUSTER' && cluster.isPrimary) {
    logger.info(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('listening', (worker, address) => {
        logger.info(
            `Worker ${worker.process.pid} is listening in port ${address.port}`
        );
    });
} else {

    httpServer.listen(PORT, logger.info(`Server listenting on PORT: ${PORT}`))

}


// DB CONNECTIONS

const db = configs.db
