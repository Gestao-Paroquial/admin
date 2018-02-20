<template>
  <div class="card">
    <loader v-if="showLoader" />
    <div class="header">
      <h4 class="title">Informações da mensagemParoco</h4>
    </div>
    <div class="content">
      <form @submit.prevent="update">

        <div class="row">
          <div class="col-md-4">
            <fg-input :disabled="$route.query.delete" type="text" :required="true" label="Título" placeholder="Nome" v-model="mensagemParoco.titulo" />
          </div>
          <div class="col-md-4">
            <fg-input :disabled="$route.query.delete" :type="'text'" :required="true" label="Subtítulo" placeholder="Email" v-model="mensagemParoco.subtitulo" />
          </div>
          <div class="col-md-4">
            <fg-input :disabled="$route.query.delete" type="url" :required="false" label="Link" placeholder="Link" v-model="mensagemParoco.link" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <vue-editor v-model="mensagemParoco.mensagem" :disabled="$route.query.delete"></vue-editor>
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
</template>
<script>
import axios from "axios";
import SelectList from "components/UIComponents/Forms/SelectList.vue";
import { mensagensParocoApiUrl } from "../../../../api-url/index";
import { VueEditor } from "vue2-editor";
export default {
  components: { VueEditor },
  props: {
    mensagemParoco: Object
  },
  data() {
    return {
      showLoader: false
    };
  },
  methods: {
    update() {
      this.$dialog
        .confirm()
        .then(dialog => {
          axios
            .put(
              `${mensagensParocoApiUrl}/${this.mensagemParoco.id}`,
              JSON.stringify(this.mensagemParoco),
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
    },
    del() {
      this.$dialog
        .confirm()
        .then(dialog => {
          axios
            .delete(`${mensagensParocoApiUrl}/${this.mensagemParoco.id}`)
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
              this.$router.push({ path: "/admin/mensagens-paroco" });
            })
            .catch(err => console.log(err));
        })
        .catch(function() {
          console.log("Clicked on cancel");
        });
    }
  }
};
</script>
<style>

</style>
