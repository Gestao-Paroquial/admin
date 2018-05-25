<template>
  <div class="col-md-12">
    <loader v-if="showLoader" />
    <div class="row">
      <div class="col-md-6 col-sm-12">
        <h4>Selecione aqui os valores dos pedidos:</h4>
        <table class="table">
          <thead>
            <tr>
              <th>Item</th>
              <th colspan="2">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Casamento</td>
              <td>
                <input v-model="casamento.preco" :disabled="!casamento.editable" @change="handleChange(casamento)" @blur="handleBlur(casamento)" placeholder="Informe o Valor " type="number" :min="0" :step="'0.01'" />
              </td>
              <td>
              <button class="btn btn-simple btn-xs btn-warning btn-icon view">
                <i class="ti-pencil-alt" @click="habilitarEdicao(casamento)" />
              </button>
            </td>
            </tr>
            <tr>
              <td>Batismo</td>
              <td>
                <input v-model="batismo.preco" @change="handleChange(batismo)" @blur="handleBlur(batismo)" :disabled="!batismo.editable"  placeholder="Informe o Valor " type="number" :min="0" :step="'0.01'" />
              </td>
              <td>
                <button class="btn btn-simple btn-xs btn-warning btn-icon view">
                  <i class="ti-pencil-alt" @click="habilitarEdicao(batismo)" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h4 class="title">{{ title }}</h4>
    <pedidos-table :pedidos="pedidos" />
    <div class="row">
      <solicitacoes title="Casamentos" :preco="casamento.preco" :solicitacoes="casamentos"></solicitacoes>
      <solicitacoes title="Batismos" :preco="batismo.preco"  :solicitacoes="batismos"></solicitacoes>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Solicitacoes from './Solicitacoes';
import PedidosTable from './PedidosTable';
import { pedidosUrl, graphqlUri } from '../../../../api-url/index';

export default {
  components: { Solicitacoes, PedidosTable },
  data() {
    return {
      casamentos: [],
      batismos: [],
      pedidos: [],
      showLoader: true,
      title: 'Lista de pedidos',
      precoCasamento: 50,
      precoBatismo: 50,
      casamento: {
        preco: 50,
        name: 'Casamento',
        editable: false,
      },
      batismo: {
        preco: 50,
        name: 'Batismo',
        editable: false,
      },
    };
  },
  mounted() {
    this.getPedidos();
    this.getPrices();
  },
  methods: {
    habilitarEdicao(item) {
      item.editable = true;
    },
    getPedidos: async function getPedidos() {
      const { data } = await axios.get(pedidosUrl);
      this.pedidos = data.filter(pedido => pedido.code);
      this.casamentos = data.filter(pedido => !pedido.code && pedido.casamento);
      this.batismos = data.filter(pedido => !pedido.code && pedido.batismo);

      this.showLoader = false;
    },
    handleChange(item) {
      this.changeValue(item);
    },
    handleBlur(item) {
      item.editable = false;
    },
    getPrices() {
      axios.post(graphqlUri, {
        query: `
        query getPrices  {
          pedidos{
            name
            value
          }
        }`,
      }).then(({ data: { data: { pedidos } } }) => {
        this.casamento.preco = pedidos.find(pedido => pedido.name === this.casamento.name).value;
        this.batismo.preco = pedidos.find(pedido => pedido.name === this.batismo.name).value;
      });
    },
    changeValue({ name, preco }) {
      axios.post(graphqlUri, {
        query: `
        mutation ChangeValue($name: String!, $value: Float!)  {
          changeValue(name: $name, value: $value) {
            value
          }
        }`,
        variables: {
          name,
          value: preco,
        },
      }).then(({ data }) => {
        console.log(data);
      });
    },
  },
};
</script>
<style>
</style>
