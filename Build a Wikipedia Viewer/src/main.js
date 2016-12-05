'use strict';

import Vue from 'vue';

// Load CSS onto the webpage
import * as css from './sass/main.css';

const vm = new Vue({
  el: '#app',
  data: {
    message: "Hello Vuejs"
  }
});