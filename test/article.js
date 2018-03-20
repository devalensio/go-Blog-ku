const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http');
const app = require('../bin/www')

chai.use(chaiHttp)

describe('GET ARTICLE /api/article', () => {
  it('should list ALL ARTICLE on /api/article GET ', (done) => {
    chai.request('http://localhost:3000')
      .get('/api/article')
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(200)
        expect(res.body.data_article[0]).to.have.property('title')
        expect(res.body.data_article[0]).to.have.property('text')
        expect(res.body.data_article[0].title).to.be.a('string')
        expect(res.body.data_article[0].text).to.be.a('string')
        done()
      })
  })
})

describe('CREATE ARTICLE /api/article', () => {
  it('should list all Article on /api/article/ POST' , (done) => {
    chai.request('http://localhost:3000')
      .post('/api/article')
      .send({
        title: 'Javascript',
        text: 'hahahahah'
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res.body.data_article).to.have.property('title')
        expect(res.body.data_article).to.have.property('text')
        expect(res.body.data_article.title).to.be.a('string')
        expect(res.body.data_article.text).to.be.a('string')
        done()
      })
  })
})

describe('UPDATE SPECIFIC ARTICLE /api/article', () => {
  it('should edit specific Article on /api/article/ PUT', (done) => {
    chai.request('http://localhost:3000')
      .get('/api/article')
      .end((err,res) => {
        chai.request('http://localhost:3000')
        .put(`/api/article/${res.body.data_article[0]._id}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({title: 'wey', text: 'haha'})
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          console.log('hahaha',res.body);
          done()
        })
      })
  // })
})

describe('DELETE SPECIFIC ARTICLE /api/article', () => {
  it('should remove specific Article on /api/article/ DELETE', (done) => {
    chai.request('http://localhost:3000')
      .get('/api/article')
      .end((err, res) => {
        console.log(res.body);
        chai.request('http://localhost:3000')
          .delete(`/api/article/${res.body.data_article[0]._id}`)
          .end((err, res) => {
            console.log(res.body);
          })
        done()
      })
  })
})
