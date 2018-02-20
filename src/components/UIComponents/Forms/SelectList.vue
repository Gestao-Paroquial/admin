<template>
  <div >
    <label for="sel1"> {{ selectList.label }}</label>
    <select class="form-control border-input" :name="selectList.name" :disabled="disabled" id="sel1" :required="required">
      <option v-for="option in selectList.options" :key="option.id" :value="option.id">{{ option.value }}</option>

    </select>
  </div>
</template>
<script>
export default {
  props: {
    selectList: Object,
    required: Boolean,
    disabled: [Boolean, String],
  }
};
</script>
<style>

</style>
