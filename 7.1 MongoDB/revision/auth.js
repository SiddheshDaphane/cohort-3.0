const jwt = require("jsonwebtoken");
const JWT_SECRET = "123456789";


function auth(req, res, next) {
  const token = req.headers.authorization
  const verifiedToken = jwt.verify(token, JWT_SECRET);

  // ✅ What Will Be in verifiedToken?
// If the token is valid and signed with the correct JWT_SECRET, then jwt.verify(...) returns the decoded payload — i.e., the original data you passed when the token was created using jwt.sign(...).

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