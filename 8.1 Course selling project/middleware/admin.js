const jwt = require("jsonwebtoken");
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;

function adminMiddleware(req, res, next){
  const token = req.headers.authorization;
  const verifiedToekn = jwt.verify(token, JWT_SECRET_ADMIN);

  if(verifiedToekn) {
    req.adminId = verifiedToekn.id;
    next();
  } else {
    res.status(403).json({
      messgae: "Inavlid token"
    });
  }
};


module.exports = {
  adminMiddleware: adminMiddleware
}