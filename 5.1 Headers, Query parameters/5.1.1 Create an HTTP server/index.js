const express = require("express");

const app = express();

app.get("/sum", function(req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  const result = a + b; 

  res.send(`The sum is: ${result}`);
})

app.get("/multiply", function(req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  const result = a * b; 

  res.send(`The multiplication is: ${result}`);
})


app.get("/divide", function(req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  const result = a / b; 

  res.send(`The division is: ${result}`);
})

app.get("/substract", function(req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  const result = a - b; 

  res.send(`The substraction is: ${result}`);
})

app.listen(3000, () => {
  console.log("Server is running");
})