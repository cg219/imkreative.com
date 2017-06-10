<template>
  <app>
    <div class="contact-page">
      <h1>Contact Me</h1>
      <p>For inquiries about purchasing original pieces and limited prints, or for information about shows, exhibitions, commissions, interviews and more, please contact me by filling out the form below.</p>
      
      <div class="contact-page__form">
        <form action="">
          <div class="contact-page__input"><input type="text" placeholder="Name (Required)" required /></div>
          <div class="contact-page__input"><input type="email" placeholder="Email (Required)" required /></div>
          <div class="contact-page__input"><textarea placeholder="Message (Required)" required></textarea></div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  </app>
</template>

<script>
  const App = require('./app.vue');

  module.exports = {
    components: {
      App
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

    &__input {
      @extend %input;
    }
  }
</style>