<template>
  <app>
    <div class="contact-page">
        <h1>Contact Me</h1>
        <p>For inquiries about purchasing original pieces and limited prints, or for information about shows, exhibitions, commissions, interviews and more, please contact me by filling out the form below.</p>

        <contact-form></contact-form>
      </div>
  </app>
</template>

<script>
  const App = require('./app.vue');
  const ContactForm = require('./contact-form.vue');
  const axios = require('axios');

  module.exports = {
    components: {
      App,
      ContactForm
    }
  }
</script>

<style lang="scss">
  @import 'vars';

  .contact-page {
    @extend %page;

    width: 50%;

    @media #{$sm-desktop} {
      width: 80%;
    }

    @media #{$mobile, $sm-mobile} {
      width: 100%;
    }
  }
</style>
