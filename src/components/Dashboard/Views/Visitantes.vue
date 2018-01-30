<template>
	<div class="col-md-12">
		<modal :showModal="showModalAdd" :closeModal="closeModalAdd" :title="'Adicionar visitantes'">
			<simple-form slot="body" :inputs="inputs" :action="add" :btnMsg="'Adicionar'" :selectList="selectList"
      :btnClass="'btn-fill btn-info btn-wd'">
			</simple-form>
		</modal>
		<modal :showModal="showModalUpdate" :closeModal="closeModalUpdate" :title="'Alterar visitantes'">
			<simple-form slot="body" :inputs="inputsUpdate" :selectList="selectListUpdate" :action="update" :btnClass="'btn-fill btn-warning  btn-wd'" :btnMsg="'Alterar'">
			</simple-form>
		</modal>
		<h4 class="title">{{title}}</h4>
		<p class="category">{{subTitle}}</p>

		<div class=" card card-plain">
			<paper-table type="hover" :show="show" :getId="getId" :del="del"  :data="table.data" :columns="visitantesHeaders">
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

     <view-item :item="selectedItem" :title="'Visitante'"></view-item>
	</div>
</template>
<script>
import PaperTable from "components/UIComponents/PaperTable.vue";
import Modal from "components/UIComponents/Modal/Modal.vue";
import SimpleForm from "components/UIComponents/Forms/SimpleForm.vue";
import axios from "axios";
import ViewItem from "components/UIComponents/ViewItem.vue";

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
    ViewItem
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
    },
    update(visitante) {
      const vm = this;

      visitante.updated_at = new Date();

      axios
        .put(this.urlApi + "/" + visitante.id, JSON.stringify(visitante), {
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

      this.closeModalUpdate();
    }
  }
};
</script>
<style>

</style>
