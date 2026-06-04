require("dotenv").config();
const userModel = require("../models/usermodel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");



// signup---

async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: "user Already exist",
        success:false
      });
    }

    const usermodel = new userModel({
      name,
      email,
      password,
    });
    usermodel.password=await bcrypt.hash(password,10);
    await usermodel.save();

    res.status(201).json({
        success:true,
      message: "user created succesfully",
    });
  } catch (error) {
    res.status(500).json({
        message:"internal server error",
        success:false
    })
  }
}



// login----

async function login(req, res) {
    try{
  const { email, password } = req.body;

  const user=await userModel.findOne({email});
  const errorMsg="Auth failed email or password is wrong";
  if(!user){
    return res.status(403).json({
        message:errorMsg,
        success:false
    })
  }
  const isPassEqual=await bcrypt.compare(password,user.password);

  if(!isPassEqual){
    return res.status(403).json({
        message:errorMsg,
        success:false
    })
  }
  const jwtToken=jwt.sign({email:user.email,_id:user._id},
    process.env.JWT_SECRET,
    {expiresIn:'24h'}
  )
  res.status(200).json({
    success:true,
    message: " user login succesfully",
    jwtToken,
    email,
    name:user.name
  });
}catch(error){
    res.status(500).json({
        message:"internal server error",
        success:false
    })
}
}

module.exports = { signup, login };
