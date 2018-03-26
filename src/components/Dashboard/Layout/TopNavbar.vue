<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar bar1" />
          <span class="icon-bar bar2" />
          <span class="icon-bar bar3" />
        </button>
        <a class="navbar-brand">{{ routeName }}</a>
      </div>
      <div class="navbar-right-menu">
        <ul class="nav navbar-nav navbar-right">
          <li class="open">
            <a href="#" class="dropdown-toggle btn-magnify" data-toggle="dropdown">
              <i class="ti-panel" />
              <p>Status</p>
            </a>
          </li>
          <drop-down title="5 Notificações" icon="ti-bell">
            <li>
              <a href="#">Notificações 1</a>
            </li>
            <li>
              <a href="#">Notificações 2</a>
            </li>
            <li>
              <a href="#">Notificações 3</a>
            </li>
            <li>
              <a href="#">Notificações 4</a>
            </li>
            <li>
              <a href="#">Outra Notificação</a>
            </li>
          </drop-down>
          <li>
            <a href="#" class="btn-rotate">
              <i class="ti-settings" />
              <p>
                Configurações
              </p>
            </a>
          </li>
          <li>
            <router-link class="btn-rotate" to="/logout">
              <i class="fa fa-sign-out" />
              <p>
                Sair
              </p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  data() {
    return {
      activeNotifications: false,
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
  },
};
</script>
<style>

</style>
