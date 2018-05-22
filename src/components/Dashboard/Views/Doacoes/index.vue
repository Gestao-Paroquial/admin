<template>
  <div class="col-md-12">
    <loader v-if="showLoader" />
    <h4 class="title">{{ title }}</h4>

    <div class=" card card-plain">
      <div class="row">
        <table class="table">
          <thead>
            <tr>
              <th>Nome Doador</th>
              <th>Mensagem</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="doacao in doacoes" :key="doacao.id">
              <td>{{doacao.nome_doador}}</td>
              <td>{{doacao.descricao}}</td>
              <td>{{formatToPrice(doacao.valor)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

import { doacoesUri } from './../../../../api-url';

export default {
  data() {
    return {
      doacoes: {},
      showLoader: true,

      title: 'Doações feitas através do pagseguro',
    };
  },
  mounted() {
    axios
      .get(doacoesUri)
      .then(({ data = [] }) => {
        this.doacoes = data
          .filter(doacao => doacao.code === 2 || doacao.code === 3)
          .map((doacao) => {
            if (!doacao.nome_doador) doacao.nome_doador = 'NOME NÃO FORNECIDO';

            return doacao;
          });
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        this.showLoader = false;
      });
  },
};
</script>
<style>

</style>
