let ensureAuthenticated = (req,res,next)=>{
      if(req.isAuthenticated()){
          next();
      }
      else{
            req.flash('success_msg','no authrorized');
             res.redirect('/users/login');
      }
   
}

module.exports= {
    ensureAuthenticated
}