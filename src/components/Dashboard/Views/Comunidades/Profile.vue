<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <update-form :comunidade="comunidade" />
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import UpdateForm from './UpdateForm';
import { comunidadesApiUrl } from './../../../../api-url';

export default {
  components: {
    UpdateForm,
  },
  data() {
    return {
      comunidade: {},
    };
  },
  created() {
    const self = this;
    axios
      .get(`${comunidadesApiUrl}/${self.$route.params.id}`)
      .then(({ data }) => { this.comunidade = data; })
      .catch(err => console.log(err));
  },
};
</script>

<style lang="sass">

</style>
