<template>
  <div class="card">
    <loader v-if="showLoader" />
    <div class="header">
      <h4 class="title">Informações do Visitante</h4>
    </div>
    <div class="content">
      <form @submit.prevent="update">
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
           <div class="col-md-6">
            <select-list :selectList="selectList" :required="true"></select-list>
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
import Loader from "./../../../UIComponents/Loader.vue";

export default {
  props: {
    visitante: Object,
    selectList: Object
  },
  components: {
    SelectList,
    Loader
  },
  data() {
    return {
      showLoader: false
    };
  },
  methods: {
    update() {
      this.showLoader = true;
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
        .then(response => {
          this.showLoader = false;
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
          .delete(`${visitantesApiUrl}/${this.visitante.id}`)
          .then(response => {
            console.log(response);
            this.showLoader = false;
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
