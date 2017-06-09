<template>
  <nav>
    <ul>
      <li v-for="link in data" :class="{active: isActive(link.url)}"><a :href="link.url">{{link.title}}</a></li>
      <li>
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
        itemCount: 0
      }
    },
    methods: {
      isActive(url) {
        return url == this.activePath;
      },
      updateCart(cart) {
        this.itemCount = cart.lineItemCount;
      }
    },
    created() {
      Ting.$once('CART_FETCHED', this.updateCart);
      Ting.$on('UPDATE_CART', this.updateCart);
      Ting.$emit('FETCH_CART');
    }
  }
</script>