<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <div class="card">
        <loader v-if="showLoader" />
        <div class="header">
          <h4 class="title">Evento {{event.title}}</h4>
        </div>
        <div class="content">
          <form @submit.prevent="update">
            <div class="row">
              <div class="col-md-6">
                <fg-input  type="text" :required="true" label="Título do Evento" placeholder="Título" v-model="event.title" />
              </div>
              <div class="col-md-6">
                <fg-input  :type="'text'" :required="true" label="Descricão do Evento" placeholder="Descricão" v-model="event.description" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <fg-input  type="datetime-local" :required="true" label="Início do Evento"  v-model="event.start" />
              </div>
              <div class="col-md-6">
                <fg-input  type="datetime-local" :required="false" label="Fim do Evento"  v-model="event.end" />
              </div>
            </div>
            <hr>
            <div class="text-center">
              <button class="btn btn-warning btn-fill btn-wd" >
                Alterar
              </button>
              <button class="btn btn-danger btn-fill btn-wd"  @click.prevent="del">
                Deletar
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
        date: '', // Required
        title: '', // Required
        description: '',
      },
      showLoader: false,
    };
  },
  mounted() {
    const events = JSON.parse(localStorage.getItem('events'));

    this.event = events.find(
      event => event.id.toString() === this.$route.params.id,
    );
  },
  methods: {
    notify(eventTitle = 'Evento', action = '') {
      this.$notifications.notify({
        message: `${eventTitle} ${action} com sucesso`,
        icon: 'ti-bell',
        horizontalAlign: 'right',
        verticalAlign: 'top',
        type: 'success',
      });
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
