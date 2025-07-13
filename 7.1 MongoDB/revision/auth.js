const jwt = require("jsonwebtoken");
const JWT_SECRET = "123456789";


function auth(req, res, next) {
  const token = req.headers.authorization
  const verifiedToken = jwt.verify(token, JWT_SECRET);

  if (verifiedToken){
    req.userId = verifiedToken.id;
    next()
  } else {
    res.json({
      messgae: "Inavlid token"
    })
  }
}

module.exports = {
  auth,
  JWT_SECRET
}