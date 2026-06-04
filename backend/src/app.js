const express=require("express");
const authRoutes=require("./routes/auth.routes")
const cors=require("cors")

const app=express()
app.use(express.json())  //middleware
app.use(cors());

app.use("/api/auth",authRoutes);

module.exports=app