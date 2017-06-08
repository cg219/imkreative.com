<template>
  <app>
    <div class="shop-page">
      <shop-item
        v-for="product in products"
        :title="product.title"
        :image="product.selectedVariantImage.variants[6].src"
        :price="product.selectedVariant.price"
        :productID="product.id">
      </shop-item>
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
        this.products = fetchedProducts;
      }
    }
  }
</script>

<style lang="scss">
  @import 'vars';

  .shop-page {
    margin: 100px auto;
    width: 95%;
    display: flex;
    justify-content: flex-start; 
    flex-wrap: wrap;

    .shop-item {
      width: 33%;
      height: 500px;

      &:nth-child(3n-1) {
        margin: 0 .5%;

        @media #{$mobile} {
          margin: 0;
        }
      }

      @media #{$mobile} {
        width: 49%;
      }
    }
  }
</style>