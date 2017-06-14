const Vue = require('vue').default;
const Home = require('./app.vue');
const styles = require('./home.scss');
const Google = require('./../global/google')();

new Vue({
  el: '#app',
  render: render => render(Home)
})