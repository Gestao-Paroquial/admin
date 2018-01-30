<template>
  <div class="col-md-12">

    <modal :show-modal="showModalAdd" :close-modal="closeModalAdd" :title="'Adicionar Comunidade'">
      <simple-form slot="body" :inputs="inputs" :action="add" :btn-msg="'Adicionar'" :btn-class="'btn-fill btn-info btn-wd'" />
    </modal>

    <modal :show-modal="showModalUpdate" :close-modal="closeModalUpdate" :title="'Alterar Comunidade'">

      <simple-form slot="body" :inputs="inputsUpdate" :action="update" :btn-class="'btn-fill btn-warning  btn-wd'" :btn-msg="'Alterar'" />

    </modal>

    <h4 class="title">{{ title }}</h4>

    <p class="category">{{ subTitle }}</p>

    <div class=" card card-plain">

      <paper-table type="hover" :show="show" :get-id="getId" :del="del" :data="table.data" :columns="comunidadesHeaders">
        <div slot="header">
          <div class="col-sm-12">
            <label class="label-search">
              <input type="search" placeholder="Buscar registros" aria-controls="datatables" class="form-control input-sm" @keydown="search">
            </label>
            <button type="button" class="btn btn-success btn-fill pull-right" data-toggle="modal" data-target="#myModal" @click="showModalAdd = true">
              <i class="fa fa-plus" aria-hidden="true" />
            </button>
          </div>
        </div>
      </paper-table>

      <view-item :item="selectedItem" :title="'Comunidade'" />

    </div>
  </div>
</template>
<script>
import PaperTable from "components/UIComponents/PaperTable.vue";
import ViewItem from "components/UIComponents/ViewItem.vue";
import Modal from "components/UIComponents/Modal/Modal.vue";
import SimpleForm from "components/UIComponents/Forms/SimpleForm.vue";
import axios from "axios";
const comunidadesHeaders = ["Id", "Nome", "Cidade", "UF"];

const inputs = [
  {
    label: "Nome",
    name: "nome",
    type: "text",
    value: "",
    required: false
  },
  {
    label: "E-mail",
    name: "email",
    type: "text",
    value: "",
    required: false
  },
  {
    label: "CNPJ",
    name: "cnpj",
    type: "text",
    value: "",
    required: false
  },
  {
    label: "Telefone",
    name: "telefone",
    type: "text",
    value: "",
    required: false
  },
  {
    label: "Celular",
    name: "celular",
    type: "text",
    value: "",
    required: false
  },
  {
    label: "Endereço",
    name: "endereco",
    type: "text",
    value: "",
    required: false
  },
  {
    label: "Número",
    name: "nro",
    type: "text",
    value: "",
    required: false
  },
  {
    label: "Complemento",
    name: "compl",
    type: "text",
    value: "",
    required: false
  },
  {
    label: "Bairro",
    name: "bairro",
    type: "text",
    value: "",
    required: false
  },
  {
    label: "Cidade",
    name: "cidade",
    type: "text",
    value: "",
    required: false
  },
  {
    label: "UF",
    name: "uf",
    type: "text",
    value: "",
    required: false
  },
  {
    label: "CEP",
    name: "cep",
    type: "text",
    value: "",
    required: false
  }
];

export default {
  components: {
    PaperTable,
    ViewItem,
    Modal,
    SimpleForm
  },
  data() {
    return {
      showModalAdd: false,
      showModalUpdate: false,
      inputs: inputs,
      urlApi: "http://localhost:8000/api/comunidades",
      inputsUpdate: [],
      comunidades: [],
      selectedItem: null,
      table: { data: [] },
      comunidadesHeaders: comunidadesHeaders,
      title: "Lista de Comunidades",
      subTitle: "Aqui você ira encontrar a lista de comunidades completa"
    };
  },
  created() {
    this.get();
  },
  methods: {
    search(event) {
      const value = event.target.value;

      const comunidadesFiltrados = this.comunidades.filter(function(obj) {
        return Object.keys(obj).some(function(key) {
          return (
            obj[key]
              .toString()
              .toLowerCase()
              .indexOf(value) != -1
          );
        });
      });

      this.table.data = comunidadesFiltrados;
    },
    closeModalAdd() {
      this.showModalAdd = false;
    },
    closeModalUpdate() {
      this.showModalUpdate = false;
    },
    get() {
      const vm = this;
      axios
        .get(this.urlApi)
        .then(function(response) {
          console.log(response);
          vm.comunidades = response.data;
          vm.table.data = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    show(item) {
      this.selectedItem = item;
    },
    add(comunidade) {
      comunidade.created_at = new Date();
      comunidade.updated_at = null;
      const vm = this;

      axios
        .post(this.urlApi, JSON.stringify(comunidade), {
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
    del(id) {
      if (confirm("Você tem certeza?")) {
        const vm = this;
        axios
          .delete(this.urlApi + "/" + id)
          .then(function(response) {
            console.log(response);
            vm.get();
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    getId(id) {
      const comunidade = this.comunidades.find(item => item.id == id);

      const inputs = [
        {
          label: "Nome",
          name: "nome",
          type: "text",
          value: comunidade.nome,
          required: false
        },
        {
          label: "E-mail",
          name: "email",
          type: "text",
          value: comunidade.email,
          required: false
        },
        {
          label: "CNPJ",
          name: "cnpj",
          type: "text",
          value: comunidade.cnpj,
          required: false
        },
        {
          label: "Telefone",
          name: "telefone",
          type: "text",
          value: comunidade.telefone,
          required: false
        },
        {
          label: "Celular",
          name: "celular",
          type: "text",
          value: comunidade.celular,
          required: false
        },
        {
          label: "Endereço",
          name: "endereco",
          type: "text",
          value: comunidade.endereco,
          required: false
        },
        {
          label: "Número",
          name: "nro",
          type: "text",
          value: comunidade.nro,
          required: false
        },
        {
          label: "Complemento",
          name: "compl",
          type: "text",
          value: comunidade.compl,
          required: false
        },
        {
          label: "Bairro",
          name: "bairro",
          type: "text",
          value: comunidade.bairro,
          required: false
        },
        {
          label: "Cidade",
          name: "cidade",
          type: "text",
          value: comunidade.cidade,
          required: false
        },
        {
          label: "UF",
          name: "uf",
          type: "text",
          value: comunidade.uf,
          required: false
        },
        {
          label: "CEP",
          name: "cep",
          type: "text",
          value: comunidade.cep,
          required: false
        },
        {
          name: "id",
          type: "hidden",
          value: comunidade.id,
          required: true
        }
      ];

      this.inputsUpdate = inputs;

      this.showModalUpdate = true;
    },
    update(comunidade) {
      const vm = this;

      comunidade.updated_at = new Date();

      axios
        .put(this.urlApi + "/" + comunidade.id, JSON.stringify(comunidade), {
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

      // this.$set(this.comunidades, index, comunidade);

      this.closeModalUpdate();
    }
  }
};
</script>
<style>

</style>
