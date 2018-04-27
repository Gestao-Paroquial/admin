<template>
  <div class="col-md-4 col-sm-12">
    <table class="table">
      <thead>
        <tr>
          <th>Tipos de {{title}}</th>
          <th>
            <button class="btn btn-primary" @click="showModal">Novo</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tipoItem) in tipo" :key="tipoItem.id">
          <td>
            <input class="form-control border-input" :disabled="!tipoItem.edit" @change="handleChange(tipoItem)" v-model="tipoItem.descricao" />
          </td>
          <td>
            <button class="btn btn-simple btn-xs btn-warning btn-icon view">
              <i class="ti-pencil-alt" @click="habilitarEdicao(tipoItem)" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <modal :name="title">
      <div class="card">
        <div class="header">
          <h5 class="title">Adicionar novo {{title}}</h5>
        </div>
        <div class="content">
          <form @submit.prevent="addTipo">
            <div class="row">
              <div class="col-md-12">
                <fg-input v-model="newTipo.descricao" :required="true" label="Descrição" placeholder="Descrição" />
              </div>
            </div>
            <div class="text-center">
              <button class="btn btn-info  btn-wd" type="submit">
                Adicionar
              </button>
              <hr>
              <button class="btn  btn-wd" type="button" @click.prevent="hideModal">
                Cancelar
              </button>
            </div>
            <div class="clearfix" />
          </form>
        </div>

      </div>
    </modal>
  </div>
</template>
<script>
import axios from '@/plugins/axios';

export default {
  props: {
    tipo: Array,
    endPoint: String,
    title: String,
  },
  data() {
    return {
      newTipo: {},
    };
  },
  methods: {
    habilitarEdicao(tipoItem) {
      /* eslint-disable */
      tipoItem.edit = true;
      /* eslint-enable */
      this.$forceUpdate();
    },
    addTipo() {
      axios
        .post(this.endPoint, JSON.stringify(this.newTipo), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(({ data }) => {
          this.tipo.push(data.tipo);
          this.hideModal();
          this.$notifications.notify(this.notificationConfig(data.message));
        });
    },
    handleChange(tipoItem) {
      axios
        .put(`${this.endPoint}/${tipoItem.id}`, JSON.stringify(tipoItem), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(({ data }) => {
          this.$notifications.notify(this.notificationConfig(data.message));
        });
    },
    showModal() {
      this.$modal.show(this.title);
    },
    hideModal() {
      this.$modal.hide(this.title);
    },
  },
};
</script>
