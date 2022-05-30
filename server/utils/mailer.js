require('dotenv').config();

const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "inventoryplus@zoho.com",
    pass: "Poornima2022"
  }
});

const mailOptions = {
  from: 'inventoryplus@zoho.com', // Sender address
  to: 'jcfargond@gmail.com', // List of recipients
  subject: 'Node Mailer', // Subject line
  text: 'Hello People!, Welcome to Bacancy!', // Plain text body
};

transport.sendMail(mailOptions, function(err, info) {
 if (err) {
   console.log(err)
 } else {
   console.log(info);
 }
});

