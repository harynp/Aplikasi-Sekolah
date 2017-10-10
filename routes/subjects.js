const express = require('express')
const router = express.Router()
const Model = require('../models')
const Nilai = require('../helper/nilai')
const FullName = require('../helper/fullname')

router.use((req,res,next)=>{
  if(req.session.role=='academic' || req.session.role=='headmaster'){
  next()
  } else {
  res.redirect('/')
  }
})

router.get('/', (req,res) => {
  Model.Subject.findAll({
    order: [['id','ASC']]
  })
  .then(subjects=>{
    let promise = subjects.map((data)=>{
      return new Promise((resolve,reject)=>{
        data.getTeachers()
        .then(teachers=>{
          if(teachers){
            let arrTeacher = teachers.map(dataTeacher=>{
              return dataTeacher.full_name()
            })
            data["teachers"] = arrTeacher
          } else {
            data["teachers"] = []
          }
          resolve(data)
        })
        .catch(err=>{
          reject(err)
        })
      })
    })
    Promise.all(promise)
    .then(result =>{
      res.render('subjects',{dataSubjects:result,session:req.session})
    })
  })
})

router.get('/add',(req,res)=>{
  Model.Subject.findAll()
  .then(subjects=>{
    res.render('add_subjects',{dataSubjects:subjects,session:req.session})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/add', (req,res)=>{
  Model.Subject.create({
    subject_name: req.body.subject_name,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(subjects=>{
    res.redirect('/subjects')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id',(req,res)=>{
  Model.Subject.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(()=>{
    res.redirect('/subjects')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/edit/:id',(req,res)=>{
  Model.Subject.findById(req.params.id)
  .then(data=>{
    res.render('edit_subjects', {dataSubjects:data,session:req.session})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id',(req,res)=>{
  Model.Subject.update({
    subject_name: req.body.subject_name,
  },
  {
    where: {
      id:req.params.id
    }
  })
  .then(data=>{
    res.redirect('/subjects')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/enrolledstudents/:id', (req,res)=>{
Model.SubjectStudent.findAll({
    where:{
      SubjectId: req.params.id
    },
    include : [Model.Subject,Model.Student]
  })
  .then(data=>{
    if(data[0].Subject.subject_name == null){
      res.send('data belum ada');
    } else if(data[0].Subject.subject_name != null){
      res.render('enrolledstudents',{dataConj:data, akreditasi:Nilai,session:req.session})
    }

  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/enrolledstudents/givescore/:ids/:id', (req,res)=>{
    Model.Subject.findAll({
      where: {
        id: req.params.ids
      }
    })
    .then(dataSubject=>{
      Model.Student.findAll({
        where: {
          id: req.params.id
        }
      })
    .then(dataStudent=>{
      res.render('givescore',{dataStudent:dataStudent[0], dataSubject:dataSubject[0],session:req.session})
    })
  })
})

router.post('/enrolledstudents/givescore/:ids/:id',(req,res)=>{
  Model.SubjectStudent.update({
    Score: req.body.Score
  },{
    where: {
      SubjectId: req.params.ids,
      $and: {
        StudentId: req.params.id
      }
    }
  })
  .then(()=>{
    res.redirect('/subjects')
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router;
