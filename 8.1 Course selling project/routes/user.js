const { Router } = require("express");

const userRouter = Router();


userRouter.post("/signup", function(req,res) {
  res.json({
    messgae: "Signup endpoint"
  })
});


userRouter.post("/signin", function(req,res) {
  res.json({
    messgae: "Signin endpoint"
  })
});


userRouter.get("/purchases", function(req,res) {
  res.json({
    messgae: "user purchase endpoint"
  })
});


module.exports = {
  userRouter: userRouter
}