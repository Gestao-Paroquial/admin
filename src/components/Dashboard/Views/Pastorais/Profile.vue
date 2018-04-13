<template>
  <div>
    <back-button/>
    <div class="row">
      <div class="col-md-8 col-sm-12 ">
        <update-form :pastoral="pastoral" />
      </div>
      <div class="col-md-4 col-sm-12 ">
        <div class="card">
          <div class="header">
            <h5 class="title">
              Lista de membros da {{pastoral.nome}}
            </h5>
          </div>
          <div class="content">
            <ul>
              <li v-for="membro in pastoral.membros" :key="membro.id">
                <router-link v-bind:to="{ path: '/admin/membros/'+membro.id.toString() }" >{{membro.nome}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import UpdateForm from './Form';
import { pastoraisApiUrl } from './../../../../api-url';

export default {
  components: {
    UpdateForm,
  },
  data() {
    return {
      pastoral: {},
    };
  },
  mounted() {
    axios
      .get(`${pastoraisApiUrl}/${this.$route.params.id}`)
      .then(({ data }) => {
        this.pastoral = data;
        this.pastoral.coordenador = {
          label: this.pastoral.coordenador.nome,
          value: this.pastoral.coordenador.id,
        };

        this.pastoral.comunidade = {
          label: this.pastoral.comunidade.nome,
          value: this.pastoral.comunidade.id,
        };
      })
      .catch(err => console.log(err));
  },
};
</script>

<style lang="sass">

</style>
