<template>
  <div class="card">
    <loader v-if="showLoader" />
    <div class="header">
      <h3>Adicionar Novo Membro da Pastoral</h3>
    </div>
    <div class="content">
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-md-4">
            <label>Tipo de membro</label>
            <v-select :disabled="isDelete" v-model="membro.tipo_membro" :options="tiposMembroToSelectList">
              <span slot="no-options">
                Nenhum resultado encontrado
              </span>
            </v-select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <fg-input :disabled="isDelete" type="text" :required="true" label="Nome" placeholder="Nome" v-model="membro.nome" />
          </div>
          <div class="col-md-4">
            <fg-input :disabled="isDelete" :type="'email'" :required="true" label="Email" placeholder="Email" v-model="membro.email" />
          </div>
          <div class="col-md-4">
            <fg-input :disabled="isDelete" :type="'date'" :required="true" label="Data de Nascimento" placeholder="Data de Nascimento" v-model="membro.data_Nascimento" />
          </div>
        </div>
        <h4>Informações Religiosas</h4>
        <div class="row">
          <div class="col-md-4">
            <label for="">Batizado?</label>
            <div class="">
              <label><input type="radio" v-model="membro.batizado" name="batizado" :value="0">Não</label>
            </div>
            <div class="">
              <label><input type="radio" v-model="membro.batizado" name="batizado" :value="1">Sim</label>
            </div>
          </div>
          <div class="col-md-4">
            <label for="">Crismado?</label>
            <div class="">
              <label><input type="radio" v-model="membro.crismado" name="crismado" :value="0">Não</label>
            </div>
            <div class="">
              <label><input type="radio" v-model="membro.crismado" name="crismado" :value="1">Sim</label>
            </div>
          </div>
          <div class="col-md-4">
            <label for="">1º Eucaristia?</label>
            <div class="">
              <label><input type="radio" v-model="membro['1_eucaristia']" name="1_eucaristia" :value="0">Não</label>
            </div>
            <div class="">
              <label><input type="radio" v-model="membro['1_eucaristia']" name="1_eucaristia" :value="1">Sim</label>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <label for="">Comunidades que participa</label>
            <v-select :disabled="isDelete" v-model="membro.comunidades" :options="comunidadesToSelectList" multiple>
              <span slot="no-options">
                Nenhum resultado encontrado
              </span>
            </v-select>
          </div>
          <div class="col-md-6">
            <label for="">Pastorais que participa</label>
            <v-select :disabled="isDelete" v-model="membro.pastorais" :options="pastoraisToSelectList" multiple>
              <span slot="no-options">
                Nenhum resultado encontrado
              </span>
            </v-select>
          </div>
        </div>
        <telefones :disabled="isDelete" :telefones="membro.telefones" :removeTelefone="removeDependenteOuTelefone"/>
        <h4>Endereço</h4>
        <div class="row">
          <div class="col-md-2">
            <div class="form-group">
              <label>
                CEP
              </label>
              <input class="form-control border-input" placeholder="CEP" v-model="membro.cep" v-mask="[ '#####-###']" :pattern="'.{9}'" :title="'Número inválido'" @change="searchCEP" required="required" type="text" :disabled="isDelete">
            </div>
          </div>
          <div class="col-md-5">
            <fg-input :disabled="isDelete" type="text" :required="true" label="Endereço" placeholder="Endereço" v-model="membro.endereco" />
          </div>
          <div class="col-md-2">
            <fg-input :disabled="isDelete" type="text" :required="true" label="Número" placeholder="Número" v-model="membro.nro" />
          </div>
          <div class="col-md-3">
            <fg-input :disabled="isDelete" type="text" :required="false" label="Complemento" placeholder="Complemento" v-model="membro.compl" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-5">
            <fg-input :disabled="isDelete" type="text" :required="true" label="Bairro" placeholder="Bairro" v-model="membro.bairro" />
          </div>
          <div class="col-md-5">
            <fg-input :disabled="isDelete" type="text" :required="true" label="Cidade" placeholder="Cidade" v-model="membro.cidade" />
          </div>
          <div class="col-md-2">
            <fg-input :disabled="isDelete" type="text" :required="true" label="UF" placeholder="UF" v-model="membro.uf" />
          </div>
        </div>

        <h4>Dependentes
          <button @click="addDependente" class="btn" type="button" v-if="!isDelete">
            <i aria-hidden="true" class="fa fa-plus"></i>
          </button>
        </h4>
        <transition-group name="list">
          <div class="row" v-for="(dependente, index) in membro.dependentes" :key="index">
            <div class="col-md-3">
              <label>Dependente</label>
              <v-select :disabled="isDelete" v-model="dependente.tipo_dependente" :options="tiposDependenteToSelectList">
                <span slot="no-options">
                  Nenhum resultado encontrado
                </span>
              </v-select>
            </div>
            <transition name="list">
              <div class="col-md-3" v-if="dependente.tipo_dependente">
                <fg-input :disabled="isDelete" type="text" :required="true" :label="`Nome ${dependente.tipo_dependente? dependente.tipo_dependente.label: ''}`" placeholder="Nome do dependente" v-model="dependente.nome" />
              </div>
            </transition>
            <transition name="list">
              <div class="col-md-3" v-if="dependente.tipo_dependente">
                <fg-input :disabled="isDelete" type="date" :required="true" :label="`Data de Nascimento ${dependente.tipo_dependente? dependente.tipo_dependente.label: ''}`" placeholder="Data de Nascimento" v-model="dependente.data_Nascimento" />
              </div>
            </transition>
            <div class="col-md-3" v-if="!isDelete">
              <label for="">Remover</label>
              <br>
              <button class="btn" @click="removeDependenteOuTelefone(index, 'dependentes')" type="button">
                <i aria-hidden="true" class="fa fa-minus"></i>
              </button>
            </div>
          </div>
        </transition-group>
        <hr>
        <div class="text-center">
          <button class="btn btn-info btn-fill btn-wd" v-if="!this.$route.params.id">
            Adicionar
          </button>
          <button class="btn btn-warning btn-fill btn-wd" v-if="isUpdate">
            Alterar Membro
          </button>
          <button class="btn btn-danger btn-fill btn-wd" @click.prevent="deleteMembro" v-if="isDelete">
            Deletar
          </button>
        </div>
        <div class="clearfix" />
      </form>
    </div>
  </div>
</template>
<script>
import cepPromise from 'cep-promise';
import axios from '@/plugins/axios';
import {
  membrosUrl,
  dependentesUrl,
} from '../../../../api-url/index';
import Telefones from '../../../UIComponents/TelefonesInputs';

export default {
  components: {
    Telefones,
  },
  props: {
    membro: Object,
    isUpdate: [Boolean, String],
    isDelete: [Boolean, String],
    tiposMembro: Array,
    comunidades: Array,
    pastorais: Array,
    tiposDependente: Array,
  },
  data() {
    return {
      showLoader: false,
      firstName: '',
      dependentesToDelete: [],
      telefonesToDelete: [],
    };
  },
  computed: {
    tiposMembroToSelectList() {
      return this.arrayToSelectList(this.tiposMembro, 'descricao');
    },
    tiposDependenteToSelectList() {
      return this.arrayToSelectList(this.tiposDependente, 'descricao');
    },
    comunidadesToSelectList() {
      return this.arrayToSelectList(this.comunidades);
    },
    pastoraisToSelectList() {
      return this.pastorais.map(pastoral => ({ label: `${pastoral.nome} ${pastoral.id}`, value: pastoral.id }));
    },
  },
  methods: {
    prepareMembro() {
      this.membro.tipo_membro_id = this.membro.tipo_membro.value;

      this.membro.dependentes = this.membro.dependentes
        .filter(dependente => dependente.tipo_dependente)
        .map(dependente => Object.assign(dependente, { tipo_dependente_id: dependente.tipo_dependente.value }));

      this.membro.comunidades.forEach(comunidade => Object.assign(comunidade, { comunidade_id: comunidade.value }));

      this.membro.pastorais.forEach(pastoral => Object.assign(pastoral, { pastorai_id: pastoral.value }));
    },
    handleSubmit() {
      if (!this.$route.params.id) this.addMembro();
      if (this.isUpdate) this.updateMembro();
    },
    addMembro() {
      this.showLoader = true;
      this.prepareMembro();
      axios
        .post(membrosUrl, JSON.stringify(this.membro), { headers: { 'Content-Type': 'application/json' } })
        .then(({ data }) => {
          this.$notifications.notify(this.notificationConfig(data.message));
          this.$router.push({ path: '/admin/membros' });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => { this.showLoader = false; });
    },
    updateMembro() {
      let dialog;
      this.prepareMembro();
      this.$dialog
        .confirm()
        .then((dialog_) => {
          dialog = dialog_;
          return axios
            .put(`${membrosUrl}/${this.membro.id}`, JSON.stringify(this.membro), { headers: { 'Content-Type': 'application/json' } });
        })
        .then(({ data }) => {
          dialog.close();
          this.$notifications.notify(this.notificationConfig(data.message));
          this.deleteDependentes();
          this.deleteTelefones(this.telefonesToDelete);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteDependentes() {
      this.dependentesToDelete.forEach((dependente) => {
        axios.delete(`${dependentesUrl}/${dependente.id}`)
          .then(({ data }) => {
            this.$notifications.notify(this.notificationConfig(data.message));
          });
      });
    },
    deleteMembro() {
      let dialog;
      this.$dialog
        .confirm()
        .then((dialog_) => {
          dialog = dialog_;
          return axios
            .delete(`${membrosUrl}/${this.membro.id}`);
        })
        .then(({ data }) => {
          dialog.close();
          this.$notifications.notify(this.notificationConfig(data.message));
          this.$router.push({ path: '/admin/membros' });
        })
        .catch(err => console.log(err));
    },
    searchCEP(event) {
      const cep = event.target.value;
      this.showLoader = true;
      cepPromise(cep)
        .then((data) => {
          this.membro.endereco = data.street;
          this.membro.cidade = data.city;
          this.membro.uf = data.state;
          this.membro.bairro = data.neighborhood;
        })
        .catch(() => {
          this.$notifications.notify(
            this.notificationConfig(
              'O CEP fornecido não foi encontrado na base do correio',
              'danger',
            ),
          );
        })
        .finally(() => { this.showLoader = false; });
    },
    addTelefone() {
      this.membro.telefones.push({});
    },
    addDependente() {
      this.membro.dependentes.push({});
    },
    removeDependenteOuTelefone(index, telefoneOrDependente = '') {
      if (!telefoneOrDependente.match(/telefones|dependentes/g)) throw new Error('telefone ou dependente deve ser passado no plural');

      if (this.membro[telefoneOrDependente][index].id) {
        this.$dialog
          .confirm('Você tem certeza?')
          .then((dialog) => {
            dialog.close();
            this[`${telefoneOrDependente}ToDelete`].push(this.membro[telefoneOrDependente][index]);
            this.membro[telefoneOrDependente].splice(index, 1);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.membro[telefoneOrDependente].splice(index, 1);
      }
    },
  },
};
</script>
<style>
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
