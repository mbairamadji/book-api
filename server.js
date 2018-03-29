const express = require("express")
const http = require("http")
//const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const cors = require("cors")
const route = require("./routes")
const config = require("./config/config")
const app = express()

//middelware
app.use(express.json())
app.use(cors())
//app.use(express.static('client/public'))

mongoose.Promise = global.Promise

//db connection
mongoose.connect(config.db, {
  useMongoClient : true
})

//routes
app.use('/api', route)

//Passport config
app.use(passport.initialize())
const Account = require("./model/account")
passport.use(new LocalStrategy({
  usernameField : "email",
  passwordField : "password"
}, Account.authenticate()))

passport.serializeUser(Account.serializeUser())
passport.deserializeUser(Account.deserializeUser())


const server = http.createServer(app)
server.listen(process.env.PORT || config.port, process.env.IP || "0.0.0.0", () => {
    console.log(`App is running on port ${server.address().port}`)
})

module.exports = app 


