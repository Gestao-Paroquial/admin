<template>
  <div v-if="item" >
      <h3>
          {{ title }}
      </h3>
      <p v-for="key in Object.keys(item)" :key="key">
            {{key}}: {{ item[key] }}
      </p>
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
