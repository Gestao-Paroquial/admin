<template>
  <div class="col-md-4 col-sm-12 aniversariantes">
    <div class="card">
      <div class="header">
        <h4 class="title">Aniversariantes do Mês de {{capitalize(getTheActualMonth())}}</h4>
      </div>
      <div class="content">
        <table class="table">
        <thead>
          <th><i class="fa fa-calendar"/></th>
          <th>Nome</th>
          <th><i class="fa fa-birthday-cake"/></th>
        </thead>
        <tbody>
          <tr v-for="aniversariante in aniversariantes" :key="aniversariante.id">
            <td>{{getBirthday(aniversariante.data_Nascimento)}}</td>
            <td><router-link v-bind:to="{ path: 'membros/'+aniversariante.id.toString() }" >{{aniversariante.nome}}</router-link></td>
            <td>{{calcAge(aniversariante.data_Nascimento)}} anos</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '@/plugins/axios';
import { aniversariantesUrl } from './../../../../api-url';

const aniversariantes = localStorage.getItem('aniversariantes') ? JSON.parse(localStorage.getItem('aniversariantes')) : [];


export default {
  data() {
    return {
      aniversariantes,
    };
  },
  mounted() {
    axios.get(`${aniversariantesUrl}/${new Date().getMonth() + 1}`)
      .then(({ data }) => {
        this.aniversariantes = data.sort(this.sortByDay);
        localStorage.setItem('aniversariantes', JSON.stringify(this.aniversariantes));
      });
  },
  methods: {
    sortByDay(a, b) {
      return this.getBirthday(a.data_Nascimento) - this.getBirthday(b.data_Nascimento);
    },
    getTheActualMonth() {
      const date = new Date();
      const month = date.toLocaleDateString('pt-BR', { month: 'long' });
      return month;
    },
    getBirthday(date) {
      return date.split('-')[2];
    },
  },
};
</script>
<style lang="scss" >
.aniversariantes{
  th, td {
    text-align: center;
    padding: 10px;
  }
}
</style>
