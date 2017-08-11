<template>
  <div class="admin">
    <header>
      <h1>Artbymente Admin Center</h1>
      <button @click="logout" v-if="loggedIn">Log Out</button>
    </header>
    <template v-if="loggedIn">
      <div class="container">
        <h2>Send Newsletter</h2>
        <div class="form">
          <div class="input"><input type="text" v-model="subject" placeholder="Subject"></div>
          <div class="input"><input type="text" v-model="mailingList" placeholder="Mailing List"></div>
          <div class="input"><input type="text" v-model="tags" placeholder="Tags (Seperated By Commas)"></div>
          <div class="input"><input type="text" v-model="uuid" placeholder="UUID used for Newsletter URL (No Spaces)"></div>
          <div class="input"><textarea type="text" v-model="newsletterHTML" placeholder="Newsletter HTML"></textarea></div>
          <button @click="sendNewsletter">Send</button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="container">
        <h2>Login</h2>
        <div class="form">
          <div class="input"><input type="text" v-model="username" @keyup.enter="login"></div>
          <div class="input"><input type="password" v-model="password" @keyup.enter="login"></div>
          <div class="button-container">
            <button @click="login">Login</button>
            <button @click="signup">Signup</button>
          </div>
        </div>
      </div>
    </template>
    <div class="form-error-notification" :class="{'show': formErrorNotification}">
      <p>ERROR: Fill Out Form Completely</p>
    </div>
    <div class="uuid-error-notification" :class="{'show': uuidErrorNotification}">
      <p>That UUID already exists in the system</p>
    </div>
    <div class="success-notification" :class="{'show': successNotification}">
      <p>Success Sent</p>
    </div>
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
        emails: [],
        mailingList: 'test@mailer.imkreative.com',
        newsletterHTML: '',
        subject: '',
        tags: '',
        uuid: '',
        formErrorNotification: false,
        successNotification: false,
        uuidErrorNotification: false
      }
    },
    computed: {
      tagsAsArray() {
        return this.tags.replace(/\s+/g, '').split(',');
      },
      strippedUUID() {
        return this.uuid.replace(/\s+/g, '');
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
      validateNewsletter() {
        if( this.mailingList.length < 10 ||
            this.newsletterHTML.length < 10 ||
            this.subject.length < 10 ||
            this.uuid.length < 10 ) {
          return false;
        }

        return true;
      },
      sendNewsletter() {
        if(this.validateNewsletter()) {
          axios.post('/send-newsletter', {
            email: this.mailingList,
            html: this.newsletterHTML,
            subject: this.subject,
            tags: this.tagsAsArray,
            uuid: this.strippedUUID
          })
          .then(data => {
            if(data.data.error && data.data.errorCode == 1000) {
              this.uuidErrorNotification = true;

              setTimeout(() => {
                this.uuidErrorNotification = false;
              }, 2000);
            }
            else {
              this.subject = '';
              this.uuid = '';
              this.tags = '';
              this.newsletterHTML = '';
            }
          })
        }
        else {
          this.formErrorNotification = true;

          setTimeout(() => {
            this.formErrorNotification = false;
          }, 2000);
        }
      }
    },
    created() {
      if(this.loggedIn) {
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

  .form-error-notification,
  .success-notification,
  .uuid-error-notification {
    @extend %notification;
  }
  
</style>