<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <add-form :mensagemParoco="mensagemParoco" :teste="teste" />
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
      mensagemParoco: {},
      teste: '',
    };
  },
};
</script>

<style lang="sass">

</style>
