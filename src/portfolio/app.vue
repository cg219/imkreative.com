<template>
  <div class="portfolio">
    <portfolio-item
      v-for="entry in entries"
      :name="entry.name"
      :link="entry.link"
      :client="entry.client"
      :agency="entry.agency"
      :roles="entry.roles"
      :tech="entry.tech"
      :isActive="entry.isActive"
      :date="entry.date"
      :thumbnail="entry.thumbnail"
      :key="entry">
    </portfolio-item>
  </div>
</template>

<script>
  const axios = require('axios');
  const PortfolioItem = require('./portfolio-item.vue');

  module.exports = {
    data() {
      return {
        entries: []
      }
    },
    components: {
      PortfolioItem
    },
    created() {
      axios.get('/api/entries')
        .then(data => {
          this.entries = data.data;
        });
    }
  }
</script>

<style lang="scss">
  @import "variables";

  .portfolio {
    max-width: 1680px;
    width: 100%;
    min-height: 100%;
    position: relative;
    height: 100%;
    overflow: hidden;
    float: left;

    @media #{$mobile} {
      width: 100%;
      margin-left: 0;
      margin-top: 100px;
    }

    @media #{$sm-mobile} {
      width: 100%;
      margin-left: 0;
      margin-top: 100px;
    }
  }
</style>