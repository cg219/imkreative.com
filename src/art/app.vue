<template>
  <div>
    <div class="container">
      <div class="wrapper">
        <header class="header">
          <h1><a href="/art">Mente Gee</a></h1>
          <art-nav :data="navData" class="header__nav"></art-nav>
        </header>
        <slot></slot>
      </div>
      <div class="mobile-cart">
        <a href="/art/shop/cart">
          <div class="cart-icon">
            <p :class="{empty: itemCount == 0}">{{itemCount}}</p>
          </div>
        </a>
      </div>
    </div>
    <footer>
      <ul>
        <li class="instagram"><a href="http://www.instagram.com/kreativemente" target="_blank">Instagram</a></li>
        <li class="facebook"><a href="http://www.facebook.com/artbymente" target="_blank">Facebook</a></li>
        <li class="twitter"><a href="http://www.twitter.com/kreativemente" target="_blank">Twitter</a></li>
        <li class="youtube"><a href="http://www.youtube.com/channel/UCrs5X_h4srCGAOWWN-QKNMA" target="_blank">Youtube</a></li>
      </ul>
      <p>Created by Clemente Gomez</p>
    </footer>
    <subscribe-popup :class="{'show': showPopup}" v-on:exit="closePopup" />
  </div>
</template>

<script>
  const ArtNav = require('./nav.vue');
  const Ting = require('./ting');
  const SubscribePopup = require('./subscribe-popup.vue');

  module.exports = {
    components: {
      ArtNav,
      SubscribePopup
    },
    data() {
      return {
        navData: [
          {
            url: "/art",
            title: "Home"
          },
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
            url: "/art/subscribe",
            title: "Newsletter"
          },
          {
            url: "/art/contact",
            title: "Contact"
          }
        ],
        itemCount: 0,
        showPopup: false
      }
    },
    methods: {
      updateCart(cart) {
        this.itemCount = cart.lineItemCount;
      },
      closePopup() {
        this.showPopup = false;
        localStorage.setItem('subscribed', false);
        sessionStorage.setItem('keep-popup-closed', true);
      },
      checkOpt() {
        if(localStorage) {
          const isSubscribed = localStorage.getItem('subscribed') == 'true';
          const alreadyOpened = sessionStorage.getItem('keep-popup-closed') == 'true';

          if(!isSubscribed && !alreadyOpened) {
            setTimeout(() => {
              this.showPopup = true;
            }, 5000);
          }
        }
      }
    },
    created() {
      Ting.$once('CART_FETCHED', this.updateCart);
      Ting.$on('UPDATE_CART', this.updateCart);
      Ting.$emit('FETCH_CART');

      this.checkOpt();
    }
  }
</script>

<style lang="scss">
  @import "vars";

  footer {
    height: $footerHeight;
    width: 100%;
    background-color: darken($white, 10%);
    position: relative;

    ul {
      list-style-type: none;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    p {
      font-size: 8px;
      position: absolute;
      bottom: 5px;
      width: 100%;
      text-align: center;
    }

    .instagram, .facebook, .twitter, .youtube {
      @extend %icon;
      margin-right: 10px;
    }

    .instagram {
      background-image: url('ig.png');
    }

    .facebook {
      background-image: url('fb.png');
    }

    .twitter {
      background-image: url('twitter.png');
    }

    .youtube {
      background-image: url('youtube.png');
      margin-right: 0;
    }
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    h1 {
      font-size: 30px;
      font-weight: 800;
      color: $black;
      text-transform: uppercase;

      small {
        font-size: 0.8em;
        font-weight: 600;
        color: $maincolor;
      }

      @media #{$sm-mobile} {
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