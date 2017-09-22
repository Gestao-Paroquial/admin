<template>
	<div class="col-md-12">
		<modal :showModal="showModal" :closeModal="closeModal" :title="'Adicionar Participante'">
			<simple-form slot="body" :inputs="inputs" :add="add">
			</simple-form>
		</modal>
		<button type="button" class="btn btn-success btn-fill btn-wd" data-toggle="modal" data-target="#myModal" @click="showModal = true">Adicionar
			<i class="fa fa-plus" aria-hidden="true"></i>
		</button>
		<div class="card card-plain">
			<paper-table type="hover" :del="del" :title="table1.title" :sub-title="table1.subTitle" :data="participantes" :columns="table1.columns">
			</paper-table>
		</div>
	</div>

	</div>
</template>
<script>
import PaperTable from 'components/UIComponents/PaperTable.vue'
import Modal from 'components/UIComponents/Modal/Modal.vue'
import SimpleForm from 'components/UIComponents/Forms/SimpleForm.vue'
const participantesHeaders = ['Id', 'Name', 'Telefone', 'Email']
const inputs = [{
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
}]
const participantes = [{
	id: 1,
	name: 'Dakota Rice',
	telefone: '11 98765-4321',
	email: 'Niger@gmail.com'
},
{
	id: 2,
	name: 'Minerva Hooper',
	telefone: '11 98765-4321',
	email: 'Curaçao@gmail.com'
},
{
	id: 3,
	name: 'Sage Rodriguez',
	telefone: '11 98765-4321',
	email: 'Netherlands@hotmail.com'
}]

export default {
	components: {
		PaperTable,
		Modal,
		SimpleForm
	},
	data() {
		return {
			showModal: false,
			inputs: inputs,
			participantes: participantes,
			table1: {
				title: 'Lista de Participantes',
				subTitle: 'Aqui você ira encontrar a lista de partipantes completa',
				columns: [...participantesHeaders],
				data: [...participantes]
			},
			table2: {
				title: 'Table on Plain Background',
				subTitle: 'Here is a subtitle for this table',
				columns: [...participantesHeaders],
				data: [...participantes]
			}
		}
	},
	methods: {
		closeModal: function() {
			this.showModal = false;
		},
		add: function(participante) {
			this.participantes.push(participante);
			this.showModal = false;

			console.log(this.participantes);
		},
		del(id) {
			if (confirm("Você tem certeza?"))
				this.participantes.splice(id, 1);
		}
	}
}

</script>
<style>

</style>
