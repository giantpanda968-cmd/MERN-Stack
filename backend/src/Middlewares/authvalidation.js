
const signupvalidation=(req,res,next)=>{

   const {name,email,password}=req.body;

  //  if(!name.trim()||!email.trim()||!password.trim()){
  //   return res.status(400).json({
  //     success:false,
  //     message:""
  //   })
  //  }

  if(name.trim().length<3){
    return res.status(400).json({
        success:false,
        message:"Name must be atleast 3 characters"
    })
  }
  if(password.length<6){
    return res.status(400).json({
        success:false,
        message:"password must be atleast 6 characters",
    })
  }
  next();
}

// Login validation


const loginvalidation=(req,res,next)=>{

   const {email,password}=req.body;

  if(!email){
    return res.status(400).json({
        success:false,
        message:"email require"
    })
  }
  if(!password||password.length<6){
    return res.status(400).json({
        success:false,
        message:"password is wrong and password must be atleast 6 characters",
    })
  }
  next();
}


module.exports={
    signupvalidation,
    loginvalidation
}