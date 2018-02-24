const mongoose = require('mongoose');
const {URI} = require('../config/db');
mongoose.Promise = global.Promise;


mongoose.connect(URI);

  module.exports={
      mongoose
  }