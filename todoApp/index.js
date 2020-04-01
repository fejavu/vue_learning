// import Vue from 'vue';
import App from './app.vue';

Vue.config.productiontip = false;

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})