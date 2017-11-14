<template>
	<div class="col-md-12">
		<modal :showModal="showModalAdd" :closeModal="closeModalAdd" :title="'Adicionar Comunidade'">
			<simple-form slot="body" :inputs="inputs" :action="add" :btnMsg="'Adicionar'" :btnClass="'btn-fill btn-info btn-wd'">
			</simple-form>
		</modal>
		<modal :showModal="showModalUpdate" :closeModal="closeModalUpdate" :title="'Alterar Comunidade'">
			<simple-form slot="body" :inputs="inputsUpdate" :action="update" :btnClass="'btn-fill btn-warning  btn-wd'" :btnMsg="'Alterar'">
			</simple-form>
		</modal>
		<h4 class="title">{{title}}</h4>
		<p class="category">{{subTitle}}</p>
		<div class=" card card-plain">
			<paper-table type="hover" :getId="getId" :del="del"  :data="comunidades" :columns="table.columns">
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
import axios from "axios";
const comunidadesHeaders = ["Id", "nome", "Local", "Missas", "Foto"];

const inputs = [
  {
    label: "Nome",
    name: "name",
    type: "text",
    value: "",
    required: true
  },
  {
    label: "Localização",
    name: "local",
    type: "text",
    value: "",
    required: true
  },
  {
    label: "Horários das Missas",
    name: "missas",
    type: "text",
    value: "",
    required: false
  },
  {
    label: "Foto",
    name: "foto",
    type: "text",
    value: "",
    accept: "image/x-png,image/gif,image/jpeg",
    required: true
  }
];

const comunidades = [
  {
    name: "Teste1",
    foto: "teste1.jpg",
    local: "Av. Um",
    missas: "12.00",
    id: 10
  },
  {
    name: "Teste2",
    foto: "teste2.jpg",
    local: "Av. Dois",
    missas: "12.00",
    id: 101
  },
  {
    name: "Teste3",
    foto: "teste3.jpg",
    local: "Av. Três",
    missas: "12.00",
    id: 102
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
      comunidades: comunidades,
      comunidadesHeaders: comunidadesHeaders,
      title: "Lista de Comunidades",
      subTitle: "Aqui você ira encontrar a lista de comunidades completa",
      table: {
        columns: [...comunidadesHeaders],
      }
    };
  },
  created() {
    const vm = this;
    axios
      .get("http://localhost:8000/api/comunidades")
      .then(function(response) {
        console.log(response);
        vm.comunidades = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
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

      this.updateTable(comunidadesFiltrados);
    },
    closeModalAdd() {
      this.showModalAdd = false;
    },
    closeModalUpdate() {
      this.showModalUpdate = false;
    },
    updateTable(comunidades) {
      this.table.data = [...comunidades];
    },
    add(comunidade) {
      this.comunidades.push(comunidade);
      this.updateTable(this.comunidades);
      this.showModalAdd = false;
    },
    del(id) {
      const index = this.comunidades.findIndex(
        comunidade => comunidade.id == id
      );

      if (confirm("Você tem certeza?")) {
        this.comunidades.splice(index, 1);
        this.updateTable(this.comunidades);
      }
    },
    getId(id) {
      const comunidade = this.comunidades.find(item => item.id == id);

      const inputs = [
        {
          label: "Nome",
          name: "name",
          type: "text",
          value: comunidade.name,
          required: true
        },
        {
          label: "Localização",
          name: "local",
          type: "text",
          value: comunidade.local,
          required: true
        },
        {
          label: "Horários das Missas",
          name: "missas",
          type: "text",
          value: comunidade.missas,
          required: false
        },
        {
          label: "Foto",
          name: "foto",
          type: "text",
          value: comunidade.foto,
          accept: "image/x-png,image/gif,image/jpeg",
          required: true
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
      console.log(comunidade);

      const index = this.comunidades.findIndex(
        item => item.id == comunidade.id
      );

      this.$set(this.comunidades, index, comunidade);

      this.closeModalUpdate();
    }
  }
};
</script>
<style>

</style>
