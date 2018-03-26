<template>
  <div>
    <h2 class="">Relatórios</h2>
    <hr>
    <div class="row">
      <h3>Selecione o tipo de relatório</h3>
      <div class="col-lg-3 col-sm-6 " v-for="relatorio in relatoriosCards" :key="relatorio.title" @click="selecionarRelatorio(relatorio.type)">
        <div class="card relatorio-card" :class="{active: tipoDeRelatorio[relatorio.type]}">
          <div class="content">
            <div class="row">
              <div class="col-xs-5">
                <div class="icon-big text-center" :class="`icon-${relatorio.alert}`">
                  <i :class="relatorio.icon" />
                </div>
              </div>
              <div class="col-xs-7">
                <div class="numbers">
                  <p>{{ relatorio.title }}</p>
                  {{ relatorio.value }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="tipoDeRelatorio.mensal">
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
          <div v-if="valuesOfBillingCycles.length > 0">
            <h3>Dados de {{selectedPeriod}}:</h3>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tfoot>
                <tr :class="{success: sumOfBillingCyclesValue > 0, danger: sumOfBillingCyclesValue < 0  }">
                  <td colspan="2">Total</td>
                  <td>{{formatToPrice(sumOfBillingCyclesValue)}}</td>
                </tr>
              </tfoot>
              <tbody>
                <tr v-for="(item, index) in valuesOfBillingCycles" :key="index">
                  <td>{{formatDate(item.date)}}</td>
                  <td>{{item.name}}</td>
                  <td :class="{'text-success': item.value > 0, 'text-danger': item.value < 0  }">{{formatToPrice(item.value)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </transition>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="tipoDeRelatorio.porComunidade">
        <div class="row">
          <div class="col-md-12">
            <span>Selecione uma comunidade:</span>
            <v-select v-model="comunidadeSelecionada" :options="nomeDasComunidades">
              <span slot="no-options">
                Nenhum resultado encontrado
              </span>
            </v-select>
          </div>
        </div>
        <transition name="fade">
          <div v-if="comunidadeSelecionada">
            <h3>Relatório da comunidade {{comunidadeSelecionada.value.nome}}</h3>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Período</th>
                  <th>Descrição do gasto</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <!-- <tfoot>
                <tr :class="{success: sumOfBillingCyclesValue > 0, danger: sumOfBillingCyclesValue < 0  }">
                  <td>Total</td>
                  <td>{{formatToPrice(sumOfBillingCyclesValue)}}</td>
                </tr>
              </tfoot> -->
              <tbody>
                <tr v-for="(billingCycle) in comunidadeSelecionada.billingCycles" :key="billingCycle.id">
                  <td>{{formatDate(billingCycle.date)}}</td>
                  <td>{{billingCycle.name}}</td>
                  <!-- <td :class="{'text-success': item.value > 0, 'text-danger': item.value < 0  }">{{formatToPrice(item.value)}}</td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </transition>
        <hr>
      </div>
    </transition>
    <transition name="fade">
      <loader v-if="showLoader"></loader>
    </transition>
  </div>
</template>
<script>
import axios from '@/plugins/axios';
import Loader from './Loader';
import { findBillingCycleByComunityId } from '../../../../api-url/index';

export default {
  components: {
    Loader,
  },
  data() {
    return {
      selectedPeriod: null,
      showLoader: null,
      valuesOfBillingCycles: [],
      comunidadeSelecionada: null,
      tipoDeRelatorio: {
        mensal: false,
        porComunidade: false,
      },
      relatoriosCards: [
        {
          alert: 'warning',
          icon: 'ti-calendar',
          title: 'Extrato',
          value: 'Mensal',
          type: 'mensal',
        },
        {
          alert: 'success',
          icon: 'fa fa-building',
          title: 'Gastos por comunidade',
          type: 'porComunidade',
        },
      ],
    };
  },
  props: {
    billingCycles: Array,
    comunidades: Array,
  },
  watch: {
    selectedPeriod() {
      this.valuesOfBillingCycles = [];
      if (!this.selectedPeriod) return;

      this.showLoader = true;

      const filteredBillingCycles = this.billingCycles.filter(
        billingCycle =>
          this.formatDateByMonth(billingCycle.date) === this.selectedPeriod,
      );

      setTimeout(() => {
        this.showLoader = false;
        setTimeout(() => {
          this.valuesOfBillingCycles = this.getAllValuesOfBillingCycles(
            filteredBillingCycles,
          );
        }, 500);
      }, 1000);
    },
    comunidadeSelecionada() {
      this.showLoader = true;

      axios
        .get(findBillingCycleByComunityId(this.comunidadeSelecionada.value.id))
        .then(({ data }) => {
          this.comunidadeSelecionada.billingCycles = data;
          this.showLoader = false;
          console.log(data);
        });
    },
  },
  computed: {
    nomeDasComunidades() {
      return this.comunidades.map(comunidade => ({
        label: comunidade.nome,
        value: comunidade,
      }));
    },
    uniqPeriods() {
      return [
        ...new Set(
          this.billingCycles.map(item => this.formatDateByMonth(item.date)),
        ),
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
    getAllValuesOfBillingCycles(billingCycles = []) {
      const valuesOfBillingCycles = [];

      billingCycles.forEach((billingCycle) => {
        const debts = billingCycle.debts.map(debt => ({
          value: debt.value * -1,
          name: debt.name,
          date: billingCycle.date,
        }));
        if (debts.length > 0) valuesOfBillingCycles.push(...debts);

        valuesOfBillingCycles.push(...billingCycle.credits.map((credit) => {
          credit.date = billingCycle.date;
          return credit;
        }));
      });

      return valuesOfBillingCycles;
    },
    selecionarRelatorio(type) {
      /* eslint-disable no-param-reassign */
      const setAll = (obj, val) =>
        Object.keys(obj).forEach((k) => {
          obj[k] = val;
        });
      const setNull = obj => setAll(obj, null);
      setNull(this.tipoDeRelatorio);
      this.tipoDeRelatorio[type] = true;
    },
    formatDateByMonth(date) {
      return new Date(date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        timeZone: 'UTC',
      });
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

.relatorio-card {
  cursor: pointer;
  transition: all ease-in 0.5s;
  will-change: transform;
}

.relatorio-card.active {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  transform: scale(1.02);
}
</style>
