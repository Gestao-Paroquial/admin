<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <update-form :pastoral="pastoral" :select-list="selectList" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import UpdateForm from "./UpdateForm";
import { pastoraisApiUrl, comunidadesApiUrl } from "./../../../../api-url";
export default {
  components: {
    UpdateForm
  },
  data() {
    return {
      pastoral: {},
      selectList: {
        label: "Comunidades",
        name: "comunidades_id",
        options: []
      }
    };
  },
  created() {
    const self = this;
    axios
      .get(`${pastoraisApiUrl}/${self.$route.params.id}`)
      .then(({ data }) => {
        this.pastoral = data;
        const comunidadeAtual = data.comunidade;
        this.selectList.options.push({
          value: data.comunidade.nome,
          id: data.comunidade.id
        });

        axios.get(comunidadesApiUrl).then(({ data }) => {
          const comunidadesToSelectList = data
            .filter(
              comunidade =>
                comunidadeAtual.id !== comunidade.id ? comunidade : null
            )
            .map(comunidade => ({
              value: comunidade.nome,
              id: comunidade.id
            }));

          this.selectList.options.push(...comunidadesToSelectList);
        });
      })
      .catch(err => console.log(err));
  }
};
</script>

<style lang="sass">

</style>
