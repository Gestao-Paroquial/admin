<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Adicionar Novo Visitante</h4>
    </div>
    <div class="content">
      <form @submit="add">
        <div class="row">
          <div class="col-md-5">
            <fg-input type="text" :required="true" label="Nome" placeholder="nome" v-model="visitante.nome" />
          </div>
          <div class="col-md-4">
            <fg-input :type="'email'" :required="true" label="Email" placeholder="Email" v-model="visitante.email" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input type="text" :required="true" label="Telefone" placeholder="Telefone" v-model="visitante.telefone" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <select-list :selectList="selectList" :required="true"></select-list>
          </div>
        </div>

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
    add() {
      this.visitante.comunidades_id = document.querySelector(
        '[name="comunidades_id"]'
      ).value;

      axios
        .post(visitantesApiUrl, JSON.stringify(this.visitante), {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => this.$router.push({ path: "/admin/visitantes" }))
        .catch(error => console.log(error));
    }
  }
};
</script>
<style>

</style>
