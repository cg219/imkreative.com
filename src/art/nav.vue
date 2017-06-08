<template>
  <nav>
    <ul>
      <li v-for="link in data" :class="{active: isActive(link.url)}"><a :href="link.url">{{link.title}}</a></li>
    </ul>
  </nav>
</template>

<script>
  module.exports = {
    props: ['data'],
    data() {
      return {
        activePath: window.location.pathname
      }
    },
    methods: {
      isActive(url) {
        return url == this.activePath;
      }
    },
    created() {
      // console.log(this.activePath);
    }
  }
</script>

<style lang="scss" scoped>
  @import 'vars';

  li.active {
    color: $secondarycolor;
  }
</style>