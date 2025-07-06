const { application } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "siddhesh123";
const cors = require("cors");



const app = express();
app.use(express.json());
app.use(cors({
  origin: "*", // or restrict to your frontend domain
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

let users = []

function auth(req, res, next) {
  const token = req.header('authorization');
  const verifyToken = jwt.verify(token, JWT_SECRET);
  const username = verifyToken.username; 

  if(username){
    req.username = username;
    next();
  } else {
    res.json({
      message: "You are not logged in."
    })
  }

}


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
})


app.post("/signup", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  for(let i =0; i < users.length; i++){
    if(users[i].username === username && users[i].password === password){
      res.json({
        message: "You already have account"
      })
      return
    } 
  }
  users.push({
    username: username,
    password: password
  })
  res.json({
    message: "Congrats, You are signed in!"
  })
});


app.post("/signin", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  let foundUser = null;

  for (let i=0; i < users.length; i++){
    if(users[i].username === username && users[i].password === password){
      foundUser = users[i];
    }
  }

  if(foundUser){
    const token = jwt.sign({
      username: username
    }, JWT_SECRET)
    res.json({
      token: token
    })
  } else {
    res.json({
      message: "Sorry, Wrong username or password!"
    })
  }
});



app.get("/me",auth, function(req, res) {

  let currentUser = req.username;
  let foundUser = null;
  for (let i=0; i < users.length; i++){
    if(users[i].username === currentUser){
      foundUser = users[i];
    }
  }

  if(foundUser){
    res.json({
      username: foundUser.username,
      password: foundUser.password,
    })
  } else {
    res.json({
      message: "You are not authenticated! Please create account first."
    })
  }
});


app.listen(3000, () => {console.log("Server is running!")})