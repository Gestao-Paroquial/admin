<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <add-form :membro="membro" />
    </div>
  </div>
</template>
<script>
import AddForm from './AddForm';

const CLASSE_TELEFONE_DO_MEMBRO = 3;

export default {
  components: {
    AddForm,
  },
  data() {
    return {
      membro: {
        classe_telefone_id: CLASSE_TELEFONE_DO_MEMBRO,
        telefones: [{}],
        crismado: false,
        batizado: false,
        '1_eucaristia': false,
      },
    };
  },
};
</script>

<style lang="sass">

</style>
