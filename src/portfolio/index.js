const Vue = require('vue').default;
const Portfolio = require('./app.vue');
const styles = require('./portfolio.scss');
const Google = require('./../global/google')();

new Vue({
  el: '#app',
  render: render => render(Portfolio)
})