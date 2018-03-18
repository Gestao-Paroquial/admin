<template>
  <div class="card">
    <loader v-if="showLoader" />
    <div class="header">
      <h4 class="title">Informações da comunidade</h4>
    </div>
    <div class="content">
      <form @submit.prevent="update">

        <div class="row">
          <div class="col-md-6">
            <fg-input :disabled="!$route.query.update" type="text" :required="true" label="Nome" placeholder="Nome" v-model="comunidade.nome" />
          </div>
          <div class="col-md-6">
            <fg-input :disabled="!$route.query.update" :type="'email'" :required="true" label="Email" placeholder="Email" v-model="comunidade.email" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input :disabled="!$route.query.update" type="text" :required="false" label="CNPJ" placeholder="CNPJ" v-model="comunidade.cnpj" v-mask="'##.###.###/####-##'" :pattern="'.{0}|.{18}'" :title="'Número inválido'" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input :disabled="!$route.query.update" type="text" :required="false" label="Telefone" placeholder="Telefone" v-model="comunidade.telefone" v-mask="['(##) ####-####']" :pattern="'.{0}|.{14}'" :title="'Número inválido'" />
          </div>
          <div class="col-md-6">
            <fg-input :disabled="!$route.query.update" type="text" :required="false" label="Celular" placeholder="Celular" v-model="comunidade.celular" v-mask="[ '(##) #####-####']" :pattern="'.{0}|.{15}'" :title="'Número inválido'" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <div class="form-group">
              <label>
                CEP
              </label>
              <input :disabled="!$route.query.update" class="form-control border-input" placeholder="CEP" v-model="comunidade.cep" v-mask="[ '#####-###']" :pattern="'.{9}'" :title="'Número inválido'" @change="searchCEP" required="required" type="text">
            </div>
          </div>
          <div class="col-md-5">
            <fg-input :disabled="!$route.query.update" type="text" :required="true" label="Endereço" placeholder="Endereço" v-model="comunidade.endereco" />
          </div>
          <div class="col-md-2">
            <fg-input :disabled="!$route.query.update" type="text" :required="true" label="Número" placeholder="Número" v-model="comunidade.nro" />
          </div>
          <div class="col-md-3">
            <fg-input :disabled="!$route.query.update" type="text" :required="false" label="Complemento" placeholder="Complemento" v-model="comunidade.compl" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-5">
            <fg-input :disabled="!$route.query.update" type="text" :required="true" label="Bairro" placeholder="Bairro" v-model="comunidade.bairro" />
          </div>
          <div class="col-md-5">
            <fg-input :disabled="!$route.query.update" type="text" :required="true" label="Cidade" placeholder="Cidade" v-model="comunidade.cidade" />
          </div>
          <div class="col-md-2">
            <fg-input :disabled="!$route.query.update" type="text" :required="true" label="UF" placeholder="UF" v-model="comunidade.uf" />
          </div>
        </div>

        <hr>
        <div class="text-center">
          <button class="btn btn-warning btn-fill btn-wd" v-if="$route.query.update">
            Alterar
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
import axios from 'axios';
import { comunidadesApiUrl } from '../../../../api-url/index';

export default {
  props: {
    comunidade: Object,
  },
  data() {
    return {
      showLoader: false,
    };
  },
  methods: {
    update() {
      this.$dialog
        .confirm()
        .then((dialog) => {
          axios
            .put(
              `${comunidadesApiUrl}/${this.comunidade.id}`,
              JSON.stringify(this.comunidade),
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            )
            .then((response) => {
              dialog.close();
              this.$notify({
                group: 'top-right',
                title: 'Sucesso!',
                text: 'comunidade alterado',
                type: 'success',
                speed: 1000,
              });
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          console.log('Clicked on cancel');
        });
    },
    del() {
      this.$dialog
        .confirm()
        .then((dialog) => {
          axios
            .delete(`${comunidadesApiUrl}/${this.comunidade.id}`)
            .then((response) => {
              console.log(response);
              dialog.close();
              this.$notify({
                group: 'top-right',
                title: 'Sucesso!',
                text: 'comunidade excluído',
                type: 'success',
                speed: 1000,
              });
              this.$router.push({ path: '/admin/comunidades' });
            })
            .catch(err => console.log(err));
        })
        .catch(() => {
          console.log('Clicked on cancel');
        });
    },
    searchCEP(event) {
      const cep = event.target.value.replace('-', '');

      const uri = `https://viacep.com.br/ws/${cep}/json/`;

      this.showLoader = true;

      axios
        .get(uri)
        .then(({ data }) => {
          this.comunidade.endereco = data.logradouro;
          this.comunidade.cidade = data.localidade;
          this.comunidade.uf = data.uf;
          this.comunidade.bairro = data.bairro;
        })
        .catch((error) => {
          console.log(error);
          alert('CEP INVÁLIDO');
        })
        .then(() =>
          setTimeout(() => {
            this.showLoader = false;
          }, 1000),
        );
    },
  },
};
</script>
<style>

</style>
