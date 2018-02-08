<template>
  <div class="col-md-12">
    <loader v-if="showLoader" />
    <h4 class="title">{{ title }}</h4>
    <p class="category">{{ subTitle }}</p>

    <div class=" card card-plain">
      <paper-table type="hover" :data="table.data" :columns="visitantesHeaders">
        <div slot="header">
          <div class="col-sm-12">
            <label class="label-search">
              <input type="search" placeholder="Buscar registros" aria-controls="datatables" class="form-control input-sm" @keydown="search">
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
import PaperTable from "components/UIComponents/PaperTable.vue";
import Modal from "components/UIComponents/Modal/Modal.vue";
import SimpleForm from "components/UIComponents/Forms/SimpleForm.vue";
import axios from "axios";
import { visitantesApiUrl, comunidadesApiUrl } from "./../../../../api-url";

const visitantesHeaders = ["nome", "email", "telefone", "comunidades.nome"];

export default {
  components: {
    PaperTable,
    Modal,
    SimpleForm
  },
  data() {
    return {
      showModalAdd: false,
      showModalUpdate: false,
      visitantes: [],
      table: { data: [] },
      showLoader: true,
      visitantesHeaders: visitantesHeaders,
      title: "Lista de visitantes",
      subTitle: "Aqui você ira encontrar a lista de visitantes completa"
    };
  },
  created() {
    this.get();
    axios
      .get(comunidadesApiUrl)
      .then(response => {
        console.log(response);
        this.showLoader = false;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    get() {
      axios
        .get(visitantesApiUrl)
        .then(response => {
          console.log(response);
          this.visitantes = response.data;
          this.table.data = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    search(event) {
      const value = event.target.value;

      const visitantesFiltrados = this.visitantes.filter(obj => {
        return Object.keys(obj).some(
          key =>
            obj[key]
              .toString()
              .toLowerCase()
              .indexOf(value) != -1
        );
      });

      this.updateTable(visitantesFiltrados);
    },
    updateTable(visitantes) {
      this.table.data = [...visitantes];
    }
  }
};
</script>
<style>

</style>
