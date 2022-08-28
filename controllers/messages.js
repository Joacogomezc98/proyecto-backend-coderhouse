import { messagesApi } from "../daos/index.js";
import moment from 'moment'

// TRAE TODOS LOS MENSAJES DESDE LA DB
export const getMessages = (socket) => {
    messagesApi.getAll()
        .then((mensajes) => socket.emit('messages', mensajes))
        .catch(() => console.log('Sorry, the messages were not received:('))
}

// GUARDA UN MENSAJE EN LA BASE DE DATOS Y ACTUALIZA LOS MENSAJES EN LA VISTA
export const saveMessage = (io, data) => {
    data.timestamp = moment().format("YYYY/MM/DD HH:mm:ss")
    messagesApi.create(data)
        .then(() => {
            messagesApi.getAll()
                .then((mensajes) => {
                    io.sockets.emit('messages', mensajes)
                })
                .catch(() => console.log('Sorry, the messages were not received:('))

        })
        .catch((err) => console.log(err))
}

// AGARRA TODOS LOS MENSAJES FILTRADOS POR EL MAIL EN SU PARAMETRO
export const getMessagesById = (req, res) => {

    const email = req.params.email

    messagesApi.getMessagesById(email)
    .then((mensajes) => {
        res.send(mensajes)
    })
    .catch(() => console.log('Sorry, the messages were not received :('))


}

// RENDERIZA LA PANTALLA DE MENSAJES
export const renderMessages = (req, res) => {
    res.render('chat')
}