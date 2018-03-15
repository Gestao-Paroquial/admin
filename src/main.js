import Vue from 'vue';
import VueRouter from 'vue-router';
import vClickOutside from 'v-click-outside';
import axios from 'axios';

// Plugins
import VueTheMask from 'vue-the-mask';
import Notifications from 'vue-notification';
import VuejsDialog from 'vuejs-dialog';
import 'vue-event-calendar/dist/style.css'; // ^1.1.10, CSS has been extracted as one file, so you can easily update it.
import vueEventCalendar from 'vue-event-calendar';
import Chartist from 'chartist';
import 'bootstrap/dist/css/bootstrap.css';
import GlobalComponents from './globalComponents';
import SideBar from './components/UIComponents/SidebarPlugin';
import App from './App';
import routes from './routes/routes';
import './assets/sass/paper-dashboard.scss';
import { validateTokenUrl } from './api-url';

// plugin setup
Vue.use(VueRouter);
Vue.use(GlobalComponents);
Vue.use(vClickOutside);
Vue.use(Notifications);
Vue.use(SideBar);
Vue.use(VueTheMask);
Vue.use(VuejsDialog, {
  html: true,
  loader: true,
  reverse: true,
  okText: 'Continuar',
  cancelText: 'Cancelar',
  message: 'Você tem certeza?',
  animation: 'bounce',
});
Vue.use(vueEventCalendar, { locale: 'pt-br', color: '#41B883' });
// Mixins
Vue.mixin({
  methods: {
    capitalize: str => str.replace(/\b\w/g, l => l.toUpperCase()),
  },
});


// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  const loginRedirect = {
    path: '/login',
    query: {
      redirect: to.fullPath,
    },
  };

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next(loginRedirect);
    } else {
      axios.get(`${validateTokenUrl}?token=${localStorage.getItem('token')}`)
        .then(() => {
          next();
        })
        .catch(() => next(loginRedirect));
    }
  } else {
    next();
  }
});
// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get() {
    return this.$root.Chartist;
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    Chartist,
  },
  render: h => h(App),
  router,
});
