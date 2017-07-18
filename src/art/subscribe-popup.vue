<template>
  <div class="subscribe-popup">
    <div class="subscribe-popup__subscribe-page">
      <button class="subscribe-popup__close" @click="onClose">&times;</button>
      <h2>Subscribe to the Newsletter</h2>
      <h3>Get announcements, exclusive deals and new print news first!</h3>
      <subscribe v-on:subscribed="onSubscribed"></subscribe>
    </div>
  </div>
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
        localStorage.setItem('subscribed', true);
        sessionStorage.setItem('keep-popup-closed', true);
        this.$emit('exit');
      },
      onClose() {
        this.$emit('exit');
      }
    }
  }
</script>

<style lang="scss">
  @import 'vars';
  .subscribe-popup {
    @extend %popup;

    &__subscribe-page {
      text-align: center;
      background: $white;
      width: 400px;
      padding: 50px;
      position: relative;

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

    &__close {
      position: absolute;
      top: 20px;
      right: 20px;
      padding: 5px 10px;
    }
  }
</style>