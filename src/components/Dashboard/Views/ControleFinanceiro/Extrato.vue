<template>
  <div>
    Olá
    <p>
      <select name="" id="">
        <option value="" v-for="uniqPeriod in uniqPeriods " :key="uniqPeriod">{{uniqPeriod}}</option>
      </select>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    billingCycles: Array,
  },

  computed: {
    uniqPeriods() {
      return [
        ...new Set(
          this.billingCycles.map(item =>
            new Date(item.date).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
            }),
          ),
        ),
      ];
    },
  },
};
</script>
