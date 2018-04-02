<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <add-form :membro="membro" />
    </div>
  </div>
</template>
<script>
import axios from '@/plugins/axios';
import AddForm from './ProfileForm';
import { membrosUrl } from '../../../../api-url/index';

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
        dependentes: [{}],
        crismado: 0,
        batizado: 0,
        '1_eucaristia': 0,
        status: 1,
      },
    };
  },
  created() {
    if (this.$route.params.id) {
      axios
        .get(`${membrosUrl}/${this.$route.params.id}`)
        .then(({ data }) => {
          this.membro = data;
          this.membro.comunidades.forEach(comunidade => Object.assign(comunidade, { label: comunidade.nome, value: comunidade.id }));
          this.membro.pastorais.forEach(pastoral => Object.assign(pastoral, { label: `${pastoral.nome} ${pastoral.id}`, value: pastoral.id }));
        })
        .catch(err => console.log(err));
    }
  },
};
</script>

<style lang="sass">

</style>
