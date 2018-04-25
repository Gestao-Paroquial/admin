<template>
  <div class="eventos">
    <loader v-if="loader"/>
    <go-to-add-page></go-to-add-page>
    <relatorio-de-eventos-agrupado-por-tipo/>
    <full-calendar :events="events" locale="pt-br" @eventClick="eventClick" @dayClick="dayClick" @moreClick="moreClick">
    </full-calendar>
  </div>
</template>

<script>
import axios from '@/plugins/axios';
import RelatorioDeEventosAgrupadoPorTipo from './RelatorioDeEventosAgrupadoPorTipo';
import { agendaUrl, tiposUrl } from '../../../../api-url/index';

export default {
  components: { RelatorioDeEventosAgrupadoPorTipo },
  data() {
    return {
      events: [],
      tiposEvento: [],
      loader: false,
    };
  },
  mounted() {
    this.loader = true;

    axios.get(tiposUrl)
      .then(({ data }) => {
        this.tiposEvento = data.eventos;
        return axios.get(agendaUrl);
      })
      .then(({ data }) => {
        this.events = data.map((event) => {
          const reassingObj = {
            start: event.data_inicio_evento,
            end: event.data_fim_evento,
            title: event.titulo,
            cssClass: this.getEventType(event).descricao.toLowerCase(),
          };

          Object.assign(event, reassingObj);
          return event;
        });
      })
      .finally(() => { this.loader = false; });
  },
  methods: {
    getEventType(event) {
      return this.tiposEvento.find(type => event.tipo_evento_id === type.id);
    },
    changeMonth(start, end, current) {
      console.log('changeMonth', start, end, current);
    },
    eventClick(event, jsEvent, pos) {
      console.log('eventClick', event, jsEvent, pos);

      this.$router.push({ path: `/admin/eventos/${event.id}` });
    },
    dayClick(day, jsEvent) {
      console.log('dayClick', day, jsEvent);
    },
    moreClick(day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent);
    },
  },
};
</script>
<style lang="scss" >
.eventos {
  h2 {
    text-align: center;
    margin: 15px auto 40px;
  }

  .family {
    background-color: #000;
  }

  .prev-month,
  .next-month {
    border-radius: 20px;
    box-sizing: border-box;
    border-width: 2px;
    background-color: transparent;
    font-size: 12px;
    font-weight: 500;
    border-style: solid;
    padding: 7px 18px;
    border-color: #66615b;
    color: #66615b;
    transition: all 0.15s linear;
  }
  .comp-full-calendar {
    max-width: initial;
  }

  .batismo{
    background-color: rgb(51, 40, 207) !important;
    color: #fff !important;
  }

  .festa{
    background-color: #3c763d !important;
    color: #fff !important;
  }

  .casamento{
    background-color: #86a7c2 !important;
    color: #fff !important;
  }

  .quermesse{
    background-color: #a33502 !important;
    color: #fff !important;
  }
}
</style>
