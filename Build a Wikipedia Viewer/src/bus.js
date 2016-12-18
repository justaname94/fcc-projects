'use strict';

import Vue from 'vue';

const bus = new Vue({
  data() {
    return {
      savedArticles: [],
      savedTitles: []
    };
  }
});
export default bus;