const UserModel = require("../models/userModels");
const taskModel = require("../models/taskModel");
const userLogin = async (req, res) => {
    // console.log(req.body);
    const { userid, password } = req.body;
    try {
        const User = await UserModel.findOne({ email: userid })
        //  console.log(User)
        if (!User) {
            res.status(400).send({ msg: "invalid Email" })
        }
        else if (User.password != password) {
            res.status(400).send({ msg: "invalid Password" })
        }
        else {
            res.status(200).send(User)
        }

    } catch (error) {
        console.log(error)

    }
}

const UserTaskdisplay = async (req, res) => {
    // // console.log(req.query)
    // const { id } = req.query;
    // try {

    //     const Task = await taskModel.find({ empid: id });
    //     res.status(200).send(Task);

    // } catch (error) {
    //     console.log(error);
    // }
    // console.log(req.body);
    const { id } = req.body;
    try {
        const TaskDisplay = await taskModel.find({ empid: id });
        console.log(TaskDisplay);
        res.status(200).send(TaskDisplay)
    } catch (error) {
        console.log(error)
    }
}
const UserTaskSubmit=async(req,res)=>{
    console.log(req.body);
    const { taskid, taskstatus }=req.body;
    try {
        const TaskSubmit=await taskModel.findByIdAndUpdate(taskid,{taskstatus:taskstatus,empreport:"submited"});
        res.status(200).send("Task Successfully submited!");
    } catch (error) {
        console.log(error)
    }
}
const ChangePassword=async(req,res)=>{
    // console.log(req.body);
   const {userid,oldpassword,newpassword,confirmpassword}=req.body;       
 try {
    const User=await UserModel.findById(userid)
    // console.log(User);
    if(User.password!=oldpassword)
    {
        res.status(400).send({msg:" Old Password not matches"})
    }
    else if(newpassword!=confirmpassword)
    {
        res.status(400).send({msg:" confirmpassword and Newpassword are not matches"})
    }
   else{
    const Changedpass=await UserModel.findByIdAndUpdate(userid,{password:newpassword});
    res.status(200).send({msg:"password successfully updated"})
   }
 } catch (error) {
    console.log(error)
 }
}
module.exports = {
    userLogin,
    UserTaskdisplay,
    UserTaskSubmit,
    // ChangePassword
    ChangePassword
}