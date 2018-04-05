<template>
  <div>
    <hr>
    <div class="text-center">
      <button class="btn btn-info btn-fill btn-wd" type="submit" v-if="showAdd">
        Adicionar
      </button>
      <button class="btn btn-warning btn-fill btn-wd" type="submit" v-if="showUpdate">
        Alterar
      </button>
      <button class="btn btn-danger btn-fill btn-wd" v-if="showDelete" @click.prevent="deleteFunction">
        Deletar
      </button>
    </div>
    <div class="clearfix" />
  </div>
</template>
<script>
export default {
  props: {
    showAdd: [Boolean, String],
    showUpdate: [Boolean, String],
    showDelete: [Boolean, String],
    deleteFunction: Function,
  },
};
</script>

