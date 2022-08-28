/**
 * @swagger
 * components:
 *  schemas:
 *      Order:
 *          type: object
 *          properties:
 *              timestamp:
 *                  type: date
 *                  description: Fecha de creacion de la orden
 *              items:
 *                  type: array
 *                  description: productos agregados a la orden
 *              orderNumber:
 *                  type: integer
 *                  description: Numero de orden
 *              status:
 *                  type: string
 *                  descripcion: estado actual de la orden
 *              email:
 *                  type: string
 *                  descripcion: email del usuario que genero la orden
 *          required:
 *              - timestamp
 *              - items
 *              - orderNumber
 *              - status
 *              - email
 *          example:
 *              timestamp: 2022-07-28T04:31:54.134+00:00
 *              items:
 *                  - title: SMIRNOFF ICE APPLE 473ml
 *                    price: 200
 *                    stock: 100
 *                    thumbnail: http://www.puroescabio.com.ar/web/image/product.template/74947/image_256/%5B4860%5D%20SMIRNOFF%20ICE%20473ml?unique=1e17d14
 *                    timestamp: 2022-07-27T04:31:54.134+00:00
 *                    category: VODKA
 *              orderNumber: 12
 *              status: generada
 *              email: example@email.com
 *                   
 */

// ARCHIVO SOLO PARA DOCUMENTACION DE ORDER SCHEMA
 