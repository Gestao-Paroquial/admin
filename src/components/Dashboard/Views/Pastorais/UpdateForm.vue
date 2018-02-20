<template>
  <div class="card">
    <loader v-if="showLoader" />
    <div class="header">
      <h4 class="title">Informações do pastoral</h4>
    </div>
    <div class="content">
      <form @submit.prevent="update">
        <div class="row">
          <div class="col-md-6">
            <fg-input :disabled="$route.query.delete" :required="true" type="text" label="Nome" placeholder="Paper dashboard" v-model="pastoral.nome" />
          </div>
          <div class="col-md-6">
            <select-list :selectList="selectList" :disabled="$route.query.delete" :required="true"></select-list>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Descrição</label>
              <textarea rows="5" class="form-control border-input" placeholder="Descrição da pastoral" v-model="pastoral.descricao" :disabled="$route.query.delete" />
            </div>
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
      this.$dialog
        .confirm()
        .then(dialog => {
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
              dialog.close();
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
            .delete(`${pastoraisApiUrl}/${this.pastoral.id}`)
            .then(response => {
              console.log(response);
              dialog.close();
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
