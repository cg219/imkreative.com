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
    margin: 100px auto;
    width: 95%;
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
        margin: 0 .5%;

        @media #{$mobile} {
          margin: 0;
        }
      }

      @media #{$mobile} {
        width: 49%;
      }
    }
  }
</style>