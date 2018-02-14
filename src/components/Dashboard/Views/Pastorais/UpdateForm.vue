<template>
  <div class="card">
    <loader v-if="showLoader" />
    <div class="header">
      <h4 class="title">Informações do pastoral</h4>
    </div>
    <div class="content">
      <form @submit.prevent="update">
        <div class="row">
          <div class="col-md-2">
            <fg-input :required="true" type="text" label="ID" :disabled="true" placeholder="id" v-model="pastoral.id" />
          </div>
          <div class="col-md-5">
            <fg-input :required="true" type="text" label="Nome" placeholder="Paper dashboard" v-model="pastoral.nome" />
          </div>
          <div class="col-md-4">
            <select-list :selectList="selectList" :required="true"></select-list>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Descrição</label>
              <textarea rows="5" class="form-control border-input" placeholder="Descrição da pastoral" v-model="pastoral.descricao" />
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
import { pastoraisApiUrl } from "../../../../api-url/index";

export default {
  props: {
    pastoral: Object,
    selectList: Object
  },
  components: {
    SelectList
  },
  data() {
    return {
      showLoader: false
    };
  },
  methods: {
    update() {
      this.showLoader = true;
      this.pastoral.comunidades_id = document.querySelector(
        '[name="comunidades_id"]'
      ).value;

      axios
        .put(
          `${pastoraisApiUrl}/${this.pastoral.id}`,
          JSON.stringify(this.pastoral),
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
            text: "pastoral alterado",
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
          .delete(`${pastoraisApiUrl}/${this.pastoral.id}`)
          .then(response => {
            console.log(response);
            this.showLoader = false;
            this.$notify({
              group: "top-right",
              title: "Sucesso!",
              text: "pastoral excluído",
              type: "success",
              speed: 1000
            });
            this.$router.push({ path: "/admin/pastorais" });
          })
          .catch(err => console.log(err));
      }
    }
  }
};
</script>
<style>

</style>
