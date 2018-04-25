<template>
<div class="col-md-4">
  <div class="card">
    <div class="header">
      <h4 class="title" slot="title">Relatório do total de eventos</h4>
      <p class="category">
        {{fromNow}}
      </p>
    </div>
    <div class="content">
      <pie :chart-data="datacollection" :options="{responsive: true}" />
      <hr>
      <div class="stats">
        <fg-input type="date" label="Data" v-model="dateFilter" />
      </div>
      <div class="pull-right" />
    </div>
  </div>
</div>
</template>
<script>
import moment from 'moment';
import debounce from 'lodash.debounce';
import 'moment/locale/pt-br';
import axios from '@/plugins/axios';
import ChartCard from '@/components/UIComponents/Cards/ChartCard';
import { agendaAgrupadaPorTipoDeEventoUrl } from '../../../../api-url/index';
import Pie from '../../../UIComponents/Charts/Pie';

moment.locale('pt-br');

const format = 'YYYY-MM-DD';

export default {
  components: { ChartCard, Pie },
  data() {
    return {
      datacollection: null,
      agendaAgrupadaPorTipoDeEvento: [],
      graph: {
        data: {},
        options: {},
      },
      dateFilter: moment()
        .subtract(3, 'months')
        .format(format),
    };
  },
  mounted() {
    this.callApi();
  },
  computed: {
    fromNow() {
      const date = moment(this.dateFilter, format);

      return date.isValid() ? date.fromNow() : 'Data Inválida';
    },
  },
  watch: {
    dateFilter() {
      const date = moment(this.dateFilter);

      if (date.isValid()) this.throttledMethod(this.callApi);
    },
  },

  methods: {
    callApi() {
      axios
        .get(`${agendaAgrupadaPorTipoDeEventoUrl}/${this.dateFilter}`)
        .then(({ data }) => {
          this.agendaAgrupadaPorTipoDeEvento = data;


          this.datacollection = {
            labels: this.agendaAgrupadaPorTipoDeEvento.map(item => item.descricao),
            datasets: [
              {
                label: 'Data One',

                backgroundColor: [
                  '#ff6384',
                  '#36a2eb',
                  '#cc65fe',
                  '#ffce56',
                ],
                data: this.agendaAgrupadaPorTipoDeEvento.map(item => item.quantidade),
              },
            ],
          };
        });
    },
    throttledMethod: debounce((callback) => {
      callback();
    }, 1000),
  },
};
</script>
