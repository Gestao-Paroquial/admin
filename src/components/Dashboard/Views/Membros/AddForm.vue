<template>
  <div class="card">
    <loader v-if="showLoader" />
    <div class="header">
      <h3>Adicionar Novo Membro da Pastoral</h3>
    </div>
    <div class="content">
      <form @submit.prevent="add">
        <div class="row">
          <div class="col-md-3">
            <label>Tipo de membro</label>
            <v-select v-model="membro.tipo_membro_id" :options="tiposMembroToSelectList">
              <span slot="no-options">
                Nenhum resultado encontrado
              </span>
            </v-select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <fg-input type="text" :required="true" label="Nome" placeholder="Nome" v-model="membro.nome" />
          </div>
          <div class="col-md-4">
            <fg-input :type="'email'" :required="true" label="Email" placeholder="Email" v-model="membro.email" />
          </div>
          <div class="col-md-4">
            <fg-input :type="'date'" :required="true" label="Data de Nascimento" placeholder="Data de Nascimento" v-model="membro.data_Nascimento" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <fg-input type="text" :required="true" label="Nome do Pai" placeholder="Nome do Pai" v-model="membro.nome_Pai" />
          </div>
          <div class="col-md-4">
            <fg-input type="text" :required="true" label="Nome da Mãe" placeholder="Nome da Mãe" v-model="membro.nome_Mae" />
          </div>
        </div>
        <h4>Informações Religiosas</h4>
        <div class="row">
          <div class="col-md-4">
            <label for="">Batizado?</label>
            <div class="">
              <label><input type="radio" v-model="membro.batizado"  name="batizado" :value="false">Não</label>
            </div>
            <div class="">
              <label><input type="radio" v-model="membro.batizado" name="batizado" :value="true">Sim</label>
            </div>
          </div>
          <div class="col-md-4">
            <label for="">Crismado?</label>
            <div class="">
              <label><input type="radio" v-model="membro.crismado"  name="crismado" :value="false">Não</label>
            </div>
            <div class="">
              <label><input type="radio" v-model="membro.crismado" name="crismado" :value="true">Sim</label>
            </div>
          </div>
          <div class="col-md-4">
            <label for="">1º Eucaristia?</label>
            <div class="">
              <label><input type="radio" v-model="membro['1_eucaristia']"  name="1_eucaristia" :value="false">Não</label>
            </div>
            <div class="">
              <label><input type="radio" v-model="membro['1_eucaristia']" name="1_eucaristia" :value="true">Sim</label>
            </div>
          </div>
        </div>

        <h4>Telefones
          <button @click="addTelefone" class="btn" type="button">
            <i aria-hidden="true" class="fa fa-plus"></i>
          </button>
        </h4>

        <div class="row telefone-row">
          <transition-group name="list" tag="div">
            <div class="col-md-4" v-for="(telefone, index) in membro.telefones" :key="index">
              <fg-input type="text" :required="false" label="Número" placeholder="Número" v-model="telefone.telefone" v-mask="['(##) ####-####', '(##) #####-####']" :pattern="'.{0}|.{14}'" :title="'Número inválido'" />
              <button class="btn" @click="removeTelefone(index)" type="button" v-if="membro.telefones.length > 1">
                <i aria-hidden="true" class="fa fa-minus"></i>
              </button>
            </div>
          </transition-group>
        </div>

        <div class="row">
          <div class="col-md-4">
            <label for="">Comunidades</label>
            <v-select v-model="membro.comunidades" :options="comunidadesToSelectList" multiple>
              <span slot="no-options">
                Nenhum resultado encontrado
              </span>
            </v-select>
          </div>
          <div class="col-md-4">
            <label for="">Pastorais</label>
            <v-select v-model="membro.pastorais" :options="pastoraisToSelectList" multiple>
              <span slot="no-options">
                Nenhum resultado encontrado
              </span>
            </v-select>
          </div>
        </div>
        <h4>Endereço</h4>
        <div class="row">
          <div class="col-md-2">
            <div class="form-group">
              <label>
                CEP
              </label>
              <input class="form-control border-input" placeholder="CEP" v-model="membro.cep" v-mask="[ '#####-###']" :pattern="'.{9}'" :title="'Número inválido'" @change="searchCEP" required="required" type="text">
            </div>
          </div>
          <div class="col-md-5">
            <fg-input type="text" :required="true" label="Endereço" placeholder="Endereço" v-model="membro.endereco" />
          </div>
          <div class="col-md-2">
            <fg-input type="text" :required="true" label="Número" placeholder="Número" v-model="membro.nro" />
          </div>
          <div class="col-md-3">
            <fg-input type="text" :required="false" label="Complemento" placeholder="Complemento" v-model="membro.compl" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-5">
            <fg-input type="text" :required="true" label="Bairro" placeholder="Bairro" v-model="membro.bairro" />
          </div>
          <div class="col-md-5">
            <fg-input type="text" :required="true" label="Cidade" placeholder="Cidade" v-model="membro.cidade" />
          </div>
          <div class="col-md-2">
            <fg-input type="text" :required="true" label="UF" placeholder="UF" v-model="membro.uf" />
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
import cepPromise from 'cep-promise';
import axios from '@/plugins/axios';
import {
  membrosUrl,
  tiposMembroUrl,
  comunidadesApiUrl,
  pastoraisApiUrl,
} from '../../../../api-url/index';

export default {
  props: {
    membro: Object,
  },
  data() {
    return {
      showLoader: false,
      firstName: '',
      tiposMembro: [],
      comunidades: [],
      pastorais: [],
    };
  },
  mounted() {
    axios.get(tiposMembroUrl).then(({ data }) => {
      this.tiposMembro = data;
    });
    axios.get(comunidadesApiUrl).then(({ data }) => {
      this.comunidades = data;
    });
    axios.get(pastoraisApiUrl).then(({ data }) => {
      this.pastorais = data;
    });
  },
  computed: {
    tiposMembroToSelectList() {
      return this.tiposMembro.map(tipoMembro => ({
        label: tipoMembro.descricao,
        value: tipoMembro.id,
      }));
    },
    comunidadesToSelectList() {
      return this.comunidades.map(comunidade => ({
        label: comunidade.nome,
        value: comunidade.id,
      }));
    },
    pastoraisToSelectList() {
      return this.pastorais.map(pastoral => ({
        label: `${pastoral.nome} ${pastoral.id}`,
        value: pastoral.id,
      }));
    },
  },
  methods: {
    add() {
      console.log(this.membro, membrosUrl);
      // this.showLoader = true;

      // axios
      //   .post(membrosUrl, JSON.stringify(this.membro), {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   })
      //   .then((response) => {
      //     console.log(response);
      //     this.showLoader = false;

      //     this.$notify({
      //       group: 'top-right',
      //       title: 'Sucesso!',
      //       text: 'membro inserido com sucesso',
      //       type: 'success',
      //       speed: 1000,
      //     });
      //     this.$router.push({ path: '/admin/membros-pastorais' });
      //   })
      //   .catch(error => console.log(error));
    },
    getTelMask() {
      return ['(##) ####-####'];
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

      // axios
      //   .get(uri)
      //   .then(({ data }) => {
      //     this.membro.endereco = data.logradouro;
      //     this.membro.cidade = data.localidade;
      //     this.membro.uf = data.uf;
      //     this.membro.bairro = data.bairro;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     alert('CEP INVÁLIDO');
      //   })
      //   .then(() => {
      //     this.showLoader = false;
      //   });
    },
    addTelefone() {
      this.membro.telefones.push({});
    },
    removeTelefone(index) {
      if (this.membro.telefones.length === 1) return;
      this.membro.telefones.splice(index, 1);
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
