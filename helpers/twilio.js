import twilio from 'twilio'
import { loggedUser } from '../middlewares/authValidation.js'
import dotenv from 'dotenv'
dotenv.config()

//TWILLIO CREDENTIALS
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
export const twilioClient = new twilio(accountSid, authToken)

//TWILIO WHATSAPP ------------------------------------------------------------------
export const whatsappMessage = (data) => {
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
