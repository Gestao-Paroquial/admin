<template>
	<div class="col-md-12">
		<modal :showModal="showModalAdd" :closeModal="closeModalAdd" :title="'Adicionar membrosPastorais'">
			<simple-form slot="body" :inputs="inputs" :action="add" :btnMsg="'Adicionar'" :selectList="selectList"
      :btnClass="'btn-fill btn-info btn-wd'">
			</simple-form>
		</modal>
		<modal :showModal="showModalUpdate" :closeModal="closeModalUpdate" :title="'Alterar membrosPastorais'">
			<simple-form slot="body" :inputs="inputsUpdate" :selectList="selectListUpdate" :action="update" :btnClass="'btn-fill btn-warning  btn-wd'" :btnMsg="'Alterar'">
			</simple-form>
		</modal>
		<h4 class="title">{{title}}</h4>
		<p class="category">{{subTitle}}</p>
		<div class=" card card-plain">
			<paper-table type="hover" :getId="getId" :del="del"  :data="membrosPastorais" :show="show" :columns="membrosPastoraisHeaders">
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

  <view-item :item="selectedItem" :title="'Membro Pastoral'"></view-item>

	</div>
</template>
<script>
import PaperTable from "components/UIComponents/PaperTable.vue";
import Modal from "components/UIComponents/Modal/Modal.vue";
import SimpleForm from "components/UIComponents/Forms/SimpleForm.vue";
import axios from "axios";
import ViewItem from "components/UIComponents/ViewItem.vue"

const membrosPastoraisHeaders = ["nome", "email", "telefone", "pastorais.nome"];
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
      membrosPastorais: [],
            selectedItem: null,
      selectList: {
        label: "Pastorais",
        name: "pastorais_id",
        options: []
      },
      selectListUpdate: {
        label: "Pastorais",
        name: "pastorais_id",
        options: []
      },
      membrosPastoraisHeaders: membrosPastoraisHeaders,
      title: "Lista de membrosPastorais",
      subTitle: "Aqui você ira encontrar a lista de membrosPastorais completa",
      urlApi: "http://localhost:8000/api/membrosPastorais"
    };
  },
  created() {
    this.get();

    const vm = this;
    axios
      .get("http://localhost:8000/api/pastorais")
      .then(function(response) {
        console.log(response);

        const options = response.data.map(pastoral => {
          return {
            value: pastoral.nome,
            id: pastoral.id
          };
        });

        vm.selectList.options = options;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    get() {
      const vm = this;
      axios
        .get(this.urlApi)
        .then(function(response) {
          console.log(response);
          vm.membrosPastorais = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
      show(item) {
      this.selectedItem = item;
    },
    search(event) {
      const value = event.target.value;

      const membrosPastoraisFiltrados = this.membrosPastorais.filter(function(
        obj
      ) {
        return Object.keys(obj).some(function(key) {
          return (
            obj[key]
              .toString()
              .toLowerCase()
              .indexOf(value) != -1
          );
        });
      });

      this.updateTable(membrosPastoraisFiltrados);
    },
    closeModalAdd() {
      this.showModalAdd = false;
    },
    closeModalUpdate() {
      this.showModalUpdate = false;
    },
    updateTable(membrosPastorais) {
      this.table.data = [...membrosPastorais];
    },
    add(membroPastoral) {
      membroPastoral.created_at = new Date();
      membroPastoral.updated_at = null;

      const vm = this;

      console.log(JSON.stringify(membroPastoral));
      axios
        .post(this.urlApi, JSON.stringify(membroPastoral), {
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
      const membroPastoral = this.membrosPastorais.find(item => item.id == id);

      const inputs = [
        {
          label: "Nome",
          name: "nome",
          type: "text",
          value: membroPastoral.nome,
          placeholder: "",
          required: true
        },
        {
          label: "email",
          name: "email",
          type: "text",
          value: membroPastoral.email,
          placeholder: "",
          required: false
        },
        {
          label: "telefone",
          name: "telefone",
          type: "text",
          value: membroPastoral.telefone,
          placeholder: "",
          required: false
        },
        {
          label: "Celular",
          name: "celular",
          type: "text",
          value: membroPastoral.celular,
          required: false
        },
        {
          label: "Endereço",
          name: "endereco",
          type: "text",
          value: membroPastoral.endereco,
          required: false
        },
        {
          label: "Número",
          name: "nro",
          type: "text",
          value: membroPastoral.nro,
          required: false
        },
        {
          label: "Complemento",
          name: "compl",
          type: "text",
          value: membroPastoral.compl,
          required: false
        },
        {
          label: "Bairro",
          name: "bairro",
          type: "text",
          value: membroPastoral.bairro,
          required: false
        },
        {
          label: "Cidade",
          name: "cidade",
          type: "text",
          value: membroPastoral.cidade,
          required: false
        },
        {
          label: "UF",
          name: "uf",
          type: "text",
          value: membroPastoral.uf,
          required: false
        },
        {
          label: "CEP",
          name: "cep",
          type: "text",
          value: membroPastoral.cep,
          required: false
        },
        {
          name: "id",
          type: "hidden",
          value: membroPastoral.id,
          required: true
        }
      ];

      const options = {
        value: membroPastoral.pastorais.nome,
        id: membroPastoral.pastorais.id
      };

      this.selectListUpdate.options = [options, ...this.selectList.options];

      this.inputsUpdate = inputs;

      this.showModalUpdate = true;
    },
    update(membroPastoral) {
      const vm = this;

      membroPastoral.updated_at = new Date();

      axios
        .put(
          this.urlApi + "/" + membroPastoral.id,
          JSON.stringify(membroPastoral),
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

      this.closeModalUpdate();
    }
  }
};
</script>
<style>

</style>
