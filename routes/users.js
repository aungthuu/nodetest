const express = require('express');
const router =express.Router();
const {User} = require('../models/Users');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ensureAuthenticated} = require('../helpers/auth');

router.get('/login',(req,res)=>{
    res.render('users/login');
})

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/ideas',
        failureRedirect:'/users/login',
        failureFlash:true
    })(req,res,next)
})

router.get('/register',(req,res)=>{
    res.render('users/register')
})

router.post('/register',(req,res)=>{
    let errors=[];

    if(req.body.password!=req.body.password2){
         errors.push({ text:'password do not match' })
    }

    if(req.body.password.length<4){
        errors.push({ text:'password is too short' })
    }
    if(errors.length>0){
        console.log('working')
        res.render('users/register',{
            errors,
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            password2:req.body.password2
        });
    }
    else{

        var userObject={
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }
       bcrypt.genSalt(10).then((salt)=>{
           bcrypt.hash(userObject.password,salt).then((password)=>{
             userObject.password=password;
            const user = new User(userObject);
            user.save().then((user)=>{
                req.flash('success_msg','you are now register');
                res.redirect('/users/login');
            }).catch((e)=>{
                if(e.code===11000){
                    req.flash('error_msg','email is already taken');
                    res.redirect('/users/register');
                }
            })
           })
       });
    
    }
});

router.get('/logout',ensureAuthenticated,(req,res)=>{
    req.logout();
    req.flash('success_msg','You are logout')
    res.redirect('/users/login');
})

module.exports=router;