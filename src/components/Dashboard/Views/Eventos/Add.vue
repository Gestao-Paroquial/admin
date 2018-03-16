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
                <fg-input type="date" :required="true" label="Data do Evento" placeholder="Link" v-model="event.date" />
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
  mounted() {
    this.event.date = this.formatDate();
  },
  methods: {
    add() {
      this.event.date = this.event.date.replace(/-/g, '/');
      this.event.id = new Date().getTime();

      let events = JSON.parse(localStorage.getItem('events'));

      if (!events) events = [];

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
    formatDate() {
      if (this.$route.query.date === 'all') return '';
      const data = new Date(this.$route.query.date);
      console.log(data);
      let dia = data.getDate();
      if (dia.toString().length == 1) {
        dia = `0${dia}`;
      }
      let mes = data.getMonth() + 1;
      if (mes.toString().length == 1) {
        mes = `0${mes}`;
      }
      const ano = data.getFullYear();
      return `${ano}-${mes}-${dia}`;
    },
  },
};
</script>
