<template>
  <app>
    <div class="product-page">
      <h2 class="product-page__product-name mobile">{{productTitle}}</h2>
      <div class="product-page__image-container" :class="{'sold-out': !isAvailable}">
        <img :src="productImage" alt="productTitle">
      </div>
      <div class="product-page__product-info">
        <h2 class="product-page__product-name notmobile">{{productTitle}}</h2>
        <p class="product-page__product-price">${{productPrice}}</p>
        <div class="product-page__cart-container">
          <div class="product-page__variant-container" v-if="productObject.variants && productObject.variants.length > 1">
            <div class="product-page__inner-variant-container" v-for="variant in productObject.options">
              <label :for="`${variant.name}-select`">{{variant.name}}</label>
              <select
                :name="variant.name" 
                :id="`${variant.name}-select`"
                @change="onVariantChange">
                <option :value="option" v-for="option in variant.values">{{option}}</option>
              </select>
            </div>
          </div>
          <form action="">
            <div class="product-page__qty-container">
              <label for="productQuantity">Qty.</label>
              <div class="product-page__input">
                <input name="productQuantity" type="number" min="1" v-model.number="quantity">
              </div>
            </div>
            <button class="product-page__add-to-cart" @click="addToCart">Add to Cart</button>
          </form>
        </div>
        <p class="product-page__product-desc">{{productDesc}}</p>
        <h3 class="product-page__shipping-info-heading" v-if="productObject.attrs && productObject.attrs.product_type.toLowerCase() !== 'apparel'">Shipping Info</h3>
        <p class="product-page__shipping-info" v-if="productObject.attrs && productObject.attrs.product_type.toLowerCase() !== 'apparel'">
          Please allow 7-10 days for item(s) to be shipped. Each item is hand packaged and printed for the best possible quality.
        </p>
        <share :desc="productTitle" :image="productImage" :link="address"></share>
      </div>
    </div>
    <div class="added-to-cart-notification" :class="{'show': addedNotificationShowing}">
      <a href="/art/shop/cart"><p>{{addedAmount}} {{addedProductTitle}} added to your cart.</p></a>
    </div>
    <div class="sold-out-notification" :class="{'show': soldOutNotificationShowing}">
      <p>This item is sould out. Sorry =/</p>
    </div>
  </app>
</template>

<script>
  const App = require('./app.vue');
  const Ting = require('./ting');
  const Share = require('./share.vue');

  module.exports = {
    props: ['title', 'price', 'description', 'image'],
    components: {
      App,
      Share
    },
    data() {
      return {
        productTitle: this.title,
        productPrice: this.price,
        productDesc: this.description,
        productImage: this.image,
        quantity: 1,
        selectedVariant: {},
        productObject: {},
        addedAmount: 0,
        addedProductTitle: '',
        addedNotificationShowing: false,
        soldOutNotificationShowing: false,
        isAvailable: true,
        address: window.location.href
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
      onVariantChange(event) {
        let target = event.target;
        let option = target.name;
        let value = target.value;

        this.productObject.options.find(element => {
          return element.name == option;
        }).selected = value;

        this.updateProduct();
      },
      updateProduct(product) {
        if(product) {
          this.productObject = product;
        }
        this.productTitle = this.productObject.title;
        this.productPrice = this.productObject.selectedVariant.price;
        this.productDesc = this.productObject.description;
        this.productImage = this.productObject.selectedVariantImage.variants[8].src;
        this.selectedVariant = this.productObject.selectedVariant;
        this.isAvailable = this.productObject.attrs.available;

        let newProps = {
          title: `${this.productObject.title} - Art by Mente Gee`,
          url: window.location.href,
          type: 'website',
          image: this.productObject.selectedVariantImage.variants[8].src
        }

        Ting.$emit('UPDATE_META', newProps);
      },
      addToCart(event) {
        event.preventDefault();
        
        Ting.$once('CART_FETCHED', cart => {

          let variant = {
            variant: this.selectedVariant,
            quantity: this.quantity
          }

          if(this.isAvailable) {
            cart.createLineItemsFromVariants(variant)
              .then(updatedCart => {
                this.addedAmount = variant.quantity;
                this.addedProductTitle = variant.variant.productTitle;
                this.showAddedNotification();

                Ting.$emit('UPDATE_CART', updatedCart);
              })
          }
          else{
            this.showSoldOutNotification();
          }
        })
        Ting.$emit('FETCH_CART');
      },
      showAddedNotification() {
        this.addedNotificationShowing = true;

        setTimeout(() => this.addedNotificationShowing = false, 3000);
      },
      showSoldOutNotification() {
        this.soldOutNotificationShowing = true;

        setTimeout(() => this.soldOutNotificationShowing = false, 3000);
      }
    }
  }
</script>

<style lang="scss">
  @import 'vars';

  .added-to-cart-notification, .sold-out-notification {
    @extend %notification;
  }

  .product-page {
    @extend %page;

    display: flex;
    flex-direction: row;

    @media #{$mobile, $sm-mobile} {
      flex-direction: column;
    }

    &__image-container {
      width: 50%;
      height: auto;

      @media #{$mobile, $sm-mobile} {
        width: 100%;
      }

      img {
        width: 100%;
        border: 1px solid rgba($black, .5);
      }

      span {
        display: none;
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
      padding: 10px 30px;
      width: 50%;
      box-sizing: border-box;

      @media #{$mobile, $sm-mobile} {
        width: 100%;
        padding: 10px;
      }
    }

    &__product-name {
      // font-family: "Open Sans", serif;
      font-weight: 400;
      font-size: 48px;
      margin-bottom: 5px;

      &.mobile {
        display: none;
        
        @media #{$mobile, $sm-mobile} {
          display: block;
          margin-bottom: 25px;
        }
      }

      &.notmobile {
        @media #{$mobile, $sm-mobile} {
          display: none;
        }
      }
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

    &__variant-container {
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;
    }

    &__inner-variant-container {
      display: flex;
      flex-direction: column;
      margin-right: 20px;

      &:last-child {
        margin-right: 0;
      }

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