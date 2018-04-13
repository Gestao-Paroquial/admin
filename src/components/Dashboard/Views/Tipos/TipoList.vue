<template>
  <div class="col-md-4">
    <table class="table">
      <thead>
        <tr>
          <th>Tipos de {{title}}</th>
          <th>
            <button class="btn btn-primary">Novo</button>
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
            <button class="btn btn-simple btn-xs btn-danger btn-icon remove">
              <i class="ti-close" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
  methods: {
    habilitarEdicao(tipoItem) {
      tipoItem.edit = true;
      this.$forceUpdate();
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
  },
};
</script>
