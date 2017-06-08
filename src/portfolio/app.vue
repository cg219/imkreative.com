<template>
  <div class="portfolio">
    <nav>
      <ul>
        <li class="home-button"><a href="/">Home</a></li>
        <li><a href="mailto:mente@imkreative.com">Email</a></li>
        <li><a href="http://www.github.com/cg219">Github</a></li>
      </ul>
    </nav>
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
  @import "vars";

  nav {
    background: $black;

    ul {
      padding: 0;
      margin: 0 0 0 10px;
      display: flex;
      align-items: center;
      list-style-type: none;
      height: 70px;

      li {
        margin-right: 15px;
        font-size: 14px;
        color: $white;
        text-transform: lowercase;

        a {
          color: inherit;
          text-decoration: none;
        }

        &.home-button {
          background: url('logo.png') no-repeat;
          background-size: cover;
          width: 100px;

          a {
            display: block;
            opacity: 0;
            width: 100%;
            height: 100%;
          }
        }

        &:hover {
          color: $maincolor;
        }
      }
    }
  }

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
    }

    @media #{$sm-mobile} {
      width: 100%;
      margin-left: 0;
    }
  }
</style>