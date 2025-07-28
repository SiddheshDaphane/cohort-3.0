require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const { userRoute } = require("./routes/user");
const { adminRoute } = require("./routes/admin");


const app = express();

app.use(express.json());


app.use("/user", userRoute);
app.use("/admin", adminRoute);
// app.use("/course", courseRoute);


async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  app.listen(3000, () => {console.log("Server is running")})
}

main();
