require('dotenv').config();
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});


const emailOptions = {
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: ["bar@example.com", "baz@example.com"], // lista de receptores
    subject: "Hello",
    text: 'Hello world?', // cuerpo texto plano 
    html: '<b>Hello world?</b>' // cuerpo html
};

// const emailOptions = {
//     from: 'nodemailer@maga.net',
//     to: 'maga@gmail.com',
//     subject: 'Probando nodemailer',
//     text: 'Si si, funciona!'
// };

transport.sendMail(emailOptions, (err, data) => {
    console.log(data);
    if (err) {
        console.error("ha ocurrido un error", err);
    } else {
        console.log("se ha enviado el email");        
    }
});