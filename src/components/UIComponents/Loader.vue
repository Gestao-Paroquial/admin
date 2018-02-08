<template>
  <div class="loader">
    <div class="loader-center">
      <sync-loader></sync-loader>
    </div>

  </div>
</template>
<script>
import SyncLoader from "vue-spinner/src/SyncLoader.vue";
export default {
  components: {
    SyncLoader: SyncLoader
  }
};
</script>
<style lang="scss" >
.loader {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  bottom: 0;

  &-center {
    position: absolute;
    left: 50%;
    top: 50%;
    // transform: translate(-50%, 50%);
  }
}
</style>
