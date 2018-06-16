<template>
  <app>
    <div class="shop-page">
      <h1>Art Shop</h1>

      <nav class="shop-page__nav">
        <ul>
          <li
            v-for="cat in subNav"
            :key="cat.slug"
            @click="filterCategory(cat.slug)"
            :class="{active: shownCategory == cat.slug}">{{cat.title}}</li>
        </ul>
      </nav>

      <div class="shop-page__item-container">
        <shop-item
          v-for="product in products"
          :title="product.title"
          :image="product.selectedVariantImage.variants[6].src"
          :price="product.selectedVariant.price"
          :productID="product.id"
          :available="product.attrs.available"
          :type="product.attrs.product_type"
          v-show="shownCategory == 'all' || shownCategory == product.attrs.product_type.toLowerCase()">
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
        products: [],
        subNavMap: {
          all: 'All'
        },
        subNav: [],
        shownCategory: 'all'
      }
    },
    created() {
      Ting.$emit('FETCH_PRODUCTS');
      Ting.$on('PRODUCTS_FETCHED', this.updateProducts);
    },
    methods: {
      filterCategory(slug) {
        this.shownCategory = slug;
      },
      updateProducts(fetchedProducts) {
        this.products = fetchedProducts;
        this.updateSubNav();
      },
      updateSubNav() {
        this.products.forEach(product => {
          if(!this.subNavMap[product.attrs.product_type.toLowerCase()]) {
            this.subNavMap[product.attrs.product_type.toLowerCase()] = product.attrs.product_type;
          }
        })

        let keys = Object.keys(this.subNavMap);

        this.subNav = keys.map(key => {
          let category = {
            slug: key,
            title: this.subNavMap[key]
          };

          return category;
        })
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

    &__nav {
      margin-bottom: 10px;

      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;

      }

      li {
        font-size: 14px;
        margin-right: 10px;
        cursor: pointer;

        &:hover {
          color: $maincolor;
        }

        &.active {
          color: $secondarycolor;
          font-weight: 600;

          &:hover {
            color: $secondarycolor;
          }
        }
      }
    }

    .shop-item {
      width: 33%;
      height: 500px;
      margin-right: 10px;
      flex-basis: calc(33% - 10px);

      @media #{$mobile} {
        width: 50%;
        flex-basis: calc(50% - 10px);
      }

      @media #{$sm-mobile} {
        width: 100%;
        margin-right: 0;
        flex-basis: 100%;
      }
    }
  }
</style>