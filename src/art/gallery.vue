<template>
  <app>
    <div class="gallery-page">
      <art-item
        v-for="art in arts"
        :title="art.title"
        :description="art.description"
        :image="art.image">
      </art-item>
    </div>
  </app>
</template>

<script>
  const axios = require('axios');
  const App = require('./app.vue');
  const ArtItem = require('./art-item.vue');

  module.exports = {
    components: {
      App,
      ArtItem
    },
    data() {
      return {
        arts: []
      }
    },
    created() {
      axios.get('/api/arts')
        .then(data => {
          this.arts = data.data;
        });
    }
  }
</script>

<style lang="scss">
  @import 'vars';

  .gallery-page {
    @extend %page;
    
    display: flex;
    justify-content: flex-start; 
    flex-wrap: wrap;

    @media #{$mobile} {
      justify-content: space-between;
    }

    .art-item {
      width: 33%;

      &__image-container {
        height: 500px;
      }

      &:nth-child(3n-1) {
        @media #{$notmobile} {
          margin-left: .5%;
          margin-right: .5%;
        }

        @media #{$mobile} {
          margin-left: 0%;
          margin-right: 0%;
        }
      }

      &:nth-child(2n-1) {

        @media #{$mobile} {
          margin-left: 1%;
          margin-right: 1%;
        }
      }

      @media #{$mobile} {
        width: 48%;
      }

      @media #{$sm-mobile} {
        width: 100%;
      }
    }
  }
</style>