const express = require('express')
const app = express();
const session = require('express-session')
const path = require('path')
// var crypto = require('crypto')
const env = process.env.NODE_ENV || "development";
var bcrypt = require('bcrypt');
app.set('view engine', 'ejs');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session ({
  secret: 'role',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

let index = require('./routes/index.js')
let login = require('./routes/login.js')
let signup = require('./routes/signup.js')
let teachers = require('./routes/teachers.js')
let subjects = require('./routes/subjects.js')
let students = require('./routes/students.js')
let logout = require('./routes/logout.js')

app.use('/',login)
app.use('/index',index)
app.use('/signup',signup)
app.use('/teachers',teachers)
app.use('/subjects',subjects)
app.use('/students',students)
app.use('/logout',logout)

// app.listen(3000, function() {
// console.log('express app now listeng 3000');
// });

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!')
})
