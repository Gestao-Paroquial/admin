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
      <solicitacoes title="Casamentos" :solicitacoes="casamentos"></solicitacoes>
      <solicitacoes title="Batismos" :solicitacoes="batismos"></solicitacoes>
    </div>

    <!--Charts-->
    <div class="row">

      <div class="col-xs-12">
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
      </div>

      <div class="col-md-6 col-xs-12">
        <chart-card :chart-data="activityChart.data" :chart-options="activityChart.options">
          <h4 class="title" slot="title">2015 Sales</h4>
          <span slot="subTitle"> All products including Taxes</span>
          <span slot="footer">
            <i class="ti-check" /> Data information certified</span>
          <div slot="legend">
            <i class="fa fa-circle text-info" /> Tesla Model S
            <i class="fa fa-circle text-warning" /> BMW 5 Series
          </div>
        </chart-card>
      </div>

    </div>

  </div>
</template>
<script>
import axios from '@/plugins/axios';
import StatsCard from '@/components/UIComponents/Cards/StatsCard';
import ChartCard from '@/components/UIComponents/Cards/ChartCard';
import ValueRow from '@/components/UIComponents/ValueRow';
import Solicitacoes from './Solicitacoes';
import {
  facebookApiUrl,
  analyticsUrl,
} from './../../../../api-url';

export default {
  components: {
    StatsCard,
    ChartCard,
    ValueRow,
    Solicitacoes,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      casamentos: [
        {
          nome: 'Pavan kumar',
          data: new Date(),
          status: 'Pendente',
          mensagem:
            'Donec ac condimentum massa. Etiam pellentesque pretium lacus. Phasellus ultricies dictum suscipit. Aenean commodo dui pellentesque molestie feugiat. Aenean commodo dui pellentesque molestie feugiat',
        },
        {
          nome: 'Sonu Nigam',
          data: new Date(),
          status: 'Aprovado',
          mensagem:
            'Donec ac condimentum massa. Etiam pellentesque pretium lacus. Phasellus ultricies dictum suscipit. Aenean commodo dui pellentesque molestie feugiat. Aenean commodo dui pellentesque molestie feugiat',
        },
        {
          nome: 'Arijit singh',
          data: new Date(),
          status: 'Rejeitado',
          mensagem:
            'Donec ac condimentum massa. Etiam pellentesque pretium lacus. Phasellus ultricies dictum suscipit. Aenean commodo dui pellentesque molestie feugiat. Aenean commodo dui pellentesque molestie feugiat',
        },
      ],
      batismos: [
        {
          nome: 'Pavan kumar',
          data: new Date(),
          status: 'Pendente',
          mensagem:
            'Donec ac condimentum massa. Etiam pellentesque pretium lacus. Phasellus ultricies dictum suscipit. Aenean commodo dui pellentesque molestie feugiat. Aenean commodo dui pellentesque molestie feugiat',
        },
        {
          nome: 'Sonu Nigam',
          data: new Date(),
          status: 'Pendente',
          mensagem:
            'Donec ac condimentum massa. Etiam pellentesque pretium lacus. Phasellus ultricies dictum suscipit. Aenean commodo dui pellentesque molestie feugiat. Aenean commodo dui pellentesque molestie feugiat',
        },
        {
          nome: 'Arijit singh',
          data: new Date(),
          status: 'Pendente',
          mensagem:
            'Donec ac condimentum massa. Etiam pellentesque pretium lacus. Phasellus ultricies dictum suscipit. Aenean commodo dui pellentesque molestie feugiat. Aenean commodo dui pellentesque molestie feugiat',
        },
      ],
      statsCards: [
        {
          type: 'warning',
          icon: 'ti-server',
          title: 'Capacity',
          value: '105GB',
          footerText: 'Updated now',
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
      activityChart: {
        data: {
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'Mai',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795],
          ],
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false,
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
    };
  },
  mounted() {
    this.getFacebook();
    this.getAnalytics();
  },
  methods: {
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
      axios.get(analyticsUrl).then(({ data }) => {
        const analyticsStat = this.statsCards.find(
          stat => stat.id === 'analytics',
        );
        const gaSessions = data.totalsForAllResults['ga:sessions'];
        analyticsStat.value = gaSessions;
        localStorage.setItem('gaSessions', gaSessions);
      });
    },
  },
};
</script>
<style>

</style>
