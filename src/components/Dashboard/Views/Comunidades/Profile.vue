<template>
  <div>
    <back-button/>
    <div class="row">
      <div class="col-md-5">

        <h3>Números da {{comunidade.nome}}</h3>

        <value-box grid="col-md-12" color-class="bg-green" icon-class="fa fa-bank" :value="credits" text="Total de Receitas">
        </value-box>

        <value-box grid="col-md-12" color-class="bg-red" icon-class="fa fa-credit-card" :value="debts" text="Total de Gastos">
        </value-box>

        <value-box grid="col-md-12" color-class="bg-blue" icon-class="fa fa-money" :value="credits-debts" text="Valor Consolidado">
        </value-box>
      </div>

      <div class="col-md-7">
        <update-form :comunidade="comunidade" />
      </div>

      <div class="col-md-4 col-sm-12 ">
        <div class="card">
          <div class="header">
            <h5 class="title">
              Lista de membros da {{comunidade.nome}}
            </h5>
          </div>
          <div class="content">
            <ul>
              <li v-for="membro in comunidade.membros" :key="membro.id">
                <router-link v-bind:to="{ path: '/admin/membros/'+membro.id.toString() }" >{{membro.nome}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '@/plugins/axios';
import UpdateForm from './Form';
import {
  comunidadesApiUrl,
  graphqlUri,
} from './../../../../api-url';
import ValueBox from '../../../UIComponents/ValueBox';

export default {
  components: {
    UpdateForm,
    ValueBox,
  },
  data() {
    return {
      comunidade: { telefones: [] },
      billingCycles: [],
    };
  },
  mounted() {
    axios
      .get(`${comunidadesApiUrl}/${this.$route.params.id}`)
      .then(({ data }) => {
        this.comunidade = data;
      })
      .then(() => {
        axios({
          url: graphqlUri,
          method: 'post',
          data: {
            query: `
          {
            findByComunidadeId(comunidade_id: ${this.comunidade.id}) {
              id
              name
              debts{
                name
                value
              }
              credits{
                name
                value
              }
            }
          }
      `,
          },
        })
          .then(({ data: { data: { findByComunidadeId } } }) => {
            this.billingCycles = findByComunidadeId;
          });
      })
      .catch(err => console.log(err));
  },
  computed: {
    debts() {
      return this.reduceCreditOrDebt('debts');
    },
    credits() {
      return this.reduceCreditOrDebt('credits');
    },
  },
  methods: {
    reduceCreditOrDebt(creditOrDebt) {
      return this.billingCycles
        .reduce((prev, curr) => prev + curr[creditOrDebt]
          .reduce((prevDebtOrCredit, currDebtOrCredit) => prevDebtOrCredit + currDebtOrCredit.value, 0), 0);
    },
  },
};
</script>

<style lang="sass">

</style>
