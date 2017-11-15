<template>
	<div class="col-md-12">
		<modal :showModal="showModalAdd" :closeModal="closeModalAdd" :title="'Adicionar Participantes'">
			<simple-form slot="body" :inputs="inputs" :action="add" :btnMsg="'Adicionar'" :btnClass="'btn-fill btn-info btn-wd'">
			</simple-form>
		</modal>
		<modal :showModal="showModalUpdate" :closeModal="closeModalUpdate" :title="'Alterar Participantes'">
			<simple-form slot="body" :inputs="inputsUpdate" :action="update" :btnClass="'btn-fill btn-warning  btn-wd'" :btnMsg="'Alterar'">
			</simple-form>
		</modal>
		<h4 class="title">{{title}}</h4>
		<p class="category">{{subTitle}}</p>
		<div class=" card card-plain">
			<paper-table type="hover" :getId="getId" :del="del"  :data="pastorais" :columns="pastoraisHeaders">
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
const pastoraisHeaders = ["id", "Nome", "Descricao"];
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
    label: "Descrição",
    name: "descricao",
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
      pastorais: [],
      pastoraisHeaders: pastoraisHeaders,
      title: "Lista de Participantes",
      subTitle: "Aqui você ira encontrar a lista de pastorais completa",
      urlApi: "http://localhost:8000/api/pastorais"
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      const vm = this;
      axios
        .get(this.urlApi)
        .then(function(response) {
          console.log(response);
          vm.pastorais = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    search(event) {
      const value = event.target.value;

      const pastoraisFiltrados = this.pastorais.filter(function(obj) {
        return Object.keys(obj).some(function(key) {
          return (
            obj[key]
              .toString()
              .toLowerCase()
              .indexOf(value) != -1
          );
        });
      });

      this.updateTable(pastoraisFiltrados);
    },
    closeModalAdd() {
      this.showModalAdd = false;
    },
    closeModalUpdate() {
      this.showModalUpdate = false;
    },
    updateTable(pastorais) {
      this.table.data = [...pastorais];
    },
    add(pastoral) {
      pastoral.created_at = new Date();
      pastoral.updated_at = new Date();
      pastoral.comunidades_id = 1;
      const vm = this;

      console.log(JSON.stringify(pastoral));
      axios
        .post(this.urlApi, JSON.stringify(pastoral), {
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
      const pastoral = this.pastorais.find(item => item.id == id);

      const inputs = [
        {
          label: "Nome",
          name: "name",
          type: "text",
          value: pastoral.name,
          placeholder: "",
          required: true
        },
        {
          label: "Dia e horário de encontro",
          name: "dia e horário de encontro",
          type: "text",
          value: pastoral["dia e horário de encontro"],
          placeholder: "",
          required: false
        },
        {
          name: "id",
          type: "hidden",
          value: pastoral.id,
          required: true
        }
      ];

      this.inputsUpdate = inputs;

      this.showModalUpdate = true;
    },
    update(pastoral) {
      const index = this.pastorais.findIndex(item => item.id == pastoral.id);

      this.$set(this.pastorais, index, pastoral);
      this.updateTable(this.pastorais);
      this.closeModalUpdate();
    }
  }
};
</script>
<style>

</style>
