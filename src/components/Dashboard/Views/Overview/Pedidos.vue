<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pedido in pedidos" :key="pedido.id">
                        <td>{{pedido.nome}}</td>
                        <td>{{pedido.email}}</td>
                        <td>{{pedido.cpf}}</td>
                        <td>{{getStatusName(pedido.code)}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    pedidos: Array,
  },
  data() {
    return {
      pedidosAprovados: [],
    };
  },
  mounted() {
    console.log(this.pedidos);
    this.pedidos.filter(pedido => pedido.code === 2);
  },
  methods: {
    getStatusName(code) {
      const obj = {
        1: 'Aguardando pagamento',
        2: 'Em análise',
        3: 'Paga',
        4: 'Disponível',
        5: 'Em disputa',
        6: 'Devolvida',
        7: 'Cancelada',
      };
      return obj[code];
    },
  },
};
</script>
