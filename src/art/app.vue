<template>
  <div class="container">
    <header class="header">
      <h1>Mente Gee</h1>
      <art-nav :data="navData" class="header__nav"></art-nav>
    </header>

    <slot></slot>

    <footer>
      
    </footer>
    <div class="mobile-cart">
      <a href="/art/shop/cart">
        <div class="cart-icon">
          <p :class="{empty: itemCount == 0}">{{itemCount}}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
  const ArtNav = require('./nav.vue');
  const Ting = require('./ting');

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
        itemCount: 0
      }
    },
    methods: {
      updateCart(cart) {
        this.itemCount = cart.lineItemCount;
      },
    },
    created() {
      Ting.$once('CART_FETCHED', this.updateCart);
      Ting.$on('UPDATE_CART', this.updateCart);
      Ting.$emit('FETCH_CART');
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

      @media #{$mobile} {
        font-size: 20px;
      }
    }

    &__nav {

    }
  }

  .mobile-cart {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100px;
    width: 100%;
    background-color: $black;
    z-index: 9;

    @media #{$notmobile} {
      display: none;
    }

    a {
      width: 100%;
      height: 100%;
    }

    .cart-icon {
      background-image: url('cart.png');
      height: 70px;
      width: 70px;
      margin: 15px auto;

      p {
        line-height: 70px;
        color: $white;
        font-size: 24px;

        &.empty {
          color: $white;
        }
      }
    }
  }
</style>