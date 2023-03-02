// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
    
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
    res.render('books/add', {
        title: 'Add Books'
    });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
   new book(req.body).save(function (err, product) {
       if (err) return handleError(err);
       console.log("BOOK ADDED "+product);
       // redirect
       book.find( (err, books) => {
           if (err) {
               return console.error(err);
           }
           else {
               res.render('books/index', {
                   title: 'Books',
                   books: books
               });
           }
       });
       
   });
   
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
    book.find( {_id: new mongoose.Types.ObjectId(req.params.id)},(err, book) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render('books/details', {
                title: 'Book',
                books: book[0]
            });
        }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
    //console.log("UPDATING" + );
    console.log(req.params.id);
    book.findOneAndUpdate({_id: new mongoose.Types.ObjectId(req.params.id)},req.body,function(err,result){
        if (err) {
            return console.error(err);
        }
        else {
            console.log(result);
            // redirect
            book.find( (err, books) => {
                if (err) {
                    return console.error(err);
                }
                else {
                    res.render('books/index', {
                        title: 'Books',
                        books: books
                    });
                }
            });
        }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
    book.deleteOne({_id:new mongoose.Types.ObjectId(req.params.id)},function (err){
        book.find( (err, books) => {
            if (err) {
                return console.error(err);
            }
            else {
                res.render('books/index', {
                    title: 'Books',
                    books: books
                });
            }
        });
    })
   
});


module.exports = router;
