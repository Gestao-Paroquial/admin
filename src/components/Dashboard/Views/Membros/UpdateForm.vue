<template>
  <div class="card">
    <loader v-if="showLoader" />
    <div class="header">
      <h4 class="title">Informações da membro</h4>
    </div>
    <div class="content">
      <form @submit.prevent="update">
        <div class="row">
          <div class="col-md-6">
            <fg-input :disabled="$route.query.delete" type="text" :required="true" label="Nome" placeholder="Nome" v-model="membro.nome" />
          </div>
          <div class="col-md-6">
            <fg-input :disabled="$route.query.delete" :type="'email'" :required="true" label="Email" placeholder="Email" v-model="membro.email" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <select-list :disabled="$route.query.delete" :selectList="selectList" :required="true"></select-list>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input :disabled="$route.query.delete" type="text" :required="false" label="Telefone" placeholder="Telefone" v-model="membro.telefone" v-mask="['(##) ####-####']" :pattern="'.{0}|.{14}'" :title="'Número inválido'" />
          </div>
          <div class="col-md-6">
            <fg-input :disabled="$route.query.delete" type="text" :required="false" label="Celular" placeholder="Celular" v-model="membro.celular" v-mask="[ '(##) #####-####']" :pattern="'.{0}|.{15}'" :title="'Número inválido'" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <div class="form-group">
              <label>
                CEP
              </label>
              <input class="form-control border-input" placeholder="CEP" v-model="membro.cep" v-mask="[ '#####-###']" :pattern="'.{9}'" :title="'Número inválido'" :disabled="$route.query.delete" @change="searchCEP" required="required" type="text">
            </div>
          </div>
          <div class="col-md-5">
            <fg-input :disabled="$route.query.delete" type="text" :required="true" label="Endereço" placeholder="Endereço" v-model="membro.endereco" />
          </div>
          <div class="col-md-2">
            <fg-input :disabled="$route.query.delete" type="text" :required="true" label="Número" placeholder="Número" v-model="membro.nro" />
          </div>
          <div class="col-md-3">
            <fg-input :disabled="$route.query.delete" type="text" :required="false" label="Complemento" placeholder="Complemento" v-model="membro.compl" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-5">
            <fg-input :disabled="$route.query.delete" type="text" :required="true" label="Bairro" placeholder="Bairro" v-model="membro.bairro" />
          </div>
          <div class="col-md-5">
            <fg-input :disabled="$route.query.delete" type="text" :required="true" label="Cidade" placeholder="Cidade" v-model="membro.cidade" />
          </div>
          <div class="col-md-2">
            <fg-input :disabled="$route.query.delete" type="text" :required="true" label="UF" placeholder="UF" v-model="membro.uf" />
          </div>
        </div>
        <hr>
        <div class="text-center">
          <button class="btn btn-info btn-fill btn-wd" v-if="$route.query.update">
            Update Profile
          </button>
          <button class="btn btn-danger btn-fill btn-wd" @click.prevent="del" v-if="$route.query.delete">
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
import SelectList from '@/components/UIComponents/Forms/SelectList';
import { membrosUrl } from '../../../../api-url/index';

export default {
  props: {
    membro: Object,
    selectList: Object,
  },
  components: {
    SelectList,
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
              `${membrosUrl}/${this.membro.id}`,
              JSON.stringify(this.membro),
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
                text: 'Membro alterado',
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
            .delete(`${membrosUrl}/${this.membro.id}`)
            .then((response) => {
              console.log(response);
              dialog.close();
              this.$notify({
                group: 'top-right',
                title: 'Sucesso!',
                text: 'Membro excluído',
                type: 'success',
                speed: 1000,
              });
              this.$router.push({ path: '/admin/membros-pastorais' });
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
          this.membro.endereco = data.logradouro;
          this.membro.cidade = data.localidade;
          this.membro.uf = data.uf;
          this.membro.bairro = data.bairro;
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
