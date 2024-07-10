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

/*transporter.sendMail(mailOptions,(err,info)=>{
   if(err){
      console.log('error in send;....'+err);
   }else{
        console.log('successfully sent....');
   }
});*/
export default transporter;