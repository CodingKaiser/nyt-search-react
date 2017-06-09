// Import the ORM to create functions that will interact with the database.
const mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var Article = new mongoose.Schema({
  title: String,
  url: String,
  date: {
    type: Date,
    default: Date.now
  },

});

module.exports = mongoose.model('Article', Article);
