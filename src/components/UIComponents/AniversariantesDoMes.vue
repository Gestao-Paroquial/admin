<template>
  <div class="col-md-4 col-sm-12 aniversariantes">
    <h4>Aniversariantes do mês de {{capitalize(getTheActualMonth())}}</h4>
    <table class="table">
      <thead>
        <th><i class="fa fa-calendar"/></th>
        <th>Nome</th>
        <th><i class="fa fa-birthday-cake"/></th>
      </thead>
      <tbody>
        <tr>
          <td>01</td>
          <td>José</td>
          <td>50 anos</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  methods: {
    getTheActualMonth() {
      const date = new Date();
      const month = date.toLocaleDateString('pt-BR', { month: 'long' });
      return month;
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
