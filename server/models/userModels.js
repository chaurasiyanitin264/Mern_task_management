const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    designation:String,
    password:String,
    userProfile:String
})
module.exports=mongoose.model("UserCreated",userSchema);