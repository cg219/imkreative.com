const Vue = require('vue').default;
const Admin = require('./app.vue');
const Routes = {
  '/': 'loggedin',
  '/login': 'loggedout'
}

new Vue({
  el: '#app',
  data() {
    return {
      currentRoute: `${window.location.pathname}`
    }
  },
  computed: {
    loggedInState() {
      return Routes[this.currentRoute] == 'loggedin' ? true : false;
    }
  },
  render(render) {
    return render(Admin);
  }
})