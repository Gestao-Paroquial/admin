<template>
  <div class="card">
    <loader v-if="showLoader" />
    <div class="header">
      <h4 class="title">Adicionar Novo Membro da Pastoral</h4>
    </div>
    <div class="content">
      <form @submit.prevent="add">
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text" :required="true" label="Nome" placeholder="Nome" v-model="membroPastoral.nome" />
          </div>
          <div class="col-md-6">
            <fg-input :type="'email'" :required="true" label="Email" placeholder="Email" v-model="membroPastoral.email" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <select-list :selectList="selectList" :required="true"></select-list>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input type="text" :required="false" label="Telefone" placeholder="Telefone" v-model="membroPastoral.telefone" v-mask="['(##) ####-####']" :pattern="'.{0}|.{14}'" :title="'Número inválido'" />
          </div>
          <div class="col-md-6">
            <fg-input type="text" :required="false" label="Celular" placeholder="Celular" v-model="membroPastoral.celular" v-mask="[ '(##) #####-####']" :pattern="'.{0}|.{15}'" :title="'Número inválido'" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <div class="form-group">
              <label>
                CEP
              </label>
              <input class="form-control border-input" placeholder="CEP" v-model="membroPastoral.cep" v-mask="[ '#####-###']" :pattern="'.{9}'" :title="'Número inválido'" @change="searchCEP" required="required" type="text">
            </div>
          </div>
          <div class="col-md-5">
            <fg-input type="text" :required="true" label="Endereço" placeholder="Endereço" v-model="membroPastoral.endereco" />
          </div>
          <div class="col-md-2">
            <fg-input type="text" :required="true" label="Número" placeholder="Número" v-model="membroPastoral.nro" />
          </div>
          <div class="col-md-3">
            <fg-input type="text" :required="false" label="Complemento" placeholder="Complemento" v-model="membroPastoral.compl" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-5">
            <fg-input type="text" :required="true" label="Bairro" placeholder="Bairro" v-model="membroPastoral.bairro" />
          </div>
          <div class="col-md-5">
            <fg-input type="text" :required="true" label="Cidade" placeholder="Cidade" v-model="membroPastoral.cidade" />
          </div>
          <div class="col-md-2">
            <fg-input type="text" :required="true" label="UF" placeholder="UF" v-model="membroPastoral.uf" />
          </div>
        </div>

        <hr>
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
import axios from 'axios';
import SelectList from '@/components/UIComponents/Forms/SelectList';
import { membrosPastoraisApiUrl } from '../../../../api-url/index';

export default {
  props: {
    membroPastoral: Object,
    selectList: Object,
  },
  components: {
    SelectList,
  },
  data() {
    return {
      showLoader: false,
      firstName: '',
    };
  },
  methods: {
    add() {
      this.showLoader = true;
      this.membroPastoral.pastorais_id = document.querySelector(
        '[name="pastorais_id"]',
      ).value;

      axios
        .post(membrosPastoraisApiUrl, JSON.stringify(this.membroPastoral), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response);
          this.showLoader = false;
          this.$notify({
            group: 'top-right',
            title: 'Sucesso!',
            text: 'membroPastoral inserido com sucesso',
            type: 'success',
            speed: 1000,
          });
          this.$router.push({ path: '/admin/membros-pastorais' });
        })
        .catch(error => console.log(error));
    },
    searchCEP(event) {
      const cep = event.target.value.replace('-', '');

      const uri = `https://viacep.com.br/ws/${cep}/json/`;

      this.showLoader = true;

      axios
        .get(uri)
        .then(({ data }) => {
          this.membroPastoral.endereco = data.logradouro;
          this.membroPastoral.cidade = data.localidade;
          this.membroPastoral.uf = data.uf;
          this.membroPastoral.bairro = data.bairro;
        })
        .catch((error) => {
          console.log(error);
          alert('CEP INVÁLIDO');
        })
        .then(() => {
          this.showLoader = false;
        });
    },
  },
};
</script>
<style>

</style>
