<template>
  <div class="card">
    <loader v-if="showLoader" />
    <div class="header">
      <h4 class="title">Adicionar Nova Mensagem</h4>
    </div>
    <div class="content">
      <form @submit.prevent="add">
        <div class="row">
          <div class="col-md-4">
            <fg-input type="text" :required="true" label="Título" placeholder="Nome" v-model="mensagemParoco.titulo" />
          </div>
          <div class="col-md-4">
            <fg-input :type="'text'" :required="true" label="Subtítulo" placeholder="Subtítulo" v-model="mensagemParoco.subtitulo" />
          </div>
          <div class="col-md-4">
            <fg-input type="url" :required="false" label="Link" placeholder="Link" v-model="mensagemParoco.link" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <vue-editor v-model="mensagemParoco.mensagem"></vue-editor>
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
</template>
<script>
import axios from 'axios';
import { VueEditor } from 'vue2-editor';
import { mensagensParocoApiUrl } from '../../../../api-url/index';

export default {
  components: {
    VueEditor,
  },
  props: {
    mensagemParoco: Object,
  },
  data() {
    return {
      showLoader: false,
      firstName: '',
    };
  },
  methods: {
    add() {
      console.log(JSON.stringify(this.mensagemParoco));
      this.showLoader = true;
      axios
        .post(mensagensParocoApiUrl, JSON.stringify(this.mensagemParoco), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response);
          this.showLoader = false;
          this.$notify({
            group: 'top-right',
            title: 'Sucesso!',
            text: 'mensagemParoco inserido com sucesso',
            type: 'success',
            speed: 1000,
          });
          this.$router.push({ path: '/admin/mensagens-paroco' });
        })
        .catch(error => console.log(error));
    },
  },
};
</script>
<style>

</style>
