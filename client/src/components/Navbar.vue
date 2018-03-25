<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">GO-blog-KU</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <ul class="nav navbar-top-links navbar-right" style="float: right;">
          <li v-if="!tokenfb"><button class="btn btn-primary justify-content-end" :id="btnLogin" @click="loginFB" type="button"><i class="fa fa-facebook-official"></i> {{btnLogin}}</button></li>
          <li v-if="tokenfb"><button class="btn btn-outline-danger"  @click="logout" type="button"> Logout <i class="fa fa-sign-out"></i></button></li>
        </ul>
      </form>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'
export default {
  name: 'navbar',
  data () {
    return {
      tokenfb: localStorage.getItem('tokenfb') || null,
      btnLogin: 'Login With Facebook'
    }
  },
  methods: {
    loginFB () {
      window.FB.login(() => {
        window.FB.getLoginStatus(response => {
          if (response.status === 'connected') {
            this.tokenfb = response.authResponse.accessToken
            this.getProfileFB()
          }
        })
      }, { scope: 'email,public_profile' })
    },

    getProfileFB () {
      axios.get('http://localhost:3000/users/signin', {
        headers: {token: this.tokenfb}
      }).then(response => {
        console.log(response)
        localStorage.setItem('tokenfb', this.tokenfb)
        localStorage.setItem('name', response.data.name)
        localStorage.setItem('avatar', response.data.avatar)
        // this.tokenfb = localStorage.getItem('tokenfb')
        window.location.reload()
      }).catch(err => console.error(err))
    },

    logout () {
      this.tokenfb = null
      window.FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          window.FB.logout(function (response) {
            localStorage.clear()
            window.location.reload()
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
