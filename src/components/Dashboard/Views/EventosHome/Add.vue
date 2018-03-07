<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <add-form :eventoHome="eventoHome" />
    </div>
  </div>
</template>
<script>
import AddForm from './AddForm';

export default {
  components: {
    AddForm,
  },
  data() {
    return {
      eventoHome: {},
    };
  },
};
</script>

<style lang="sass">

</style>
