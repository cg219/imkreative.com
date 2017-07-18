<template>
  <app>
    <div class="subscribe-page">
      <h2>Subscribe to the Newsletter</h2>
      <h3>Get announcements, exclusive deals and new print news first!</h3>
      <subscribe v-on:subscribed="onSubscribed"></subscribe>
    </div>
  </app>
</template>

<script>
  const App = require('./app.vue');
  const Subscribe = require('./subscribe.vue');

  module.exports = {
    components: {
      App,
      Subscribe
    },
    methods: {
      onSubscribed() {
        window.location.href = "/art/shop";
      }
    }
  }
</script>

<style lang="scss">
  @import 'vars';
  
  .subscribe-page {
    text-align: center;

    h2 {
      font-weight: 800;
    }
    
    .subscribe-container {
      margin: 0 auto;
      width: 400px;

      @media #{$sm-mobile} {
        width: 100%;
      }
    }
  }
</style>