<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <update-form :pastoral="pastoral" />
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import UpdateForm from './UpdateForm';
import { pastoraisApiUrl } from './../../../../api-url';

export default {
  components: {
    UpdateForm,
  },
  data() {
    return {
      pastoral: {},
    };
  },
  mounted() {
    axios
      .get(`${pastoraisApiUrl}/${this.$route.params.id}`)
      .then(({ data }) => {
        this.pastoral = data;
        this.pastoral.coordenador = { label: this.pastoral.coordenador.nome, value: this.pastoral.coordenador.id };

        this.pastoral.comunidade = { label: this.pastoral.comunidade.nome, value: this.pastoral.comunidade.id };
      })
      .catch(err => console.log(err));
  },
};
</script>

<style lang="sass">

</style>
