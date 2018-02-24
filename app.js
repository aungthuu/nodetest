const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const path  = require('path');
const ideas =  require('./routes/ideas');
const users = require('./routes/users');
const passport = require('passport');

const {mongoose} = require('./db/mongoose.js');
require('./config/passport')(passport);



const app = express();
const port = 3000;
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(session({
  secret: 'secrect',
  resave: true, 
  saveUninitialized: true
}))
 app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg= req.flash('error_msg');
    res.locals.error= req.flash('error');
    res.locals.user = req.user||null;
    next();
})

app.get('/',(req,res)=>{
    const name='Welcome';
    res.render('index',{name});
    
})

app.get('/about',(req,res)=>{
    res.render('about');
})
app.use('/ideas',ideas);
app.use('/users',users);
app.listen(3000,()=>{
    console.log(`server is starting at port ${port}`)
}) 