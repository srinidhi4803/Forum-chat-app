import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();
let transporter = nodemailer.createTransport({
    service:process.env.MAIL_SERVICE,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    }
});

const sendMail = async (mailOptions) => {
   transporter.sendMail(mailOptions, async (err, info) => {
      if (err) {
        console.log("Error in sending email: " + err)
      } else {
        console.log("Email sent successfully: " + info.response)
      }
    })
  }

export default sendMail;