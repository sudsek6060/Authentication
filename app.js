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