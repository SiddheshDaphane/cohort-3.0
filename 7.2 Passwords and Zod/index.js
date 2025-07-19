require("dotenv").config(); // Load env variables from .env
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { UserModel, TodoModel } = require("./db")
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET; 

mongoose.connect(process.env.MONGODB_URL);


const app = express();
app.use(express.json());


app.post("/signup", async function(req, res) {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      email: email,
      name: name,
      password: hashedPassword
    });
    res.json({
      messgae: "You are signed up!"
    })
  } catch(e) {
    res.status(500).json({
      messgae: "Error while signing up"
    })
  }
});

app.post("/signin", async function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const response = await UserModel.findOne({
      email: email,
  });

  const passwordMatch = bcrypt.compare(password, response.password)

  if(response && passwordMatch){
    const token = jwt.sign({
      id: response._id.toString()
    }, JWT_SECRET)

    res.json({
      token: token
    })
  } else {
    res.json({
      messgae: "Invalid email or password"
    })
  }
});

function auth(req, res, next) {
  const token = req.headers.authorization;
  const verifiedToekn = jwt.verify(token, JWT_SECRET);

  if(verifiedToekn){
    req.userId = verifiedToekn.id;
    next();
  } else {
    res.json({
      message: "Inavlid token"
    })
  }
}


app.post("/todo", auth, async function(req, res) {
  const userId = req.userId;
  const title = req.body.title;
  const done = req.body.done;

  await TodoModel.create({
    userId: userId,
    title: title,
    done: done
  })
  res.json({
    message: "Todo got created"
  })
});

app.get("/todo",auth, async function(req, res) {
  const userId = req.userId;

  const response = await TodoModel.find({
    userId: userId
  });
  res.json({
    todos: response
  })
});


app.listen(3000, () => {console.log("Server is running")})
