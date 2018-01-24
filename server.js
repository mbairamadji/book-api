const express = require("express")
const http = require("http")
//const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")
const route = require("./routes")
const config = require("./config/config")
const app = express()
//middlware
app.use(express.json())
app.use(cors())

mongoose.Promise = global.Promise

//db connection
mongoose.connect(config.db, {
  useMongoClient : true
})

//routes
app.use('/api', route)

//Passport config


const server = http.createServer(app)
server.listen(process.env.PORT || config.port, process.env.IP || "0.0.0.0", () => {
    console.log(`App is running on port ${server.address().port}`)
})

module.exports = app 


