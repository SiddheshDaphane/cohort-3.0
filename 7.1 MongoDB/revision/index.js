require("dotenv").config();
const express = require("express");
const { UserModel, TodoModel } = require("./db");
const { auth } = require("./auth");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL);

app.post("/signup", async function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password

  await UserModel.create({
    name: name,
    email: email,
    password: password
  })  

  res.json({
    messgae: "You are signed up!"
  })
});

app.post("/signin", async function(req, res) {
  const email =  req.body.email;
  const password = req.body.password

  const response = await UserModel.findOne({
    email: email,
    password: password
  })

  if(response) {
    const token = jwt.sign({
        id : response._id.toString()
    }, JWT_SECRET);

    res.json({
      token: token
    })
  } else {
    res.json({
      messgae: "Inavlid email or password"
    });
  }


});



app.post("/todo",auth, async function(req, res) {
    const userId = req.userId
    const title = req.body.title
    const done = req.body.done

    await TodoModel.create({
      userId: userId,
      title: title,
      done: done
    })

    res.json({
      messgae: "Your todo is created."
    })
});

app.get("/todo",auth, async function(req, res) {
  const userId = req.userId

  const allTodos = await TodoModel.find({
    userId: userId
  });

  res.json({
    todos: allTodos
  })

});

app.listen(3000, () => {console.log("Server is running!")})