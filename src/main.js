import Vue from 'vue';
import VueRouter from 'vue-router';
import vClickOutside from 'v-click-outside';


// Plugins
import axios from 'axios';
import VueTheMask from 'vue-the-mask';
import VuejsDialog from 'vuejs-dialog';
import vSelect from 'vue-select';
import Chartist from 'chartist';
import fullCalendar from 'vue-fullcalendar';
import VModal from 'vue-js-modal';
import Paginate from 'vuejs-paginate';
import 'bootstrap/dist/css/bootstrap.css';
import Notifications from './components/UIComponents/NotificationPlugin';
import GlobalComponents from './globalComponents';
import SideBar from './components/UIComponents/SidebarPlugin';
import App from './App';
import routes from './routes';
import './assets/sass/paper-dashboard.scss';
import { validateTokenUrl, telefonesUrl } from './api-url';
import axiosIntance from './plugins/axios';

// plugin setup
Vue.use(VueRouter);
Vue.component('paginate', Paginate);
Vue.use(GlobalComponents);
Vue.use(vClickOutside);
Vue.use(Notifications);
Vue.use(VModal);
Vue.use(SideBar);
Vue.use(VueTheMask);
Vue.component('v-select', vSelect);
Vue.component('full-calendar', fullCalendar);
Vue.use(VuejsDialog, {
  html: true,
  loader: true,
  reverse: true,
  okText: 'Continuar',
  cancelText: 'Cancelar',
  message: 'Você tem certeza?',
  animation: 'bounce',
});

// Mixins
Vue.mixin({
  methods: {
    capitalize: str => str.replace(/\b\w/g, l => l.toUpperCase()),
    formatToPrice: n => `R$ ${n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, '$1.')}`,
    formatDate: date => new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }),
    formatCompleteDate: date => new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }),
    notificationConfig: (message, type = 'success', horizontalAlign = 'right',
      verticalAlign = 'top', icon = 'ti-bell') => ({
      message,
      icon,
      horizontalAlign,
      verticalAlign,
      type,
    }),
    deleteTelefones(telefones) {
      telefones.forEach((telefone) => {
        axios.delete(`${telefonesUrl}/${telefone.id}`)
          .then(({ data }) => {
            this.$notifications.notify(this.notificationConfig(data.message));
          });
      });
    },
    arrayToSelectList(array, label = 'nome', value = 'id') {
      return array.map(element => ({ label: element[label], value: element[value] }));
    },
    calcAge(dateString) {
      /* eslint no-bitwise: ["error", { "allow": ["~"] }] */
      const birthday = +new Date(dateString);
      return ~~((Date.now() - birthday) / (31557600000));
    },
  },
});


// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active',
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  const loginRedirect = {
    path: '/login',
    query: {
      redirect: to.fullPath,
    },
  };

  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    if (!token) {
      next(loginRedirect);
    } else {
      axios.get(`${validateTokenUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          Object.assign(axiosIntance.defaults, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
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
