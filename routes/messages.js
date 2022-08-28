/**
 * @swagger
 * components:
 *  schemas:
 *      Mensajes:
 *          type: object
 *          properties:
 *              timestamp:
 *                  type: date
 *                  description: Fecha de creacion del mensaje
 *              author:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          description: user email
 *                      avatar:
 *                          type: string
 *                          description: avatar url
 *              text:
 *                  type: string
 *                  description: message text
 *          required:
 *              - timestamp
 *              - author
 *              - text
 *          example:
 *              timestamp: 2022-07-28T04:31:54.134+00:00
 *              author:
 *                  email: example@email.com
 *                  avatar: http://exampleurl.com
 *              text: Hola como estas?
 *                   
 */

// ARCHIVO SOLO PARA DOCUMENTACION DE MESSAGE SCHEMA