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

        <h4>Telefones
          <button @click="addTelefone" class="btn" type="button" v-if="!isDelete">
            <i aria-hidden="true" class="fa fa-plus"></i>
          </button>
        </h4>
        <div class="row telefone-row">
          <transition-group name="list" tag="div">
            <div class="col-md-4" v-for="(telefone, index) in membro.telefones" :key="index">
              <fg-input :disabled="isDelete" type="text" :required="true" label="Número" placeholder="Número" v-model="telefone.telefone" v-mask="['(##) ####-####', '(##) #####-####']" :pattern="'.{14}|.{15}'" :title="'Número inválido'" />
              <button class="btn" @click="removeDependenteOuTelefone(index, 'telefones')" type="button" v-if="!isDelete">
                <i aria-hidden="true" class="fa fa-minus"></i>
              </button>
            </div>
          </transition-group>
        </div>

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
  tiposMembroUrl,
  comunidadesApiUrl,
  pastoraisApiUrl,
  tiposDependenteUrl,
  dependentesUrl,
  telefonesUrl,
} from '../../../../api-url/index';

export default {
  props: {
    membro: Object,
    isUpdate: Boolean,
    isDelete: Boolean,
  },
  data() {
    return {
      showLoader: false,
      firstName: '',
      tiposMembro: [],
      comunidades: [],
      pastorais: [],
      tiposDependente: [],
      dependentesToDelete: [],
      telefonesToDelete: [],
    };
  },
  mounted() {
    this.showLoader = true;

    axios.get(tiposMembroUrl)
      .then(({ data }) => {
        this.tiposMembro = data;
        const foo = this.tiposMembro.find(tipoMembro => tipoMembro.id === this.membro.tipo_membro_id);
        if (foo) {
          this.membro.tipo_membro = {
            label: foo.descricao,
            value: this.membro.tipo_membro_id,
          };
        }
        return axios.get(tiposDependenteUrl);
      })
      .then(({ data }) => {
        this.tiposDependente = data;

        if (this.$route.params.id) {
          this.membro.dependentes.forEach((dependente) => {
            const { descricao } = this.tiposDependente.find(tipo => tipo.id === dependente.tipo_dependente_id);
            Object.assign(dependente, { tipo_dependente: { label: descricao, value: dependente.id } });
          });
        }
        return axios.get(comunidadesApiUrl);
      })
      .then(({ data }) => {
        this.comunidades = data;
        return axios.get(pastoraisApiUrl);
      })
      .then(({ data }) => {
        this.pastorais = data;
        this.showLoader = false;
      });
  },
  computed: {
    tiposMembroToSelectList() {
      return this.tiposMembro.map(tipoMembro => ({ label: tipoMembro.descricao, value: tipoMembro.id }));
    },
    tiposDependenteToSelectList() {
      return this.tiposDependente.map(tipoDependente => ({ label: tipoDependente.descricao, value: tipoDependente.id }));
    },
    comunidadesToSelectList() {
      return this.comunidades.map(comunidade => ({ label: comunidade.nome, value: comunidade.id }));
    },
    pastoraisToSelectList() {
      return this.pastorais.map(pastoral => ({ label: `${pastoral.nome} ${pastoral.id}`, value: pastoral.id }));
    },
  },
  methods: {
    handleSubmit() {
      if (!this.$route.params.id) this.addMembro();
      if (this.isUpdate) this.updateMembro();
    },
    addMembro() {
      this.membro.tipo_membro_id = this.membro.tipo_membro.value;

      this.membro.dependentes = this.membro.dependentes
        .filter(dependente => dependente.tipo_dependente)
        .map(dependente => Object.assign(dependente, { tipo_dependente_id: dependente.tipo_dependente.value }));

      this.membro.comunidades.forEach(comunidade => Object.assign(comunidade, { comunidade_id: comunidade.value }));

      this.membro.pastorais.forEach(pastoral => Object.assign(pastoral, { pastorai_id: pastoral.value }));

      this.showLoader = true;
      axios
        .post(membrosUrl, JSON.stringify(this.membro), { headers: { 'Content-Type': 'application/json' } })
        .then(({ data }) => {
          this.$notifications.notify(this.notificationConfig(data.message));
          this.$router.push({ path: '/admin/membros' });
          this.showLoader = false;
        })
        .catch((error) => {
          this.showLoader = false;
          console.log(error);
        });
    },
    updateMembro() {
      let dialog;

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
          this.showLoader = false;
        })
        .catch(() => {
          this.$notifications.notify(
            this.notificationConfig(
              'O CEP fornecido não foi encontrado na base do correio',
              'danger',
            ),
          );
          this.showLoader = false;
        });
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
.telefone-row {
  padding: 15px;
}
.telefone-row [class*="col-"] {
  padding-left: 5px !important;
  padding-right: 5px !important;
}
.telefone-row .form-group {
  display: inline-block;
}
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
