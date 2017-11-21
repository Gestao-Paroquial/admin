<template>
	<div class="col-md-12">
		<modal :showModal="showModalAdd" :closeModal="closeModalAdd" :title="'Adicionar Pastorais'">
			<simple-form slot="body" :inputs="inputs" :action="add" :btnMsg="'Adicionar'" :selectList="selectList"
      :btnClass="'btn-fill btn-info btn-wd'">
			</simple-form>
		</modal>
		<modal :showModal="showModalUpdate" :closeModal="closeModalUpdate" :title="'Alterar Pastorais'">
			<simple-form slot="body" :inputs="inputsUpdate" :selectList="selectListUpdate" :action="update" :btnClass="'btn-fill btn-warning  btn-wd'" :btnMsg="'Alterar'">
			</simple-form>
		</modal>

		<h4 class="title">{{title}}</h4>
		<p class="category">{{subTitle}}</p>

		<div class=" card card-plain">

			<paper-table type="hover" :getId="getId" :del="del"  :data="pastorais" :columns="pastoraisHeaders" :show="show">
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


     <view-item :item="selectedItem" :title="'Pastoral'"></view-item>
	</div>
</template>
<script>
import PaperTable from "components/UIComponents/PaperTable.vue";
import Modal from "components/UIComponents/Modal/Modal.vue";
import SimpleForm from "components/UIComponents/Forms/SimpleForm.vue";
import axios from "axios";
import ViewItem from "components/UIComponents/ViewItem.vue";

const pastoraisHeaders = ["id", "Nome", "Descricao", "Comunidade.Nome"];
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
    SimpleForm,
    ViewItem
  },
  data() {
    return {
      selectedItem: null,
      showModalAdd: false,
      showModalUpdate: false,
      inputs: inputs,
      inputsUpdate: [],
      pastorais: [],
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
      pastoraisHeaders: pastoraisHeaders,
      title: "Lista de Pastorais",
      subTitle: "Aqui você ira encontrar a lista de pastorais completa",
      urlApi: "http://localhost:8000/api/pastorais"
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
      pastoral.updated_at = null;

      const vm = this;

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
          name: "nome",
          type: "text",
          value: pastoral.nome,
          placeholder: "",
          required: true
        },
        {
          label: "Descrição",
          name: "descricao",
          type: "text",
          value: pastoral.descricao,
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

      const vm = this;
      axios
        .get("http://localhost:8000/api/comunidades" + "/" + id)
        .then(function(response) {
          console.log(response);
          const comunidade = response.data;

          const options = {
            value: comunidade.nome,
            id: comunidade.id
          };

          vm.selectListUpdate.options = [options, ...vm.selectList.options];
        })
        .catch(function(error) {
          console.log(error);
        });

      this.inputsUpdate = inputs;

      this.showModalUpdate = true;
    },
    update(pastoral) {
      const vm = this;

      pastoral.updated_at = new Date();

      axios
        .put(this.urlApi + "/" + pastoral.id, JSON.stringify(pastoral), {
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
