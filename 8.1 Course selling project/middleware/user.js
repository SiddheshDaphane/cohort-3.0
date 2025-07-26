const jwt = require("jsonwebtoken");

const JWT_SECRET_USER = process.env.JWT_SECRET_USER;

function userMiddleware(req, res, next){
  const token = req.headers.authorization;

  try 
    {
      const verifiedToekn = jwt.verify(token, JWT_SECRET_USER);
    
      if(verifiedToekn) {
        req.userId = verifiedToekn.id;
        next();
      } else {
        return res.status(403).json({
          success: false,
          messgae: "Inavlid token"
        });
      }
   } catch(err) {
      return res.status(403).json({
        success: false,
        messgae: "Cannot verify token",
        error: err.messgae
      })
  }
};


module.exports = {
  userMiddleware: userMiddleware
}