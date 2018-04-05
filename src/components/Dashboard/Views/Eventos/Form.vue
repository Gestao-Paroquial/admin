<template>
  <div class="col-lg-12 ">
    <div class="card">
      <loader v-if="showLoader" />
      <div class="header">
        <h4 class="title">Adicionar Novo Evento</h4>
      </div>
      <div class="content">
        <form @submit.prevent="handleSubmit">

          <div class="row">
            <div class="col-md-4">
              <fg-input type="text" :required="true" label="Título do Evento" placeholder="Título" v-model="event.titulo" />
            </div>
            <div class="col-md-4">
              <fg-input :type="'text'" :required="true" label="Descricão do Evento" placeholder="Descricão" v-model="event.descricao" />
            </div>
            <div class="col-md-4">
              <label>Tipo de evento</label>
              <v-select v-model="event.tipo_evento" :options="tiposEventoToSelectList">
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
              <fg-input type="datetime-local" :required="true" label="Início do Evento" placeholder="Data" v-model="event.data_inicio_evento" />
            </div>
            <div class="col-md-4">
              <fg-input type="datetime-local" :required="false" label="Fim do Evento" placeholder="Data" v-model="event.data_fim_evento" />
            </div>
          </div>
          <form-buttons :showAdd="!$route.params.id" :showUpdate="$route.params.id" :showDelete="$route.params.id" :deleteFunction="deleteEvento"/>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '@/plugins/axios';
import { tiposUrl, comunidadesApiUrl, agendaUrl } from '../../../../api-url/index';

export default {
  props: {
    event: Object,
  },
  data() {
    return {
      showLoader: false,
      tiposEvento: [],
      comunidades: [],
    };
  },
  mounted() {
    this.showLoader = true;

    axios
      .get(tiposUrl).then(({ data }) => {
        this.tiposEvento = data.eventos;
        return axios.get(comunidadesApiUrl);
      })
      .then(({ data }) => {
        this.comunidades = data;
      })
      .finally(() => { this.showLoader = false; });
  },
  computed: {
    tiposEventoToSelectList() {
      return this.arrayToSelectList(this.tiposEvento, 'descricao');
    },
    comunidadesToSelectList() {
      return this.arrayToSelectList(this.comunidades);
    },
  },
  methods: {
    handleSubmit() {
      (!this.$route.params.id) ? this.addEvento() : this.updateEvento();
    },
    addEvento() {
      this.showLoader = true;
      this.event.tipo_evento_id = this.event.tipo_evento.value;
      this.event.comunidade_id = this.event.comunidade.value;
      axios
        .post(agendaUrl, JSON.stringify(this.event), { headers: { 'Content-Type': 'application/json' } })
        .then(({ data }) => {
          this.$notifications.notify(this.notificationConfig(data.message));
          this.$router.push({ path: '/admin/eventos' });
        })
        .catch(error => console.log(error))
        .finally(() => { this.showLoader = false; });
    },
    deleteEvento() {
      let dialog;
      this.$dialog
        .confirm()
        .then((dialog_) => {
          dialog = dialog_;
          return axios.delete(`${agendaUrl}/${this.event.id}`);
        })
        .then(({ data }) => {
          dialog.close();
          this.$notifications.notify(this.notificationConfig(data.message));
          this.$router.push({ path: '/admin/eventos' });
        })
        .catch((err) => {
          dialog.close();
          console.log(err);
        });
    },
    updateEvento() {
      let dialog;
      this.$dialog
        .confirm()
        .then((dialog_) => {
          dialog = dialog_;
          return axios.put(`${agendaUrl}/${this.event.id}`, JSON.stringify(this.event), { headers: { 'Content-Type': 'application/json' } });
        })
        .then(({ data }) => {
          dialog.close();
          this.$notifications.notify(this.notificationConfig(data.message));
          // this.$router.push({ path: '/admin/eventos' });
        })
        .catch((err) => {
          dialog.close();
          console.log(err);
        });
    },
  },
};
</script>
