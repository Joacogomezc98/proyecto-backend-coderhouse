import { createTransport } from "nodemailer";

// NODEMAILER CONFIGURATION --------------------------------------------------------------------------------

const TEST_MAIL = 'joacogomezc@gmail.com'

export const mailTransporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: process.env.NODEMAILER_PASSWORD
    },
});


export const newUserMail = (data) => (
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

export const cartInfoMail = (data) => (
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