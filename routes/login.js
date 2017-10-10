const express = require('express')
const router = express.Router()
const Model = require('../models')
const Session = require('express-session')
const bcrypt = require('bcrypt');
router.get('/', (req,res) => {
  res.render('login', {session:req.session,dataError:null})
})

router.post('/login', function(req,res){
  Model.User.findOne({
    where:{
      username: req.body.username
    }
  })
  .then(user=>{
    if(user==null){
      res.render('login', {dataError:'ID SALAH COYY!!'})
    } else if(bcrypt.hashSync(req.body.password,user.salt) === user.password){
      req.session.hasLogin = true
      req.session.role = user.role
      res.redirect('/index')
    }
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router;
