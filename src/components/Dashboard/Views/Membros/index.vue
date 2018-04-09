<template>
  <div class="col-md-12">
    <loader v-if="showLoader" />
    <div class="row">
      <div class="col-md-5">
        <stats-card>
          <div class="icon-big text-center icon-danger"  slot="header">
            <i class="fa fa-users" />
          </div>
          <div class="numbers" slot="content">
            <p>Visitantes</p>
            {{totalOfVisitantes}}
          </div>
          <div class="stats" slot="footer">
            <i class="ti-reload" /> Atualizado agora
          </div>
        </stats-card>
      </div>

      <div class="col-md-5">
        <stats-card>
          <div class="icon-big text-center icon-info"  slot="header">
            <i class="fa fa-users" />
          </div>
          <div class="numbers" slot="content">
            <p>Membros</p>
            {{totalOfMembros}}
          </div>
          <div class="stats" slot="footer">
            <i class="ti-reload" /> Atualizado agora
          </div>
        </stats-card>
      </div>

      <div class="col-md-5">
        <stats-card>
          <div class="icon-big text-center icon-success"  slot="header">
            <i class="fa fa-users" />
          </div>
          <div class="numbers" slot="content">
            <p>Dizimistas</p>
            {{totalOfDizimistas}}
          </div>
          <div class="stats" slot="footer">
            <i class="ti-reload" /> Atualizado agora
          </div>
        </stats-card>
      </div>
    </div>

    <h4 class="title">{{ title }}</h4>
    <p class="category">{{ subTitle }}</p>

    <div class=" card card-plain">
      <paper-table type="hover" :data="table.data" :columns="membrosHeaders">
        <div slot="header">
          <div class="col-sm-12">
            <label class="label-search form-group">
              <input type="search" v-model="termToSearch" placeholder="Buscar registros" aria-controls="datatables" class="form-control input-sm">
            </label>
            <label for="" class="form-group">
              <select name="" id="" class=" form-group filter-options border-input" v-model="filterProperty">
                <option v-for="header in membrosHeaders.filter(obj => obj.match(/^[^.]+$/))" :key="header">{{header}}</option>
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
import StatsCard from '@/components/UIComponents/Cards/StatsCard';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { membrosUrl } from './../../../../api-url';

const membrosHeaders = [
  'id', 'nome', 'email',
];

export default {
  components: {
    PaperTable,
    Modal,
    StatsCard,
  },
  data() {
    return {
      showModalAdd: false,
      showModalUpdate: false,
      membros: [],
      table: { data: [] },
      showLoader: true,
      filterProperty: 'id',
      termToSearch: '',
      membrosHeaders,
      title: 'Membros',
      subTitle: 'Aqui você ira encontrar a lista de membros completa',
    };
  },
  created() {
    axios
      .get(membrosUrl)
      .then((response) => {
        this.membros = response.data;
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
        const membrosFiltrados = this.membros.filter(
          obj =>
            (obj[this.filterProperty]
              ? obj[this.filterProperty]
                .toString()
                .toLowerCase()
                .match(this.termToSearch.toLowerCase())
              : undefined),
        );
        this.updateTable(membrosFiltrados);
      },
      // Este é o número de milissegundos que aguardamos para
      // que o usuário pare de digitar
      300,
    ),
  },
  methods: {
    updateTable(membros) {
      this.table.data = [...membros];
    },
  },
  computed: {
    totalOfVisitantes() {
      const visitantes = this.membros.filter(membro => membro.tipo_membro_id === 1);
      return visitantes.length;
    },
    totalOfMembros() {
      const membross = this.membros.filter(membro => membro.tipo_membro_id === 2);
      return membross.length;
    },
    totalOfDizimistas() {
      const dizimistas = this.membros.filter(membro => membro.tipo_membro_id === 3);
      return dizimistas.length;
    },
  },
};
</script>
<style>

</style>
