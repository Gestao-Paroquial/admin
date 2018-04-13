<template>
  <div class="col-md-12">
    <loader v-if="showLoader" />
    <h4 class="title">{{ title }}</h4>

    <div class=" card card-plain">
      <div class="row">
        <tipo-list :tipo="tipos.dependentes" title="Dependentes" :endPoint="endPoints.tiposDependenteUrl"/>
        <tipo-list :tipo="tipos.membros" title="Membros" :endPoint="endPoints.tiposMembroUrl"/>
        <tipo-list :tipo="tipos.eventos" title="Eventos" :endPoint="endPoints.tiposEventoUrl"/>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import TipoList from './TipoList';
import { tiposUrl, tiposDependenteUrl, tiposMembroUrl, tiposEventoUrl } from './../../../../api-url';

export default {
  components: {
    TipoList,
  },
  data() {
    return {
      endPoints: {
        tiposDependenteUrl, tiposMembroUrl, tiposEventoUrl,
      },
      tipos: {},
      showLoader: true,

      title: 'Lista com todos os tipos do sistema',
    };
  },
  mounted() {
    axios
      .get(tiposUrl)
      .then(({ data }) => {
        this.tipos = data;
        this.showLoader = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style>

</style>
