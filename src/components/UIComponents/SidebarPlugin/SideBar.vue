<template>
  <div :class="sidebarClasses" :data-background-color="backgroundColor" :data-active-color="activeColor">
    <!--
                  Tip 1: you can change the color of the sidebar's background using: data-background-color="white | black | darkblue"
                  Tip 2: you can change the color of the active button using the data-active-color="primary | info | success | warning | danger"
              -->
    <!-- -->
    <div class="sidebar-wrapper" id="style-3">
      <div class="logo">
        <a href="#" class="simple-text">
          <div class="logo-img">
            <img src="static/img/vue-logo.png" alt="">
          </div>
          Gestão Paroquial
        </a>
      </div>
      <div class="user">
        <p class="name">Olá, {{user.name}}</p>
      </div>
      <ul :class="navClasses">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <router-link v-for="(link,index) in sidebarLinks" :to="link.path" tag="li" :ref="link.name" :key="index">
          <a>
            <i :class="link.icon" />

            <p>{{ link.name }}
            </p>
          </a>
        </router-link>
      </ul>
      <moving-arrow :move-y="arrowMovePx" />
    </div>
  </div>
</template>
<script>
import MovingArrow from './MovingArrow';

export default {
  props: {
    type: {
      type: String,
      default: 'sidebar',
      validator: (value) => {
        const acceptedValues = ['sidebar', 'navbar'];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
      default: 'black',
      validator: (value) => {
        const acceptedValues = ['white', 'black', 'darkblue'];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    activeColor: {
      type: String,
      default: 'success',
      validator: (value) => {
        const acceptedValues = [
          'primary',
          'info',
          'success',
          'warning',
          'danger',
        ];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    MovingArrow,
  },
  computed: {
    sidebarClasses() {
      if (this.type === 'sidebar') {
        return 'sidebar';
      }
      return 'collapse navbar-collapse off-canvas-sidebar';
    },
    navClasses() {
      if (this.type === 'sidebar') {
        return 'nav';
      }
      return 'nav navbar-nav';
    },
    /**
     * Styles to animate the arrow near the current active sidebar link
     * @returns {{transform: string}}
     */
    arrowMovePx() {
      return this.linkHeight * this.activeLinkIndex + this.linkHeight;
    },
  },
  data() {
    return {
      linkHeight: 60,
      activeLinkIndex: 0,
      user: {},
      windowWidth: 0,
      isWindows: false,
      hasAutoHeight: false,
    };
  },
  methods: {
    findActiveLink() {
      this.sidebarLinks.find((element, index) => {
        const found = element.path === this.$route.path;
        if (found) {
          this.activeLinkIndex = index;
        }
        return found;
      });
    },
  },
  mounted() {
    this.findActiveLink();
    this.user = JSON.parse(localStorage.getItem('user'));
  },
  watch: {
    $route() {
      this.findActiveLink();
    },
  },
};
</script>
<style scoped>
.user {
  padding: 0;
  margin: 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.user .name {
  padding: 11px 0px;
  display: block;
  font-size: 14px;
  text-align: center;
  font-weight: 400;
  line-height: 40px;
  text-align: left;
  margin: 0;
  color: #fff;
}
</style>
