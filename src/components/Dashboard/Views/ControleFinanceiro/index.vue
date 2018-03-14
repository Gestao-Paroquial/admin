<template>
  <div>
    <loader v-if="showLoader" />
    <h3>Resumo de todas as movimentações:</h3>
    <ValueRow />

    <ul class="nav nav-tabs">

      <li :class="{'active': tabList}">
        <a href="" data-target="#tabList" data-toggle="tab" aria-expanded="false" @click.prevent="toggleTabs('tabList')">
          <i class="fa fa-bars"></i> Lista</a>
      </li>

      <li :class="{'active': tabCreate}">
        <a href="" data-target="#tabCreate" data-toggle="tab" aria-expanded="true" @click.prevent="showTabCreate()">
          <i class="fa fa-plus"></i> Incluir</a>
      </li>
    </ul>
    <div class="tab-content">
      <table class="table" v-if="tabList">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Período</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="billingCycle in billingCycles" :key="billingCycle.id">

            <td>{{billingCycle.name}}</td>
            <td>{{new Date(billingCycle.date).toLocaleDateString('pt-BR',{ year: 'numeric', month: 'long'})}}</td>
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
      <form @submit.prevent="createBillingCycle()" v-if="tabCreate || tabDelete || tabUpdate">
        <div class=" row ">
          <div class="col-md-6 ">
            <fg-input type="text " :required="true " :disabled="tabDelete" label="Nome " placeholder="Nome " v-model="billingCycle.name" />
          </div>
          <div class="col-md-6 ">
            <fg-input type="month" :required="true " :disabled="tabDelete" label="Mês e Ano " placeholder="Mês e Ano " v-model="billingCycle.date" />
          </div>
        </div>

        <div class="row">

          <h3 class="col-md-12">Resumo Deste Ciclo</h3>

          <value-box grid="col-sm-12 col-md-4" color-class="bg-green" icon-class="fa fa-bank" :value="formatToPrice(credit)" text="Total de Créditos">
          </value-box>

          <value-box grid="col-sm-12 col-md-4" color-class="bg-red" icon-class="fa fa-credit-card" :value="formatToPrice(debt)" text="Total de Débitos">
          </value-box>

          <value-box grid="col-sm-12 col-md-4" color-class="bg-blue" icon-class="fa fa-money" :value="formatToPrice(total)" text="Valor Consolidado">
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
                    <th v-if="!tabDelete">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(credit, index) in billingCycle.credits " :key="index ">
                    <td>
                      <fg-input v-model="credit.name" placeholder="Informe o Nome " :disabled="tabDelete" />
                    </td>
                    <td>
                      <fg-input v-model="credit.value" placeholder="Informe o Valor " :disabled="tabDelete" type="number " />
                    </td>

                    <td style="width:150px; " v-if="!tabDelete " class=" ">
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
                    <th v-if="!tabDelete">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(debt, index) in billingCycle.debts " :key="index ">
                    <td>
                      <fg-input v-model="debt.name" placeholder="Informe o Nome " :disabled="tabDelete" @change="alert()" />
                    </td>
                    <td>
                      <fg-input v-model="debt.value" placeholder="Informe o Valor " :disabled="tabDelete" type="number " />
                    </td>

                    <td style="width:150px; " v-if="!tabDelete " class=" ">
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
          <button class="btn btn-primary" type="submit" v-if="tabCreate">Incluir</button>
          <button class="btn btn-warning" type="button" @click="updateBillingCycle()" v-if="tabUpdate">Alterar</button>
          <button class="btn btn-danger" type="button" @click.prevent="deleteBillingCycle()" v-if="tabDelete">Excluir</button>
          <button class="btn btn-default" type="button" @click="cancel() ">Cancelar</button>
        </div>

      </form>
    </div>
  </div>
</template>
<script>
import ValueBox from '@/components/UIComponents/ValueBox';
import ValueRow from '@/components/UIComponents/ValueRow';
import axios from 'axios';
import { billingCyclesApiUrl } from './../../../../api-url';

export default {
  components: {
    ValueBox,
    ValueRow,
  },
  data() {
    return {
      tabCreate: false,
      tabList: true,
      showLoader: false,
      tabDelete: false,
      tabUpdate: false,
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
  created() {
    this.showLoader = true;
    this.getBillingCycles();
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
    toggleTabs(tab) {
      this.tabCreate = false;
      this.tabList = false;
      this.tabDelete = false;
      this.tabUpdate = false;
      this[tab] = true;
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
    formatToPrice(value) {
      return `R$ ${value.toFixed(2)}`;
    },
    showTabUpdate(billingCycle) {
      this.toggleTabs('tabUpdate');
      /* eslint-disable no-param-reassign */
      billingCycle.date = billingCycle.date.substring(0, 7);
      this.billingCycle = billingCycle;
      this.initCreditsAndDebts();
    },
    showTabDelete(billingCycle) {
      this.toggleTabs('tabDelete');
      billingCycle.date = billingCycle.date.substring(0, 7);
      this.billingCycle = billingCycle;
      /* eslint-enable no-param-reassign */
    },
    showTabCreate() {
      this.toggleTabs('tabCreate');
      this.billingCycle = {
        credits: [{ value: null }],
        debts: [{ value: null }],
      };
    },
    createBillingCycle() {
      this.showLoader = true;
      this.billingCycle.credits = this.billingCycle.credits.filter(
        credit => (credit.name && credit.value ? credit : null),
      );

      this.billingCycle.debts = this.billingCycle.debts.filter(
        credit => (credit.name && credit.value ? credit : null),
      );

      axios
        .post(billingCyclesApiUrl, JSON.stringify(this.billingCycle), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response);
          this.getBillingCycles();
          this.toggleTabs('tabList');
          this.$notify({
            group: 'top-right',
            title: 'Sucesso!',
            text: 'Ciclo de pagamento inserido com sucesso',
            type: 'success',
            speed: 2000,
          });
        })
        .catch((response) => {
          console.log(response);
        });
    },
    getBillingCycles() {
      this.showLoader = true;
      axios
        .get(billingCyclesApiUrl)
        .then(({ data }) => {
          this.billingCycles = data;
        })
        .catch((response) => {
          console.log(response);
        })
        .then(() => {
          this.showLoader = false;
        });
    },
    deleteBillingCycle() {
      this.$dialog
        .confirm()
        .then((dialog) => {
          /* eslint-disable no-underscore-dangle */
          const url = `${billingCyclesApiUrl}/${this.billingCycle._id}`;
          axios
            .delete(url)
            .then((response) => {
              console.log(response);
              dialog.close();
              this.getBillingCycles();
              this.toggleTabs('tabList');
              this.$notify({
                group: 'top-right',
                title: 'Sucesso!',
                text: 'Ciclo de pagamento excluído com sucesso',
                type: 'success',
                speed: 2000,
              });
            })
            .catch(response => console.log(response));
        })
        .catch(() => {
          console.log('Clicked on cancel');
        });
    },
    updateBillingCycle() {
      this.$dialog
        .confirm()
        .then((dialog) => {
          const url = `${billingCyclesApiUrl}/${this.billingCycle._id}`;
          axios
            .put(url, JSON.stringify(this.billingCycle), {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then((response) => {
              console.log(response);
              dialog.close();
              this.getBillingCycles();

              this.toggleTabs('tabList');
              this.$notify({
                group: 'top-right',
                title: 'Sucesso!',
                text: 'Ciclo de pagamento alterado com sucesso',
                type: 'success',
                speed: 2000,
              });
            })
            .catch(response => console.log(response));
        })
        .catch(() => {
          console.log('Clicked on cancel');
        });
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
</style>

