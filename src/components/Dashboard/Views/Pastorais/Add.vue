<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <add-form :pastoral="pastoral" />
    </div>
  </div>
</template>
<script>
import AddForm from './Form';

export default {
  components: {
    AddForm,
  },
  data() {
    return {
      pastoral: { telefones: [] },
    };
  },
  mounted() {

  },
};
</script>

<style lang="sass">

</style>
