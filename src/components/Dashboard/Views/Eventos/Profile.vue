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
  methods: {
    notify(eventTitle = 'Evento', action = '') {
      this.$notifications.notify(
        this.notificationConfig(`${eventTitle} ${action} com sucesso`),
      );
    },
    del() {
      this.$dialog
        .confirm()
        .then((dialog) => {
          dialog.close();
          const events = JSON.parse(localStorage.getItem('events'));

          const index = events.findIndex(event => event.id.toString() === this.$route.params.id);

          events.splice(index, 1);

          localStorage.setItem('events', JSON.stringify(events));

          this.notify(this.event.title, 'removido');

          this.$router.push({ path: '/admin/eventos' });
        })
        .catch(() => {
          console.log('Clicked on cancel');
        });
    },
    update() {
      this.$dialog
        .confirm()
        .then((dialog) => {
          dialog.close();
          const events = JSON.parse(localStorage.getItem('events'));

          const index = events.findIndex(event => event.id.toString() === this.$route.params.id);

          events[index] = this.event;

          localStorage.setItem('events', JSON.stringify(events));

          this.notify(this.event.title, 'alterado');

          this.$router.push({ path: '/admin/eventos' });
        })
        .catch(() => {
          console.log('Clicked on cancel');
        });
    },
  },
};
</script>
