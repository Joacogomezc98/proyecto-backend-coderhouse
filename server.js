import configs from "./configs.js"
import express from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import handlebars from 'express-handlebars'
import MongoStore from "connect-mongo";
import parseArgs from "minimist";
import cluster from "cluster";
import { Server as HttpServer } from 'http'
import { cartRouter } from "./routes/cart.js";
import { productsRouter } from "./routes/products.js";
import { authRouter } from "./routes/auth.js";
import { logger } from "./helpers/log4js.js";
import { Server as IOServer } from 'socket.io'
import { getMessages, saveMessage } from "./controllers/messages.js";
import { chatRouter } from "./routes/chat.js";


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/static', express.static(__dirname + '/public'))

let minimistOptions = { alias: { m: 'mode' } }

// SESSION CONFIG ----------------------------------------

app.use(cookieParser())
app.use(session({

    store: MongoStore.create({
        mongoUrl: process.env.MONGO_STORE_CREDENTIALS,
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


// SCREENS ENGINE ------------------------------------------------------------------------------------------

app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "views/partials"
}))

app.set("view engine", "hbs")
app.set("views", "./views")

//--------------------------------------------------------------------------------------------------------------------
// SOCKETS CONFIG SECTION ------------------------------------------

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

io.on("connection", (socket) => {
    logger.info('New user connected to the chat')

    getMessages(socket)

    socket.on('new-message', data => {
        saveMessage(io, data)
    })
})
// VARIABLES SERVIDOR


const PORT = configs.port

const MODE = parseArgs(process.argv.slice(2), minimistOptions).mode || 'FORK'

app.use('/api/carrito', cartRouter)

app.use('/api/productos', productsRouter)

app.use('/api/chat', chatRouter)

app.use('/', authRouter)



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



//--------------------------------------------------------------------------------------------------------------------

// DB CONNECTIONS

const db = configs.db
