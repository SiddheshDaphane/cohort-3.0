const { Router } = require("express");
const { userModel } = require("../db");
const JWT_SECRET_USER = process.env.JWT_SECRET_USER;
const { userSingupSchema, userSinginSchema } = require("../validation/userValidation")
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRoute = Router();

console.log("Hi there")

userRoute.post("/signup", async function(req, res){
  console.log("Singup endpont");
  try{
    console.log("Inside try block");
    const parsedData = userSingupSchema.safeParse(req.body);
    console.log(parsedData);

    if(!parsedData.success){
      return res.status(400).json({
        success: false,
        messgae: "Validation error",
        errors: parsedData.error.format()
      })
    }

    const { email, password, firstName, lastName } = parsedData.data 

    
    const response = await userModel.findOne({
      email
    })
    
    if(response){
      return res.status(409).json({
        success: false,
        messgae: "User already exists", 
      })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    if(user){
      return res.status(200).json({
        success: true,
        messgae: "Congrats. User has been created"
      })
    }

  } catch(err){
    return res.status(500).json({
      success: false,
      messgae: "internal server error",
      errors: err.message
    })
  }
});


userRoute.post("/signin", async function(req, res){
  console.log("Signin Endpoint");

  try {
    const parsedData = userSinginSchema.safeParse(req.body);
    // console.log(parsedData);
    if(!parsedData.success){
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: parsedData.error.format()
      })
    }

    const { email, password } = parsedData.data

    const response = await userModel.findOne({
      email
    })

    // console.log(response);

    if(!response){
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
        error: "Invalid email"
      })
    }

    const passwordMatch = await bcrypt.compare(password, response.password);
    console.log(passwordMatch);

    if(!passwordMatch){
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
        error: "Incorrect password"
      });
    }

    const token = jwt.sign({
      id: response._id
    }, JWT_SECRET_USER);

    return res.status(200).json({
      success: true,
      message: "You are signed in successfully",
      token: token
    })

  } catch(err){
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: err.message
    })
  }
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