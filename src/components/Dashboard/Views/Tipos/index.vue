<template>
  <div class="col-md-12">
    <loader v-if="showLoader" />
    <h4 class="title">{{ title }}</h4>

    <div class=" card card-plain">
      <div class="row">
        <tipo-list :tipo="tipos.dependentes" title="Dependentes"/>
        <tipo-list :tipo="tipos.membros" title="Membros"/>
        <tipo-list :tipo="tipos.eventos" title="Eventos"/>
      </div>
    </div>
  </div>
</template>
<script>
import PaperTable from '@/components/UIComponents/PaperTable';
import Modal from '@/components/UIComponents/Modal/Modal';
import axios from 'axios';
import debounce from 'lodash.debounce';
import TipoList from './TipoList';
import { tiposUrl } from './../../../../api-url';

const comunidadesHeaders = ['id', 'nome', 'email', 'cnpj', 'cep'];

export default {
  components: {
    PaperTable,
    Modal,
    TipoList,
  },
  data() {
    return {
      showModalAdd: false,
      showModalUpdate: false,
      tipos: {},
      table: { data: [] },
      showLoader: true,
      filterProperty: 'id',
      termToSearch: '',
      comunidadesHeaders,
      title: 'Lista com todos os tipos do sistema',
      subTitle: 'Aqui você ira encontrar a lista de comunidades completa',
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
