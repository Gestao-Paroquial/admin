<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <update-form :membroPastoral="membroPastoral" :select-list="selectList" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import UpdateForm from "./UpdateForm";
import { membrosPastoraisApiUrl, pastoraisApiUrl } from "./../../../../api-url";
export default {
  components: {
    UpdateForm
  },
  data() {
    return {
      membroPastoral: {},
      selectList: {
        label: "Pastorais",
        name: "pastorais_id",
        options: []
      }
    };
  },
  created() {
    const self = this;
    axios
      .get(`${membrosPastoraisApiUrl}/${self.$route.params.id}`)
      .then(({ data }) => {
        this.membroPastoral = data;
        const pastoralAtual = data.pastorais;
        this.selectList.options.push({
          value: pastoralAtual.nome,
          id: pastoralAtual.id
        });
        axios.get(pastoraisApiUrl).then(({ data }) => {
          const pastoraisToSelectList = data
            .filter(
              pastoral => (pastoralAtual.id !== pastoral.id ? pastoral : null)
            )
            .map(pastoral => ({
              value: pastoral.nome,
              id: pastoral.id
            }));

          this.selectList.options.push(...pastoraisToSelectList);
        });
      })
      .catch(err => console.log(err));
  }
};
</script>

<style lang="sass">

</style>
