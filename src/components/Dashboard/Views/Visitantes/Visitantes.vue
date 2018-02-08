<template>
  <div class="col-md-12">
    <modal :show-modal="showModalAdd" :close-modal="closeModalAdd" :title="'Adicionar visitantes'">
      <simple-form slot="body" :inputs="inputs" :action="add" :btn-msg="'Adicionar'" :select-list="selectList" :btn-class="'btn-fill btn-info btn-wd'" />
    </modal>
    <h4 class="title">{{ title }}</h4>
    <p class="category">{{ subTitle }}</p>

    <div class=" card card-plain">
      <paper-table type="hover" :show="show" :get-id="getId" :data="table.data" :columns="visitantesHeaders">
        <div slot="header">
          <div class="col-sm-12">
            <label class="label-search">
              <input type="search" placeholder="Buscar registros" aria-controls="datatables" class="form-control input-sm" @keydown="search">
            </label>

            <router-link v-bind:to="{ path: 'add'}" type="button" class="btn btn-success btn-fill pull-right"  append>
              <i class="fa fa-plus" aria-hidden="true" />
            </router-link>

            <!-- <button type="button" class="btn btn-success btn-fill pull-right" data-toggle="modal" data-target="#myModal" @click="showModalAdd = true">
              <i class="fa fa-plus" aria-hidden="true" />
            </button> -->
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
    SimpleForm
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

    const vm = this;
    axios
      .get("http://localhost:8000/api/comunidades")
      .then(function(response) {
        console.log(response);

        const options = response.data.map(comunidade => {
          return {
            value: comunidade.nome,
            id: comunidade.id
          };
        });

        vm.selectList.options = options;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    show(item) {
      this.selectedItem = item;
    },
    get() {
      const vm = this;
      axios
        .get(this.urlApi)
        .then(function(response) {
          console.log(response);
          vm.visitantes = response.data;
          vm.table.data = response.data;
        })
        .catch(function(error) {
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
    closeModalAdd() {
      this.showModalAdd = false;
    },
    closeModalUpdate() {
      this.showModalUpdate = false;
    },
    updateTable(visitantes) {
      this.table.data = [...visitantes];
    },
    add(visitante) {
      visitante.created_at = new Date();
      visitante.updated_at = null;

      const vm = this;

      axios
        .post(this.urlApi, JSON.stringify(visitante), {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(function(response) {
          console.log(response);
          vm.get();
        })
        .catch(function(error) {
          console.log(error);
        });

      this.showModalAdd = false;
    },
    getId(id) {
      const visitante = this.visitantes.find(item => item.id == id);

      const inputs = [
        {
          label: "Nome",
          name: "nome",
          type: "text",
          value: visitante.nome,
          placeholder: "",
          required: true
        },
        {
          label: "email",
          name: "email",
          type: "text",
          value: visitante.email,
          placeholder: "",
          required: false
        },
        {
          label: "telefone",
          name: "telefone",
          type: "text",
          value: visitante.telefone,
          placeholder: "",
          required: false
        },
        {
          name: "id",
          type: "hidden",
          value: visitante.id,
          required: true
        }
      ];

      const options = {
        value: visitante.comunidades.nome,
        id: visitante.comunidades.id
      };

      this.selectListUpdate.options = [options, ...this.selectList.options];

      this.inputsUpdate = inputs;

      this.showModalUpdate = true;
    }
  }
};
</script>
<style>

</style>
