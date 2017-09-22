<template>
	<div class="col-md-12">
		<modal></modal>
		<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
		<div class="card card-plain">
			<paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns">
			</paper-table>
		</div>
	</div>

	</div>
</template>
<script>
import PaperTable from 'components/UIComponents/PaperTable.vue'
import Modal from 'components/UIComponents/Modal.vue'
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
	}
}

</script>
<style>

</style>
