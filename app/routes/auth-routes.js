import express from 'express'
const route = express.Router()
import {getUsers, registerUser, deleteUser, confirmEmail, loginUser} from '../controllers/auth-controllers.js'


route.get('/', getUsers)
route.post('/register', registerUser)
route.post('/login', loginUser)
route.delete('/:id', deleteUser)
route.get('/confirmation/:token', confirmEmail)

export default route