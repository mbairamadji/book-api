const express = require("express")
const http = require("http")
//const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")
const route = require("./controller/book")
const app = express()
//middlware
app.use(express.json())
app.use(cors())

//db connection
const db = "mongodb://dynamitt:dyn@ds117935.mlab.com:17935/kata"
mongoose.connect(db, {
  useMongoClient : true
})

//routes
app.use('/api', route)


const server = http.createServer(app)


server.listen(process.env.PORT, process.env.IP, () => {
    console.log("App is running")
})

module.exports = app 


