const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IdeasSchema =new Schema({
    title:{
        type:String,
        required:true
    },
    detail:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

var Idea=mongoose.model('idea',IdeasSchema);

module.exports={
    Idea
} 