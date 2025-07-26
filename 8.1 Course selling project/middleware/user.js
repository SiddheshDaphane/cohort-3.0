const jwt = require("jsonwebtoken");

const JWT_SECRET_USER = process.env.JWT_SECRET_USER;

function userMiddleware(req, res, next){
  const token = req.headers.authorization;
  const verifiedToekn = jwt.verify(token, JWT_SECRET_USER);
  console.log(verifiedToekn);

  if(verifiedToekn) {
    req.userId = verifiedToekn.id;
    next();
  } else {
    res.status(403).json({
      messgae: "Inavlid token"
    });
  }
};


module.exports = {
  userMiddleware: userMiddleware
}