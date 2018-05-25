<template>
  <div>
    <loader v-if="showLoader" />
    <ul class="nav nav-tabs">

      <li :class="{'active': tabs.tabList}">
        <a href="" data-target="#tabList" data-toggle="tab" aria-expanded="false" @click.prevent="toggleTabs('tabList')">
          <i class="fa fa-bars"></i> Lista</a>
      </li>

      <li :class="{'active': tabs.tabCreate}">
        <a href="" data-target="#tabCreate" data-toggle="tab" aria-expanded="true" @click.prevent="showTabCreate()">
          <i class="fa fa-plus"></i> Incluir</a>
      </li>
      <li :class="{'active': tabs.tabExtract}">
        <a href="" data-target="#tabExtract" data-toggle="tab" aria-expanded="true" @click.prevent="showTabExtract()">
          <i class="fa fa-get-pocket"></i> Relatórios</a>
      </li>
    </ul>
    <div class="tab-content">
      <div v-if="tabs.tabList">
        <h3>Resumo de todas as movimentações:</h3>
        <ValueRow />
        <h3>Lista de movimentações:</h3>
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Período</th>
              <th>Créditos</th>
              <th>Débitos</th>
              <th>Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="billingCycle in billingCycles" :key="billingCycle.id">

              <td>{{billingCycle.name}}</td>
              <td>{{formatDate(billingCycle.date)}}</td>
              <td>{{formatToPrice(sumProperty(billingCycle.credits))}}</td>
              <td>{{formatToPrice(sumProperty(billingCycle.debts))}}</td>
              <td>{{formatToPrice(sumProperty(billingCycle.credits) - sumProperty(billingCycle.debts))}}</td>
              <td style="width:100px;">
                <button class="btn btn-warning btn-xs" @click="showTabUpdate(billingCycle)">
                  <i class="fa fa-pencil"></i>
                </button>
                <button class="btn btn-danger btn-xs" @click="showTabDelete(billingCycle)">
                  <i class="fa fa-trash-o"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row">
          <paginate :page-count="Math.ceil(numberOfBillingCycles / offset)" :click-handler="paginate" :prev-text="'«'" :next-text="'»'" :container-class="'pagination pull-right pagination-default'" :page-class="'page-item'">
          </paginate>
        </div>
      </div>
      <transition name="fade">
        <form @submit.prevent="handleSubmit()" v-if="tabs.tabCreate || tabs.tabDelete || tabs.tabUpdate">
          <div class=" row ">
            <div class="col-md-4 ">
              <fg-input type="text " :required="true " :disabled="tabs.tabDelete" label="Nome " placeholder="Nome " v-model="billingCycle.name" />
            </div>
            <div class="col-md-4 ">
              <fg-input type="date" :required="true " :disabled="tabs.tabDelete" label="Data" placeholder="Data" v-model="billingCycle.date" />
            </div>
            <div class="col-md-4 ">
              <label>Comunidade:</label>
              <v-select v-model="comunidadeSelecionada" :options="nomeDasComunidades">
                <span slot="no-options">
                  Nenhum resultado encontrado
                </span>
              </v-select>
            </div>
          </div>

          <div class="row">

            <h3 class="col-md-12">Resumo Deste Ciclo</h3>

            <value-box grid="col-sm-12 col-md-4" color-class="bg-green" icon-class="fa fa-bank" :value="credit" text="Total de Créditos">
            </value-box>

            <value-box grid="col-sm-12 col-md-4" color-class="bg-red" icon-class="fa fa-credit-card" :value="debt" text="Total de Débitos">
            </value-box>

            <value-box grid="col-sm-12 col-md-4" color-class="bg-blue" icon-class="fa fa-money" :value="total" text="Valor Consolidado">
            </value-box>
          </div>

          <div class="col-xs-12 col-lg-6 ">
            <fieldset>
              <legend>Créditos</legend>
              <div class="col-xs-12  ">
                <table class="table ">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Valor</th>
                      <th v-if="!tabs.tabDelete">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(credit, index) in billingCycle.credits " :key="index ">
                      <td>
                        <fg-input v-model="credit.name" placeholder="Informe o Nome " :disabled="tabs.tabDelete" />
                      </td>
                      <td>
                        <fg-input v-model="credit.value" placeholder="Informe o Valor " :disabled="tabs.tabDelete" type="number" :min="0" :step="'0.01'" />
                      </td>

                      <td style="width:150px; " v-if="!tabs.tabDelete " class=" ">
                        <button class="btn btn-success btn-simple btn-xs " type="button" @click="addDebtOrCredit(index, 'credits') ">
                          <i class="fa fa-plus "></i>
                        </button>
                        <button class="btn btn-warning btn-simple btn-xs " type="button" @click="cloneDebtOrCredit(index,credit, 'credits') ">
                          <i class="fa fa-clone "></i>
                        </button>
                        <button class="btn btn-danger btn-simple btn-xs " type="button" @click="deleteDebtOrCredit(index, 'credits') ">
                          <i class="fa fa-trash-o "></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>
          </div>

          <div class="col-xs-12 col-lg-6 ">
            <fieldset>
              <legend>Débitos</legend>
              <div class="col-xs-12  ">
                <table class="table ">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Valor</th>
                      <th v-if="!tabs.tabDelete">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(debt, index) in billingCycle.debts " :key="index ">
                      <td>
                        <fg-input v-model="debt.name" placeholder="Informe o Nome " :disabled="tabs.tabDelete" @change="alert()" />
                      </td>
                      <td>
                        <fg-input v-model="debt.value" placeholder="Informe o Valor " :disabled="tabs.tabDelete" type="number" :min="0" :step="'0.01'" />
                      </td>

                      <td style="width:150px; " v-if="!tabs.tabDelete " class=" ">
                        <button class="btn btn-success btn-simple btn-xs " type="button" @click="addDebtOrCredit(index, 'debts') ">
                          <i class="fa fa-plus "></i>
                        </button>
                        <button class="btn btn-warning btn-simple btn-xs " type="button" @click="cloneDebtOrCredit(index,debt, 'debts') ">
                          <i class="fa fa-clone "></i>
                        </button>
                        <button class="btn btn-danger btn-simple btn-xs " type="button" @click="deleteDebtOrCredit(index, 'debts') ">
                          <i class="fa fa-trash-o "></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>
          </div>

          <div class="box-footer ">
            <button class="btn btn-primary" type="submit" v-if="tabs.tabCreate">Incluir</button>
            <button class="btn btn-warning" type="submit" v-if="tabs.tabUpdate">Alterar</button>
            <button class="btn btn-danger" type="button" @click.prevent="deleteBillingCycle()" v-if="tabs.tabDelete">Excluir</button>
            <button class="btn btn-default" type="button" @click="cancel() ">Cancelar</button>
          </div>

        </form>
      </transition>
      <transition name="fade">
        <Extrato v-if="tabs.tabExtract" :numberOfBillingCycles="numberOfBillingCycles" :comunidades="comunidades" />
      </transition>
    </div>
  </div>
</template>
<script>
import axios from '@/plugins/axios';
import ValueBox from '@/components/UIComponents/ValueBox';
import ValueRow from '@/components/UIComponents/ValueRow';
import Extrato from './Extrato';

import { comunidadesApiUrl, graphqlUri } from './../../../../api-url';

export default {
  components: {
    ValueBox,
    ValueRow,
    Extrato,
  },
  data() {
    return {
      first: 0,
      offset: 10,
      numberOfBillingCycles: 0,
      showLoader: false,
      comunidades: [],
      comunidadeSelecionada: null,
      tabs: {
        tabList: true,
        tabExtract: false,
        tabCreate: false,
        tabDelete: false,
        tabUpdate: false,
      },
      billingCycles: [],
      billingCycle: {
        credits: [{ value: null }],
        debts: [{ value: null }],
      },
      credit: 0,
      total: 0,
      debt: 0,
    };
  },
  mounted() {
    this.showLoader = true;
    this.getBillingCycles();
    this.getComunidades();
  },
  computed: {
    nomeDasComunidades() {
      return this.comunidades.map(comunidade => ({
        label: comunidade.nome,
        value: comunidade.id,
      }));
    },
  },
  watch: {
    billingCycle: {
      handler() {
        this.calculateValues();
      },
      deep: true,
    },
  },
  methods: {
    paginate(page) {
      this.first = page * this.offset - this.offset;
      this.getBillingCycles();
    },
    getComunidades() {
      axios.get(comunidadesApiUrl).then(({ data }) => {
        this.comunidades = data;
      });
    },
    handleSubmit() {
      this.billingCycle.comunidade_id = this.comunidadeSelecionada.value;
      if (this.tabs.tabCreate) this.createBillingCycle();
      if (this.tabs.tabUpdate) this.updateBillingCycle();
    },
    sumProperty(array = []) {
      if (array.length === 0) return 0;
      const sum = array.reduce((prev, curr) => prev + curr.value, 0);
      return sum;
    },
    toggleTabs(tab) {
      /* eslint-disable no-param-reassign */
      const setAll = (obj, val) =>
        Object.keys(obj).forEach((k) => {
          obj[k] = val;
        });
      const setNull = obj => setAll(obj, null);
      setNull(this.tabs);
      this.tabs[tab] = true;
    },
    cancel() {
      this.toggleTabs('tabList');
    },
    calculateValues() {
      this.credit = 0;
      this.debt = 0;

      if (this.billingCycle) {
        this.billingCycle.credits.forEach(({ value }) => {
          this.credit += !value || isNaN(value) ? 0 : parseFloat(value);
        });

        this.billingCycle.debts.forEach(({ value }) => {
          this.debt += !value || isNaN(value) ? 0 : parseFloat(value);
        });
      }

      this.total = this.credit - this.debt;
    },
    configurarTabUpdateETabDelete(tab, billingCycle) {
      this.toggleTabs(tab);
      billingCycle.date = new Date(billingCycle.date).toLocaleDateString('en-CA');
      axios
        .get(`${comunidadesApiUrl}/${billingCycle.comunidade_id}`)
        .then(({ data }) => {
          this.comunidadeSelecionada = { label: data.nome, value: data.id };
        });
      this.billingCycle = billingCycle;
    },
    showTabUpdate(billingCycle) {
      this.configurarTabUpdateETabDelete('tabUpdate', billingCycle);
      this.initCreditsAndDebts();
    },
    showTabDelete(billingCycle) {
      this.configurarTabUpdateETabDelete('tabDelete', billingCycle);
    },
    showTabCreate() {
      this.toggleTabs('tabCreate');
      this.billingCycle = {
        credits: [{ value: null }],
        debts: [{ value: null }],
      };
    },
    showTabExtract() {
      this.toggleTabs('tabExtract');
    },
    removeNullValuesOfCreditsAndDebts() {
      this.billingCycle.credits = this.billingCycle.credits.filter(
        credit => (credit.name && credit.value ? credit : null),
      );

      this.billingCycle.debts = this.billingCycle.debts.filter(
        credit => (credit.name && credit.value ? credit : null),
      );
    },
    createBillingCycle() {
      this.showLoader = true;
      this.removeNullValuesOfCreditsAndDebts();
      axios
        .post(graphqlUri, {
          query: `
        mutation CreateBillingCycle($billingCycle: BillingCycleInput!)  {
          createBillingCycle(input: $billingCycle) {
            id
          }
        }`,
          variables: {
            billingCycle: this.billingCycle,
          },
        })
        .then((response) => {
          console.log(response);
          this.getBillingCycles();
          this.toggleTabs('tabList');
          this.notify(this.billingCycle.name, 'inserido');
        })
        .catch((err) => {
          console.log('graphql error:', err);
        });
    },
    count() {
      axios.post(graphqlUri, {
        query: `
        {
          count
        }`,
      }).then(({ data: { data: { count } } }) => {
        this.numberOfBillingCycles = count;
      });
    },
    getBillingCycles() {
      this.count();
      axios.post(graphqlUri, {
        query: `
            query getBillingCycles($first: Int, $offset: Int)  {
              billingCycles(first: $first, offset: $offset) {
                name
                id
                date
                comunidade_id
                credits {
                  name
                  value
                }
                debts {
                  name
                  value
                }
              }
            }`,
        variables: {
          first: this.first,
          offset: this.offset,
        },
      }).then(({ data: { data: { billingCycles } } }) => {
        this.billingCycles = billingCycles;
      }).catch((response) => {
        console.log(response);
      }).then(() => {
        this.showLoader = false;
      });
    },
    notify(billingCycleTitle = 'Ciclo de pagamento', action = '') {
      this.$notifications.notify(
        this.notificationConfig(`${billingCycleTitle} ${action} com sucesso`),
      );
    },
    deleteBillingCycle() {
      this.$dialog
        .confirm()
        .then((dialog) => {
          dialog.close();
          return axios.post(graphqlUri, {
            query: `
              mutation DeleteBillingCycle($id: ID!)  {
                  deleteBillingCycle(id: $id)
              }`,
            variables: {
              id: this.billingCycle.id,
            },
          });
        })
        .then((response) => {
          console.log(response);
          this.getBillingCycles();
          this.notify(this.billingCycle.name, 'excluído');
          this.toggleTabs('tabList');
        })
        .catch(response => console.log(response));
    },
    updateBillingCycle() {
      this.$dialog
        .confirm()
        .then((dialog) => {
          this.removeNullValuesOfCreditsAndDebts();
          dialog.close();
          const {
            name,
            date,
            id,
            comunidade_id,
            debts,
            credits,
          } = this.billingCycle;
          return axios.post(graphqlUri, {
            query: `
        mutation UpdateBillingCycle($id: ID!, $billingCycle: BillingCycleInput!)  {
          updateBillingCycle(id: $id, input: $billingCycle) {
            id
          }
        }`,
            variables: {
              id,
              billingCycle: { name, date, comunidade_id, credits, debts },
            },
          });
        })
        .then((response) => {
          console.log(response);
          this.getBillingCycles();
          this.toggleTabs('tabList');
          this.notify(this.billingCycle.name, 'alterado');
        })
        .catch(response => console.log(response));
    },
    addDebtOrCredit(index, property) {
      this.billingCycle[property].splice(index + 1, 0, {
        name: null,
        value: null,
      });
    },
    cloneDebtOrCredit(index, { name, value }, property) {
      this.billingCycle[property].splice(index + 1, 0, { name, value });
      this.initCreditsAndDebts();
    },
    deleteDebtOrCredit(index, property) {
      this.billingCycle[property].splice(index, 1);
      this.initCreditsAndDebts();
    },
    initCreditsAndDebts() {
      if (!this.billingCycle.debts || !this.billingCycle.debts.length) {
        this.billingCycle.debts = [];
        this.billingCycle.debts.push({});
      }

      if (!this.billingCycle.credits || !this.billingCycle.credits.length) {
        this.billingCycle.credits = [];
        this.billingCycle.credits.push({});
      }
    },
  },
};
</script>

<style lang="scss" >
.box-footer {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  border-top: 1px solid #f4f4f4;
  padding: 10px;
  background-color: #fff;
  float: left;
  clear: both;
}

.tab-content {
  background: #fff;
  padding: 10px;
  margin-top: 50px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}

.nav-tabs {
  margin: 0;
  border-bottom-color: #f4f4f4;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

