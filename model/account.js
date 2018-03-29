const mongoose = require("mongoose")
const passport = require("passport")
const Review= require("./review")
const passportLocalMongoose = require("passport-local-mongoose")

const Schema = mongoose.Schema

const AccountSchema = new Schema({
    email : String,
    password : String
})

AccountSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("Account", AccountSchema)
