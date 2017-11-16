<template>
  <div class="form-group">
  <label for="sel1">   {{selectList.label}}</label>
  <select class="form-control" :name="selectList.name" id="sel1">
    <option v-for="option in selectList.options" :key="option.id" :value="option.id">{{option.value}}</option>
   
  </select>
</div>
</template>
<script>
export default {
  props: {
    selectList: Object
  }
};
</script>
<style>

</style>
