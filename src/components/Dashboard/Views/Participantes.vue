<template>
	<div class="col-md-12">
		<modal :showModal="showModalAdd" :closeModal="closeModalAdd" :title="'Adicionar Participante'">
			<simple-form slot="body" :inputs="inputs" :action="add" :btnMsg="'Adicionar'" :btnClass="'btn-fill btn-info btn-wd'">
			</simple-form>
		</modal>
		<modal :showModal="showModalUpdate" :closeModal="closeModalUpdate" :title="'Alterar Participante'">
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
const participantesHeaders = ["Id", "Name", "Telefone", "Email"];
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
const participantes = [
  {
    id: 10,
    name: "Dakota Rice",
    telefone: "11 98765-4321",
    email: "Niger@gmail.com"
  },
  {
    id: 21,
    name: "Minerva Hooper",
    telefone: "11 98765-4321",
    email: "Curacao@gmail.com"
  },
  {
    id: 301,
    name: "Sage Rodriguez",
    telefone: "11 98765-4321",
    email: "Netherlands@hotmail.com"
  },
  {
    id: 31,
    name: "Sage Rodriguez",
    telefone: "11 98765-4321",
    email: "Netherlands@hotmail.com"
  },
  {
    id: 311,
    name: "Sage Rodriguez",
    telefone: "11 98765-4321",
    email: "Netherlands@hotmail.com"
  },
  {
    id: 651,
    name: "Sage Rodriguez",
    telefone: "11 98765-4321",
    email: "Netherlands@hotmail.com"
  },
  {
    id: 35061,
    name: "Sage Rodriguez",
    telefone: "11 98765-4321",
    email: "Netherlands@hotmail.com"
  },
  {
    id: 3051,
    name: "Sage Rodriguez",
    telefone: "11 98765-4321",
    email: "Netherlands@hotmail.com"
  },
  {
    id: 351,
    name: "Sage Rodriguez",
    telefone: "11 98765-4321",
    email: "Netherlands@hotmail.com"
  },
  {
    id: 3151,
    name: "Sage Rodriguez",
    telefone: "11 98765-4321",
    email: "Netherlands@hotmail.com"
  },
  {
    id: 641,
    name: "Sage Rodriguez",
    telefone: "11 98765-4321",
    email: "Netherlands@hotmail.com"
  },
  {
    id: 30641,
    name: "Sage Rodriguez",
    telefone: "11 98765-4321",
    email: "Netherlands@hotmail.com"
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
      participantes: participantes,
      participantesHeaders: participantesHeaders,
      title: "Lista de Participantes",
      subTitle: "Aqui você ira encontrar a lista de participantes completa",
      table: {
        columns: [...participantesHeaders],
        data: [...participantes]
      }
    };
  },
  methods: {
    search(event) {
      const value = event.target.value;

      const participantesFiltrados = this.participantes.filter(function(obj) {
        return Object.keys(obj).some(function(key) {
          return (
            obj[key]
              .toString()
              .toLowerCase()
              .indexOf(value) != -1
          );
        });
      });

      this.updateTable(participantesFiltrados);
    },
    closeModalAdd() {
      this.showModalAdd = false;
    },
    closeModalUpdate() {
      this.showModalUpdate = false;
    },
    updateTable(participantes) {
      this.table.data = [...participantes];
    },
    add(participante) {
      this.participantes.push(participante);
      this.updateTable(this.participantes);
      this.showModalAdd = false;
    },
    del(id) {
      const index = this.participantes.findIndex(
        participante => participante.id == id
      );

      if (confirm("Você tem certeza?")) {
        this.participantes.splice(index, 1);
        this.updateTable(this.participantes);
      }
    },
    getId(id) {
      const participante = this.participantes.find(item => item.id == id);

      const inputs = [
        {
          label: "Nome",
          name: "name",
          type: "text",
          value: participante.name,
          placeholder: "",
          required: true
        },
        {
          label: "Telefone",
          name: "telefone",
          type: "text",
          value: participante.telefone,
          placeholder: "",
          required: false
        },
        {
          label: "E-mail",
          name: "email",
          type: "email",
          value: participante.email,
          placeholder: "",
          required: false
        },
        {
          name: "id",
          type: "hidden",
          value: participante.id,
          required: true
        }
      ];

      this.inputsUpdate = inputs;

      this.showModalUpdate = true;
    },
    update(participante) {
      const index = this.participantes.findIndex(
        item => item.id == participante.id
      );

      this.$set(this.participantes, index, participante);
      this.updateTable(this.participantes);
      this.closeModalUpdate();
    }
  }
};
</script>

<style lang="scss">
thead {
  background-color: #fff;
  border-radius: 5px;
}
thead th {
  white-space: nowrap;
  overflow: hidden;
  height: 40px;
  min-width: 0;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
}

.table {
  margin-top: 20px;
}
.table tbody > tr:nth-of-type(2n + 1) {
  background-color: #f3f2ee;
}

.label-search {
  border: 1px solid #dddddd;
  border-radius: 5px;
}
</style>
