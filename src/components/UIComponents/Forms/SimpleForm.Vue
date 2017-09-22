<template>
	<form slot="body" @submit="makeObj">
		<div>
			<fg-input v-for="input in inputs" :key="input.name" :label="input.label" :required="true" :name="input.name" :type="input.type" :placeholder="input.placeholder"></fg-input>
		</div>
		<div class="text-center">
			<button type="submit" class="btn btn-fill btn-info btn-wd">Enviar</button>
		</div>
	</form>
</template>
<script>

import fgInput from './../Inputs/formGroupInput.vue';

export default {
	components: {
		fgInput
	},
	props: {
		inputs: Array,
		add: Function
	},
	methods: {
		makeObj: function(event) {
			event.preventDefault();

			const obj = {};

			obj.id = this.inputs.length + 1;

			for (let index = 0; index < this.inputs.length; index++) {
				const input = this.$el[index];
				obj[input.name] = input.value;
				input.value = '';
			}

			this.add(obj);
		}
	}
}

</script>
<style>

</style>
