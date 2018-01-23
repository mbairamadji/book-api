const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Book = require("./book")
const ReviewSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    text : String,
    book : {
        type : Schema.Types.ObjectId ,
        ref : "Book"
    }
})

module.exports = mongoose.model("Review", ReviewSchema)