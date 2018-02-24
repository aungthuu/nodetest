const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const bcrypt  = require('bcryptjs');

module.exports=(passport)=>{
        passport.use(new LocalStrategy({
          usernameField:'email'
        },
        (email,password,done)=>{
          User.findOne({email}).then((user)=>{
            if(!user){
              return  done(null,false,{message:'There is no user with this email'});
            }
            bcrypt.compare(password,user.password).then((match)=>{
              if(match){
                return done(null,user);
              }
              else{
                return  done(null,false,{message:'There is no user with this email'});
              } }) }) } ) )

              passport.serializeUser(function(user, done) {
              done(null, user.id);
              });

              passport.deserializeUser(function(id, done) {
                User.findById(id, function(err, user) {
                  done(err, user);
                });
              });
}











