<template>
	<div class="col-md-12">
		<modal :showModal="showModal" :closeModal="closeModal" :title="'Adicionar Participante'">
			<form slot="body">
				<div class="card-content">
					<div class="form-group">
						<label>Email address</label> <input type="email" name="email" class="form-control" data-vv-id="_jfcie4q7e" aria-required="true" aria-invalid="false">
					</div>
					<div class="form-group">
						<label>Password</label> <input type="password" name="password" class="form-control" data-vv-id="_uh6r2p6of" aria-required="true" aria-invalid="true">
					</div>
				</div>
				<div class="card-footer text-center">
					<button type="submit" class="btn btn-fill btn-info btn-wd">Enviar</button>
				</div>
			</form>
		</modal>
		<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" @click="showModal = true">Open Modal</button>
		<div class="card card-plain">
			<paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns">
			</paper-table>
		</div>
	</div>

	</div>
</template>
<script>
import PaperTable from 'components/UIComponents/PaperTable.vue'
import Modal from 'components/UIComponents/Modal/Modal.vue'
const tableColumns = ['Id', 'Name', 'Telefone', 'Email', 'City']
const tableData = [{
	id: 1,
	name: 'Dakota Rice',
	telefone: '11 98765-4321',
	email: 'Niger@gmail.com',
	city: 'Oud-Turnhout'
},
{
	id: 2,
	name: 'Minerva Hooper',
	telefone: '11 98765-4321',
	email: 'Curaçao@gmail.com',
	city: 'Sinaai-Waas'
},
{
	id: 3,
	name: 'Sage Rodriguez',
	telefone: '11 98765-4321',
	email: 'Netherlands@hotmail.com',
	city: 'Baileux'
}]

export default {
	components: {
		PaperTable,
		Modal
	},
	data() {
		return {
			showModal: false,
			table1: {
				title: 'Lista de Participantes',
				subTitle: 'Aqui você ira encontrar a lista de partipantes completa',
				columns: [...tableColumns],
				data: [...tableData]
			},
			table2: {
				title: 'Table on Plain Background',
				subTitle: 'Here is a subtitle for this table',
				columns: [...tableColumns],
				data: [...tableData]
			}
		}
	},
	methods: {
		closeModal: function() {
			this.showModal = false;
		}
	}
}

</script>
<style>

</style>
