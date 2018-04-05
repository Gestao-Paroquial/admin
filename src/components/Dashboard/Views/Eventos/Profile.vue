<template>
  <div class="row">
    <back-button/>
    <update-form :event="event" />
  </div>
</template>
<script>
import axios from '@/plugins/axios';
import { agendaUrl } from '../../../../api-url/index';
import UpdateForm from './Form';

export default {
  components: { UpdateForm },
  data() {
    return {
      event: { },
    };
  },
  mounted() {
    axios.get(`${agendaUrl}/${this.$route.params.id}`)
      .then(({ data }) => {
        this.event = data;

        this.event.comunidade.value = this.event.comunidade.id;
        this.event.comunidade.label = this.event.comunidade.nome;

        this.event.tipo_evento.value = this.event.tipo_evento.id;
        this.event.tipo_evento.label = this.event.tipo_evento.descricao;

        this.event.data_inicio_evento = data.data_inicio_evento.replace(' ', 'T');
        if (this.event.data_fim_evento) {
          this.event.data_fim_evento = data.data_fim_evento.replace(' ', 'T');
        }
      });
  },
};
</script>
