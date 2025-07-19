const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  name: String,
  email: {type: String, unique: true},
  password: String
})

const Todo = new Schema({
  userId: ObjectId,
  title: String,
  done: Boolean
})

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);


// In Mongoose:
// A Schema defines the structure of your documents — what fields exist, their types, and rules.
// A Model is like a class with which you interact with the database. It wraps the schema and gives you functions to create, read, update, delete (CRUD) documents.

// So what is 'users'?
// It tells Mongoose:
// "Create a model that works with the users collection in MongoDB using the User schema."

// If you don’t create a model using mongoose.model(), then:
// You can’t interact with the collection in MongoDB.
// You’re only defining a shape (Schema), but not linking it to any database logic.

module.exports = {
  UserModel,
  TodoModel
}