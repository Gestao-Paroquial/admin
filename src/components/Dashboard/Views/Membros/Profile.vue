<template>
  <div class="row">
    <loader v-if="showLoader" />
    <back-button/>
    <button v-if="this.$route.params.id" @click="changeActionToDelete" class="btn btn-danger btn-fill btn-wd pull-right">Habilitar Exclusão</button>
    <button v-if="this.$route.params.id" @click="changeActionToUpdate" class="btn btn-warning btn-fill btn-wd pull-right">Habilitar Alteração</button>
    <div class="col-lg-12 ">
      <add-form :membro="membro" :isUpdate="isUpdate" :isDelete="isDelete" :comunidades="comunidades" :tiposMembro="tiposMembro" :pastorais="pastorais" :tiposDependente="tiposDependente"/>
    </div>
  </div>
</template>
<script>
import axios from '@/plugins/axios';
import AddForm from './ProfileForm';
import { membrosUrl, tiposUrl, comunidadesApiUrl, pastoraisApiUrl } from '../../../../api-url/index';

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
      tiposMembro: [],
      showLoader: false,
      comunidades: [],
      pastorais: [],
      tiposDependente: [],
    };
  },
  mounted() {
    this.showLoader = true;
    this.isUpdate = this.$route.query.update;
    this.isDelete = this.$route.query.delete;


    const arrayDeRequests = [
      axios.get(comunidadesApiUrl),
      axios.get(pastoraisApiUrl),
      axios.get(tiposUrl),
      axios.get(`${membrosUrl}/${this.$route.params.id}`),
    ];

    if (!this.$route.params.id) arrayDeRequests.pop();

    const requests = Promise.all(arrayDeRequests);

    requests.then((responses) => {
      if (responses[3]) {
        this.membro = responses[3].data;
        this.membro.tipo_membro = { label: this.membro.tipo_membro.descricao, value: this.membro.tipo_membro.id };
        this.membro.comunidades.forEach(comunidade => Object.assign(comunidade, { label: comunidade.nome, value: comunidade.id }));
        this.membro.pastorais.forEach(pastoral => Object.assign(pastoral, { label: `${pastoral.nome} ${pastoral.id}`, value: pastoral.id }));
      }

      this.comunidades = responses[0].data;
      this.pastorais = responses[1].data;

      this.tiposMembro = responses[2].data.membros;

      this.tiposDependente = responses[2].data.dependentes;

      if (this.$route.params.id && this.membro.dependentes.length > 0) {
        this.membro.dependentes.forEach((dependente) => {
          const { descricao, id } = this.tiposDependente.find(tipo => tipo.id === dependente.tipo_dependente_id);
          Object.assign(dependente, { tipo_dependente: { label: descricao, value: id } });
        });
      }

      this.showLoader = false;
    });
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
