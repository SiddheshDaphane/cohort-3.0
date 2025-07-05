const express = require("express");

const app = express();


// Method 1 -- 

// function middleware(req, res, next) {
//   console.log(`Incoming request: ${req.method} on URL: ${req.url} at Time: ${Date.now()}`);
//   next();
// }

// app.get("/sum", middleware, function(req, res) {
//   const a = parseInt(req.query.a);
//   const b = parseInt(req.query.b);

//   res.json({
//     ans: a+b
//   })
// }); 


// app.get("/multiply",middleware, function(req, res) {
//   const a = parseInt(req.query.a);
//   const b = parseInt(req.query.b)

//   res.json({
//     ans: a*b
//   })
// });

// app.get("/divide", middleware, function(req, res) {
//   const a = parseInt(req.query.a);
//   const b = parseInt(req.query.b);

//   res.json({
//     ans: a/b
//   })
// });

// app.get("/subtract", middleware, function(req, res) {
//   const a = parseInt(req.query.a);
//   const b = parseInt(req.query.b)

//   res.json({
//     ans: a-b
//   })
// });

// app.listen(3000, () => {
//   console.log("Server is running!")
// })



// Method 2

function middleware(req, res, next) {
  console.log(`Incoming request: ${req.method} on URL: ${req.url} at Time: ${Date.now()}`);
  next();
}

app.use(middleware);

app.get("/sum", function(req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  res.json({
    ans: a+b
  })
}); 

app.get("/multiply", function(req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b)

  res.json({
    ans: a*b
  })
});

app.get("/divide", function(req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  res.json({
    ans: a/b
  })
});

app.get("/subtract", function(req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b)

  res.json({
    ans: a-b
  })
});

app.listen(3000, () => {
  console.log("Server is running!")
})
