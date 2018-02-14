<template>
  <div class="form-group">
    <label v-if="label">
      {{ label }}
    </label>
    <input class="form-control border-input" v-bind="$props" :value="value" :required="required" @input="$emit('input',$event.target.value)" :type="type" >
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "text"
    },
    label: String,
    name: String,
    pattern: String,
    title: String,
    disabled: Boolean,
    placeholder: String,
    value: [String, Number],
    required: Boolean
  }
};
</script>
<style>

</style>
