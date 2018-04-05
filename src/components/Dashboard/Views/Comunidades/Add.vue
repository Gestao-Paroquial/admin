<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <add-form :comunidade="comunidade" />
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
      comunidade: { telefones: [] },
    };
  },
};
</script>

<style lang="sass">

</style>
