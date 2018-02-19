<template>
  <div>
    <ul class="nav nav-tabs">

      <li v-if="tabList" ng-class="{active: tabList}" class="ng-scope">
        <a href="" data-target="#tabList" data-toggle="tab" aria-expanded="false">
          <i class="fa fa-bars"></i> Lista</a>
      </li>

      <li v-if="tabCreate" class="ng-scope active">
        <a data-target="#tabCreate" data-toggle="tab" aria-expanded="true">
          <i class="fa fa-plus"></i> Incluir</a>
      </li>
    </ul>
    <div class="tab-content">

      <div class="row">
        <div class="col-md-6">
          <fg-input type="text" :required="true" label="Nome" placeholder="Nome" v-model="billingCycle.name" />
        </div>
        <div class="col-md-6">
          <fg-input type="month" :required="true" label="Mês e Ano" placeholder="Mês e Ano" v-model="billingCycle.date" />
        </div>
      </div>

      <div class="col-xs-12 col-lg-6">
        <fieldset>
          <legend>Créditos</legend>
          <div class="col-xs-12 ng-scope">
            <table class="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(credit, index) in billingCycle.credits" :key="index">
                  <td>
                    <fg-input :required="true" v-model="credit.name" placeholder="Informe o Nome" ng-readonly="tabDelete" />
                  </td>
                  <td>
                    <fg-input :required="true" v-model="credit.value" placeholder="Informe o Valor" ng-readonly="tabDelete" ng-change="calculateValues()" type="number" />
                  </td>

                  <td style="width:150px;" ng-if="!tabDelete" class="ng-scope">
                    <button class="btn btn-success btn-simple btn-xs" @click="addCredit(index)">
                      <i class="fa fa-plus"></i>
                    </button>
                    <button class="btn btn-warning btn-simple btn-xs" @click="cloneCredit(index,credit)">
                      <i class="fa fa-clone"></i>
                    </button>
                    <button class="btn btn-danger btn-simple btn-xs" @click="deleteCredit(index)">
                      <i class="fa fa-trash-o"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </fieldset>
      </div>

      <div class="col-xs-12 col-lg-6">
        <fieldset>
          <legend>Débitos</legend>
          <div class="col-xs-12 ng-scope">
            <table class="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(debt, index) in billingCycle.debts" :key="index">
                  <td>
                    <fg-input :required="true" v-model="debt.name" placeholder="Informe o Nome" ng-readonly="tabDelete" />
                  </td>
                  <td>
                    <fg-input :required="true" v-model="debt.value" placeholder="Informe o Valor" ng-readonly="tabDelete" ng-change="calculateValues()" type="number" />
                  </td>

                  <td style="width:150px;" ng-if="!tabDelete" class="ng-scope">
                    <button class="btn btn-success btn-simple btn-xs" @click="addDebt(index)">
                      <i class="fa fa-plus"></i>
                    </button>
                    <button class="btn btn-warning btn-simple btn-xs" @click="cloneDebt(index,debt)">
                      <i class="fa fa-clone"></i>
                    </button>
                    <button class="btn btn-danger btn-simple btn-xs" @click="deleteDebt(index)">
                      <i class="fa fa-trash-o"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </fieldset>
      </div>

      <div class="box-footer">
        <button class="btn btn-primary ng-scope" @click="createBillingCycle()" v-if="tabCreate">Incluir</button>
        <button class="btn btn-default" ng-click="cancel()">Cancelar</button>
      </div>
    </div>
  </div>
</template>
<script>
import ValueBox from "components/UIComponents/ValueBox.vue";
import debounce from "lodash.debounce";
import axios from "axios";
import { visitantesApiUrl, comunidadesApiUrl } from "./../../../../api-url";

const visitantesHeaders = [
  "id",
  "nome",
  "email",
  "telefone",
  "comunidades.nome"
];

export default {
  components: {
    ValueBox
  },
  data() {
    return {
      tabCreate: true,
      tabList: true,
      billingCycle: {
        credits: [],
        debts: []
      }
    };
  },
  created() {
    this.initCreditsAndDebts();
  },
  methods: {
    createBillingCycle() {
      console.log(this.billingCycle);
    },
    addDebt(index) {
      this.billingCycle.debts.splice(index + 1, 0, {
        name: null,
        value: null
      });
    },
    cloneDebt(index, { name, value }) {
      this.billingCycle.debts.splice(index + 1, 0, { name, value });
      this.initCreditsAndDebts();
    },
    deleteDebt(index) {
      this.billingCycle.debts.splice(index, 1);
      this.initCreditsAndDebts();
    },
    addCredit(index) {
      this.billingCycle.credits.splice(index + 1, 0, {
        name: null,
        value: null
      });
    },
    cloneCredit(index, { name, value }) {
      this.billingCycle.credits.splice(index + 1, 0, { name, value });
      this.initCreditsAndDebts();
    },
    deleteCredit(index) {
      this.billingCycle.credits.splice(index, 1);
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
    }
  }
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

