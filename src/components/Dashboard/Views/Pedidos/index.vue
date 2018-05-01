<template>
  <div class="col-md-12">
    <loader v-if="showLoader" />
    <h4 class="title">{{ title }}</h4>
    <pedidos-table :pedidos="pedidos"/>
    <div class="row">
      <solicitacoes title="Casamentos" :solicitacoes="casamentos"></solicitacoes>
      <solicitacoes title="Batismos" :solicitacoes="batismos"></solicitacoes>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Solicitacoes from './Solicitacoes';
import PedidosTable from './PedidosTable';
import { pedidosUrl } from '../../../../api-url/index';

export default {
  components: { Solicitacoes, PedidosTable },
  data() {
    return {
      casamentos: [],
      batismos: [],
      pedidos: [],
      showLoader: true,
      title: 'Lista de pedidos aguardando pagamento',
    };
  },
  mounted() {
    this.getPedidos();
  },
  methods: {
    getPedidos: async function getPedidos() {
      const { data } = await axios.get(pedidosUrl);
      this.pedidos = data.filter(pedido => pedido.code);
      this.casamentos = data.filter(pedido => !pedido.code && pedido.casamento);
      this.batismos = data.filter(pedido => !pedido.code && pedido.batismo);

      this.showLoader = false;
    },
  },
};
</script>
<style>

</style>
