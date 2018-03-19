<template>
  <div class="card">
    <loader v-if="showLoader" />
    <div class="header">
      <h4 class="title">Informações do Banner</h4>
    </div>
    <div class="content">
      <form @submit.prevent="update">

        <div class="row">
          <div class="col-md-6">
            <fg-input :disabled="!$route.query.update" :type="'text'" :required="true" label="Descricão" placeholder="Descricão" v-model="eventoHome.descricao" />
          </div>
          <div class="col-md-6">
            <fg-input :disabled="!$route.query.update" type="url" :required="true" label="Destino do Banner" placeholder="Link" v-model="eventoHome.destino" />
          </div>
        </div>

        <div class="row">
          <h3 class="text-center">Imagem</h3>
          <picture-input ref="pictureInput" v-if="$route.query.update" @change="onChange" width="1280" height="500" margin="16" accept="image/jpeg,image/png" buttonClass="btn" :customStrings="{ upload: '<h1>Bummer!</h1>',  change: 'Trocar Imagem',     drag: 'Faça o upload do banner' }" :zIndex="1" />
          <img :src="backEndUrl+eventoHome.imagem" v-if="!$route.query.update" alt="" srcset="" style="width: 100%">
        </div>
        <hr>
        <div class="text-center">
          <button class="btn btn-warning btn-fill btn-wd" v-if="$route.query.update">
            Alterar
          </button>
          <button class="btn btn-danger btn-fill btn-wd" v-if="$route.query.delete" @click.prevent="del">
            Deletar
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
import { eventosHomeApiUrl, backEndUrl, uploadImageApiUrl } from '../../../../api-url/index';

export default {
  components: { PictureInput },
  props: {
    eventoHome: Object,
  },
  data() {
    return {
      showLoader: false,
      backEndUrl,
    };
  },
  methods: {
    notify(action = '') {
      this.$notifications.notify(
        this.notificationConfig(`Evento ${action} com sucesso`),
      );
    },
    update() {
      this.$dialog.confirm().then((dialog) => {
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
              .put(
                `${eventosHomeApiUrl}/${this.eventoHome.id}`,
                JSON.stringify(this.eventoHome),
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                },
              )
              .then((response2) => {
                dialog.close();
                this.notify('alterado');
                this.$router.push({ path: '/admin/eventos-home' });
                console.log(response2);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch(() => {
            console.log('Clicked on cancel');
          });
      });
    },
    del() {
      this.$dialog
        .confirm()
        .then((dialog) => {
          axios
            .delete(`${eventosHomeApiUrl}/${this.eventoHome.id}`)
            .then((response) => {
              console.log(response);
              dialog.close();
              this.notify('excluído');
              this.$router.push({ path: '/admin/eventos-home' });
            })
            .catch(err => console.log(err));
        })
        .catch(() => {
          console.log('Clicked on cancel');
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
