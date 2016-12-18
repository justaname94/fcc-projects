'use strict';

// Vendor JS
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

// Vendor CSS
import Bootstrap from '../bower_components/bootstrap/dist/css/bootstrap.min.css';
import FontAwesome from '../bower_components/font-awesome/css/font-awesome.min.css';
import Animate from '../bower_components/animate.css/animate.min.css';

// Load CSS onto the webpage
// (automatically converted from SCSS to CSS by Webpack)
import CSS from './sass/main.scss';

// Vue Components
import AppHeader from './components/AppHeader.vue';

// Vue route paths
import Home from './components/routerComponents/Home.vue';
import History from './components/routerComponents/History.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  { path: '/', component: Home },
  { path: '/history', component: History }
];

const router = new VueRouter({
  routes
});

const app = new Vue({
  router,
  components: { AppHeader }
}).$mount('#app');