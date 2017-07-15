webpackJsonp([2],{

/***/ 143:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(201)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(181),
  /* template */
  __webpack_require__(245),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const axios = __webpack_require__(5);
const shopify = __webpack_require__(15);

const secret = '21b9406958b1';
const client = 'ghost-frontend';
const api_url = `/blog/ghost/api/v0.1/posts?client_id=${client}&client_secret=${secret}`;
const product_base_url = '/art/shop/product';
const blog_base_url = '/blog';
const portfolio_base_url = '/portfolio';

module.exports = {
  data() {
    return {
      postInfo: {
        url: "",
        image: "",
        title: ""
      },
      itemInfo: {
        url: "",
        image: "",
        id: "",
        title: ""
      },
      appInfo: {
        url: "",
        image: "",
        title: ""
      }
    };
  },
  computed: {
    postBackground() {
      return {
        backgroundImage: `url('${this.postInfo.image}')`
      };
    },
    itemBackground() {
      return {
        backgroundImage: `url('${this.itemInfo.image}')`
      };
    },
    appBackground() {
      return {
        backgroundImage: `url('${this.appInfo.image}')`
      };
    }
  },
  created() {
    axios.get(api_url).then(response => {
      this.postInfo = {
        url: `${blog_base_url}${response.data.posts[0].url}`,
        image: response.data.posts[0].image,
        title: response.data.posts[0].title
      };
    });

    shopify.fetchQueryProducts({ collection_id: '391278534' }).then(products => {
      this.itemInfo = {
        url: `${product_base_url}/${products[0].id}`,
        image: products[0].selectedVariantImage.variants[6].src,
        id: products[0].id,
        title: products[0].title
      };
    });

    axios.get('/api/entries').then(response => {
      let webApp = response.data[0];

      this.appInfo = {
        url: webApp.link || portfolio_base_url,
        image: webApp.thumbnail,
        title: webApp.name
      };
    });
  }
};

/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vue = __webpack_require__(6).default;
var Home = __webpack_require__(146);
var styles = __webpack_require__(143);
var Google = __webpack_require__(7)();

new Vue({
  el: '#app',
  render: function render(_render) {
    return _render(Home);
  }
});

/***/ }),

/***/ 201:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 245:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('h1', {
    staticClass: "header"
  }, [_vm._v("Mente Gee")]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('h2', {
    staticClass: "subheader"
  }, [_vm._v("The Gist")]), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('p', {
    staticClass: "subline"
  }, [_vm._v("— Just an all around Kreative.")]), _vm._v(" "), _c('div', {
    staticClass: "network-content"
  }, [_c('ul', [_c('li', [_c('h2', {
    staticClass: "subheader"
  }, [_vm._v("Latest Post")]), _vm._v(" "), _c('a', {
    attrs: {
      "href": _vm.postInfo.url,
      "target": "_blank"
    }
  }, [_c('div', {
    staticClass: "thumbnail",
    style: (_vm.postBackground)
  })]), _vm._v(" "), _c('h3', {
    staticClass: "content-title"
  }, [_vm._v(_vm._s(_vm.postInfo.title))])]), _vm._v(" "), _c('li', [_c('h2', {
    staticClass: "subheader"
  }, [_vm._v("Featured Item")]), _vm._v(" "), _c('a', {
    attrs: {
      "href": _vm.itemInfo.url,
      "target": "_blank"
    }
  }, [_c('div', {
    staticClass: "thumbnail",
    style: (_vm.itemBackground)
  })]), _vm._v(" "), _c('h3', {
    staticClass: "content-title"
  }, [_vm._v(_vm._s(_vm.itemInfo.title))])]), _vm._v(" "), _c('li', [_c('h2', {
    staticClass: "subheader"
  }, [_vm._v("Latest Web App")]), _vm._v(" "), _c('a', {
    attrs: {
      "href": _vm.appInfo.url,
      "target": "_blank"
    }
  }, [_c('div', {
    staticClass: "thumbnail",
    style: (_vm.appBackground)
  })]), _vm._v(" "), _c('h3', {
    staticClass: "content-title"
  }, [_vm._v(_vm._s(_vm.appInfo.title))])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('nav', {
    staticClass: "social-nav"
  }, [_c('ul', [_c('li', [_c('a', {
    attrs: {
      "href": ""
    }
  }, [_vm._v("email")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": ""
    }
  }, [_vm._v("instagram")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": ""
    }
  }, [_vm._v("youtube")])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_vm._v("I create "), _c('a', {
    attrs: {
      "href": "/art"
    }
  }, [_vm._v("art")]), _vm._v(". I develop "), _c('a', {
    attrs: {
      "href": "/portfolio"
    }
  }, [_vm._v("web apps")]), _vm._v(". I "), _c('a', {
    attrs: {
      "href": "/blog"
    }
  }, [_vm._v("blog")]), _vm._v(" my thoughts.")])
}]}

/***/ })

},[184]);