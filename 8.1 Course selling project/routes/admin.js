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


    return res.status(200).json({
      success: true,
      messgae: "Signin endpoint",
      userId: response._id
    })
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