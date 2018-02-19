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

import ValueBox from "./ValueBox.vue";
import axios from "axios";
import { billingSummaryApiUrl } from "../../api-url";
export default {
  components: {
    ValueBox
  },

  data() {
    return {
      credit: 0,
      debt: 0,
      total: 0
    };
  },
  methods: {
    formatToPrice(value) {
      return `R$ ${value.toFixed(2)}`;
    }
  },
  created() {
    axios
      .get(billingSummaryApiUrl)
      .then(({ data }) => {
        this.credit = data.credit;
        this.debt = data.debt;
        this.total = data.credit - data.debt;
      })
      .catch(response => {
        console.log(response);
      });
  }
};
</script>
<style>

</style>
