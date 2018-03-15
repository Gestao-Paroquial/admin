<template>
  <div class="row">
    <value-box grid="col-sm-12 col-md-4" color-class="bg-green" icon-class="fa fa-bank" :value="formatToPrice(credit)" text="Total de Créditos">
    </value-box>

    <value-box grid="col-sm-12 col-md-4" color-class="bg-red" icon-class="fa fa-credit-card" :value="formatToPrice(debt)" text="Total de Débitos">
    </value-box>

    <value-box grid="col-sm-12 col-md-4" color-class="bg-blue" icon-class="fa fa-money" :value="formatToPrice(total)" text="Valor Consolidado">
    </value-box>
  </div>
</template>
<script>
import ValueBox from './ValueBox';

export default {
  components: {
    ValueBox,
  },
  props: {
    credit: Number,
    debt: Number,
    total: Number,
  },
  methods: {
    formatToPrice(value) {
      return `R$ ${value.toFixed(2)}`;
    },
  },
};
</script>
<style>

</style>
