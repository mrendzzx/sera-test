import express from 'express'
const route = express.Router()
import {getBooks, getBookById, saveBook, updateBook, deleteBook} from '../controllers/book-controller.js'


route.get('/', getBooks)
route.get('/:id', getBookById)
route.post('/', saveBook)
route.patch('/:id', updateBook)
route.delete('/:id', deleteBook)

export default route