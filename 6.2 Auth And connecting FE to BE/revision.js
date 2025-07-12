const express = require("express");
const jwt = require("jsonwebtoken")
const JWT_SECRET = "siddhesh123"


const app = express();

app.use(express.json());


const users = [];

app.get("/", function(req, res) {
  res.json({
    messgae: "Server is running!"
  })
})

app.post("/signup", function(req, res) {
  const username = req.body.name 
  const password = req.body.code

  for(let i=0; i < users.length; i++) {
    if(users[i].name === username && users[i].code === password) {
      res.json({
        messgae: "You already have an account"
      })
      return
    } 
  }
  users.push({
    name: username,
    code: password
  })
  res.json({
    messgae: "Congrats! Your account is created!"
  })
});




app.post("/signin", function(req, res) {
  const username = req.body.name;
  const password = req.body.code; 

  let currentUser = null; 

  for(let i=0; i< users.length; i++) {
    if(users[i].name === username && users[i].code === password){
      currentUser = users[i];
    }
  }

  if(currentUser){
    const token = jwt.sign({
      name: username
    }, JWT_SECRET)
    res.json({
      token: token
    })
  } else {
    res.json({
      messgae: "Sorry. Wrong username or password."
    })    
  }
});

app.get("/me", function(req, res) {
  const token = req.header('authorization');
  const verifyToken = jwt.verify(token, JWT_SECRET);
  const username = verifyToken.name

  let foundUser = null;
  for (let i=0; i < users.length; i++) {
    if(users[i].name === username){
      foundUser = users[i]
    }
  }
  
  if(foundUser){
    res.json({
      name: foundUser.name,
      code: foundUser.code
    })
  } else {
    res.json({
      messgae: "Invalid token"
    })
  }

});

app.listen(3000, () => {console.log("server is running!")})

