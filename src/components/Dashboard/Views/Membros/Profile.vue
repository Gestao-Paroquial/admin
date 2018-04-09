<template>
  <div class="row">
    <back-button/>
    <button v-if="this.$route.params.id" @click="changeActionToDelete" class="btn btn-danger btn-fill btn-wd pull-right">Habilitar Exclusão</button>
    <button v-if="this.$route.params.id" @click="changeActionToUpdate" class="btn btn-warning btn-fill btn-wd pull-right">Habilitar Alteração</button>
    <div class="col-lg-12 ">
      <add-form :membro="membro" :isUpdate="isUpdate" :isDelete="isDelete"/>
    </div>
  </div>
</template>
<script>
import axios from '@/plugins/axios';
import AddForm from './ProfileForm';
import { membrosUrl } from '../../../../api-url/index';

export default {
  components: {
    AddForm,
  },
  data() {
    return {
      membro: {
        telefones: [{}],
        dependentes: [{}],
        crismado: 0,
        batizado: 0,
        '1_eucaristia': 0,
        status: 1,
      },
      isUpdate: false,
      isDelete: false,
    };
  },
  mounted() {
    this.isUpdate = this.$route.query.update;
    this.isDelete = this.$route.query.delete;
    if (this.$route.params.id) {
      axios
        .get(`${membrosUrl}/${this.$route.params.id}`)
        .then(({ data }) => {
          this.membro = data;
          this.membro.tipo_membro = {label: this.membro.tipo_membro.descricao, value: this.membro.tipo_membro.id};
          this.membro.comunidades.forEach(comunidade => Object.assign(comunidade, { label: comunidade.nome, value: comunidade.id }));
          this.membro.pastorais.forEach(pastoral => Object.assign(pastoral, { label: `${pastoral.nome} ${pastoral.id}`, value: pastoral.id }));
        })
        .catch(err => console.log(err));
    }
  },
  methods: {
    changeActionToUpdate() {
      this.isDelete = false;
      this.isUpdate = true;
    },
    changeActionToDelete() {
      this.isDelete = true;
      this.isUpdate = false;
    },
  },
};
</script>

<style lang="sass">

</style>
