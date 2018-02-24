const express = require('express');
const router  = express.Router();
const {Idea} = require('../models/ideas');
const {ensureAuthenticated} = require('../helpers/auth');


router.get('/',ensureAuthenticated,(req,res)=>{
    Idea.find({user:req.user.id}).sort({date:'desc'}).then((result)=>{
       res.render('ideas/index',{result});
    }).catch((e)=> {res.status(404).send();
})
})


router.post('/',ensureAuthenticated,(req,res)=>{
   console.log(req.body);
  let errors =[];

  if(!req.body.title){
      errors.push({text:"please fill the title"})
  }
   if(!req.body.detail){
      errors.push({text:"please fill the detail"})
  }

  if(errors.length>0){
    res.render('ideas/add',{
        errors,
        title:req.body.title,
        detail:req.body.detail
    })
  }
  else{
     var title = req.body.title;
     var detail = req.body.detail;
     var newUser={title,detail,user:req.user.id};

     var idea= new Idea(newUser);
     idea.save().then(()=> {
         req.flash('success_msg','video added ')
         res.redirect('/ideas');
     }).catch((e)=> console.log(e))
  }

})



router.get('/add',ensureAuthenticated,(req,res)=>{
    res.render('ideas/add');
})

router.get('/edit/:id',(req,res)=>{
      let id = req.params.id;
      Idea.findOne({
          _id:id
      }).then((result)=>{
           if(!result){
            res.send('data not found');
           }

           if(result.user!=req.user.id){
               req.flash('success_msg','not authorized')
               res.redirect('/ideas');
           }else{
                res.render('ideas/edit',{result});  
           }
           
          

      }).catch((e)=>{
          res.send('data not found');
      })
})


router.put('/:id',ensureAuthenticated,(req,res)=>{
    Idea.findOne({
        _id:req.params.id
    }).then((result)=>{
        result.title= req.body.title;
        result.detail = req.body.detail;
        result.save().then(()=>{
            req.flash('success_msg','video updated ')
            res.redirect('/ideas');
        })
    })
})

router.delete('/:id',ensureAuthenticated,(req,res)=>{
    let id = req.params.id;
    Idea.remove({
      _id:id
    })
    .then(()=>{
        req.flash('success_msg','video deleted ')
        res.redirect('/ideas');
    })
})

module.exports =router;