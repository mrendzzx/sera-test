import ModelBook from '../models/book-schema.js'

//get book all data
const getBooks = async(req, res) => {
    try {
        const Books = await ModelBook.find()
        res.json(Books)
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//get a single book
const getBookById = async(req, res) => {
    try {
        const Book = await ModelBook.findById(req.params.id)
        res.json(Book)
    } catch(error) {
        res.status(404).json({
            message: error.message
        })
    }
}

//add a new book
const saveBook = async(req, res) => {
    const Book = new ModelBook(req.body)
    try {
        const savedBook = await Book.save()
        res.status(201).json(savedBook)
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
}

//update a book
const updateBook = async(req, res) => {
    const Book = await ModelBook.findById(req.params.id)
    if(!Book) return res.status(404).json({
        message: "Book with id=${id} not found!"
    })
    try {
        const updatedBook = await ModelBook.updateOne({_id: req.params.id}, {$set: req.body})
        res.status(200).json(updatedBook)
        
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
}

//delete a book
const deleteBook = async(req, res) => {
    const Book = await ModelBook.findById(req.params.id)
    if(!Book) return res.status(404).json({
        message: "Book with id=${id} not found!"
    })
    try {
        const deletedBook = await ModelBook.deleteOne({_id: req.params.id})
        res.status(200).json(deletedBook)
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export {getBooks, getBookById, saveBook, updateBook, deleteBook}