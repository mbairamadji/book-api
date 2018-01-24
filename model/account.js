const mongoose = require("mongoose")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")

const Schema = mongoose.Schema

const AccountSchema = new Schema({
    username : String,
    password : String
})

AccountSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("Account", AccountSchema)
