import express from 'express'
import { getMessages, getMessagesById, renderMessages } from '../controllers/messages.js'
import { isAuth } from '../middlewares/authValidation.js'

const { Router } = express
export const chatRouter = Router()


//Trae todos los mensajes
chatRouter.get('/', isAuth,renderMessages)

//Trae los mensajes de ese usuario
chatRouter.get('/:email', isAuth ,getMessagesById)