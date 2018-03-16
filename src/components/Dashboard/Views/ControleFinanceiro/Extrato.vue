<template>
  <div>
    <h2 class="">Extratos</h2>
    <hr>
    <div class="row">
      <div class="col-md-12">
        <span>Selecione um período:</span>
        <v-select v-model="selectedPeriod" :options="uniqPeriods">
          <span slot="no-options">
            Nenhum resultado encontrado
          </span>
        </v-select>
      </div>
    </div>
    <hr>
    <transition name="fade">
      <div class="center-block loader-wrapper text-center" v-if="showLoader">
        <h5 class="">Aguarde:</h5>
        <fingerprint-spinner :animation-duration="1500" :size="100" color="#41B883" />
      </div>
    </transition>
    <transition name="fade">
      <div v-if="valuesOfBillingCycles.length > 0">
        <h3>Dados de {{selectedPeriod}}:</h3>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Descrição do gasto</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tfoot>
            <tr :class="{success: sumOfBillingCyclesValue > 0, danger: sumOfBillingCyclesValue < 0  }">
              <td>Total</td>
              <td>{{formatToPrice(sumOfBillingCyclesValue)}}</td>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(item, index) in valuesOfBillingCycles" :key="index">
              <td>{{item.name}}</td>
              <td :class="{'text-success': item.value > 0, 'text-danger': item.value < 0  }">{{formatToPrice(item.value)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </transition>
  </div>
</template>
<script>
import { FingerprintSpinner } from 'epic-spinners';

export default {
  components: {
    FingerprintSpinner,
  },
  data() {
    return {
      selectedPeriod: null,
      showLoader: null,
      valuesOfBillingCycles: [],
    };
  },
  props: {
    billingCycles: Array,
  },
  watch: {
    selectedPeriod() {
      this.valuesOfBillingCycles = [];
      if (!this.selectedPeriod) return;

      this.showLoader = true;

      const filteredBillingCycles = this.billingCycles.filter(billingCycle => this.formatDate(billingCycle.date) === this.selectedPeriod);

      setTimeout(() => {
        this.showLoader = false;
        setTimeout(() => {
          this.valuesOfBillingCycles = this.getAllValuesOfBillingCycles(
            filteredBillingCycles,
          );
        }, 500);
      }, 1000);
    },
  },

  computed: {
    uniqPeriods() {
      return [
        ...new Set(this.billingCycles.map(item => this.formatDate(item.date))),
      ];
    },
    sumOfBillingCyclesValue() {
      return this.valuesOfBillingCycles.reduce(
        (prev, curr) => prev + curr.value,
        0,
      );
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        timeZone: 'UTC',
      });
    },
    getAllValuesOfBillingCycles(billingCycles = []) {
      const valuesOfBillingCycles = [];

      billingCycles.forEach((billingCycle) => {
        const values = billingCycle.debts.map(debt => ({
          value: debt.value * -1,
          name: debt.name,
        }));
        if (values.length > 0) valuesOfBillingCycles.push(...values);

        valuesOfBillingCycles.push(...billingCycle.credits);
      });

      return valuesOfBillingCycles;
    },
    formatToPrice(value) {
      return `R$ ${value.toFixed(2)}`;
    },
  },
};
</script>

<style scoped>
.loader-wrapper {
  width: 100px;
  margin-top: 50px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
h2 {
  margin-top: 0;
}
</style>
