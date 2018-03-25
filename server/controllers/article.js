const Article = require('../models/article')

module.exports = {
  addArticle: function (req, res) {
    console.log(req.body);
    const article =  new Article()
    article.title = req.body.title
    article.text = req.body.text

    article.save().then(data_article => {
      res.status(200).json({
        message: 'article added',
        data_article
      })
    })
  },
  showArticle: function (req, res) {
    Article.find().then(data_article => {
      res.status(200).json({
        message: 'list Article',
        data_article
      })
    })
  },
  editArticle: function (req, res) {
    console.log(req.headers);
    // Article.findOne({_id: req.params.id}).then(data => {
    //   data.title = req.body.title
    //   data.text = req.body.text
    //   Article.update({_id: req.params.id},{$set:{title: data.title, text: data.text}})
    //     .then(data_todo => {
    //       res.status(201).json({
    //         message: 'success update'
    //       })
    //     })
    // })
  },
  deleteArticle: function (req, res) {
    Article.remove({_id: req.params.id}).then(data => {
      res.status(201).json({
        message: 'data deleted'
      })
    })
  }
}
