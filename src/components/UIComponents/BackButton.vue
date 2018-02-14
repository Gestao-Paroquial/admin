<template>
  <button @click="$router.go(-1)" class="btn btn-success btn-fill">
    Voltar
  </button>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
button {
  margin: 15px;
}
</style>
