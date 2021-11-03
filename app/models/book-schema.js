import Mongoose from "mongoose";

const BookSchema = new Mongoose.Schema({
    isbn: {
        type: String,
        required: true,
        maxlength: 20
    },
    bookAuthor: {
        type: String,
        required: true
    },
    bookName: {
        type: String,
        required: true
    },
    bookCategory: {
        type: Array,
        required: true
    },
    bookSynopsis: {
        type: String,
        required: true
    },
    bookReleaseDate: {
        type: String,
        required: true
    },
    bookStock: {
        type: Number,
        required: true
    },
    bookCover: {
        type: String,
        required: false
    },
    bookRating: {
        type: Number,
        required: true
    },
    bookPublisher: {
        type: String,
        required: true
    }
});

export default Mongoose.model('book', BookSchema);