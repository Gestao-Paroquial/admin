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
              <div class="col-md-4">
                <fg-input type="text" :required="true" label="Título do Evento" placeholder="Título" v-model="event.titulo" />
              </div>
              <div class="col-md-4">
                <fg-input :type="'text'" :required="true" label="Descricão do Evento" placeholder="Descricão" v-model="event.descricao" />
              </div>
              <div class="col-md-4">
                <label>Tipo de evento</label>
                <v-select v-model="event.tipoEvento" :options="tiposEventoToSelectList">
                  <span slot="no-options">
                    Nenhum resultado encontrado
                  </span>
                </v-select>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <label>Comunidade</label>
                <v-select v-model="event.comunidade" :options="comunidadesToSelectList">
                  <span slot="no-options">
                    Nenhum resultado encontrado
                  </span>
                </v-select>
              </div>
              <div class="col-md-4">
                <fg-input type="datetime-local" :required="true" label="Início do Evento" placeholder="Data" v-model="event.data_evento" />
              </div>
              <div class="col-md-4">
                <fg-input type="datetime-local" :required="false" label="Fim do Evento" placeholder="Data" v-model="event.end" />
              </div>
            </div>

            <hr>
            <div class="text-center">
              <button class="btn btn-info btn-fill btn-wd" type="submit">
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
import axios from '@/plugins/axios';
import { tiposUrl, comunidadesApiUrl } from '../../../../api-url/index';

export default {
  data() {
    return {
      event: {
        data_evento: '', // Required
        titulo: '', // Required
        descricao: '',
      },
      showLoader: false,
      tiposEvento: [],
      comunidades: [],
    };
  },
  mounted() {
    this.showLoader = true;
    axios.get(tiposUrl).then(({ data }) => {
      this.tiposEvento = data.eventos;
      return axios.get(comunidadesApiUrl);
    }).then(({ data }) => {
      this.comunidades = data;
    }).finally(() => { this.showLoader = false; });
  },
  computed: {
    tiposEventoToSelectList() {
      return this.arrayToSelectList(this.tiposEvento, 'descricao');
    },
    comunidadesToSelectList() {
      return this.arrayToSelectList(this.comunidades, 'descricao');
    },
  },
  methods: {
    notify(eventTitle = 'Evento', action = '') {
      this.$notifications.notify(
        this.notificationConfig(`${eventTitle} ${action} com sucesso`),
      );
    },
    add() {
      this.event.tipo_evento_id = this.event.tipoEvento.value;
      console.log(JSON.stringify(this.event, null, 2));
      // this.event.id = new Date().getTime();

      // let events = JSON.parse(localStorage.getItem('events'));

      // if (!events) events = [];

      // events.push(this.event);

      // localStorage.setItem('events', JSON.stringify(events));

      // this.notify(this.event.title, 'inserido');

      // this.$router.push({ path: '/admin/eventos' });
    },
  },
};
</script>
