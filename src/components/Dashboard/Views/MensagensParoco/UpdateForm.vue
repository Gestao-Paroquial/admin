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
            <fg-input type="text" :required="true" label="Título" placeholder="Nome" v-model="mensagemParoco.titulo" />
          </div>
          <div class="col-md-4">
            <fg-input :type="'text'" :required="true" label="Subtítulo" placeholder="Email" v-model="mensagemParoco.subtitulo" />
          </div>
          <div class="col-md-4">
            <fg-input type="url" :required="false" label="Link" placeholder="Link" v-model="mensagemParoco.link" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Mensagem</label>
              <textarea required rows="5" class="form-control border-input" placeholder="Mensagem" v-model="mensagemParoco.mensagem" />
            </div>
          </div>
        </div>

        <hr>
        <div class="text-center">
          <button class="btn btn-info btn-fill btn-wd">
            Update Profile
          </button>
          <hr>
          <button class="btn btn-danger btn-fill btn-wd" @click.prevent="del">
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

export default {
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
          this.showLoader = false;
          this.$notify({
            group: "top-right",
            title: "Sucesso!",
            text: "mensagemParoco alterado",
            type: "success",
            speed: 1000
          });
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    del() {
      if (confirm("Você tem certeza?!")) {
        this.showLoader = true;
        axios
          .delete(`${mensagensParocoApiUrl}/${this.mensagemParoco.id}`)
          .then(response => {
            console.log(response);
            this.showLoader = false;
            this.$notify({
              group: "top-right",
              title: "Sucesso!",
              text: "mensagemParoco excluído",
              type: "success",
              speed: 1000
            });
            this.$router.push({ path: "/admin/mensagens-paroco" });
          })
          .catch(err => console.log(err));
      }
    }
  }
};
</script>
<style>

</style>
