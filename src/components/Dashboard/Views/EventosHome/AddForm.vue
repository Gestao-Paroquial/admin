<template>
  <div class="card">
    <loader v-if="showLoader" />
    <div class="header">
      <h4 class="title">Adicionar Nova Mensagem</h4>
    </div>
    <div class="content">
      <form @submit.prevent="add">

        <div class="row">
          <div class="col-md-6">
            <fg-input :type="'text'" :required="true" label="Descricão" placeholder="Descricão" v-model="eventoHome.descricao" />
          </div>
          <div class="col-md-6">
            <fg-input type="url" :required="false" label="Destino do Banner" placeholder="Link" v-model="eventoHome.destino" />
          </div>
        </div>

        <div class="row">
          <h3 class="text-center">Imagem</h3>
          <picture-input ref="pictureInput" @change="onChange" width="1280" height="500" margin="16" accept="image/jpeg,image/png" size="10" buttonClass="btn" :customStrings="{    upload: '<h1>Bummer!</h1>',   change: 'Trocar Imagem',     drag: 'Faça o upload do banner' }" :zIndex="1" />
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
import PictureInput from 'vue-picture-input';
import {
  eventosHomeApiUrl,
  uploadImageApiUrl,
} from '../../../../api-url/index';

export default {
  components: {
    PictureInput,
  },
  props: {
    eventoHome: Object,
  },
  data() {
    return {
      showLoader: false,
      imageSrc: null,
    };
  },
  methods: {
    add() {
      this.showLoader = true;
      const data = {
        fileName: this.$refs.pictureInput.fileName,
        image: this.image,
      };

      axios
        .post(uploadImageApiUrl, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          this.eventoHome.imagem = response.data.path;
          axios
            .post(eventosHomeApiUrl, JSON.stringify(this.eventoHome), {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then(() => {
              this.showLoader = false;
              this.$notify({
                group: 'top-right',
                title: 'Sucesso!',
                text: 'Evento inserido com sucesso',
                type: 'success',
                speed: 1000,
              });
              this.$router.push({ path: '/admin/eventos-home' });
            })
            .catch(error => console.log(error));
        })
        .catch((response) => {
          console.log(response);
        });
    },
    onChange(image) {
      if (image) {
        this.image = image;
      }
    },
  },
};
</script>
<style>

</style>
