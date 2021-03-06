const Vue = require('vue').default;
const styles = require('./art.scss');
const polyfills = require('babel-polyfill');
const Page = require('page');
const Ting = require('./ting');
const shopify = require('./../global/shopify');
const Google = require('./../global/google')();
const routes = {
  '/art' : 'home.vue',
  '/art/contact' : 'contact.vue',
  '/art/shows' : 'show.vue',
  '/art/gallery' : 'gallery.vue',
  // '/art/shop' : 'shop.vue',
  // '/art/shop/product/:id' : 'product.vue',
  // '/art/shop/cart' : 'cart.vue',
  '/art/subscribe' : 'subscribe-now.vue',
  '/art/promo' : 'promo.vue'
}

const app = new Vue({
  el: '#app',
  data() {
    return {
      currentRoute: window.location.pathname,
      currentPage: '',
      ting: new Vue()
    }
  },
  computed: {
    getView() {
      const view = routes[this.currentRoute];

      return view ? require(`./${view}`) : require('./404.vue');
    }
  },
  created() {
    const app = this;

    Object.keys(routes).forEach(route => {
      Page(route, () => app.currentPage = require(`./${routes[route]}`));
    })

    Page('*', () => app.currentPage = require('./404.vue'))
    Page();

    // Ting.$on('FETCH_PRODUCTS', app.getProducts);
    // Ting.$on('FETCH_PRODUCT', app.getProduct);
    // Ting.$on('FETCH_CART', app.getCart);
    // Ting.$on('FETCH_FEATURED', app.getFeatured);
    // Ting.$on('UPDATE_META', app.updateMeta);
  },
  methods: {
    getProducts() {
      shopify.fetchAllProducts()
        .then((products) => {
          Ting.$emit('PRODUCTS_FETCHED', products);
        })
    },
    getFeatured() {
      shopify.fetchQueryProducts({collection_id: '391278534'})
        .then((products) => {
          Ting.$emit('FEATURED_FETCHED', products);
        })
    },
    getProduct(id) {
      shopify.fetchProduct(id)
        .then((product) => {
          Ting.$emit('PRODUCT_FETCHED', product);
        })
    },
    getCart() {
      shopify.fetchRecentCart()
        .then((cart) => {
          Ting.$emit('CART_FETCHED', cart);
        })
    },
    updateMeta(props) {
      let elements = {
        title: document.head.querySelector('meta[property="og:title"]'),
        url: document.head.querySelector('meta[property="og:url"]'),
        image: document.head.querySelector('meta[property="og:image"]'),
        type: document.head.querySelector('meta[property="og:type"]')
      }

      Object.keys(props).forEach(key => {
        elements[key].setAttribute('content', props[key]);
      })
    }
  },
  render(render) {
    return render(this.currentPage);
  }
})
