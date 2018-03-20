<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <div class="card">
        <loader v-if="showLoader" />
        <div class="header">
          <h4 class="title">Adicionar Nova Mensagem</h4>
        </div>
        <div class="content">
          <form @submit.prevent="add">

            <div class="row">
              <div class="col-md-6">
                <fg-input type="text" :required="true" label="Título do Evento" placeholder="Título" v-model="event.title" />
              </div>
              <div class="col-md-6">
                <fg-input :type="'text'" :required="true" label="Descricão do Evento" placeholder="Descricão" v-model="event.description" />
              </div>

            </div>

            <div class="row">
              <div class="col-md-6">
                <fg-input type="datetime-local" :required="true" label="Início do Evento" placeholder="Data" v-model="event.start" />
              </div>
              <div class="col-md-6">
                <fg-input type="datetime-local" :required="false" label="Fim do Evento" placeholder="Data" v-model="event.end" />
              </div>
            </div>

            <hr>
            <div class="text-center">
              <button class="btn btn-info btn-fill btn-wd">
                Adicionar
              </button>
            </div>
            <div class="clearfix" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      event: {
        start: '', // Required
        title: '', // Required
        description: '',
      },
      showLoader: false,
    };
  },

  methods: {
    notify(eventTitle = 'Evento', action = '') {
      this.$notifications.notify(
        this.notificationConfig(`${eventTitle} ${action} com sucesso`),
      );
    },
    add() {
      this.event.id = new Date().getTime();

      let events = JSON.parse(localStorage.getItem('events'));

      if (!events) events = [];

      events.push(this.event);

      localStorage.setItem('events', JSON.stringify(events));

      this.notify(this.event.title, 'inserido');

      this.$router.push({ path: '/admin/eventos' });
    },
  },
};
</script>
