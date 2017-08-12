<template>
  <div class="shop-item">
    <div class="shop-item__image-container" :class="{'sold-out': !available}" :style="styleObject">
      <span>{{title}}</span>
      <a :href="`/art/shop/product/${productID}`"></a>
    </div>
    <div class="shop-item__product-info">
      <p class="shop-item__product-name">{{title}}</p>
      <p class="shop-item__product-price">${{price}}</p>
    </div>
  </div>
</template>

<script>
  const App = require('./app.vue');

  module.exports = {
    props: ['title', 'price', 'image', 'productID', 'available', 'type'],
    components: {
      App
    },
    data() {
      return {
        styleObject: {
          backgroundImage: `url(${this.image})`
        },
        slug_type: this.type.toLowerCase()
      }
    }
  }
</script>

<style lang="scss">
  @import 'vars';

  .shop-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    margin-bottom: 50px;
    
    &__image-container {
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba($black, .2);
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background-size: cover;
      background-position: center;

      span {
        display: none;
      }

      a {
        display: block;
        width: 100%;
        height: 100%;
      }

      &.sold-out {
        position: relative;

        &::after {
          content: 'Sold Out';
          position: absolute;
          top: 0;
          right: 0;
          background-color: $black;
          color: $white;
          display: block;
          padding: 5px;
        }
      }
    }
    
    &__product-info {

    }

    &__product-name {
      font-size: 14px;
      color: rgba($black, .7);
    }

    &__product-price {
      font-size: 12px;
      color: rgba($black, .7);
      letter-spacing: 1px;
    }
  }
</style>