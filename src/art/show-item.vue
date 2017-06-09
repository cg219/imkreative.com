<template>
  <div class="show-item">
    <p>
      <span>{{type}} &ndash;</span> {{getShowText}}
      <template v-if="isUpcoming"> &mdash; <a :href="link" target="_blank">More Info</a></template>
    </p>

  </div>
</template>

<script>
  const moment = require('moment');

  module.exports = {
    props: ['type', 'title', 'venue', 'location', 'date', 'link'],
    data() {
      return {
        isUpcoming: Date.now() < this.date
      }
    },
    computed: {
      getShowText() {
        const date = this.isUpcoming ? moment(this.date).format('MMM D, YYYY') : moment(this.date).format('MMMM YYYY');
        return `${this.title} @ ${this.venue} in ${this.location}, ${date}`;
      }
    }
  }
</script>

<style lang="scss">
  @import 'vars';

  .show-item {
    font-size: 14px;

    @media #{$mobile, $sm-mobile} {
      font-size: 12px;
    }

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