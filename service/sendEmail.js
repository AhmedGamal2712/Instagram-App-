const nodemailer = require("nodemailer");


async function sendEmail(dest,message) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: "ahmedgamal271297@gmail.com", // generated ethereal user
      pass: "dkondkitwvytfhne", // generated ethereal password
    },
  });

  
  let info = await transporter.sendMail({
    from: `Fred Foo 👻" <ag421545@gmail.com>`, 
    to: dest, 
    subject: "Hello ✔", 
    text: "Hello world?", 
    html: message, 
  });
}



module.exports = sendEmail