<template>
  <div class="container">
    <header class="header">
      <h1>Mente Gee: <small>art by mente</small></h1>
      <art-nav :data="navData" class="header__nav"></art-nav>
    </header>

    <slot></slot>

    <footer>
      
    </footer>
  </div>
</template>

<script>
  const ArtNav = require('./nav.vue');

  module.exports = {
    components: {
      ArtNav
    },
    data() {
      return {
        navData: [
          {
            url: "/art/gallery",
            title: "Gallery"
          },
          {
            url: "/art/shop",
            title: "Shop"
          },
          {
            url: "/art/shows",
            title: "Shows"
          },
          {
            url: "/art/contact",
            title: "Contact"
          }
        ],

      }
    }
  }
</script>

<style lang="scss">
  @import "vars";
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    h1 {
      font-size: 30px;
      font-weight: 400;
      color: $black;

      small {
        font-size: 0.8em;
        font-weight: 600;
        color: $maincolor;
      }
    }

    &__nav {
      display: flex;

      .cart-icon {
        background-image: url('cart2.png');
        background-repeat: no-repeat;
        background-size: contain;
        width: 40px;
        height: 40px;

        p {
          margin: 0;
          padding: 5px 0 0;
          width: 100%;
          line-height: 40px;
          text-align: center;
          color: $maincolor;
          font-size: 14px;
          font-weight: 600;

          &.empty {
            color: rgba($black, .7);
          }
        }
      }

      ul {
        display: flex;
        align-items: flex-end;
        padding: 0;
        margin: 0;
        list-style-type: none;
      }

      li {
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
        }

        &:hover a {
          color: $maincolor;
        }

        &.active {
          color: $secondarycolor;

          &:hover a {
            color: $secondarycolor;
          }
        }
      }
    }
  }
</style>