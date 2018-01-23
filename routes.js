const express = require("express")
const book = require("./controller/book")

const router = express()

router.use('/book', book)


module.exports = router;