<template>
  <div class="card">
    <loader v-if="showLoader" />
    <div class="header">
      <h4 class="title">Informações da mensagemParoco</h4>
    </div>
    <div class="content">
      <form @submit.prevent="handleSubmit">

        <div class="row">
          <div class="col-md-4">
            <fg-input :disabled="$route.query.delete" type="text" :required="true" label="Título" placeholder="Nome" v-model="mensagemParoco.titulo" />
          </div>
          <div class="col-md-4">
            <fg-input :disabled="$route.query.delete" :type="'text'" :required="true" label="Subtítulo" placeholder="Subtítulo" v-model="mensagemParoco.subtitulo" />
          </div>
          <!-- <div class="col-md-4">
            <fg-input :disabled="$route.query.delete" type="url" :required="false" label="Link" placeholder="Link" v-model="mensagemParoco.link" />
          </div> -->
        </div>

        <div class="row">
          <div class="col-md-12">
            <vue-editor v-model="mensagemParoco.mensagem" :disabled="$route.query.delete"></vue-editor>
          </div>
        </div>

        <hr>
        <form-buttons :showAdd="!$route.params.id" :showUpdate="$route.params.id" :showDelete="$route.params.id" :deleteFunction="del"/>
        <div class="clearfix" />
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { VueEditor } from 'vue2-editor';
import { mensagensParocoApiUrl } from '../../../../api-url/index';

export default {
  components: { VueEditor },
  props: {
    mensagemParoco: Object,
  },
  data() {
    return {
      showLoader: false,
    };
  },
  methods: {
    handleSubmit() {
      (!this.$route.params.id) ? this.add() : this.update();
    },
    add() {
      console.log(JSON.stringify(this.mensagemParoco));
      this.showLoader = true;
      axios
        .post(mensagensParocoApiUrl, JSON.stringify(this.mensagemParoco), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(({ data }) => {
          this.showLoader = false;
          this.$notifications.notify(this.notificationConfig(data.message));
          this.$router.push({ path: '/admin/mensagens-paroco' });
        })
        .catch(error => console.log(error));
    },
    update() {
      let dialog;
      this.$dialog
        .confirm()
        .then((dialog_) => {
          dialog = dialog_;
          return axios
            .put(`${mensagensParocoApiUrl}/${this.mensagemParoco.id}`, JSON.stringify(this.mensagemParoco), {
              headers: { 'Content-Type': 'application/json' } });
        })
        .then(({ data }) => {
          dialog.close();
          this.$notifications.notify(this.notificationConfig(data.message));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    del() {
      let dialog;
      this.$dialog
        .confirm()
        .then((dialog_) => {
          dialog = dialog_;
          return axios
            .delete(`${mensagensParocoApiUrl}/${this.mensagemParoco.id}`);
        })
        .then(({ data }) => {
          dialog.close();
          this.$notifications.notify(this.notificationConfig(data.message));
          this.$router.push({ path: '/admin/mensagens-paroco' });
        })
        .catch(err => console.log(err));
    },
  },
};
</script>
<style>

</style>
