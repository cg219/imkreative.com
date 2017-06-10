<template>
  <app>
    <div class="shop-page">
      <h1>Art Shop</h1>

      <div class="shop-page__item-container">
        <shop-item
          v-for="product in products"
          :title="product.title"
          :image="product.selectedVariantImage.variants[6].src"
          :price="product.selectedVariant.price"
          :productID="product.id"
          :available="product.attrs.available">
        </shop-item>
      </div>
    </div>
  </app>
</template>

<script>
  const App = require('./app.vue');
  const ShopItem = require('./shop-item.vue');
  const Ting = require('./ting');

  module.exports = {
    components: {
      App,
      ShopItem
    },
    data() {
      return {
        products: []
      }
    },
    created() {
      Ting.$emit('FETCH_PRODUCTS');
      Ting.$on('PRODUCTS_FETCHED', this.updateProducts);
    },
    methods: {
      updateProducts(fetchedProducts) {
        console.log(fetchedProducts)
        this.products = fetchedProducts;
      }
    }
  }
</script>

<style lang="scss">
  @import 'vars';

  .shop-page {
    @extend %page;
    
    &__item-container {
      display: flex;
      justify-content: flex-start; 
      flex-wrap: wrap;
    }

    .shop-item {
      width: 33%;
      height: 500px;

      &:nth-child(3n-1) {
        @media #{$notmobile} {
          margin-left: .5%;
          margin-right: .5%;
        }

        @media #{$mobile} {
          margin-left: 0%;
          margin-right: 0%;
        }
      }

      &:nth-child(2n-1) {

        @media #{$mobile} {
          margin-left: 1%;
          margin-right: 1%;
        }
      }

      @media #{$mobile} {
        width: 48%;
      }

      @media #{$sm-mobile} {
        width: 100%;
      }
    }
  }
</style>