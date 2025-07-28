const { Router } = require("express");
const { adminModel } = require("../db");
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;

const adminRoute = Router();


adminRoute.post("/singup", function(req, res) {
  res.json({
    message: "admin singup point"
  })
});



adminRoute.post("/singin", function(req, res) {
  res.json({
    message: "admin singin point"
  })
});



adminRoute.post("/create/course", function(req, res) {
  res.json({
    message: "admin create course point"
  })
});



adminRoute.get("/courses", function(req, res) {
  res.json({
    message: "admin get all courses point"
  })
})


module.exports = {
  adminRoute
}