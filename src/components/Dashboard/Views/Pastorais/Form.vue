<template>
  <div class="card">
    <loader v-if="showLoader" />
    <div class="header">
      <h4 class="title">Informações do pastoral</h4>
    </div>
    <div class="content">
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-md-4">
            <fg-input :disabled="$route.query.delete" :required="true" type="text" label="Nome" placeholder="Nome da pastoral" v-model="pastoral.nome" />
          </div>
          <div class="col-md-4">
            <label for="">Comunidade</label>
            <v-select  v-model="pastoral.comunidade" :options="comunidadesToSelectList">
              <span slot="no-options">
                Nenhum resultado encontrado
              </span>
            </v-select>
          </div>
          <div class="col-md-4">
          <label for="">Coordenador</label>
            <v-select  v-model="pastoral.coordenador" :options="coordenadoresToSelectList">
              <span slot="no-options">
                Nenhum resultado encontrado
              </span>
            </v-select>
          </div>
        </div>
        <telefones :disabled="$route.query.delete" :telefones="pastoral.telefones" :removeTelefone="removeTelefone"/>
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
          <button class="btn btn-info btn-fill btn-wd" v-if="!this.$route.params.id">
           Adicionar
          </button>
          <button class="btn btn-warning btn-fill btn-wd" v-if="$route.query.update">
            Alterar
          </button>
          <button class="btn btn-danger btn-fill btn-wd" v-if="$route.query.delete" @click.prevent="deletePastoral">
            Deletar
          </button>
        </div>
        <div class="clearfix" />
      </form>
    </div>
  </div>
</template>
<script>
import axios from '@/plugins/axios';
import { pastoraisApiUrl, comunidadesApiUrl, membrosUrl } from '../../../../api-url/index';
import Telefones from '../../../../components/UIComponents/TelefonesInputs';

export default {
  components: { Telefones },
  props: {
    pastoral: Object,
  },
  data() {
    return {
      showLoader: false,
      comunidades: [],
      coordenadores: [],
      telefonesToDelete: [],
    };
  },
  mounted() {
    axios
      .get(comunidadesApiUrl)
      .then(({ data }) => {
        this.comunidades = data;
        return axios.get(membrosUrl);
      })
      .then(({ data }) => {
        this.coordenadores = data.filter(coordenador => coordenador.tipo_membro_id >= 0);
      });
  },
  methods: {
    handleSubmit() {
      if (this.$route.query.update) this.updatePastoral();
      if (!this.$route.params.id) this.addPastoral();
    },
    addPastoral() {
      this.showLoader = true;
      this.pastoral.comunidade_id = this.pastoral.comunidade.value;
      this.pastoral.coordenador_id = this.pastoral.coordenador.value;
      axios
        .post(pastoraisApiUrl, JSON.stringify(this.pastoral), {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(({ data }) => {
          this.showLoader = false;
          this.$notifications.notify(this.notificationConfig(data.message));
          this.$router.push({ path: '/admin/pastorais' });
        })
        .catch(error => console.log(error));
    },
    updatePastoral() {
      let dialog;
      this.$dialog
        .confirm()
        .then((dialog2) => {
          dialog = dialog2;
          return axios
            .put(`${pastoraisApiUrl}/${this.pastoral.id}`, JSON.stringify(this.pastoral), { headers: { 'Content-Type': 'application/json' } });
        }).then(({ data }) => {
          dialog.close();
          this.$notifications.notify(this.notificationConfig(data.message));
          this.deleteTelefones(this.telefonesToDelete);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletePastoral() {
      let dialog;
      this.$dialog
        .confirm()
        .then((dialog_) => {
          dialog = dialog_;
          return axios.delete(`${pastoraisApiUrl}/${this.pastoral.id}`);
        })
        .then(({ data }) => {
          dialog.close();
          this.$notifications.notify(this.notificationConfig(data.message));
          this.$router.push({ path: '/admin/pastorais' });
        })
        .catch(err => console.log(err));
    },
    removeTelefone(index) {
      if (this.pastoral.telefones[index].id) {
        this.$dialog
          .confirm('Você tem certeza?')
          .then((dialog) => {
            dialog.close();
            this.telefonesToDelete.push(this.pastoral.telefones[index]);
            this.pastoral.telefones.splice(index, 1);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.pastoral.telefones.splice(index, 1);
      }
    },
  },
  computed: {
    comunidadesToSelectList() {
      return this.arrayToSelectList(this.comunidades);
    },
    coordenadoresToSelectList() {
      return this.arrayToSelectList(this.coordenadores);
    },
  },

};
</script>
<style>

</style>
