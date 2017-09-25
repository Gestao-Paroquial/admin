<template>
	<div class="col-md-12" id="participantes">
		<modal :showModal="showModalAdd" :closeModal="closeModalAdd" :title="'Adicionar Participante'">
			<simple-form slot="body" :inputs="inputs" :action="add" :btnMsg="'Adicionar'" :btnClass="'btn-fill btn-info btn-wd'">
			</simple-form>
		</modal>
		<modal :showModal="showModalUpdate" :closeModal="closeModalUpdate" :title="'Alterar Participante'">
			<simple-form slot="body" :inputs="inputsUpdate" :action="update" :btnClass="'btn-fill btn-warning  btn-wd'" :btnMsg="'Alterar'">
			</simple-form>
		</modal>

		<div class="card">

			<paper-table type="hover" :getId="getId" :del="del" :title="table1.title" :sub-title="table1.subTitle" :data="participantes" :columns="table1.columns">
				<button slot="header" type="button" class="btn btn-success btn-fill btn-wd" data-toggle="modal" data-target="#myModal" @click="showModalAdd = true">Adicionar
					<i class="fa fa-plus" aria-hidden="true"></i>
				</button>
			</paper-table>
		</div>
	</div>
</template>
<script>
import PaperTable from 'components/UIComponents/PaperTable.vue'
import Modal from 'components/UIComponents/Modal/Modal.vue'
import SimpleForm from 'components/UIComponents/Forms/SimpleForm.vue'
const participantesHeaders = ['Id', 'Name', 'Telefone', 'Email']
const inputs = [
	{
		label: 'Nome',
		name: 'name',
		type: 'text',
		value: '',
		placeholder: '',
		required: true
	},
	{
		label: 'Telefone',
		name: 'telefone',
		type: 'text',
		value: '',
		placeholder: '',
		required: false
	},
	{
		label: 'E-mail',
		name: 'email',
		type: 'email',
		value: '',
		placeholder: '',
		required: false
	}
];
const participantes = [
	{
		id: 10,
		name: 'Dakota Rice',
		telefone: '11 98765-4321',
		email: 'Niger@gmail.com'
	},
	{
		id: 21,
		name: 'Minerva Hooper',
		telefone: '11 98765-4321',
		email: 'Curacao@gmail.com'
	},
	{
		id: 301,
		name: 'Sage Rodriguez',
		telefone: '11 98765-4321',
		email: 'Netherlands@hotmail.com'
	},
	{
		id: 31,
		name: 'Sage Rodriguez',
		telefone: '11 98765-4321',
		email: 'Netherlands@hotmail.com'
	},
	{
		id: 311,
		name: 'Sage Rodriguez',
		telefone: '11 98765-4321',
		email: 'Netherlands@hotmail.com'
	},
	{
		id: 651,
		name: 'Sage Rodriguez',
		telefone: '11 98765-4321',
		email: 'Netherlands@hotmail.com'
	},
	{
		id: 35061,
		name: 'Sage Rodriguez',
		telefone: '11 98765-4321',
		email: 'Netherlands@hotmail.com'
	},
	{
		id: 3051,
		name: 'Sage Rodriguez',
		telefone: '11 98765-4321',
		email: 'Netherlands@hotmail.com'
	},
	{
		id: 351,
		name: 'Sage Rodriguez',
		telefone: '11 98765-4321',
		email: 'Netherlands@hotmail.com'
	},
	{
		id: 3151,
		name: 'Sage Rodriguez',
		telefone: '11 98765-4321',
		email: 'Netherlands@hotmail.com'
	},
	{
		id: 641,
		name: 'Sage Rodriguez',
		telefone: '11 98765-4321',
		email: 'Netherlands@hotmail.com'
	},
	{
		id: 30641,
		name: 'Sage Rodriguez',
		telefone: '11 98765-4321',
		email: 'Netherlands@hotmail.com'
	}
]

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
			table1: {
				title: 'Lista de Participantes',
				subTitle: 'Aqui você ira encontrar a lista de participantes completa',
				columns: [...participantesHeaders],
				data: [...participantes]
			}
		}
	},
	methods: {
		closeModalAdd() {
			this.showModalAdd = false;
		},
		closeModalUpdate() {
			this.showModalUpdate = false;
		},
		add(participante) {
			this.participantes.push(participante);
			this.showModalAdd = false;
		},
		del(id) {

			const index = this.participantes.findIndex(participante => participante.id == id);

			if (confirm("Você tem certeza?"))
				this.participantes.splice(index, 1);
		},
		getId(id) {
			const participante = this.participantes.find(item => item.id == id);

			const inputs = [
				{
					label: 'Nome',
					name: 'name',
					type: 'text',
					value: participante.name,
					placeholder: '',
					required: true
				},
				{
					label: 'Telefone',
					name: 'telefone',
					type: 'text',
					value: participante.telefone,
					placeholder: '',
					required: false
				},
				{
					label: 'E-mail',
					name: 'email',
					type: 'email',
					value: participante.email,
					placeholder: '',
					required: false
				},
				{
					name: 'id',
					type: 'hidden',
					value: participante.id,
					required: true
				}
			];

			this.inputsUpdate = inputs;

			this.showModalUpdate = true;

		},
		update(participante) {

			const index = this.participantes.findIndex(item => item.id == participante.id);

			this.$set(this.participantes, index, participante);

			this.closeModalUpdate();
		}
	}
}

</script>
<style lang="scss">
#participantes {
	thead th {
		white-space: nowrap;
		overflow: hidden;
		background-color: #eef1f6;
		height: 40px;
		min-width: 0;
		text-overflow: ellipsis;
		vertical-align: middle;
		position: relative;
	}

	.table tbody>tr:nth-of-type(2n+1) {
		background-color: #F3F2EE;
	}
}
</style>
