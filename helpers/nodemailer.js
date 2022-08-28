import { createTransport } from "nodemailer";

// NODEMAILER CONFIGURATION --------------------------------------------------------------------------------

// SE DEFINE EL MAIL DONDE VAN A LLEGAR LAS NOTIFICACIONES
const TEST_MAIL = process.env.ADMIN_EMAIL

// CONFIGURACION PARA NODEMAILER
export const mailTransporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: process.env.NODEMAILER_PASSWORD
    },
});

// PARAMETROS PARA NOTIFICACION DE NUEVO USUARIO
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

// PARAMETROS PARA NOTIFICACION DE COMPRA DE UN CARRITO
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