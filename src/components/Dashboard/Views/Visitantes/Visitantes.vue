<template>
  <div class="col-md-12">
    <loader v-if="showLoader" />
    <h4 class="title">{{ title }}</h4>
    <p class="category">{{ subTitle }}</p>

    <div class=" card card-plain">
      <paper-table type="hover" :show="show" :data="table.data" :columns="visitantesHeaders">
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
import Loader from "./../../../UIComponents/Loader.vue";
import { visitantesApiUrl, comunidadesApiUrl } from "./../../../../api-url";

const visitantesHeaders = ["nome", "email", "telefone", "comunidades.nome"];
const inputs = [
  {
    label: "Nome",
    name: "nome",
    type: "text",
    value: "",
    placeholder: "",
    required: true
  },
  {
    label: "email",
    name: "email",
    type: "text",
    value: "",
    placeholder: "",
    required: false
  },
  {
    label: "telefone",
    name: "telefone",
    type: "text",
    value: "",
    placeholder: "",
    required: false
  }
];

export default {
  components: {
    PaperTable,
    Modal,
    SimpleForm,
    Loader
  },
  data() {
    return {
      showModalAdd: false,
      showModalUpdate: false,
      inputs: inputs,
      inputsUpdate: [],
      visitantes: [],
      table: { data: [] },
      selectedItem: null,
      showLoader: true,
      selectList: {
        label: "Comunidades",
        name: "comunidades_id",
        options: []
      },
      selectListUpdate: {
        label: "Comunidades",
        name: "comunidades_id",
        options: []
      },
      visitantesHeaders: visitantesHeaders,
      title: "Lista de visitantes",
      subTitle: "Aqui você ira encontrar a lista de visitantes completa",
      urlApi: "http://localhost:8000/api/visitantes"
    };
  },
  created() {
    this.get();
    axios
      .get(comunidadesApiUrl)
      .then(response => {
        console.log(response);

        const options = response.data.map(comunidade => {
          return {
            value: comunidade.nome,
            id: comunidade.id
          };
        });

        this.selectList.options = options;
        this.showLoader = false;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    show(item) {
      this.selectedItem = item;
    },
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

      const visitantesFiltrados = this.visitantes.filter(function(obj) {
        return Object.keys(obj).some(function(key) {
          return (
            obj[key]
              .toString()
              .toLowerCase()
              .indexOf(value) != -1
          );
        });
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
