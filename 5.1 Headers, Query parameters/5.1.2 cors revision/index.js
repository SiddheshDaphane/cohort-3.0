const express = require("express")
const cors = require("cors")

const app = express();


app.use(express.json());
app.use(cors());


app.get("/", function(req, res) {
  res.json({
    message: "Server is running"
  })
})

app.post("/sum", function(req, res) {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  console.log("Recevied: ", req.body);

  res.json({
    answer: a + b
  })
})

app.listen(3000, () => {
  console.log("Server is running");
})