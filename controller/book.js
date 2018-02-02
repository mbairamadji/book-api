const mongoose = require("mongoose")
const express = require("express")
const { Router } = require("express")
const Book = require("../model/book")
const Review = require("../model/review")
const Account = require("../model/account")
const { authenticate } = require("../middleware/authMiddleware")



module.exports = Router()
    //Create a book on path api/book/add
    .post('/add', authenticate, (req, res) => {
        const newBook = new Book()
        newBook.title = req.body.title
        newBook.author = req.body.author
        newBook.save(err => {
        if (err) {
            res.send(err)
        } else {
            res.json({message : "Book was saved succesfully"})
        }
     })
    })
    
    //Get all books on path api/book
    .get('/', (req, res) => {
        Book.find({})
            .exec((err, books) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send(books)
                }
            })
        })
        
   /* //Get a specific book using method findById
   .get('/:id', (req, res) => {
        Book.findById(req.params.id, (err, book) => {
            if (err) {
                res.send(err)
            } else {
                res.json(book) 
            }
        })
    }) */
    
    //Get a specific book using method findOne
    .get('/:id', (req, res) => {
        Book.findOne({_id : req.params.id })
            .exec((err, book) => {
                if (err) {
                    res.send(err)
                } else {
                    res.json(book)
                }
            })
    })
    
    //Update a specific book using method findById
    .put('/:id', authenticate, (req, res) => {
        Book.findById(req.params.id, (err, book) => {
            if (err) {
                res.send(err)
            } else {
                book.title = req.body.title;
                book.author = req.body.author;
                book.save(err => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.json({ message: "Book has been updated"})
                    }
                })
            }
        })
    })

/*  //Delete a specific book using method findById and remove() 
    .delete('/:id', (req, res) => {
        Book.findById(req.params.id , (err, book) => {
            if (err) {
               res.send(err) 
            } else {
               book.remove(err => {
                   if (err) {
                       res.send(err)
                   } else {
                       res.json({ message : "Book has been deleted"})
                   }
               }) 
            }
        })
    }) */
    
    //Delete a specific book using method remove()
    .delete('/:id', authenticate, (req, res) => {
        Book.remove({ _id : req.params.id }, 
            (err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.json({ message : "Book has been deleted"})  
                }
            })
    })
    
    //Create a review for a specific book on path api/book/reviews/add/:id
    .post('/reviews/add/:id', authenticate, (req, res) => {
        Book.findById(req.params.id, (err, book) => {
           if (err) {
               res.send(err)
           } else {
               const newReview = new Review();
               newReview.title = req.body.title;
               newReview.text = req.body.text;
               newReview.book = book._id;
               newReview.save(err => {
                   if (err) {
                     res.send(err)  
                   } else {
                     book.reviews.push(newReview);
                     book.save(err => {
                         if (err) {
                             res.send(err)
                         } else {
                             res.json({ message : "Review added for this book"})
                         }
                      })
                    }
                 })
              }
           }) 
        }) 
    
    //Get all reviews from a specific book
    .get('/reviews/:id', (req, res) => {
       Review.find({book : req.params.id}, (err, review) => {
           if (err) {
             res.send(err)  
           } else {
             res.json(review)  
           }
       })
   })