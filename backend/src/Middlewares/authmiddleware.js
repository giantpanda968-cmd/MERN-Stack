require("dotenv").config()
const jwt = require("jsonwebtoken");

const ensureAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "jwt token is required",
    });
  }
  try {
    const token = authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
       return res.status(401).json({
      success: false,
      message: "Invalid JWT Token",
    });
  }
};

module.exports=ensureAuthentication