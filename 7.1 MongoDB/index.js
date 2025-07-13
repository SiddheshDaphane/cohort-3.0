const express = require("express");
const { default: mongoose } = require("mongoose");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "siddhesh123";

mongoose.connect("mongodb+srv://Siddhesh:Wasadikar@cluster0.5cgwjmn.mongodb.net/cohort_todo");

const app = express();
app.use(express.json());



app.post("/signup", async function(req, res) {
  const email = req.body.email;
  const password = req.body.password; 
  const name = req.body.name;

  // console.log(email);
  // console.log(password);
  // console.log(name);

  await UserModel.create({
    email: email,
    password: password,
    name: name
  });

  res.json({
    messgae: "Congrats, you are signed up!"
  })
});

app.post("/signin", async function(req, res) {
  const email = req.body.email;
  const password = req.body.password; 

  const response = await UserModel.findOne({
    email: email,
    password: password
  });

  if(response) {
    const token = jwt.sign({
        id: response._id.toString()
    }, JWT_SECRET);

    res.json({
      token: token
    });

  } else {
    res.json({
      messgae: "Invalid email or password"
    })
  }
});


function auth(req, res, next) {
  const token = req.headers.authorization;
  const verifiedToken = jwt.verify(token, JWT_SECRET)

  console.log(verifiedToken);

  if(verifiedToken) {
    req.userId = verifiedToken.id;
    next();
  } else {
    res.status(403).json({
      message: "Invalid token"
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
    message: "Todo Created"
  })
});


app.get("/todos",auth, async function(req, res) {
  const userId = req.userId

  const todos = await TodoModel.find({
    userId: userId
  });
  res.json({
    todos: todos
  })
});

app.listen(3000, () => {console.log("Server is running")});