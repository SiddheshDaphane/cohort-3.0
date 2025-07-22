const { Router } = require("express");
const { adminModel } = require("../db");

const adminRouter = Router();

adminRouter.post("/signup", function(req,res) {
  res.json({
    messgae: "Signup endpoint"
  })
});


adminRouter.post("/signin", function(req,res) {
  res.json({
    messgae: "Signin endpoint"
  })
});


adminRouter.post("/", function(req,res) {
  res.json({
    messgae: "Signin endpoint"
  })
});

adminRouter.put("/course", function(req,res) {
  res.json({
    messgae: "Signin endpoint"
  })
});

adminRouter.get("/course/bulk", function(req,res) {
  res.json({
    messgae: "Signin endpoint"
  })
});


module.exports = {
  adminRouter: adminRouter
}