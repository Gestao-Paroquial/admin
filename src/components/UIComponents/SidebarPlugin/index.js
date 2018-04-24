import Sidebar from './SideBar';

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Visão Geral',
      icon: 'ti-panel',
      path: '/admin/overview',
    },
    {
      name: 'Controle Financeiro',
      icon: 'fa fa-money',
      path: '/admin/financeiro',
    },
    {
      name: 'Eventos',
      icon: 'fa fa-calendar',
      path: '/admin/eventos',
    },
    {
      name: 'Mensagens Paroco',
      icon: 'fa fa-envelope',
      path: '/admin/mensagens-paroco',
    },
    {
      name: 'Banners do Site',
      icon: 'fa fa-calendar',
      path: '/admin/eventos-home',
    },
    {
      name: 'Membros',
      icon: 'fa fa-users',
      path: '/admin/membros',
    },
    {
      name: 'Pastorais',
      icon: 'fa fa-building-o',
      path: '/admin/pastorais',
    },
    {
      name: 'Comunidades',
      icon: 'fa fa-globe',
      path: '/admin/comunidades',
    },
    {
      name: 'Tipos',
      icon: 'fa fa-bars',
      path: '/admin/tipos',
    },
    {
      name: 'Usuários',
      icon: 'ti-user',
      path: '/admin/usuarios',
    },
    // {
    //  name: 'Table List',
    //  icon: 'ti-view-list-alt',
    //  path: '/admin/table-list'
    // },
    // {
    //  name: 'Typography',
    //  icon: 'ti-text',
    //  path: '/admin/typography'
    // },
    // {
    //  name: 'Icons',
    //  icon: 'ti-pencil-alt2',
    //  path: '/admin/icons'
    // },
    // {
    //  name: 'Maps',
    //  icon: 'ti-map',
    //  path: '/admin/maps'
    // },
    //
    // {
    //   name: 'Notifications',
    //   icon: 'ti-bell',
    //   path: '/admin/notifications',
    // },
  ],
  displaySidebar(value) {
    this.showSidebar = value;
  },
};

const SidebarPlugin = {

  install(Vue) {
    Vue.mixin({
      data() {
        return {
          sidebarStore: SidebarStore,
        };
      },
    });

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get() {
        return this.$root.sidebarStore;
      },
    });
    Vue.component('side-bar', Sidebar);
  },
};

export default SidebarPlugin;
