<template>
  <ul class="share">
    <li class="share__twitter"><a :href="twitter" target="_blank">Twitter</a></li>
    <li class="share__facebook"><a :href="facebook" target="_blank">Facebook</a></li>
    <li class="share__pinterest"><a :href="pinterest" target="_blank">Pinterest</a></li>
  </ul>
</template>

<script>
  module.exports = {
    props: ['desc', 'image', 'link'],
    data() {
      return {

      }
    },
    computed: {
      pinterest() {
        return `https://www.pinterest.com/pin/create/link/?description=${encodeURIComponent(this.desc)}&media=${encodeURIComponent(this.image)}&url=${encodeURIComponent(this.link)}`;
      },
      twitter() {
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.link)}&text=${encodeURIComponent(this.desc)}+by+@kreativemente`;
      },
      facebook() {
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.link)}`;
      }
    }
  }
</script>

<style lang="scss">
  @import 'vars';

  .share {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    margin: 20px 0 0 15px;

    li {
      position: relative;
      margin-right: 50px;
      font-weight: 600;
      font-size: 12px;
      color: rgba($black, .7);

      &:before {
        content: '';
        height: 12px;
        width: 12px;
        background-size: contain;
        background-repeat: no-repeat;
        position: absolute;
        display: block;
        left: -15px;
        opacity: .7;
      }
    }

    &__twitter:before {
      background-image: url('twitter.png');
    }

    &__facebook:before {
      background-image: url('fb.png');
    }

    &__pinterest:before {
      background-image: url('pinterest.png');
    }
  }
</style>