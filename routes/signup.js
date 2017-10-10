const express = require('express')
const router = express.Router()
const Model = require('../models')
const session = require('express-session')

router.get('/',(req,res)=>{
  Model.User.findAll()
  .then(user=>{
    res.render('signup',{dataUser:user,session:req.session})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/', (req,res)=>{
  Model.User.create({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  })
  .then(()=>{
    res.redirect('/')
  })
  .catch(err=>{
    res.send(err)
  })
})
module.exports = router
