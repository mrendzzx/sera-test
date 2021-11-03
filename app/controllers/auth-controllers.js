import ModelAuth from '../models/auth-schema.js'
import {validateRegister, validateLogin} from '../configs/joi_validation.js'
import bcrypt from 'bcrypt'
import nodemailer from "nodemailer"
import jwt from 'jsonwebtoken'

//get user data
const getUsers = async (req, res) => {
    //validate account logged-in
        //code here
    try {
        const findUsers = await ModelAuth.find()
        res.json(findUsers)
    } catch (error) {
        res.json({
            message : error
        })
    }
} 

//register new user
const registerUser = async (req, res) => {

    //validasi input
    const {error} = validateRegister(req.body)
    if(error) return res.status(400).json({
        status : res.statusCode,
        message : error.details[0].message
    })

    const isExist = await ModelAuth.findOne({email : req.body.email})
    //email isExist
    if(isExist && isExist.active) return res.status(400).json({
        status : res.statusCode,
        message : "Email registered!"
    })

    //not verified user
    if(isExist && !isExist.active) return res.status(400).json({
        status : res.statusCode,
        message : "Account with this email is not verified."
    })

    //password hash
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(req.body.password, salt)

    const data = new ModelAuth({
        name : req.body.name,
        email : req.body.email,
        password : passwordHash,
        active : false,
        role : "user"
    })

    try {
        const saveUser = await data.save()

        //create token
        const token = jwt.sign({_id: data._id},process.env.TOKEN_KEY,{expiresIn: 60*10})
        //console.log(token)

        //email verification stuff
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: saveUser.email,
            subject: "Email Verification Link",
            text: "Hello "+data.name+", \n\n"+"Please verify your account by clicking the link: \nhttp:\/\/"+req.headers.host+"\/api/auth/confirmation\/"+token+"\n\nThank You!\n"
        }

        transporter.sendMail(mailOptions, (err) => {
            if(err){
                res.status(500).send({message: "Technical issue! Please click on resend to verify your email"})
            }
            res.status(200).send("A verification email has been sent to "+data.email+". If you don't get the verification email, please resend email")
        })
        
    } catch (error) {
        res.json({
            message : error
        })
    }
}

//confirm email
const confirmEmail = async(req, res) => {
    
    //res.status(200).json(token)
    try{
        const token = req.params.token
        //res.json(token)
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        //console.log(decoded)
        const userId = decoded._id
        const verifiedUser = await ModelAuth.findOne({_id: userId})

        if(verifiedUser.active === true) return res.status(400).json({message: "User with this email already exists."})

        const active = await ModelAuth.updateOne({_id: userId}, {$set: {"active": true}})
        res.status(200).json(active)
    
    } catch(error) {
        res.status(400).json({
            message: error
        })
    } 
}

const loginUser = async(req, res) => {
    //validasi input
    const {error} = validateLogin(req.body)
    if(error) return res.status(400).json({
        status : res.statusCode,
        message : error.details[0].message
    })

    const isExist = await ModelAuth.findOne({email : req.body.email})

    //not verified user
    if(isExist && !isExist.active) return res.status(400).json({
        status : res.statusCode,
        message : "Account with this email is not verified."
    })

    //password hash
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(req.body.password, salt)
}

//delete a user
const deleteUser = async (req, res) => {
    try {
        const deleteUser = await ModelAuth.deleteOne({_id:req.params.id})
        res.json(deleteUser)
    } catch (error) {
        res.json({
            message : error
        })
    }
}

export {getUsers, registerUser, deleteUser, confirmEmail, loginUser}