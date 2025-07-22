require("dotenv").config(); 
const mongoose = require("mongoose");
// const user = require("./routes/user");

// console.log("Conneting to db");
// mongoose.connect(process.env.MONGODB_URL);

// console.log("Connected to db");


const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId; 


const userSchema = new Schema({
  email: {type: String, unique: true},
  password: String,
  firstNmae: String,
  lastName: String
})

const adminSchema = new Schema({
  email: {type: String, unique: true},
  password: String,
  firstNmae: String,
  lastName: String
})

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageURL: String,
  creatorId: ObjectId
})

const purchaseSchema = new Schema({
  courseId: ObjectId,
  userId: ObjectId,
})


const userModel = mongoose.model("users", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("courses", courseSchema);
const purchaseModel = mongoose.model("purchases", purchaseSchema);

module.exports = {
  userModel: userModel,
  adminModel: adminModel,
  courseModel: courseModel,
  purchaseModel: purchaseModel
}