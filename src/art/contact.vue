<template>
  <app>
    <div class="contact-page">
      <h1>Contact Me</h1>
      <p>For inquiries about purchasing original pieces and limited prints, or for information about shows, exhibitions, commissions, interviews and more, please contact me by filling out the form below.</p>
      
      <div class="contact-page__form">
        <form action="">
          <div class="contact-page__input"><input type="text" placeholder="Name (Required)" @change="missingName = false" v-model="name" required /></div>
          <p class="contact-page__error" v-show="missingName">Please enter a name</p>
          <div class="contact-page__input"><input type="email" placeholder="Email (Required)" @change="missingEmail = false" v-model="email" required /></div>
          <p class="contact-page__error" v-show="missingEmail">Please enter a valid email</p>
          <div class="contact-page__input">
            <textarea placeholder="Message (Min 10 characters) (Required)" @change="missingMessage = false" v-model="message" required></textarea>
          </div>
          <p class="contact-page__error" v-show="missingMessage">Please enter a message atleast 10 characters long.</p>
          <button type="submit" @click="validateForm">Send</button>
        </form>
      </div>
    </div>
    <div class="email-notification" :class="{'show': showEmailNotification}">
      <p>Your email has been sent</p>
    </div>
  </app>
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
        name: '',
        email: '',
        message: '',
        missingName: false,
        missingEmail: false,
        missingMessage: false,
        showEmailNotification: false
      }
    },
    methods: {
      validateForm(event) {
        event.preventDefault();

        this.missingName = this.name.length < 1;
        this.missingEmail = !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email);
        this.missingMessage = this.message.length < 10;

        if(this.missingName === false && this.missingEmail === false && this.missingMessage === false) {
          this.sendEmail();
        }
      },
      sendEmail() {
        axios
          .post('api/send-email', {
            message: this.message,
            name: this.name,
            email: this.email
          })
          .then(response => {
            this.emailConfirmation();
            this.name = '';
            this.email = '';
            this.message = '';
          })
      },
      emailConfirmation() {
        this.showEmailNotification = true;

        setTimeout(() => this.showEmailNotification = false, 3000);
      }
    }
  }
</script>

<style lang="scss">
  @import 'vars';

  .email-notification {
    @extend %notification;
  }

  .contact-page {
    @extend %page;
    
    width: 50%;

    @media #{$sm-desktop} {
      width: 80%;
    }

    @media #{$mobile, $sm-mobile} {
      width: 100%;
    }

    &__input {
      @extend %input;
    }

    &__error {
      color: $errorcolor;
      font-size: 10px;
    }
  }
</style>