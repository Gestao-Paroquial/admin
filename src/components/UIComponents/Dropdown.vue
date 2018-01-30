<template>
  <li class="dropdown" :class="{open:isOpen}" @click="toggleDropDown">
    <a class="dropdown-toggle btn-rotate" data-toggle="dropdown">
      <slot name="title">
        <i :class="icon" />
        <p class="notification">{{ title }}
          <b class="caret" />
        </p>
      </slot>
    </a>
    <ul class="dropdown-menu">
      <slot/>
    </ul>
  </li>
</template>
<script>
export default {
  props: {
    title: String,
    icon: String
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen;
    },
    closeDropDown() {
      this.isOpen = false;
    }
  }
};
</script>
