let emod = require('nodemailer');

let transporter = emod.createTransport({
    service:'',
    auth:{
        user:'',
        pass:''
    }
});
let mailOptions = {
    from:'',
    to:'',
    subject:' HI Friend ',
    html:`<h1 style="color:red">hello my dear friend</h1>
         <h2>how are you</h2>
         <img src='https://drive.google.com/file/d/1EaKSXLrzWrXYdqUkSbctUTyeKnOtu1GU/view' alt='this is certificate'>
    `,
    text:'this is demo'
}
transporter.sendMail(mailOptions,(err,info)=>{
   if(err){
      console.log('error in send;....'+err);
   }else{
        console.log('successfully sent....');
   }
});
module.exports = transporter