<template>
  <div class="subscribe-container">
    <div class="subscribe-container__input">
      <input type="email" placeholder="Email (Required)" v-model="email" required />
    </div>
    <div class="subscribe-container__input">
      <input type="text" placeholder="First Name (Required)" v-model="fname" required />
    </div>
    <button type="submit" @click="validateForm">Send</button>
    <div class="sub-notification" :class="{'show': subscribedNotification}">
      <p>Thank you for subscribing.</p>
    </div>
    <div class="email-error-notification" :class="{'show': emailErrorNotification}">
      <p>Email Address is invalid.</p>
    </div>
    <div class="name-error-notification" :class="{'show': nameErrorNotification}">
      <p>First Name is required.</p>
    </div>
  </div>
</template>

<script>
  const App = require('./app.vue');
  const axios = require('axios');

  module.exports = {
    components: {
      App
    },
    data() {
      return {
        email: '',
        fname: '',
        subscribedNotification: false,
        emailErrorNotification: false,
        nameErrorNotification: false
      }
    },
    methods: {
      validateForm(event) {
        event.preventDefault();

        const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email);
        const validName = this.fname != '';

        if(validEmail && validName) {
          this.saveEmail();
        }
        else {
          if(!validEmail) {
            this.errorNotification();
          }

          if(!validName) {
            this.errorNotification(1);
          }
        }
      },
      saveEmail() {
        axios
          .post('api/save-email', {
            email: this.email,
            fname: this.fname
          })
          .then(response => {
            this.subscribeConfirmation();
            this.email = '';
            this.fname = '';
          })
      },
      errorNotification(type) {
        if(!type || type == 0) {
          this.emailErrorNotification = true;

           setTimeout(() => {
            this.emailErrorNotification = false;
          }, 2000);
        }

        if(type == 1) {
          this.nameErrorNotification = true;

           setTimeout(() => {
            this.nameErrorNotification = false;
          }, 2000);
        }
      },
      subscribeConfirmation() {
        this.subscribedNotification = true;

        setTimeout(() => {
          this.subscribedNotification = false;
          this.$emit('subscribed');
        }, 1000);
      }
    }
  }
</script>

<style lang="scss">
  @import 'vars';
  
  .subscribe-container {
    @extend %page;
    
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 0;
    margin-right: 0;

    &__input {
      @extend %input;

      width: 100%;
      margin: 0 0 5px;
    }

    .sub-notification,
    .email-error-notification,
    .name-error-notification {
      @extend %notification;
    }

    .name-error-notification {
      bottom: 70px;
    }
  }
</style>