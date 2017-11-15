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
    name: "Telefone",
    type: "text",
    value: "",
    required: false
  },
  {
    label: "Celular",
    name: "Celular",
    type: "text",
    value: "",
    required: false
  },
  {
    label: "Endereço",
    name: "Endereco",
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
    Modal,
    SimpleForm
  },
  data() {
    return {
      showModalAdd: false,
      showModalUpdate: false,
      inputs: inputs,
      inputsUpdate: [],
      comunidades: [],
      comunidadesHeaders: comunidadesHeaders,
      title: "Lista de Comunidades",
      subTitle: "Aqui você ira encontrar a lista de comunidades completa",
      table: {
        columns: [...comunidadesHeaders]
      }
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

      this.updateTable(comunidadesFiltrados);
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
        .get("http://localhost:8000/api/comunidades")
        .then(function(response) {
          console.log(response);
          vm.comunidades = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    add(comunidade) {
      comunidade.created_at = "2017-11-14 21:38:30";
      comunidade.updated_at = "2017-11-14 21:38:30";
      const vm = this;

      console.log(JSON.stringify(comunidade));
      axios
        .post(
          "http://localhost:8000/api/comunidades",
          JSON.stringify(comunidade),
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
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
          .delete("http://localhost:8000/api/comunidades/" + id)
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
