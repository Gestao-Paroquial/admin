<template>
  <div class="col-md-12" >
    <modal :showModal="showModalAdd" :closeModal="closeModalAdd" :title="'Adicionar Dizimista'">
      <simple-form slot="body" :inputs="inputs" :action="add" :btnMsg="'Adicionar'" :btnClass="'btn-fill btn-info btn-wd'">
      </simple-form>
    </modal>
    <modal :showModal="showModalUpdate" :closeModal="closeModalUpdate" :title="'Alterar Dizimista'">
      <simple-form slot="body" :inputs="inputsUpdate" :action="update" :btnClass="'btn-fill btn-warning  btn-wd'" :btnMsg="'Alterar'">
      </simple-form>
    </modal>
    <h4 class="title">{{title}}</h4>
    <p class="category">{{subTitle}}</p>
    <div class=" card card-plain">
      <paper-table type="hover" :getId="getId" :del="del" :data="table.data" :columns="table.columns">
        <div slot="header">
          <div class="col-sm-12">
            <label class="label-search">
      <input type="search" placeholder="Buscar registros" aria-controls="datatables" class="form-control input-sm" @keydown="search">
      </label>
            <button type="button" class="btn btn-success btn-fill pull-right" data-toggle="modal" data-target="#myModal" @click="showModalAdd = true">
      <i class="fa fa-plus" aria-hidden="true"></i>
      </button>
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
const dizimistasHeaders = [
  "Id",
  "Nome",
  "Estado Civil",
  "Profissão",
  "Endereço",
  "Bairro",
  "Data de nascimento"
];
const inputs = [
  {
    label: "Nome",
    name: "name",
    type: "text",
    value: "",
    placeholder: "",
    required: true
  },
  {
    label: "Telefone",
    name: "telefone",
    type: "text",
    value: "",
    placeholder: "",
    required: false
  },
  {
    label: "E-mail",
    name: "email",
    type: "email",
    value: "",
    placeholder: "",
    required: false
  }
];
const dizimistas = [
  {
    id: 10,
    nome: "Dakota Rice",
    "data de nascimento": "20/10",
    "estado civil": "Solteiro",
    profissão: "Advogado",
    endereço: "Av Um"
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
      dizimistas: dizimistas,
      dizimistasHeaders: dizimistasHeaders,
      title: "Lista de Dizimistas",
      subTitle: "Aqui você ira encontrar a lista de dizimistas completa",
      table: {
        columns: [...dizimistasHeaders],
        data: [...dizimistas]
      }
    };
  },
  methods: {
    search(event) {
      const value = event.target.value;
      const dizimistasFiltrados = this.dizimistas.filter(function(obj) {
        return Object.keys(obj).some(function(key) {
          return (
            obj[key]
              .toString()
              .toLowerCase()
              .indexOf(value) != -1
          );
        });
      });
      this.updateTable(dizimistasFiltrados);
    },
    closeModalAdd() {
      this.showModalAdd = false;
    },
    closeModalUpdate() {
      this.showModalUpdate = false;
    },
    updateTable(dizimistas) {
      this.table.data = [...dizimistas];
    },
    add(dizimista) {
      this.dizimistas.push(dizimista);
      this.updateTable(this.dizimistas);
      this.showModalAdd = false;
    },
    del(id) {
      const index = this.dizimistas.findIndex(dizimista => dizimista.id == id);
      if (confirm("Você tem certeza?")) {
        this.dizimistas.splice(index, 1);
        this.updateTable(this.dizimistas);
      }
    },
    getId(id) {
      const dizimista = this.dizimistas.find(item => item.id == id);
      const inputs = [
        {
          label: "Nome",
          name: "name",
          type: "text",
          value: dizimista.name,
          placeholder: "",
          required: true
        },
        {
          label: "Telefone",
          name: "telefone",
          type: "text",
          value: dizimista.telefone,
          placeholder: "",
          required: false
        },
        {
          label: "E-mail",
          name: "email",
          type: "email",
          value: dizimista.email,
          placeholder: "",
          required: false
        },
        {
          name: "id",
          type: "hidden",
          value: dizimista.id,
          required: true
        }
      ];
      this.inputsUpdate = inputs;
      this.showModalUpdate = true;
    },
    update(dizimista) {
      const index = this.dizimistas.findIndex(item => item.id == dizimista.id);
      this.$set(this.dizimistas, index, dizimista);
      this.updateTable(this.dizimistas);
      this.closeModalUpdate();
    }
  }
};
</script>

<style lang="scss">
thead th {
  white-space: nowrap;
  overflow: hidden;
  background-color: #fff;
  height: 40px;
  min-width: 0;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: center;
}
.table tbody > tr:nth-of-type(2n + 1) {
  background-color: #f3f2ee;
}
.label-search {
  border: 1px solid #dddddd;
  border-radius: 5px;
}
</style>
