<template>
  <app>
    <div class="product-page">
      <div class="product-page__image-container">
        <img :src="productImage" alt="productTitle">
      </div>
      <div class="product-page__product-info">
        <h2 class="product-page__product-name">{{productTitle}}</h2>
        <p class="product-page__product-price">${{productPrice}}</p>
        <div class="product-page__cart-container">
          <form action="">
            <div class="product-page__qty-container">
              <label for="productQuantity">Qty.</label>
              <div class="product-page__input">
                <input name="productQuantity" type="number" min="1" placeholder="1">
              </div>
            </div>
            <button class="product-page__add-to-cart">Add to Cart</button>
          </form>
        </div>
        <p class="product-page__product-desc">{{productDesc}}</p>
        <h3 class="product-page__shipping-info-heading">Shipping Info</h3>
        <p class="product-page__shipping-info">
          Please allow 7-10 days for item(s) to be shipped. Each item is hand packaged and printed for the best possible quality.
        </p>
      </div>
    </div>
  </app>
</template>

<script>
  const App = require('./app.vue');
  const Ting = require('./ting');

  module.exports = {
    props: ['title', 'price', 'description', 'image'],
    components: {
      App
    },
    data() {
      return {
        productTitle: this.title,
        productPrice: this.price,
        productDesc: this.description,
        productImage: this.image
      }
    },
    computed: {
      productID() {
        const expression = /product\/(\d+)/gi;
        const url = window.location.pathname;

        return expression.exec(url)[1];
      },
      productImageStyle() {
        return {
          backgroundImage: `url(${this.productImage})`
        }
      }
    },
    created() {
      Ting.$emit('FETCH_PRODUCT', this.productID);
      Ting.$on('PRODUCT_FETCHED', this.updateProduct);
    },
    methods: {
      updateProduct(product) {
        console.log(product)
        this.productTitle = product.title;
        this.productPrice = product.selectedVariant.price;
        this.productDesc = product.description;
        this.productImage = product.selectedVariantImage.variants[8].src;
      }
    }
  }
</script>

<style lang="scss">
  @import 'vars';

  .product-page {
    display: flex;
    width: 95%;
    margin: 100px auto 0;
    flex-direction: row;

    &__image-container {
      width: 50%;
      height: auto;

      img {
        width: 100%;
        border: 2px solid rgba($black, .7);
      }

      span {
        display: none;
      }
    }

    &__product-info {
      padding: 10px 30px;
      width: 50%;
      box-sizing: border-box;
    }

    &__product-name {
      // font-family: "Open Sans", serif;
      font-weight: 400;
      font-size: 48px;
      margin-bottom: 5px;
    }

    &__product-price {
      font-size: 30px;
      color: $secondarycolor;
      margin: 5px 0;
    }

    &__cart-container {
      margin: 20px 0 40px;

      form {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
      }
    }
    &__qty-container {
      display: flex;
      flex-direction: column;

      label {
        font-size: 12px;
        margin-bottom: 5px;
      }
    }

    &__input {
      @extend %input;
      width: 100px;
      margin: 0 20px 0 0;
    }

    &__add-to-cart {
      padding: 15px 20px;
      flex: 0 0 auto;
    }

    &__product-desc {
      font-size: 14px;
      margin: 0 0 30px;
    }

    &__shipping-info-heading {
      font-size: 14px;
    }

    &__shipping-info {
      font-size: 12px;
    }
  }
</style>