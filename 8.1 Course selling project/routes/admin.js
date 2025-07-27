const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const { z } = require("zod");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
const { adminMiddleware } = require("../middleware/admin");

const adminRouter = Router();



adminRouter.post("/signup", async function(req,res) {

  const requireBody = z.object({
    email: z.string().email().min(3).max(100),
    password: z.string()
      .min(5,"password must be atleast 5 characters longs")
      .max(20, "password cannot exceed 20 characters")
      .regex(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
        "Password must contain at least one uppercase letter and one special character"
      ),
      firstName: z.string(),
      lastName: z.string()
  })

  try {

    // Validation with Zod
    const parsedData = requireBody.safeParse(req.body);

    if(!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: parsedData.error.format()
      });
    }


    const { email, password, firstName, lastName } = req.body

    const hashedPassword = await bcrypt.hash(password,10);


    const response = await adminModel.findOne({
      email: email,
      password: hashedPassword
    })

    if(response) {
      return res.json({
        success: false,
        message: "Singup failed",
        error: {
          type: "DuplicationError",
          detail: "A user with email already exists"
        }
      })
    }

    const admin = await adminModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName
    });

    return res.status(201).json({
      success: true,
      messgae: "Congrats! You are singed up.",
      userId: admin._id
    })
  } catch(err) {
    return res.status(500).json({
      success: false,
      message: "Inertnal server error",
      error: {
        type: err.code === 11000 ? "DuplicateError" : "UnhandledError",
        detail: err.message || "Unexpected error occured"
      }
    })
  }
});




adminRouter.post("/signin", async function(req,res) {

  const requireBody = z.object({
    email: z.string().email().min(3).max(100),
    password: z.string()
      .min(5,"password less than 5 characters")
      .max(20, "password clonger than 20 characters")
      .regex(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
        "Password must contain at least one uppercase letter and one special character"
      )
  })


  try {
    const parsedData = requireBody.safeParse(req.body);

    if(!parsedData.success){
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: parsedData.error.format()
      })
    }


    const { email, password } = req.body;

    const response = await adminModel.findOne({
      email:email,
    })


    if(!response) {
      return res.status(401).json({
        success: false,
        message: "Inavlid email or password",
        error: { type: "AuthError", details: "Email not found"}
      })
    }


    const passwordMatch = await bcrypt.compare(password, response.password)

    if(!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        error: { type: "AuthError", details: "Password not found"}
      })
    }

    if(passwordMatch) {
      const token = jwt.sign({
        id: response._id
      }, JWT_SECRET_ADMIN)

     res.status(200).json({
      success: true,
      messgae: "Signin endpoint",
      token: token
    })
    }


  } catch(err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: {
        type: "UnhandledError",
        details: err.message
      }
    });
  }
});




adminRouter.post("/course", adminMiddleware, async function(req,res) {
  const adminId = req.adminId.toString();
  console.log(adminId);

  const requireBody = z.object({
    title: z.string(),
    description: z.string(),
    imageURL: z.string(),
    price: z.number(0, "price must be non-negative number"),
  })

  try {
    const parsedData = requireBody.safeParse(req.body);


    if(!parsedData.success){
      return res.status(400).json({
        success: false,
        message: "Validation error",
        detail: {
          type: "Validation error", error: "Please put correct format in input fields."
        },
        errors: parsedData.error.format()
      });
    }

    const { title, description, imageURL, price } = parsedData.data

    const alreadyExists = await courseModel.findOne({
      title,
      description,
      imageURL,
      price,
      creatorId: adminId
    })

    if(alreadyExists){
      return res.status(409).json({
        success: false,
        message: `This course for ${adminId} already exists and id is ${alreadyExists._id}`
      })
    }
    
    const course = await courseModel.create({
      title,
      description,
      imageURL,
      price,
      creatorId: adminId
    })

    if(course){
      return res.status(200).json({
        success: true,
        messgae: `New course of ${adminId} has been created and it's id is ${course._id}`
      })
    }



  } catch(err) {
    return res.status(500).json({
      success: false,
      message: "failed to create course",
      error: err.message
    })
  }

});




adminRouter.put("/course", adminMiddleware, async function(req,res) {
  const adminId = req.adminId
  // console.log(adminId);

  const requireBody = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(0, "price must be non-negative number"),
    imageURL: z.string(),
    courseId: z.string()
  })

  try {
    const parsedData = requireBody.safeParse(req.body);

    if(!parsedData.success){
      return res.status(400).json({
        success: false,
        messgae: "Validation error",
        detail: {
          type: "Validation error",
          error: "Please put correct format in input fields"
        },
        errors: parsedData.error.format()
      })
    }

    const { title, description, price, imageURL, courseId } = parsedData.data

    const course = await courseModel.findOne({
      creatorId: adminId,
      _id: courseId
    });

    if(!course) {
      return res.status(400).json({
        success: false,
        message: `Course with ${courseId} for admin ${adminId} not found.`
      });
    }

    const updatedCourse = await courseModel.findOneAndUpdate({
      _id: courseId,
      creatorId: adminId
    },
    {
      title,
      description,
      price,
      imageURL
    },
    {
      new: true
    });

    return res.status(200).json({
      success: true,
      messgae: "course updated successfully",
      updatedCourse
    })


  } catch(err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    })
  }
});




adminRouter.get("/course/bulk", function(req,res) {
  res.json({
    messgae: "Signin endpoint"
  })
});





module.exports = {
  adminRouter: adminRouter
}