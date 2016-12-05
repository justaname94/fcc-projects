'use strict';

import Vue from 'vue';

// Load CSS onto the webpage (automatically converted from SCSS to CSS by Webpack)
import * as css from './sass/main.scss';

// Import all Vue Components
import AppHeader from './components/AppHeader.vue';

const vm = new Vue({
  el: '#app',
  components: {
    AppHeader
  }
});