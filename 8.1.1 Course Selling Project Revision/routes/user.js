const { Router } = require("express");
const { userModel } = require("../db");
const JWT_SECRET_USER = process.env.JWT_SECRET_USER;

const userRoute = Router();


userRoute.post("/signup", function(req, res){
  res.json({
    messgae: "User signup endpoint"
  })
});


userRoute.post("/signin", function(req, res){
  res.json({
    messgae: "User signin endpoint"
  })
});


userRoute.post("/course/purchase", function(req, res){
  res.json({
    messgae: "User course purcahse endpoint"
  })
});


userRoute.get("/course/purchase", function(req, res){
  res.json({
    messgae: "User all purchased courses endpoint"
  })
});



module.exports = {
  userRoute
}