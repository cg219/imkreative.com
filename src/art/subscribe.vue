<template>
  <div class="subscribe-container">
    <div class="subscribe-container__input">
      <input type="email" placeholder="Email (Required)" v-model="email" required />
    </div>
    <button type="submit" @click="validateForm">Send</button>
    <div class="sub-notification" :class="{'show': subscribedNotification}">
      <p>Thank you for subscribing.</p>
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
        subscribedNotification: false
      }
    },
    methods: {
      validateForm(event) {
        event.preventDefault();

        const valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email);

        if(valid) {
          this.saveEmail();
        }
      },
      saveEmail() {
        axios
          .post('api/save-email', {
            email: this.email
          })
          .then(response => {
            this.subscribeConfirmation();
            this.email = '';
          })
      },
      subscribeConfirmation() {
        this.subscribedNotification = true;

        setTimeout(() => this.subscribedNotification = false, 3000);
      }
    }
  }
</script>

<style lang="scss">
  @import 'vars';
  
  .subscribe-container {
    @extend %page;
    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-left: 0;
    margin-right: 0;

    &__input {
      @extend %input;

      width: 100%;
      margin: 0;
    }

    .sub-notification {
      @extend %notification;
    }
  }
</style>