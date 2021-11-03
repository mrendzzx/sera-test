import Mongoose from "mongoose"

const AuthSchema = new Mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }, 
    active : {
        type : Boolean,
        required : true
    },
    role : {
        type : String,
        required : true
    }
})

export default Mongoose.model('user', AuthSchema)