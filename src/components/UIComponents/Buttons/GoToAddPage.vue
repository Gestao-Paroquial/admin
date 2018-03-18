<template>
  <router-link v-bind:to="{ path: path, query}" type="button" class="btn btn-success btn-fill pull-right" append>
    <i class="fa fa-plus" aria-hidden="true" />
  </router-link>
</template>
<script>
export default {
  props: {
    path: {
      default: 'add',
      type: String,
    },
    query: Object,
  },
};
</script>
