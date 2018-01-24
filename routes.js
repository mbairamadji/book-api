const express = require("express")
const book = require("./controller/book")
const account = require("./controller/account")

const router = express()

router.use('/book', book)
router.use('/account', account)

module.exports = router;