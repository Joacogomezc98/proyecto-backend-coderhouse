import { messagesApi } from "../daos/index.js";
import moment from 'moment'

export const getMessages = (socket) => {
    messagesApi.getAll()
        .then((mensajes) => socket.emit('messages', mensajes))
        .catch(() => console.log('Sorry, the messages were not received:('))
}

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