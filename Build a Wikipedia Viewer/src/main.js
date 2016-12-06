'use strict';

// Vendor Code
import Vue from '../bower_components/vue/dist/vue';
import VueResource from '../bower_components/vue-resource/dist/vue-resource';
import Bootstrap from '../bower_components/bootstrap/dist/css/bootstrap.min.css';
import FontAwesome from '../bower_components/font-awesome/css/font-awesome.min.css';

// Load CSS onto the webpage
// (automatically converted from SCSS to CSS by Webpack)
import CSS from './sass/main.scss';

// Import all Vue Components
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import SearchBar from './components/SearchBar.vue';

Vue.use(VueResource);

const vm = new Vue({
  el: '#app',
  components: {
    AppHeader,
    SearchBar,
    AppFooter
  }
});