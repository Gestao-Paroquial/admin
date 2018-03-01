<template>
  <div class="loader">
    <div class="loader-center">
      <fingerprint-spinner :animation-duration="1500" :size="200" color="#41B883" />
    </div>

  </div>
</template>
<script>
import { FingerprintSpinner } from 'epic-spinners';

export default {
  components: {
    FingerprintSpinner,
  },
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
    transform: translate(-50%, -50%);
  }
}
</style>
