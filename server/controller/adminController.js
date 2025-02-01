const  transporter  = require("../middleware/nodemailer");
const randomPassword = require("../middleware/randomPassword");
const AdminModel= require("../models/adminModels");

const UserModel=require("../models/userModels");
const TaskModel=require("../models/taskModel");
const adminLogin=async(req, res)=>{
    // const {userid, password} = req.body;
    // const Admin = await AdminModel.findOne({userid:userid});
    // console.log(Admin)
    const {userid, password} = req.body;
    // console.log(password)
    try {
        const Admin = await AdminModel.findOne({userid:userid});
        
        if (!Admin)
        {
            res.status(400).json({msg:"Invalid user Id"});
        }

        if(Admin.password!=password)
        {
            res.status(400).json({msg:"Invalid password"});
        }

        res.status(200).json(Admin)
    } catch (error) {
         console.log(error);
    }
      
}

const UserCreate=async(req,res)=>{
// console.log(req.body);
const {name,email,designation}=req.body;
const myPass= randomPassword();
const mailOptions={
    from:"chaurasiyanitin264@gmail.com",
    to:email,
    subject:"Your Company Work Detail Account",                     // Email subject
    text:`Dear ${name} Your Account created with password : ${myPass} 
     You can login using with your Email account
    `
};
try {
    const info=await transporter.sendMail(mailOptions);
    const userdata= await UserModel.create({
        name:name,
        email:email,
        designation:designation,
        password:myPass
    })
    res.status(200).json({success:true,message:'email sent',info});
} catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: error.message });
}

}

const TaskReceve=async(req,res)=>{
   
    try {
        const response=await UserModel.find();
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
    }
}


const AssignTask=async(req,res)=>{
    // console.log(req.body);
    const{ empid,title,description,duration}=req.body;
    try {
        const response=await TaskModel.create({
            title:title,
            description:description,
            duration:duration,
            empid:empid
        })
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
    }
  
}

const UserTaskDisplay=async(req,res)=>{
  try {
    const TaskReport=await TaskModel.find().populate("empid");
    res.status(200).send(TaskReport);
  } catch (error) {
    console.log(error)
  }
}

const ReassignTask=async(req,res)=>{
    // console.log(req.body);
   const { taskid }=req.body;
   try {
    const Reasign=await TaskModel.findByIdAndUpdate(taskid,{empreport:'pending'});
    res.status(200).send({msg:"Task Successfully Re-Assign"})
   } catch (error) {
    console.log(error)
   }
    
}

module.exports ={
    adminLogin,
    UserCreate,
    TaskReceve,
    AssignTask,
    UserTaskDisplay,
    ReassignTask
}