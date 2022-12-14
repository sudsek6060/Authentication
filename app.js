require('dotenv').config()
require("./config/db").connect()
const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
var cookieParser = require("cookie-parser")

//import model - user
const User = require("./model/user")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.send("Hello Auth System")
})

app.post("/register", async(req, res) => {
    try {
        //collect all information
        const {firstname, lastname, email, password} = req.body
        //validate the data if exists
        if (!(email && firstname && lastname && password)) {
           res.status(401).send("All fields are required") 
        }
        //check if user is exists or not
        const existingUser = await User.findOne({email})
        if (existingUser) {
            res.status(401).send("User already exists")
        }
        //encrypt the password
        const myEncryptedPassword = await bcrypt.hash(password, 10)
        //create a new entry in database
        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password: myEncryptedPassword
        })
        //create a token and send to the user
        const token = jwt.sign({
            id: newUser._id, email
        }, 'shhh', {expiresIn: '2h'})

        newUser.token = token
        newUser.password = undefined // do not want to send the password

        res.status(201).json(newUser)
    } catch (error) {
        console.log(error);
        console.log("Error is response route");
    }
})