<template>
  <div class="row">
    <value-box grid="col-sm-12 col-md-4" color-class="bg-green" icon-class="fa fa-bank" :value="billingSummary.credit" text="Total de Créditos">
    </value-box>

    <value-box grid="col-sm-12 col-md-4" color-class="bg-red" icon-class="fa fa-credit-card" :value="billingSummary.debt" text="Total de Débitos">
    </value-box>

    <value-box grid="col-sm-12 col-md-4" color-class="bg-blue" icon-class="fa fa-money" :value="billingSummary.total" text="Valor Consolidado">
    </value-box>
  </div>
</template>
<script>
import axios from '@/plugins/axios';
import ValueBox from './ValueBox';
import { billingSummaryApiUrl } from '../../api-url/index';

const billingSummary = JSON.parse(localStorage.getItem('billingSummary')) || { credit: 0, debt: 0, total: 0 };

export default {
  components: {
    ValueBox,
  },
  data() {
    return {
      billingSummary,
    };
  },
  mounted() {
    axios
      .get(billingSummaryApiUrl)
      .then(({ data }) => {
        this.billingSummary.credit = data.credit;
        this.billingSummary.debt = data.debt;
        this.billingSummary.total = data.credit - data.debt;
        localStorage.setItem('billingSummary', JSON.stringify(this.billingSummary));
      })
      .catch((response) => {
        console.log(response);
      });
  },
};
</script>
<style>

</style>
