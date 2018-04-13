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
        <tr v-for="tipoItem in tipo" :key="tipoItem.id">
          <td>{{tipoItem.descricao}}</td>
          <td>
            <button  class="btn btn-simple btn-xs btn-warning btn-icon view" >
              <i class="ti-pencil-alt" />
            </button>
            <button  class="btn btn-simple btn-xs btn-danger btn-icon remove" >
              <i class="ti-close" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    tipo: Array,
    title: String,
  },
};
</script>
