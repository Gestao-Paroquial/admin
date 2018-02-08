<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Informações do Visitante</h4>
    </div>
    <div class="content">
      <form @submit="update">
        <div class="row">
          <div class="col-md-2">
            <fg-input :required="true" type="text" label="ID" :disabled="true" placeholder="id" v-model="visitante.id" />
          </div>
          <div class="col-md-5">
            <fg-input :required="true" type="text" label="Nome" placeholder="Paper dashboard" v-model="visitante.nome" />
          </div>
          <div class="col-md-4">
            <fg-input :required="true" type="email" label="Email" placeholder="Email" v-model="visitante.email" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input :required="true" type="text" label="Telefone" placeholder="Telefone" v-model="visitante.telefone" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <select-list :selectList="selectList"></select-list>
          </div>
        </div>

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
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    del() {
      if (confirm("Você tem certeza?!")) {
        axios
          .delete(`${visitantesApiUrl}/${this.visitante.id}`)
          .then(response => {
            console.log(response);
            this.$router.push({ path: "/admin/visitantes" });
          })
          .catch(err => console.log(err));
      }
    }
  }
};
</script>
<style>

</style>
