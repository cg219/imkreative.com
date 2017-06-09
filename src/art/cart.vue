<template>
  <app>
    <div class="cart">
      <h2>Shopping Cart</h2>
      <template v-if="items.length > 0">
        <ul class="cart__item-list">
          <li class="cart__column-titles">
            <p class="cart__column-item">Item</p>
            <p class="cart__column-title"></p>
            <p class="cart__column-qty">Qty</p>
            <p class="cart__column-price">Price</p>
            <p class="cart__column-close"></p>
          </li>
          <li class="cart__item" v-for="item in items">
            <img class="cart__item-image" :src="item.imageVariants[4].src" :alt="item.title" />
            <p class="cart__item-title">{{item.title}}</p>
            <div class="cart__qty-input">
              <input type="number" @change="updateQuantity" :data-id="item.id" :value="item.quantity" min="0">
            </div>
            <p class="cart__item-price">${{item.line_price}}</p>
            <button class="cart__close" :data-id="item.id" @click="removeItem">&times;</button>
          </li>
          <li class="cart__subtotal">
            <p>Subtotal: ${{subtotal}}</p>
          </li>
        </ul>
        <button class="cart__checkout" @click="checkout">Checkout</button>
      </template>
      <template v-else>
        <p>You're Shopping Cart is empty. Head over to the <a href="/art/shop">shop</a> to start adding items to your cart.</p>
      </template>
    </div>
  </app>
</template>

<script>
  const App = require('./app.vue');
  const Ting = require('./ting');

  module.exports = {
    components: {
      App
    },
    data() {
      return {
        items: [],
        subtotal: '0',
        cart: {}
      }
    },
    created() {
      Ting.$once('CART_FETCHED', this.updateCart);
      Ting.$emit('FETCH_CART');
    },
    methods: {
      updateCart(cart) {
        console.log(cart);
        this.items = cart.lineItems;
        this.subtotal = cart.subtotal;
        this.cart = cart;
      },
      updateQuantity(event) {
        const id = event.target.dataset.id;
        const quantity = event.target.value;

        if(quantity > 0) {
          this.cart.updateLineItem(id, quantity)
            .then(cart => {
              this.items = cart.lineItems;
              this.subtotal = cart.subtotal;
              this.cart = cart;

              Ting.$emit('UPDATE_CART', cart);
            })
        }
        else {
          this.removeItem(event);
        }
      },
      removeItem(event) {
        const id = event.target.dataset.id;

        this.cart.removeLineItem(id)
          .then(cart => {
            this.items = cart.lineItems;
            this.subtotal = cart.subtotal;
            this.cart = cart;

            Ting.$emit('UPDATE_CART', cart);
          })
      },
      checkout(event) {
        window.location = this.cart.checkoutUrl;
      }
    }
  }
</script>

<style lang="scss">
  @import 'vars';

  .cart {
    @extend %page;

    width: 100%;

    a {
      color: $maincolor;
    }

    &__item-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    
    &__item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid rgba($black, .2);

      p {
        font-size: 14px;
        font-weight: 400;

        @media #{$sm-mobile} {
          font-size: 12px;
        }
      }
    }

    &__column-titles {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba($black, .2);
      font-size: 12px;
    }

    &__column-item {
      width: 100px;

      @media #{$sm-mobile} {
        width: 50px;
      }
    }

    &__column-qty {
      width: 40px;
    }

    &__column-title {
      width: 40%;
      padding: 0 20px;

      @media #{$sm-mobile} {
        width: 30%;
      }
    }

    &__column-price {
      width: 10%;
    }

    &__column-close {
      
    }

    &__item-image {
      width: 100px;

      @media #{$sm-mobile} {
        width: 50px;
      }
    }

    &__item-title {
      width: 40%;
      padding: 0 20px;

      @media #{$sm-mobile} {
        width: 30%;
      }
    }

    &__item-price {
      width: 10%;
    }
  
    &__qty-input {
      @extend %input;

      width: 40px;
      flex: 0 0 auto;
      padding: 5px;

      input {
        font-size: 12px;
      }
    }

    &__subtotal {
      display: flex;
      justify-content: flex-end;
    }

    &__checkout {
      float: right;
      margin-top: 10px;
    }

    &__close {
      padding: 5px;
      flex: 0 0 auto;
      line-height: 14px;
    }
  }
</style>