const { Router } = require("express");
const { adminModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");

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