// Import the model to use its database functions.
var Article = require("../models/articles.js")

// Create all our routes and set up logic within those routes where required.
module.exports.getArticles = (req, res) => {
  Article.find({}).limit(5).sort({date: -1}).exec((err, found) => {
    if (err) {
      console.log(err)
    } else {
      res.json(found)
    }
  })
}

module.exports.postArticle = (req, res) => {
  Article.update({ "_id": req.body._id }, req.body, { upsert: true }, (err, saved) => {
    if (err) {
      console.log(err)
    } else {
      res.json(saved)
    }
  })
}

module.exports.delArticle = (req, res) => {
  Article.remove(req.body, (err, removed) => {
    if (err) {
      console.log(err)
    } else {
      res.json(removed)
    }
  })
}
