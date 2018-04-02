<template>
  <div class="card">
    <loader v-if="showLoader" />
    <div class="header">
      <h4 class="title">Informações da comunidade</h4>
    </div>
    <div class="content">
      <form @submit.prevent="handleSubmit">

        <div class="row">
          <div class="col-md-6">
            <fg-input :disabled="$route.query.delete" type="text" :required="true" label="Nome" placeholder="Nome" v-model="comunidade.nome" />
          </div>
          <div class="col-md-6">
            <fg-input :disabled="$route.query.delete" :type="'email'" :required="true" label="Email" placeholder="Email" v-model="comunidade.email" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input :disabled="$route.query.delete" type="text" :required="false" label="CNPJ" placeholder="CNPJ" v-model="comunidade.cnpj" v-mask="'##.###.###/####-##'" :pattern="'.{0}|.{18}'" :title="'Número inválido'" />
          </div>
        </div>

        <h4>Telefones
          <button @click="addTelefone" class="btn" type="button" v-if="!$route.query.delete">
            <i aria-hidden="true" class="fa fa-plus"></i>
          </button>
        </h4>
        <div class="row telefone-row">
          <transition-group name="list" tag="div">
            <div class="col-md-4" v-for="(telefone, index) in comunidade.telefones" :key="index">
              <fg-input :disabled="$route.query.delete" type="text" :required="true" label="Número" placeholder="Número" v-model="telefone.telefone" v-mask="['(##) ####-####', '(##) #####-####']" :pattern="'.{14}|.{15}'" :title="'Número inválido'" />
              <button class="btn" @click="removeTelefone(index)" type="button" v-if="!$route.query.delete">
                <i aria-hidden="true" class="fa fa-minus"></i>
              </button>
            </div>
          </transition-group>
        </div>

        <div class="row">
          <div class="col-md-2">
            <div class="form-group">
              <label>
                CEP
              </label>
              <input :disabled="$route.query.delete" class="form-control border-input" placeholder="CEP" v-model="comunidade.cep" v-mask="[ '#####-###']" :pattern="'.{9}'" :title="'Número inválido'" @change="searchCEP" required="required" type="text">
            </div>
          </div>
          <div class="col-md-5">
            <fg-input :disabled="$route.query.delete" type="text" :required="true" label="Endereço" placeholder="Endereço" v-model="comunidade.endereco" />
          </div>
          <div class="col-md-2">
            <fg-input :disabled="$route.query.delete" type="text" :required="true" label="Número" placeholder="Número" v-model="comunidade.nro" />
          </div>
          <div class="col-md-3">
            <fg-input :disabled="$route.query.delete" type="text" :required="false" label="Complemento" placeholder="Complemento" v-model="comunidade.compl" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-5">
            <fg-input :disabled="$route.query.delete" type="text" :required="true" label="Bairro" placeholder="Bairro" v-model="comunidade.bairro" />
          </div>
          <div class="col-md-5">
            <fg-input :disabled="$route.query.delete" type="text" :required="true" label="Cidade" placeholder="Cidade" v-model="comunidade.cidade" />
          </div>
          <div class="col-md-2">
            <fg-input :disabled="$route.query.delete" type="text" :required="true" label="UF" placeholder="UF" v-model="comunidade.uf" />
          </div>
        </div>

        <hr>
        <div class="text-center">
          <button class="btn btn-info btn-fill btn-wd" v-if="!$route.params.id">
            Adicionar
          </button>
          <button class="btn btn-warning btn-fill btn-wd" v-if="$route.query.update">
            Alterar
          </button>
          <button class="btn btn-danger btn-fill btn-wd" v-if="$route.query.delete" @click.prevent="deleteComunidade">
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
import { comunidadesApiUrl } from '../../../../api-url/index';

export default {
  props: {
    comunidade: Object,
  },
  data() {
    return {
      showLoader: false,
      telefonesToDelete: [],
    };
  },
  methods: {
    addTelefone() {
      this.comunidade.telefones.push({});
    },
    removeTelefone(index) {
      if (this.comunidade.telefones[index].id) {
        this.$dialog
          .confirm('Você tem certeza?')
          .then((dialog) => {
            dialog.close();
            this.telefonesToDelete.push(this.comunidade.telefones[index]);
            this.comunidade.telefones.splice(index, 1);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.comunidade.telefones.splice(index, 1);
      }
    },
    handleSubmit() {
      if (!this.$route.params.id) this.addComunidade();
      if (this.$route.query.update) this.updateComunidade();
    },
    addComunidade() {
      this.showLoader = true;
      axios
        .post(comunidadesApiUrl, JSON.stringify(this.comunidade), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(({ data }) => {
          this.showLoader = false;
          this.$notifications.notify(this.notificationConfig(data.message));
          this.$router.push({ path: '/admin/comunidades' });
        })
        .catch(error => console.log(error));
    },
    updateComunidade() {
      let dialog;
      this.$dialog
        .confirm()
        .then((dialog2) => {
          dialog = dialog2;
          return axios
            .put(`${comunidadesApiUrl}/${this.comunidade.id}`, JSON.stringify(this.comunidade), { headers: { 'Content-Type': 'application/json' } });
        }).then(({ data }) => {
          dialog.close();
          this.$notifications.notify(this.notificationConfig(data.message));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteComunidade() {
      let dialog;
      this.$dialog
        .confirm()
        .then((dialog2) => {
          dialog = dialog2;
          return axios
            .delete(`${comunidadesApiUrl}/${this.comunidade.id}`);
        })
        .then(({ data }) => {
          dialog.close();
          this.$notifications.notify(this.notificationConfig(data.message));
          this.$router.push({ path: '/admin/comunidades' });
        }).catch(err => console.log(err));
    },
    searchCEP() {
      this.showLoader = true;
      const cep = event.target.value;
      cepPromise(cep)
        .then((data) => {
          this.comunidade.endereco = data.street;
          this.comunidade.cidade = data.city;
          this.comunidade.uf = data.state;
          this.comunidade.bairro = data.neighborhood;
          this.showLoader = false;
        })
        .catch(() => {
          this.$notifications.notify(this.notificationConfig('O CEP fornecido não foi encontrado na base do correio', 'danger'));
          this.showLoader = false;
        });
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
