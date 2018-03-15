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
                <fg-input type="date" :required="true" label="Título do Evento" placeholder="Link" v-model="event.date" />
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
        date: '', // Required
        title: '', // Required
        description: '',
      },
      showLoader: false,
    };
  },
  methods: {
    add() {
      this.event.date = this.event.date.replace(/-/g, '/');
      this.event.id = new Date().getTime();

      let events = JSON.parse(localStorage.getItem('events'));

      if(!events) events = [];

      events.push(this.event);

      localStorage.setItem('events', JSON.stringify(events));

      this.$notify({
        group: 'top-right',
        title: 'Sucesso!',
        text: 'Evento inserido com sucesso',
        type: 'success',
        speed: 1000,
      });

      this.$router.push({ path: '/admin/eventos' });
    },
  },
};
</script>
