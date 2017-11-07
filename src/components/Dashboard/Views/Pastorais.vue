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
			<paper-table type="hover" :getId="getId" :del="del"  :data="table.data" :columns="table.columns">
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
const pastoraisHeaders = ["Id", "Name", "Dia e horário de encontro"];
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
    label: "Dia e horário de encontro",
    name: "dia e horário de encontro",
    type: "text",
    value: "",
    placeholder: "",
    required: false
  }
];
const pastorais = [
  {
    id: 10,
    name: "Pastoral da Juventude",
    "dia e horário de encontro": "Quarta feira 12:00"
  },
  {
    id: 21,
    name: "Pastoral Teste",
    "dia e horário de encontro": "Quarta feira 12:00"
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
      pastorais: pastorais,
      pastoraisHeaders: pastoraisHeaders,
      title: "Lista de Participantes",
      subTitle: "Aqui você ira encontrar a lista de pastorais completa",
      table: {
        columns: [...pastoraisHeaders],
        data: [...pastorais]
      }
    };
  },
  methods: {
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
      this.pastorais.push(pastoral);
      this.updateTable(this.pastorais);
      this.showModalAdd = false;
    },
    del(id) {
      const index = this.pastorais.findIndex(pastoral => pastoral.id == id);

      if (confirm("Você tem certeza?")) {
        this.pastorais.splice(index, 1);
        this.updateTable(this.pastorais);
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
