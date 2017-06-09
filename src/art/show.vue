<template>
  <app>
    <div class="show-page">
      <h2>Upcoming Shows</h2>
      <show-item
        :title="'The New Renaissance Day Party'"
        :date="new Date(2017, 5, 25)"
        :type="'Group'"
        :venue="'Fantasy in Color Gallery'"
        :location="'New York'"
        :link="'https://www.eventbrite.com/e/fantasy-in-color-presents-the-new-renaissance-day-party-tickets-34937338520?aff=utm_source%3Deb_email%26utm_medium%3Demail%26utm_campaign%3Dnew_event_email&utm_term=eventurl_text'">
      </show-item>
      <show-item
        :title="'Pancakes and Booze Art Show NYC'"
        :date="new Date(2017, 9, 11)"
        :type="'Group'"
        :venue="'M1-5 Lounge'"
        :location="'New York'"
        :link="'https://www.facebook.com/events/1971416679761494/?acontext=%7B%22action_history%22%3A%22%5B%7B%5C%22surface%5C%22%3A%5C%22external%5C%22%2C%5C%22mechanism%5C%22%3A%5C%22social_plugin%5C%22%2C%5C%22extra_data%5C%22%3A%5B%5D%7D%5D%22%7D'">
      </show-item>
      <h2>Past Shows</h2>
      <show-item
        :title="'The Vancouver Pancakes and Booze Art Show'"
        :date="new Date(2017, 1, 2)"
        :type="'Group'"
        :venue="'Fortune Sound Club'"
        :location="'Vancouver, Canada'"
        :link="'http://www.pancakesandbooze.com'">
      </show-item>
      <show-item
        :title="'The Seattle Pancakes and Booze Art Show'"
        :date="new Date(2017, 0, 28)"
        :type="'Group'"
        :venue="'El Corazon'"
        :location="'Seattle'"
        :link="'http://www.pancakesandbooze.com'">
      </show-item>
      <show-item
        :title="'Pancakes and Booze Art Show NYC'"
        :date="new Date(2016, 9, 19)"
        :type="'Group'"
        :venue="'M1-5 Lounge'"
        :location="'New York'"
        :link="'http://www.pancakesandbooze.com'">
      </show-item>
    </div>
  </app>
</template>

<script>
  const App = require('./app.vue');
  const ShowItem = require('./show-item.vue');

  module.exports = {
    components: {
      App,
      ShowItem
    }
  }
</script>

<style lang="scss">
  @import 'vars';

  .show-page {
    @extend %page;
    
    h2 {
      margin-top: 30px;
      margin-bottom: 30px;
    }
  }
</style>