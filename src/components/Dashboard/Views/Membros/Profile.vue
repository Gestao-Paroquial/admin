<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <update-form :membro="membro" />
    </div>
  </div>
</template>
<script>
import axios from '@/plugins/axios';
import UpdateForm from './AddForm';
import { membrosUrl, pastoraisApiUrl, tiposMembroUrl, tiposDependenteUrl, comunidadesApiUrl } from './../../../../api-url';

export default {
  components: {
    UpdateForm,
  },
  data() {
    return {
      membro: {},
    };
  },
  mounted() {
    const self = this;
    axios
      .get(`${membrosUrl}/${self.$route.params.id}`)
      .then(({ data }) => {
        this.membro = data;
      })
      .catch(err => console.log(err));

    axios.get(tiposMembroUrl).then(({ data }) => {
      this.tiposMembro = data;
    });
    axios.get(tiposDependenteUrl).then(({ data }) => {
      this.tiposDependente = data;
    });
    axios.get(comunidadesApiUrl).then(({ data }) => {
      this.comunidades = data;
    });
    axios.get(pastoraisApiUrl).then(({ data }) => {
      this.pastorais = data;
    });
  },
};
</script>

<style lang="sass">

</style>
