<template>
  <div class="card">
    <loader v-if="showLoader" />
    <div class="header">
      <h4 class="title">Adicionar Nova Pastoral</h4>
    </div>
    <div class="content">
      <form @submit.prevent="add">
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text" :required="true" label="Nome" placeholder="Nome" v-model="pastoral.nome" />
          </div>
          <div class="col-md-6">
            <select-list :selectList="selectList" :required="true"></select-list>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Descrição</label>
              <textarea rows="5" class="form-control border-input" placeholder="Descrição da pastoral" v-model="pastoral.descricao" />
            </div>
          </div>
        </div>
        <hr>
        <div class="text-center">
          <button class="btn btn-info btn-fill btn-wd">
            Adicionar
          </button>
        </div>
        <div class="clearfix" />
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import SelectList from '@/components/UIComponents/Forms/SelectList';
import { pastoraisApiUrl } from '../../../../api-url/index';

export default {
  props: {
    pastoral: Object,
    selectList: Object,
  },
  components: {
    SelectList,
  },
  data() {
    return {
      showLoader: false,
    };
  },
  methods: {
    add() {
      this.pastoral.comunidades_id = document.querySelector(
        '[name="comunidades_id"]',
      ).value;

      this.showLoader = true;
      axios
        .post(pastoraisApiUrl, JSON.stringify(this.pastoral), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response);
          this.showLoader = false;
          this.$notify({
            group: 'top-right',
            title: 'Sucesso!',
            text: 'pastoral inserido com sucesso',
            type: 'success',
            speed: 1000,
          });
          this.$router.push({ path: '/admin/pastorais' });
        })
        .catch(error => console.log(error));
    },
  },
};
</script>
<style>

</style>
