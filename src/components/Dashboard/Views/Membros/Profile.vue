<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <update-form :membro="membro" :select-list="selectList" />
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import UpdateForm from './UpdateForm';
import { membrosUrl, pastoraisApiUrl } from './../../../../api-url';

export default {
  components: {
    UpdateForm,
  },
  data() {
    return {
      membro: {},
      selectList: {
        label: 'Pastorais',
        name: 'pastorais_id',
        options: [],
      },
    };
  },
  created() {
    const self = this;
    axios
      .get(`${membrosUrl}/${self.$route.params.id}`)
      .then(({ data }) => {
        this.membro = data;
        const pastoralAtual = data.pastorais;
        this.selectList.options.push({
          value: pastoralAtual.nome,
          id: pastoralAtual.id,
        });
        axios.get(pastoraisApiUrl).then((response) => {
          const pastoraisToSelectList = response.data
            .filter(
              pastoral => (pastoralAtual.id !== pastoral.id ? pastoral : null),
            )
            .map(pastoral => ({
              value: pastoral.nome,
              id: pastoral.id,
            }));

          this.selectList.options.push(...pastoraisToSelectList);
        });
      })
      .catch(err => console.log(err));
  },
};
</script>

<style lang="sass">

</style>
