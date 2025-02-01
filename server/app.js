const express= require("express");
const app= express();
const cors= require("cors");
const mongoose=require("mongoose");
require("dotenv").config();
const adminRoute= require("./routes/adminRoutes");
const userRoute=require("./routes/userRoutes");
const bodyparser = require('body-parser');
const port =process.env.PORT ||8000;
const MNDB=process.env.DBCONN;

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


mongoose
  .connect(MNDB)
  .then(() => {
    console.log("DB Connected!!!");
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });

app.use("/admin", adminRoute);
app.use("/user", userRoute);


app.listen(port, ()=>{
    console.log("Server run on 8000 port!");
})