<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <add-form :comunidade="comunidade" :teste="teste" />
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
      comunidade: {},
      teste: '',
    };
  },
};
</script>

<style lang="sass">

</style>
