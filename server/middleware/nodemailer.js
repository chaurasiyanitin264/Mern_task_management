const nodemailer=require("nodemailer");
const  transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"chaurasiyanitin264@gmail.com",
        pass:"fanj lwpc mhbn oilw"
    }
})
transporter.verify((error,success)=>
{
    if(error){
        console.error('Error connecting to email service:', error);
    } else {
      console.log('Email service ready to send messages');
    }
})
module.exports=transporter;