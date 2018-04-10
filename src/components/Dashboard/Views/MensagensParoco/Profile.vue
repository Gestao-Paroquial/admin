<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <update-form :mensagemParoco="mensagemParoco" />
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import UpdateForm from './Form';
import { mensagensParocoApiUrl } from './../../../../api-url';

export default {
  components: {
    UpdateForm,
  },
  data() {
    return {
      mensagemParoco: {},
    };
  },
  created() {
    console.log(this.$route);
    axios
      .get(`${mensagensParocoApiUrl}/${this.$route.params.id}`)
      .then(({ data }) => { this.mensagemParoco = data; })
      .catch(err => console.log(err));
  },
};
</script>

<style lang="sass">

</style>
