const mongoose = require('mongoose');
const {URI} = require('../config/db');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/nuratechDB');

  module.exports={
      mongoose
  }