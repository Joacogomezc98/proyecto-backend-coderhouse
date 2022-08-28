/**
 * @swagger
 * components:
 *  schemas:
 *      Users:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *                  description: mail de usuario
 *              password:
 *                  type: string
 *                  description: contraseña del usuario
 *              name:
 *                  type: string
 *                  description: nombre del usuario
 *              address:
 *                  type: string
 *                  description: direccion del usuario
 *              age:
 *                  type: integer
 *                  description: Edad del usuario
 *              phoneNumber:
 *                  type: string
 *                  description: Numero de telefono del usuario
 *              imgUrl:
 *                  type: string
 *                  description: Url de la imagen de perfil del usuario
 *          required:
 *              - username
 *              - password
 *              - name
 *              - address
 *              - age
 *              - phoneNumber
 *              - imgUrl
 *          example:
 *              username: example@email.com
 *              password: $2b$10$XDkYBFwFLdHbfJkQ0wv6i.fR1nti69VfbCTa7DYp/Tp5QjD2V3e32
 *              name: John Doe
 *              address: Av ejemplo 1234 
 *              age: 22
 *              phoneNumber: 011245678
 *              imgUrl: https://exampleImage.com     
 */

// ARCHIVO SOLO PARA DOCUMENTACION DE USER SCHEMA
