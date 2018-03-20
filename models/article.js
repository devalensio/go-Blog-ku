const mongoose = require('mongoose');
const Schema = mongoose.Schema

const articleSchema = Schema({
  title : {
    type: String,
    default: 'Untitled'
  },
  text: {
    type: String,
    default: 'None'
  }
},{
  timestamps: true
})

const article = mongoose.model('Article', articleSchema)
module.exports = article
