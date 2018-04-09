<template>
  <div class="col-md-12">
    <loader v-if="showLoader" />
    <h4 class="title">{{ title }}</h4>
    <p class="category">{{ subTitle }}</p>

    <div class=" card card-plain">
      <paper-table type="hover" :data="table.data" :columns="comunidadesHeaders">
        <div slot="header">
          <div class="col-sm-12">
            <label class="label-search form-group">
              <input type="search" v-model="termToSearch" placeholder="Buscar registros" aria-controls="datatables" class="form-control input-sm">
            </label>
            <label for="" class="form-group">
              <select name="" id="" class=" form-group filter-options border-input" v-model="filterProperty">
                <option v-for="header in comunidadesHeaders.filter(obj => obj.match(/^[^.]+$/))" :key="header">{{header}}</option>
              </select>
            </label>
            <router-link v-bind:to="{ path: 'add'}" type="button" class="btn btn-success btn-fill pull-right" append>
              <i class="fa fa-plus" aria-hidden="true" />
            </router-link>
          </div>
        </div>
      </paper-table>
    </div>
  </div>
</template>
<script>
import PaperTable from '@/components/UIComponents/PaperTable';
import Modal from '@/components/UIComponents/Modal/Modal';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { comunidadesApiUrl } from './../../../../api-url';

const comunidadesHeaders = [
  'id',
  'nome',
  'email',
  'cnpj',
  'cep',
];

export default {
  components: {
    PaperTable,
    Modal,
  },
  data() {
    return {
      showModalAdd: false,
      showModalUpdate: false,
      comunidades: [],
      table: { data: [] },
      showLoader: true,
      filterProperty: 'id',
      termToSearch: '',
      comunidadesHeaders,
      title: 'Lista de comunidades',
      subTitle: 'Aqui você ira encontrar a lista de comunidades completa',
    };
  },
  created() {
    axios
      .get(comunidadesApiUrl)
      .then((response) => {
        console.log(response);
        this.comunidades = response.data;
        this.table.data = response.data;
        this.showLoader = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  watch: {
    termToSearch: debounce(
      function filter() {
        const comunidadesFiltrados = this.comunidades.filter(
          obj =>
            (obj[this.filterProperty]
              ? obj[this.filterProperty]
                .toString()
                .toLowerCase()
                .match(this.termToSearch.toLowerCase())
              : undefined),
        );
        this.updateTable(comunidadesFiltrados);
      },
      // Este é o número de milissegundos que aguardamos para
      // que o usuário pare de digitar
      300,
    ),
  },
  methods: {
    updateTable(comunidades) {
      this.table.data = [...comunidades];
    },
  },
};
</script>
<style>

</style>
