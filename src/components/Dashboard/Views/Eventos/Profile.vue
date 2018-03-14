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
                <fg-input :disabled="$route.query.delete" type="text" :required="true" label="Título do Evento" placeholder="Título" v-model="event.title" />
              </div>
              <div class="col-md-6">
                <fg-input :disabled="$route.query.delete" :type="'text'" :required="true" label="Descricão do Evento" placeholder="Descricão" v-model="event.description" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <fg-input :disabled="$route.query.delete" type="date" :required="true" label="Título do Evento" placeholder="Link" v-model="event.date" />
              </div>
            </div>
            <hr>
            <div class="text-center">
              <button class="btn btn-info btn-fill btn-wd" v-if="$route.query.update">
                Update Profile
              </button>
              <button class="btn btn-danger btn-fill btn-wd" v-if="$route.query.delete" @click.prevent="del">
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
    this.event.date = this.event.date.replace(/\//g, '-');
  },
  methods: {
    del() {
      const events = JSON.parse(localStorage.getItem('events'));

      const index = events.findIndex(event => event.id.toString() === this.$route.params.id);

      events.splice(index, 1);

      localStorage.setItem('events', JSON.stringify(events));

      this.$notify({
        group: 'top-right',
        title: 'Sucesso!',
        text: 'Evento removido com sucesso',
        type: 'success',
        speed: 1000,
      });

      this.$router.push({ path: '/admin/eventos' });
    },
    update() {
      const events = JSON.parse(localStorage.getItem('events'));

      const index = events.findIndex(event => event.id.toString() === this.$route.params.id);

      events[index] = this.event;

      localStorage.setItem('events', JSON.stringify(events));

      this.$notify({
        group: 'top-right',
        title: 'Sucesso!',
        text: 'Evento alterado com sucesso',
        type: 'success',
        speed: 1000,
      });

      this.$router.push({ path: '/admin/eventos' });
    },
  },
};
</script>
