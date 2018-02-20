<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Informações do Visitante</h4>
    </div>
    <div class="content">
      <form @submit.prevent="update">
        <div class="row">
          <div class="col-md-6">
            <fg-input :disabled="$route.query.delete" :required="true" type="text" label="Nome" placeholder="Paper dashboard" v-model="visitante.nome" />
          </div>
          <div class="col-md-6">
            <fg-input :disabled="$route.query.delete " :required="true" type="email" label="Email" placeholder="Email" v-model="visitante.email" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input :disabled="$route.query.delete" :required="true" type="text" label="Telefone" placeholder="Telefone" v-model="visitante.telefone" />
          </div>
          <div class="col-md-6">
            <select-list :selectList="selectList" :required="true" :disabled="$route.query.delete"></select-list>
          </div>
        </div>
        <hr>
        <div class="text-center">
          <button class="btn btn-info btn-fill btn-wd" v-if="$route.query.update">
            Update Profile
          </button>

          <button class="btn btn-danger btn-fill btn-wd" @click.prevent="del" v-if="$route.query.delete">
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
import { visitantesApiUrl } from "../../../../api-url/index";

export default {
  props: {
    visitante: Object,
    selectList: Object
  },
  components: {
    SelectList
  },
  methods: {
    update() {
      this.visitante.comunidades_id = document.querySelector(
        '[name="comunidades_id"]'
      ).value;

      this.$dialog
        .confirm()
        .then(dialog => {
          axios
            .put(
              `${visitantesApiUrl}/${this.visitante.id}`,
              JSON.stringify(this.visitante),
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
                text: "Visitante alterado",
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
            .delete(`${visitantesApiUrl}/${this.visitante.id}`)
            .then(response => {
              console.log(response);
              dialog.close();
              this.$notify({
                group: "top-right",
                title: "Sucesso!",
                text: "Visitante excluído",
                type: "success",
                speed: 1000
              });
              this.$router.push({ path: "/admin/visitantes" });
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
