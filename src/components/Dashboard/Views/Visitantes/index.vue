<template>
  <div class="col-md-12">
    <loader v-if="showLoader" />
    <h4 class="title">{{ title }}</h4>
    <p class="category">{{ subTitle }}</p>

    <div class=" card card-plain">
      <paper-table type="hover" :data="table.data" :columns="visitantesHeaders">
        <div slot="header">
          <div class="col-sm-12">
            <label class="label-search form-group">
              <input type="search" v-model="termToSearch" placeholder="Buscar registros" aria-controls="datatables" class="form-control input-sm">
            </label>
            <label for="" class="form-group">
              <select name="" id="" class=" form-group filter-options border-input" v-model="filterProperty">
                <option v-for="header in visitantesHeaders.filter(obj => obj.match(/^[^.]+$/))" :key="header">{{header}}</option>
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
import axios from 'axios';
import debounce from 'lodash.debounce';
import PaperTable from '../../../../components/UIComponents/PaperTable';
import Modal from '../../../../components/UIComponents/Modal/Modal';
import SimpleForm from '../../../../components/UIComponents/Forms/SimpleForm';
import { visitantesApiUrl } from './../../../../api-url';

const visitantesHeaders = [
  'id',
  'nome',
  'email',
  'telefone',
  'comunidades.nome',
];

export default {
  components: {
    PaperTable,
    Modal,
    SimpleForm,
  },
  data() {
    return {
      showModalAdd: false,
      showModalUpdate: false,
      visitantes: [],
      table: { data: [] },
      showLoader: true,
      filterProperty: 'id',
      termToSearch: '',
      visitantesHeaders,
      title: 'Lista de visitantes',
      subTitle: 'Aqui você ira encontrar a lista de visitantes completa',
    };
  },
  created() {
    axios
      .get(visitantesApiUrl)
      .then((response) => {
        console.log(response);
        this.visitantes = response.data;
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
        const visitantesFiltrados = this.visitantes.filter(
          obj =>
            (obj[this.filterProperty]
              ? obj[this.filterProperty]
                .toString()
                .toLowerCase()
                .match(this.termToSearch.toLowerCase())
              : undefined),
        );
        this.updateTable(visitantesFiltrados);
      },
      // Este é o número de milissegundos que aguardamos para
      // que o usuário pare de digitar
      300,
    ),
  },
  methods: {
    updateTable(visitantes) {
      this.table.data = [...visitantes];
    },
  },
};
</script>
<style>

</style>
