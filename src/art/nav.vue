<template>
  <nav>
    <div class="mobile-nav">
      <button @click="openMenu">&#9776;</button>
      <div class="slide-menu" :class="{open: menuOpen}">
        <button @click="closeMenu">&times;</button>
        <ul>
          <li v-for="link in data" :class="{active: isActive(link.url)}"><a :href="link.url">{{link.title}}</a></li>
        </ul>
      </div>
    </div>
    <ul class="desktop-nav">
      <li v-for="link in data" :class="{active: isActive(link.url)}"><a :href="link.url">{{link.title}}</a></li>
      <li class="cart-nav-item">
        <a href="/art/shop/cart">
          <div class="cart-icon">
            <p :class="{empty: itemCount == 0}">{{itemCount}}</p>
          </div>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  const Ting = require('./ting');

  module.exports = {
    props: ['data'],
    data() {
      return {
        activePath: window.location.pathname,
        itemCount: 0,
        menuOpen: false
      }
    },
    methods: {
      isActive(url) {
        return url == this.activePath;
      },
      updateCart(cart) {
        this.itemCount = cart.lineItemCount;
      },
      closeMenu() {
        this.menuOpen = false;
      },
      openMenu() {
        this.menuOpen = true
      }
    },
    created() {
      Ting.$once('CART_FETCHED', this.updateCart);
      Ting.$on('UPDATE_CART', this.updateCart);
      Ting.$emit('FETCH_CART');
    }
  }
</script>

<style lang="scss">
  @import 'vars';

  .mobile-nav {
    display: block;

    @media #{$notmobile} {
      display: none;
    }

    button {
      background-color: transparent;
      color: $black;
      font-size: 24px;
    }

    .slide-menu {
      width: 100%;
      height: 100%;
      background-color: $white;
      position: fixed;
      top: 0;
      left: 130%;
      box-sizing: border-box;
      -webkit-transition: left .8s ease;
         -moz-transition: left .8s ease;
          -ms-transition: left .8s ease;
           -o-transition: left .8s ease;
              transition: left .8s ease;
      box-shadow: -5px 0 5px rgba($black, .2);
      z-index: 11;

      button {
        font-size: 24px;
        position: absolute;
        top: 0;
        right: 0;
      }

      &.open {
        left: 0;
      }
    }

    ul {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 40px 0 0;
      list-style-type: none;
      display: flex;
      flex-direction: column;
    }

    li {
      font-size: 24px;
      margin-bottom: 20px;
      padding-left: 30px;

      &.active {
        color: $secondarycolor;

        &:hover a {
          color: $secondarycolor;
        }
      }
    }
  }

  .desktop-nav {
    display: none;

    @media #{$sm-mobile} {
      flex-direction: column;
    }

    @media #{$notmobile} {
      display: flex;
      align-items: flex-end;
      padding: 0;
      margin: 0;
      list-style-type: none;
    }

    li {
      margin-right: 20px;
      font-size: 20px;

      @media #{$mobile} {
        font-size: 14px;
        margin-right: 10px;
      }

      @media #{$sm-mobile} {
        margin-right: 0;
        margin-bottom: 10px;
        font-size: 14px;
      }

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

      &.cart-nav-item {
        @media #{$sm-mobile} {
          order: -1;
        }
      }
    }
  }

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
</style>