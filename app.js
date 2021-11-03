import Express from 'express'
const app = Express()
import Mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import AuthRoutes from './app/routes/auth-routes.js'
import BookRoutes from './app/routes/book-router.js'

//memparse request content-type - application/x-www-form-urlencoded
//app.use(Express.urlencoded({ extended: true }));

//middleware - untuk menangkap teks dari req.body
app.use(Express.json())

//routes
app.use('/api/auth/', AuthRoutes)
app.use('/api/book/', BookRoutes)

//connect database
const connect = async () => {
    try {
        const connected = await Mongoose.connect(process.env.DB_CONNECT)
        if(connected) console.log('connected to db')
    } catch (error) {
        console.log(error)
    }
}

connect()

//running local server
app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`)
})