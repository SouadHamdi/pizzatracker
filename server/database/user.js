const mongoose = require('mongoose')
const db = require("./index.js");
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema
const userSchema = new Schema({
    name: String, 
    email:String,
    password: Number,
    role:{type:String ,default:"User" } ,
})

const User = mongoose.model("User", userSchema);
module.exports = User;