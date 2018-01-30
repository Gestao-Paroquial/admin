<template>
  <div 
    v-if="item" 
    class="card"
  >
    <div class="header">
      <h3>
        {{ title }}
      </h3>
    </div>
    <div class="content">
      <p v-for="key in Object.keys(item)" :key="key">
        {{ key }}: {{ item[key] }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    title: String
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>

</style>
