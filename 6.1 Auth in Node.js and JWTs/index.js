const { application } = require("express");
const express = require("express");

const app = express(); 
app.use(express.json());

let users = []

function generateToken(length = 16) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = '';

  for(let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return token;
}

app.post("/signup", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  for (let i=0; i < users.length; i++) {
    if(users[i].username == username && users[i].password == password) {
      res.json({ 
        message: "You are already signed up"
      })
      return // adding this return will stop execution of current function and prevent execution of any code after this. Very IMP.
    }
  }
  users.push({
    username: username,
    password: password
  })  
  
  console.log(users);

  res.json({ 
    message: "You are signed up!"
  })
});



app.post("/signin", function(req, res) {
  const username = req.body.username; 
  const password = req.body.password;

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    const token = generateToken();
    user.token = token
    console.log(users)
    res.json({
      token: token
    })
  } else {
    res.status(403).send({
      message: "Inavlid username or password"
    })
  }

});


app.get("/me", function(req, res) {
  const token = req.header('authorization');
  console.log(token);
  const user = users.find(user => user.token === token)

  if (user) {
    res.json({
      username: user.username,
      password: user.password
    })
  } else {
    res.status(401).send({
      message: "Unauthorized"
    })
  }
})

app.listen(3000, () => {console.log("Server is running")});