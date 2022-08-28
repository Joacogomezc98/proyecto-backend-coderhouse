import express from 'express'
import { getMessagesById, renderMessages } from '../controllers/messages.js'
import { isAuth } from '../middlewares/authValidation.js'

const { Router } = express
export const chatRouter = Router()


/**
 * @swagger
 * /api/chat:
 *  get:
 *      summary: Vista de seccion de chat con todos los chats
 *      tags: [Chat]
 *      responses:
 *          200:
 *              description: Vista chat
 */
chatRouter.get('/', isAuth,renderMessages)

/**
 * @swagger
 * /api/chat/:email:
 *  get:
 *      summary: Todos los chats de un usuario
 *      tags: [Chat]
 *      parameters:
 *          - in: path
 *            required: true
 *            name: id
 *            schema:
 *              type: string
 *            example:
 *              example@email.com
 *      responses:
 *          200:
 *              description: Array con todos los chats de un usuario
 */
chatRouter.get('/:email', isAuth ,getMessagesById)