<template>
  <div class="row">
    <div class="col-lg-12 ">
      <edit-profile-form :visitante="visitante" :select-list="selectList" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import EditProfileForm from "./EditProfileForm.vue";
import UserCard from "./UserCard.vue";
import MembersCard from "./MembersCard.vue";
import { visitantesApiUrl, comunidadesApiUrl } from "./../../../../api-url";
export default {
  components: {
    EditProfileForm,
    UserCard,
    MembersCard
  },
  data() {
    return {
      visitante: {},
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
      .get(`${visitantesApiUrl}/${self.$route.params.id}`)
      .then(({ data }) => {
        this.visitante = data;
        const comunidadeAtual = data.comunidades;
        this.selectList.options.push({
          value: data.comunidades.nome,
          id: data.comunidades.id
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
