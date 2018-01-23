const express = require("express")
const { Router } = require("express")
const Book = require("../model/book")
const Review = require("../model/review")


module.exports = Router()
    .post('/add', (req, res) => {
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
    
    .get('/book', (req, res) => {
        Book.find({})
            .exec((err, books) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send(books)
                }
            })
        })
        
   /* .get('/:id', (req, res) => {
        Book.findById(req.params.id, (err, book) => {
            if (err) {
                res.send(err)
            } else {
                res.json(book) 
            }
        })
    }) */
    
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

    .put('/:id', (req, res) => {
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

/*    .delete('/:id', (req, res) => {
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
    
    .delete('/:id', (req, res) => {
        Book.remove({ _id : req.params.id }, 
            (err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.json({ message : "Book has been deleted"})  
                }
            })
    })

    .post('/reviews/add/:id', (req, res) => {
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
     
   .get('/reviews/:id', (req, res) => {
       Review.find({book : req.params.id}, (err, review) => {
           if (err) {
             res.send(err)  
           } else {
             res.json(review)  
           }
       })
   })