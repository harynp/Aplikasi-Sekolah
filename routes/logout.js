const express = require('express')
const router = express.Router()
const Session = require('express-session')

router.get('/',function(req,res){
  req.session.destroy();
  res.redirect('/')
})

module.exports = router
