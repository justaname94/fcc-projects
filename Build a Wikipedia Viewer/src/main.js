'use strict';

// Vendor Code
import Vue from '../bower_components/vue/dist/vue';
import VueResource from '../bower_components/vue-resource/dist/vue-resource';

// Load CSS onto the webpage
// (automatically converted from SCSS to CSS by Webpack)
import css from './sass/main.scss';

// Import all Vue Components
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

Vue.use(VueResource);

const vm = new Vue({
  el: '#app',
  components: {
    AppHeader,
    AppFooter
  }
});