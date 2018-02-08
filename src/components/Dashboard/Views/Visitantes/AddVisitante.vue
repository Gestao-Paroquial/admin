<template>
  <div class="row">
    <div class="col-lg-12 ">
      <add-visitantes-form :visitante="visitante" :select-list="selectList" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AddVisitantesForm from "./AddVisitantesForm";
import { visitantesApiUrl, comunidadesApiUrl } from "./../../../../api-url";
export default {
  components: {
    AddVisitantesForm
  },
  data() {
    return {
      visitante: {},
      selectList: {
        label: "Comunidades",
        name: "comunidades_id",
        options: [{}]
      }
    };
  },
  created() {
    axios
      .get(comunidadesApiUrl)
      .then(({ data }) => {
        const comunidadesToSelectList = data.map(comunidade => ({
          value: comunidade.nome,
          id: comunidade.id
        }));

        this.selectList.options.push(...comunidadesToSelectList);
      })
      .catch(err => console.log(err));
  }
};
</script>

<style lang="sass">

</style>
