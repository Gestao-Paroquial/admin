import Vue from 'vue';
import VueRouter from 'vue-router';
import vClickOutside from 'v-click-outside';

// Plugins
import GlobalComponents from './globalComponents';
import Notifications from 'vue-notification';
import SideBar from './components/UIComponents/SidebarPlugin';
import App from './App';
import VueTheMask from 'vue-the-mask'

// router setup
import routes from './routes/routes';

// library imports
import Chartist from 'chartist';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/sass/paper-dashboard.scss';
import 'es6-promise/auto';

// plugin setup
Vue.use(VueRouter);
Vue.use(GlobalComponents);
Vue.use(vClickOutside);
Vue.use(Notifications);
Vue.use(SideBar);
Vue.use(VueTheMask)

//Mixins
Vue.mixin({
  methods: {
    capitalize: str => str.replace(/\b\w/g, l => l.toUpperCase())
  }
})


// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('login') !== 'true') {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
})
// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get() {
    return this.$root.Chartist;
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    Chartist: Chartist
  },
  render: h => h(App),
  router,
});
