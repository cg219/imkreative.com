<template>
  <app>
    <div class="homepage">
      <template v-if="shows.length > 0">
        <div class="event-page">
          <h2>Upcoming Events</h2>
          <show-item v-for="show in shows"
            :title="show.title"
            :date="show.date"
            :type="show.type"
            :venue="show.venue"
            :location="show.location"
            :link="show.link"
            :showUpcoming="true" />
        </div>
      </template>
      <template v-if="this.products.length > 0">
        <div class="shop-page">
          <h2>Featured Products</h2>
          <div class="shop-page__item-container">
            <div class="shop-item" v-for="product in products">
              <div class="shop-item__image-container" :class="{'sold-out': !product.attrs.available}" :style="{backgroundImage: `url(${product.selectedVariantImage.variants[6].src})`}">
                <span>{{product.title}}</span>
                <a :href="`/art/shop/product/${product.id}`"></a>
              </div>
            </div>
          </div>
        </div>
      </template>
      <h2>Subscribe to the Newsletter</h2>
      <subscribe />
    </div>
  </app>
</template>

<script>
  const App = require('./app.vue');
  const ShowItem = require('./show-item.vue');
  const Subscribe = require('./subscribe.vue');
  const Ting = require('./ting');
  const axios = require('axios');

  module.exports = {
    components: {
      App,
      ShowItem,
      Subscribe
    },
    data() {
      return {
        shows: [],
        products: []
      }
    },
    created() {
      Ting.$emit('FETCH_FEATURED');
      Ting.$on('FEATURED_FETCHED', this.updateProducts);

      axios.get('/api/shows')
        .then(data => {
          this.shows = data.data.filter(show => {
            return Date.now() <= new Date(show.date);
          });
        });
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
  
  .homepage {
    text-align: center;

    h2 {
      font-weight: 800;
    }

    .event-page {
      padding: 0;
    }

    .shop-page {
      padding: 0;

      &__item-container {
        justify-content: center;
      }

      .shop-item {
        height: 300px;
      }
    }
    
    .subscribe-container {
      margin: 0 auto;
      width: 300px;
    }
  }
</style>