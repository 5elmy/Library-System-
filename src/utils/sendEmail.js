import nodemailer from "nodemailer"

async function sendEmail({to=[],cc,bcc,subject,text,html,attachments=[]}={}) {
 

  let transporter = nodemailer.createTransport({
    service:"gmail",
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SENDER_EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Library App   👻" ${process.env.SENDER_EMAIL}`, // sender address
    to,           // list of receivers
    subject,     // Subject line
    text,       // plain text body
    html,      // html body
    bcc,
    cc,
    attachments
  });

  console.log(info);

  
  return info.rejected.length ? false : true ;
}

export default sendEmail
