<template>
  <div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-lg-3 col-sm-6" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon" />
          </div>
          <div class="numbers" slot="content">
            <p>{{ stats.title }}</p>
            {{ stats.value }}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon" /> {{ stats.footerText }}
          </div>
        </stats-card>
      </div>
    </div>

    <!-- Controle Financeiro -->
    <value-row/>

    <div class="row">

      <div class="col-xs-12">
        <div class="card">
          <div class="header">
            <h4 class="title" slot="title">Movimentação financeira do ano</h4>
          </div>
          <div class="content">
            <line-chart :chart-data="datacollection" :options="{responsive: true, maintainAspectRatio: false}"  />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5">
        <chart-card :chart-data="relacaoDeIdade.data" :chart-options="relacaoDeIdade.options" chart-type="Pie">
          <h4 class="title" slot="title">Faixa Etária</h4>
          <span slot="subTitle"> Dos membros e visitantes</span>
          <!-- <span slot="footer">
            <i class="ti-timer" /> Campaign set 2 days ago</span> -->
          <div slot="legend">
            <table class="table">
              <thead>
                <tr>
                  <th>Faixas de Idade</th>
                  <th>Porcentagem</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(label, index) in relacaoDeIdade.data.labels" :key="label">
                  <td>{{label}}</td>
                  <td>{{relacaoDeIdade.data.series[index].toFixed(2)}}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </chart-card>
      </div>

      <aniversariantes-do-mes />

      <div class="col-md-5">
        <div class="card">
          <div class="header">
            <h5 class="title">Ultimos Membros Cadastrados</h5>
          </div>
          <div class="content">
            <vue-content-loading v-if="ultimosMembros.length === 0" :width="300" :height="100">
              <rect x="0" y="20" rx="4" ry="4" width="100%" height="15" />
              <rect x="0" y="40" rx="4" ry="4" width="100%" height="15" />
              <rect x="0" y="60" rx="4" ry="4" width="100%" height="15" />
              <rect x="0" y="80" rx="4" ry="4" width="100%" height="15" />
              <rect x="0" y="100" rx="4" ry="4" width="100%" height="15" />
            </vue-content-loading>
            <table class="table" v-if="ultimosMembros.length > 0">
              <tbody>
                <tr v-for="membro in ultimosMembros" :key="membro.id">
                  <td>
                    <router-link v-bind:to="{ path: 'membros/'+membro.id.toString() }">
                      {{membro.nome}}
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>

    <pedidos-table :pedidos="pedidos"/>

    <div class="row">
      <solicitacoes title="Casamentos" :solicitacoes="casamentos"></solicitacoes>
      <solicitacoes title="Batismos" :solicitacoes="batismos"></solicitacoes>
    </div>

    <!--Charts-->
    <div class="row">

      <!-- <div class="col-xs-12">
        <chart-card :chart-data="usersChart.data" :chart-options="usersChart.options">
          <h4 class="title" slot="title">Users behavior</h4>
          <span slot="subTitle"> 24 Hours performance</span>
          <span slot="footer">
            <i class="ti-reload" /> Updated 3 minutes ago</span>
          <div slot="legend">
            <i class="fa fa-circle text-info" /> Open
            <i class="fa fa-circle text-danger" /> Click
            <i class="fa fa-circle text-warning" /> Click Second Time
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-xs-12">
        <chart-card :chart-data="preferencesChart.data" chart-type="Pie">
          <h4 class="title" slot="title">Email Statistics</h4>
          <span slot="subTitle"> Last campaign performance</span>
          <span slot="footer">
            <i class="ti-timer" /> Campaign set 2 days ago</span>
          <div slot="legend">
            <i class="fa fa-circle text-info" /> Open
            <i class="fa fa-circle text-danger" /> Bounce
            <i class="fa fa-circle text-warning" /> Unsubscribe
          </div>
        </chart-card>
      </div> -->

    </div>

  </div>
</template>
<script>
import VueContentLoading from 'vue-content-loading';
import axios from '@/plugins/axios';
import StatsCard from '@/components/UIComponents/Cards/StatsCard';
import ChartCard from '@/components/UIComponents/Cards/ChartCard';
import ValueRow from '@/components/UIComponents/ValueRow';
import Solicitacoes from './Solicitacoes';
import PedidosTable from './Pedidos';
import { facebookApiUrl, analyticsUrl, membrosUrl, movimentacaoAnualApiUrl, membrosCountUrl, pedidosUrl } from './../../../../api-url';
import AniversariantesDoMes from './AniversariantesDoMes';
import LineChart from '../../../UIComponents/Charts/Line';


// const ultimosMembros = localStorage.getItem('ultimosMembros') ? JSON.parse(localStorage.getItem('ultimosMembros')) : [];

export default {
  components: {
    StatsCard,
    ChartCard,
    ValueRow,
    Solicitacoes,
    AniversariantesDoMes,
    VueContentLoading,
    LineChart,
    PedidosTable,
  },
  data() {
    return {
      membros: [],
      casamentos: [],
      batismos: [],
      statsCards: [
        {
          id: 'membros',
          type: 'warning',
          icon: 'fa fa-users',
          title: 'Membros',
          value: localStorage.getItem('quantidadeDeMembros'),
          footerText: 'Atualizado agora',
          footerIcon: 'ti-reload',
        },
        {
          type: 'success',
          icon: 'ti-wallet',
          title: 'Revenue',
          value: '$1,345',
          footerText: 'Last day',
          footerIcon: 'ti-calendar',
        },
        {
          type: 'sucess',
          icon: 'ti-pulse',
          title: 'Visitantes ao site',
          value: localStorage.getItem('gaSessions'),
          footerText: 'Nos últimos 7 dias',
          footerIcon: 'ti-calendar',
          id: 'analytics',
        },
        {
          type: 'info',
          icon: 'ti-facebook',
          title: 'Curtidas',
          value: localStorage.getItem('fan_count'),
          footerText: 'Atualizar agora',
          footerIcon: 'ti-reload',
          id: 'facebook',
        },
      ],
      usersChart: {
        data: {
          labels: [
            '9:00AM',
            '12:00AM',
            '3:00PM',
            '6:00PM',
            '9:00PM',
            '12:00PM',
            '3:00AM',
            '6:00AM',
          ],
          series: [
            [287, 385, 490, 562, 594, 626, 698, 895, 952],
            [67, 152, 193, 240, 387, 435, 535, 642, 744],
            [23, 113, 67, 108, 190, 239, 307, 410, 410],
          ],
        },
        options: {
          low: 0,
          high: 1000,
          showArea: true,
          height: '245px',
          axisX: {
            showGrid: false,
          },
          lineSmooth: this.$Chartist.Interpolation.simple({
            divisor: 3,
          }),
          showLine: true,
          showPoint: false,
        },
      },
      movimentacaoAnual: {
        data: {},
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: true,
          },
          height: '245px',
        },
      },
      preferencesChart: {
        data: {
          labels: ['62%', '32%', '6%'],
          series: [62, 32, 6],
        },
        options: {},
      },
      relacaoDeIdade: {
        data: JSON.parse(localStorage.getItem('relacaoDeIdadeData')),
        options: { },
      },
      ultimosMembros: [],
      months: [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'jullho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro',
      ],
      billingCycles: [],
      datacollection: null,
      pedidos: [],
    };
  },
  mounted() {
    this.getFacebook();
    this.getAnalytics();
    this.getMovimentacaoAnual();
    this.getTotalOfMembers();
    this.getPedidos();
    axios.get(membrosUrl)
      .then(({ data }) => {
        this.membros = data;

        this.makeCalcOfAges();

        this.ultimosMembros =
        data
          .sort((a, b) => new Date(b.created_at) + new Date(a.created_at)).splice(0, 8);

        localStorage.setItem('ultimosMembros', JSON.stringify(this.ultimosMembros));
      });
  },
  methods: {
    getPedidos() {
      axios.get(pedidosUrl)
        .then(({ data }) => {
          this.pedidos = data.filter(pedido => pedido.code);

          this.casamentos = data.filter(pedido => !pedido.code && pedido.casamento);
          this.bastismos = data.filter(pedido => !pedido.code && pedido.bastismo);
        });
    },
    getTotalOfMembers() {
      axios.get(membrosCountUrl)
        .then(({ data: { quantidade } }) => {
          const membroStat = this.statsCards.find(stat => stat.id === 'membros');
          membroStat.value = quantidade;
          localStorage.setItem('quantidadeDeMembros', quantidade);
        });
    },
    makeCalcOfAges() {
      const contagemDeFaixaEtaria = this.membros.reduce((prev, membro) => {
        const idade = this.calcAge(membro.data_Nascimento);
        const obj = prev;
        if (idade <= 12) {
          obj.criancas++;
        } else if (idade <= 18) {
          obj.adolescentes++;
        } else if (idade <= 29) {
          obj.jovens++;
        } else if (idade <= 60) {
          obj.adultos++;
        } else {
          obj.idosos++;
        }

        return obj;
      }, { criancas: 0, adolescentes: 0, jovens: 0, adultos: 0, idosos: 0 });

      const series = Object.values(contagemDeFaixaEtaria).map(faixaEtaria => this.percent(faixaEtaria));

      this.relacaoDeIdade.data = {
        labels: ['Crianças', 'Adolescentes', 'Jovens', 'Adultos', 'Idosos'],
        series,
      };

      localStorage.setItem('relacaoDeIdadeData', JSON.stringify(this.relacaoDeIdade.data));
    },
    percent(value) {
      return (value / this.membros.length * 100);
    },
    getFacebook() {
      axios
        .get(facebookApiUrl)
        .then(({ data }) => {
          const facebookStat = this.statsCards.find(
            stat => stat.id === 'facebook',
          );
          facebookStat.value = data.fan_count ? data.fan_count : 1800;

          localStorage.setItem('fan_count', facebookStat.value);
        })
        .catch((response) => {
          console.log(response);
        });
    },
    getAnalytics() {
      const analyticsStat = this.statsCards.find(
        stat => stat.id === 'analytics',
      );
      if (process.env.NODE_ENV !== 'development') {
        axios.get(analyticsUrl).then(({ data }) => {
          const gaSessions = data.totalsForAllResults['ga:sessions'];
          analyticsStat.value = gaSessions;
          localStorage.setItem('gaSessions', gaSessions);
        });
      }

      analyticsStat.value = 5;
      localStorage.setItem('gaSessions', 5);
    },
    getMonthName(date) {
      return new Date(date).toLocaleDateString('pt-BR', {
        month: 'long',
        timeZone: 'UTC',
      });
    },
    getMovimentacaoAnual() {
      axios.get(movimentacaoAnualApiUrl)
        .then(({ data }) => {
          const entradas = [];
          const saidas = [];

          Object.values(data).forEach((foo) => {
            entradas.push(foo.entradas);
            saidas.push(foo.saidas);
          });


          this.datacollection = {
            labels: this.months.map(month => this.capitalize(month.substring(0, 3))),
            datasets: [
              {
                label: 'Receitas',
                borderColor: '#00a65a',
                data: entradas,
                fill: false,
              },
              {
                label: 'Gastos',
                borderColor: '#dd4b39',
                data: saidas,
                fill: false,
              },
            ],
          };
        });
    },
  },
};
</script>
<style>
.ct-series-a .ct-line,
.ct-series-a .ct-point{
  stroke: #00a65a;
}
.ct-series-b .ct-line,
.ct-series-b .ct-point{
  stroke: #dd4b39;
}
</style>
