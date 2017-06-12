<template>
  <app>
    <div class="event-page">
      <h1>Events</h1>
      <h2>Upcoming Shows</h2>
      <show-item v-for="show in upcoming"
        :title="show.title"
        :date="show.date"
        :type="show.type"
        :venue="show.venue"
        :location="show.location"
        :link="show.link"
        :showUpcoming="true">
      </show-item>
      <h2>Past Shows</h2>
      <show-item v-for="show in past"
        :title="show.title"
        :date="show.date"
        :type="show.type"
        :venue="show.venue"
        :location="show.location"
        :link="show.link">
      </show-item>
    </div>
  </app>
</template>

<script>
  const App = require('./app.vue');
  const ShowItem = require('./show-item.vue');
  const axios = require('axios');

  module.exports = {
    components: {
      App,
      ShowItem
    },
    data() {
      return {
        shows: []
      }
    },
    computed: {
      upcoming() {
        return this.shows.filter(show => {
          return Date.now() <= new Date(show.date);
        })
      },
      past() {
        return this.shows.filter(show => {
          return Date.now() > new Date(show.date);
        })
      }
    },
    created() {
      axios.get('/api/shows')
        .then(data => {
          this.shows = data.data;
        });
    }
  }
</script>

<style lang="scss">
  @import 'vars';

  .event-page {
    @extend %page;
    
    h2 {
      margin-top: 30px;
      margin-bottom: 30px;
      font-weight: 800;
    }
  }
</style>