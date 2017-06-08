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
        return `${this.title} @ ${this.venue} in ${this.location}, ${moment(this.date).format('MMMM YYYY')}`;
      }
    }
  }
</script>