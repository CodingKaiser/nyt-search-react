const express = require('express')
const apiController = require('../controllers/api.controller.js')

const router = express.Router()

module.exports = router
  .get('/article', apiController.getArticles)
  .post('/article', apiController.postArticle)
  .delete('/article', apiController.delArticle)
