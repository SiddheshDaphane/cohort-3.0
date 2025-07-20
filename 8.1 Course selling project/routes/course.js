const { Router } = require("Express");

const courseRouter = Router();


courseRouter.post("/purchase", function(req,res) {
  res.json({
    message: "Purchase a course."
  })

});


courseRouter.get("/preview", function(req,res) {
  res.json({
    message: "get a course."
  })
});

module.exports = {
  courseRouter: courseRouter
}