<template>
  <div class="admin">
    <header>
      <h1>Artbymente Admin Center</h1>
      <button @click="logout" v-if="loggedIn">Log Out</button>
    </header>
    <template v-if="loggedIn">
      <div class="container">
        <h2>Email List</h2>
        <ul>
          <li v-for="email in emails">
            <p>{{email}}</p>
            <button>&times;</button>
          </li>
        </ul>
        <button @click="extract">Extract</button>
      </div>
    </template>
    <template v-else>
      <div class="container">
        <h2>Login</h2>
        <div class="form">
          <div class="input"><input type="text" v-model="username"></div>
          <div class="input"><input type="password" v-model="password"></div>
          <div class="button-container">
            <button @click="login">Login</button>
            <button @click="signup">Signup</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  const axios = require('axios');

  module.exports = {
    data() {
      return {
        loggedIn: this.$root.loggedInState,
        username: '',
        password: '',
        emails: []
      }
    },
    methods: {
      signup() {
        let body = {
          username: this.username,
          password: this.password
        }

        axios.post('/signup', body)
          .then(data => {
            window.location = data.data;
          })
      },
      login() {
        let body = {
          username: this.username,
          password: this.password
        }

        axios.post('/login', body)
          .then(data => {
            window.location = data.data;
          })
      },
      logout() {
         axios.post('/logout')
          .then(data => {
            window.location = '/';
          })
      },
      extract() {
        let emails = this.emails.map(email => {
          return {'email': email};
        })
        let body = {
          emails
        }

        axios.post('/extract', body)
          .then(data => {
            window.location = data.data;
          })
      }
    },
    created() {
      if(this.loggedIn) {
        axios.get('/emails')
          .then(data => {
            this.emails = data.data;
          })
      }
    }
  }
</script>

<style lang="scss">
  @import 'vars';

  body { 
    font-family: "Open Sans", sans-serif;
    color: $black;
  }

  h1 {
    text-align: center;
    font-weight: 800;
  }

  header {
    button {
      position: absolute;
      top: 20px;
      right: 20px;
    }
  }

  input, textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    color: rgba($black, .7);
    background: none;

    &::placeholder {
      color: rgba($black, .4);
      font-size: 0.8em;
    }
  }

  button {
    border: none;
    outline: none;
    background-color: $black;
    color: $white;
    padding: 10px 20px;
    text-transform: uppercase;
    cursor: pointer;
    -webkit-transition: background-color .5s;
       -moz-transition: background-color .5s;
        -ms-transition: background-color .5s;
         -o-transition: background-color .5s;
            transition: background-color .5s;

    &:hover {
      background-color: $maincolor;
    }
  }

  ul {
    padding: 0;
    margin: 0 0 10px;
    list-style-type: none;

    li {
      background: $white;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:nth-child(2n + 2) {
        background: darken($white, 5%);
      }

      button {
        font-size: 18px;
        padding: 0 5px;
      }
    }
  }

  .container {
    width: 75%;
    margin: 0 auto;
  }
  
  .input {
    width: 100%;
    box-sizing: border-box;
    border: 1px rgba($black, .4) solid;
    margin-bottom: 10px;
    overflow: hidden;
    padding: 10px;
    background-color: rgba($black, .02);

    input[type=number] {
      -moz-appearance: textfield;

      &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
      }
    }
  }
  
</style>