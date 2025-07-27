const { Router } = require("Express");
const { userMiddleware } = require("../middleware/user");
const { userModel, courseModel, purchaseModel } = require("../db");

const courseRouter = Router();


courseRouter.post("/purchase",userMiddleware, async function(req,res) {
  const userId = req.userId
  const courseId = req.body.courseId

  try{

    const response = await purchaseModel.findOne({
      userId,
      courseId
    })

    console.log(response);

    if(response){
      return res.status(409).json({
        success: false,
        message: "You have already purchased this course"
      });
    }

    const purchasedCourse = await purchaseModel.create({
      userId,
      courseId
    })

    if(purchasedCourse){
      return res.status(200).json({
        success: true,
        message: "Congrats. You purchased this course"
      });  

    }

  } catch(err){
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errors: err.message
    });
  }
});


courseRouter.get("/preview", async function(req,res) {

  try {
    const courses = await courseModel.find({})
    return res.status(200).json({
      success: true,
      courses
    })
  } catch(err){
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: err.message
    })
  }
});

module.exports = {
  courseRouter: courseRouter
}