<template>
  <div class="row">
    <div class="col-md-5">
      <chart-card :chart-data="graph.data" :chart-options="graph.options" chart-type="Pie">
        <h4 class="title" slot="title">Relatório do total de eventos</h4>
        <h5 slot="subTitle">{{fromNow}}</h5>
        <!-- <span slot="footer">
            <i class="ti-timer" /> Campaign set 2 days ago</span> -->
        <div slot="legend">
          <fg-input type="date" label="Data" v-model="dateFilter"/>
        </div>
      </chart-card>
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

moment.locale('pt-br');


const format = 'YYYY-MM-DD';

export default {
  components: { ChartCard },
  data() {
    return {
      agendaAgrupadaPorTipoDeEvento: [],
      graph: {
        data: {},
        options: { },
      },
      dateFilter: moment().subtract(3, 'months').format(format),
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
      axios.get(`${agendaAgrupadaPorTipoDeEventoUrl}/${this.dateFilter}`).then(({ data }) => {
        this.agendaAgrupadaPorTipoDeEvento = data;
        const series = this.agendaAgrupadaPorTipoDeEvento.map(item => item.quantidade);
        const labels = this.agendaAgrupadaPorTipoDeEvento.map(item => `${item.descricao} - ${item.quantidade}`);
        this.graph.data = { series, labels };
      });
    },
    throttledMethod: debounce((callback) => {
      callback();
    }, 1000),
  },
};
</script>
