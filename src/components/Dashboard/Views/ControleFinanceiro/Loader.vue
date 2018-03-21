<template>
  <div class="center-block loader-wrapper text-center">
    <h5 class="">Aguarde:</h5>
    <fingerprint-spinner :animation-duration="1500" :size="100" color="#41B883" />
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
