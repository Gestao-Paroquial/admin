<template>
  <form slot="body" @submit="makeObj">
    <div>
      <fg-input v-for="input in inputs" :key="input.name" :label="input.label" :required="input.required" :name="input.name" :type="input.type" :value="input.value" :placeholder="input.placeholder" />

      <select-list v-if="selectList" :select-list="selectList" />
    </div>
    <div class="text-center">
      <button type="submit" :class="btnClass" class="btn">{{ btnMsg }}</button>
    </div>
  </form>
</template>
<script>
import fgInput from '../Inputs/formGroupInput';
import SelectList from './SelectList';

export default {
  components: {
    fgInput,
    SelectList,
  },
  props: {
    inputs: Array,
    action: Function,
    btnMsg: String,
    btnClass: String,
    selectList: Object,
  },
  methods: {
    makeObj(event) {
      event.preventDefault();

      const obj = {};

      // Criar Id Aleatorio
      // obj.id = Math.round(Math.random() * 10000);

      for (let index = 0; index < this.inputs.length; index += 1) {
        const input = this.$el[index];
        obj[input.name] = input.value;
        input.value = '';
      }

      if (this.selectList) {
        const selects = document.querySelectorAll('select');

        selects.forEach((select) => {
          obj[select.name] = select.value;
        });
      }

      this.action(obj);
    },
  },
};
</script>
<style>

</style>
