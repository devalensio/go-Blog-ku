var express = require('express');
var router = express.Router();
const { addArticle,showArticle,editArticle,deleteArticle } = require('../controllers/article.js');
/* GET users listing. */
router.post('/article', addArticle);
router.get('/article', showArticle);
router.get('/article/edit/:id', editArticle);
router.delete('/article/:id', deleteArticle)

module.exports = router;
