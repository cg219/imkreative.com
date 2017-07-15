webpackJsonp([1],{

/***/ 144:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(197)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(182),
  /* template */
  __webpack_require__(241),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 182:
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

const axios = __webpack_require__(5);
const PortfolioItem = __webpack_require__(232);

module.exports = {
  data() {
    return {
      entries: []
    };
  },
  components: {
    PortfolioItem
  },
  created() {
    axios.get('/api/entries').then(data => {
      this.entries = data.data;
    });
  }
};

/***/ }),

/***/ 183:
/***/ (function(module, exports) {

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

module.exports = {
  props: ['name', 'link', 'client', 'agency', 'roles', 'tech', 'isActive', 'date', 'thumbnail'],
  data() {
    return {
      isHovered: false
    };
  },
  methods: {
    onHover(event) {
      this.isHovered = true;
    },
    offHover(event) {
      this.isHovered = false;
    },
    gotoProject(event) {
      if (this.link) {
        window.location = this.link;
      }
    }
  }
};

/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vue = __webpack_require__(6).default;
var Portfolio = __webpack_require__(147);
var styles = __webpack_require__(144);
var Google = __webpack_require__(7)();

new Vue({
  el: '#app',
  render: function render(_render) {
    return _render(Portfolio);
  }
});

/***/ }),

/***/ 189:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 197:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(189)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(183),
  /* template */
  __webpack_require__(233),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 233:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "item",
    on: {
      "mouseover": _vm.onHover,
      "mouseout": _vm.offHover,
      "click": _vm.gotoProject
    }
  }, [_c('img', {
    class: {
      hover: _vm.isHovered
    },
    attrs: {
      "src": _vm.thumbnail,
      "alt": _vm.name
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "item__info"
  }, [_c('div', {
    class: {
      'item__info-background': true, hover: _vm.isHovered
    }
  }), _vm._v(" "), _c('div', {
    class: {
      'item__info-text': true, hover: _vm.isHovered
    }
  }, [_c('p', {
    staticClass: "item__title"
  }, [_vm._v(_vm._s(_vm.name) + " — "), _c('span', [_vm._v(_vm._s(_vm.client))])]), _vm._v(" "), _c('p', {
    staticClass: "item__agency"
  }, [_vm._l((_vm.roles), function(role) {
    return _c('span', [_vm._v(_vm._s(role))])
  }), _vm._v(" [at] " + _vm._s(_vm.agency) + "\n      ")], 2), _vm._v(" "), _c('p', {
    staticClass: "item__tech"
  }, _vm._l((_vm.tech), function(type) {
    return _c('span', [_vm._v(_vm._s(type))])
  })), _vm._v(" "), (_vm.isActive) ? _c('p', {
    staticClass: "item__active"
  }, [_vm._v("Online")]) : _c('p', {
    staticClass: "item__active"
  }, [_vm._v("Offline")])])])])
},staticRenderFns: []}

/***/ }),

/***/ 241:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "portfolio"
  }, [_vm._m(0), _vm._v(" "), _vm._l((_vm.entries), function(entry) {
    return _c('portfolio-item', {
      key: entry,
      attrs: {
        "name": entry.name,
        "link": entry.link,
        "client": entry.client,
        "agency": entry.agency,
        "roles": entry.roles,
        "tech": entry.tech,
        "isActive": entry.isActive,
        "date": entry.date,
        "thumbnail": entry.thumbnail
      }
    })
  })], 2)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('nav', [_c('ul', [_c('li', {
    staticClass: "home-button"
  }, [_c('a', {
    attrs: {
      "href": "/"
    }
  }, [_vm._v("Home")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "mailto:mente@imkreative.com"
    }
  }, [_vm._v("Email")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "http://www.github.com/cg219"
    }
  }, [_vm._v("Github")])])])])
}]}

/***/ })

},[185]);