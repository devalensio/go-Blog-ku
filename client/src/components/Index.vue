<template>
  <div class="container" style="padding-top: 28px; padding-bottom: 28px">
    <div class="row">
      <div class="col-md-4" v-show="tokenfb">
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <div class="text-center">
              <img :src="avatar" style="border-radius: 100%; width: 100px; height: 100px;" >
              <h4>{{name}}</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card" v-for="(article, id) in article" v-bind:key="id">
          <div class="card-header">
            {{article.title}}
          </div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>{{article.text}}</p>
              <footer class="blockquote-footer">Created at: <cite title="Source Title">{{article.createdAt}}</cite></footer>
            </blockquote>
          </div>
          <div class="card-footer text-muted" v-show="tokenfb">
            <button type="button" name="button" v-on:click="editArticle(article)" data-toggle="modal" data-target="#edit_article">Edit</button>
            <button type="button" name="button" v-on:click="deleteAricle(article)">Delete</button>
          </div>
        </div>
      </div>
      <div class="col-md-2" v-show="tokenfb">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#article">
          Add Article
        </button>
      </div>
      <div class="modal fade" id="article" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">New Article</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Title:</label>
                  <input type="text" class="form-control" id="recipient-name" v-model="title">
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">Index:</label>
                  <textarea class="form-control" id="message-text" v-model="index"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addArticle">Submit</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="edit_article" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Article</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">New Title:</label>
                  <input type="text" class="form-control" id="recipient-name" v-model="updateTitle">
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">New Index:</label>
                  <textarea class="form-control" id="message-text" v-model="updateIndex"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addArticle">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: '',
      index: '',
      updateTitle: '',
      updateIndex: '',
      article: [],
      name: localStorage.getItem('name'),
      avatar: localStorage.getItem('avatar'),
      tokenfb: localStorage.getItem('tokenfb') || null
    }
  },
  created: function () {
    this.showArticle()
  },
  methods: {
    showArticle: function () {
      axios({
        method: 'get',
        url: `http://localhost:3000/api/article`
      }).then(({ data }) => {
        console.log(data)
        this.article = data.data_article
      })
    },
    addArticle: function () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/article',
        data: {
          title: this.title,
          text: this.index
        }
      }).then(data => {
        this.showArticle()
        console.log(data)
      })
    },
    editArticle: function (obj) {
      console.log(this.updateIndex)
      console.log(this.updateTitle)
      // console.log(obj)
      axios({
        method: 'get',
        url: `http://localhost:3000/api/article/edit/${obj._id}`,
        headers: {
          title: this.updateTitle,
          text: this.updateIndex
        }
      }).then(data => {
        console.log(data)
        // this.showArticle()
      })
    },

    deleteAricle: function (obj) {
      axios({
        method: 'delete',
        url: `http://localhost:3000/api/article/${obj._id}`
      }).then(data => {
        console.log(data)
        this.showArticle()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  margin-bottom: 28px
}
p {
  text-align: justify;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
