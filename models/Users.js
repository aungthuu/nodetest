const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema =new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
     password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

var User=mongoose.model('user',UsersSchema);

module.exports={
    User
} 