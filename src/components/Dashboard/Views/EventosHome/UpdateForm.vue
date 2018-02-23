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
            <fg-input :disabled="$route.query.delete" :type="'text'" :required="true" label="Descricão" placeholder="Descricão" v-model="eventoHome.descricao" />
          </div>
          <div class="col-md-6">
            <fg-input :disabled="$route.query.delete" type="url" :required="false" label="Destino do Banner" placeholder="Link" v-model="eventoHome.destino" />
          </div>
        </div>

        <div class="row">
          <h3 class="text-center">Imagem</h3>
          <picture-input ref="pictureInput" @change="onChange" width="1280" height="500" margin="16" accept="image/jpeg,image/png" size="10" buttonClass="btn" :customStrings="{    upload: '<h1>Bummer!</h1>',  change: 'Trocar Imagem',     drag: 'Faça o upload do banner' }" :zIndex="1" :prefill="eventoHome.imagem ?backEndUrl + eventoHome.imagem: null" />
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
</template>
<script>
import axios from "axios";
import SelectList from "components/UIComponents/Forms/SelectList.vue";
import { eventosHomeApiUrl, backEndUrl, uploadImageApiUrl  } from "../../../../api-url/index";
import PictureInput from "vue-picture-input";

export default {
  components: { PictureInput },
  props: {
    eventoHome: Object
  },
  data() {
    return {
      showLoader: false,
      backEndUrl
    };
  },
  methods: {
    update() {
      this.$dialog.confirm().then(dialog => {
        const data = {
          fileName: this.$refs.pictureInput.fileName,
          image: this.image
        };

        axios
          .post(uploadImageApiUrl, JSON.stringify(data), {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            this.eventoHome.imagem = response.data.path;

            axios
              .put(
                `${eventosHomeApiUrl}/${this.eventoHome.id}`,
                JSON.stringify(this.eventoHome),
                {
                  headers: {
                    "Content-Type": "application/json"
                  }
                }
              )
              .then(response => {
                dialog.close();
                this.$notify({
                  group: "top-right",
                  title: "Sucesso!",
                  text: "Mensagem do Paroco alterada",
                  type: "success",
                  speed: 1000
                });
                console.log(response);
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(function() {
            console.log("Clicked on cancel");
          });
      });
    },
    del() {
      this.$dialog
        .confirm()
        .then(dialog => {
          axios
            .delete(`${eventosHomeApiUrl}/${this.eventoHome.id}`)
            .then(response => {
              console.log(response);
              dialog.close();
              this.$notify({
                group: "top-right",
                title: "Sucesso!",
                text: "Mensagem do Paroco excluída",
                type: "success",
                speed: 1000
              });
              this.$router.push({ path: "/admin/eventos-home" });
            })
            .catch(err => console.log(err));
        })
        .catch(function() {
          console.log("Clicked on cancel");
        });
    },
    onChange(image) {
      if (image) {
        this.image = image;
      }
    }
  }
};
</script>
<style>

</style>
