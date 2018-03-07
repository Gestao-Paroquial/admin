<template>
  <div class="wrapper">
    <side-bar type="sidebar" :sidebar-links="$sidebar.sidebarLinks"/>
    <notifications/>
    <div class="main-panel">
      <top-navbar/>

      <dashboard-content @click.native="toggleSidebar"/>

      <content-footer/>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
import TopNavbar from './TopNavbar';
import ContentFooter from './ContentFooter';
import DashboardContent from './Content';

export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};

</script>
