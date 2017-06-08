<template>
  <app>
    <h2>Upcoming Shows</h2>
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

  .show-item {
    font-size: 14px;

    span {
      font-weight: 600;
      text-transform: uppercase;
      font-size: 1.1em;
    }

    a {
      color: $maincolor;
      text-decoration: none;
      font-size: 0.8em;
    }
  }
</style>