const jwt = require("jsonwebtoken");
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;

function adminMiddleware(req, res, next){
  const token = req.headers.authorization;

  try 
    {
      const verifiedToekn = jwt.verify(token, JWT_SECRET_ADMIN);
    
      if(verifiedToekn) {
        req.adminId = verifiedToekn.id;
        next();
      }
      else {
        return res.status(403).json({
          success: false,
          messgae: "Inavlid token"
        });
      }
    } catch(err){
      return res.status(403).json({
        success: false,
        messgae: "Token verification failed",
        error: err.message
      })
    }
};


module.exports = {
  adminMiddleware: adminMiddleware
}