<template>
  <div class="card">
    <loader v-if="showLoader" />
    <div class="header">
      <h4 class="title">Informações do usuário</h4>
    </div>
    <div class="content">
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-md-6">
            <fg-input :disabled="$route.query.delete" :required="true" type="text" label="Nome" placeholder="Nome do usuário" v-model="user.name" />
          </div>
          <div class="col-md-6">
            <fg-input :disabled="$route.query.delete" :required="true" type="email" label="Email" placeholder="Email" v-model="user.email" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input :min-length="4" :disabled="$route.query.delete" :required="true" type="password" label="Senha" placeholder="Senha" v-model="user.password" />
          </div>
          <div class="col-md-6">
            <fg-input :min-length="4" :disabled="$route.query.delete" :required="true" type="password" label="Confirmar Senha" placeholder="Confirmar Senha" v-model="user.confirmPassword" />
          </div>
        </div>
        <form-buttons :showAdd="!$route.params.id" :showUpdate="$route.params.id" :showDelete="$route.params.id" :deleteFunction="deleteUser" />

      </form>
    </div>
  </div>
</template>
<script>
import axios from '@/plugins/axios';
import {
  usersApiUrl,
} from '../../../../api-url/index';

export default {
  props: {
    user: Object,
  },
  data() {
    return {
      showLoader: false,
    };
  },
  methods: {
    handleSubmit() {
      if (this.user.password !== this.user.confirmPassword) {
        alert('A senhas precisam ser iguais');
        return;
      }

      if (this.$route.query.update) this.updateUser();
      if (!this.$route.params.id) this.addUser();
    },
    addUser() {
      this.showLoader = true;
      axios
        .post(`${usersApiUrl}/register`, JSON.stringify(this.user), {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(({ data }) => {
          this.showLoader = false;

          if (data.success) {
            this.$notifications.notify(this.notificationConfig('Usuário registrado com sucesso'));
            this.$router.push({ path: '/admin/usuarios' });
          } else {
            const errors = Object.values(data.error);
            errors.forEach((error) => {
              this.$notifications.notify(this.notificationConfig(...error, 'danger'));
            });
          }
        })
        .catch(error => console.log(error));
    },
    updateUser() {
      let dialog;
      this.$dialog
        .confirm()
        .then((dialog2) => {
          dialog = dialog2;
          return axios.put(
            `${usersApiUrl}/${this.user.id}`,
            JSON.stringify(this.user),
            { headers: { 'Content-Type': 'application/json' } },
          );
        })
        .then(({ data }) => {
          dialog.close();
          this.$notifications.notify(this.notificationConfig(data.message));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteUser() {
      let dialog;
      this.$dialog
        .confirm()
        .then((dialog_) => {
          dialog = dialog_;
          return axios.delete(`${usersApiUrl}/${this.user.id}`);
        })
        .then(({ data }) => {
          dialog.close();
          this.$notifications.notify(this.notificationConfig(data.message));
          this.$router.push({ path: '/admin/usuarios' });
        })
        .catch(err => console.log(err));
    },
    removeTelefone(index) {
      if (this.user.telefones[index].id) {
        this.$dialog
          .confirm('Você tem certeza?')
          .then((dialog) => {
            dialog.close();
            this.telefonesToDelete.push(this.user.telefones[index]);
            this.user.telefones.splice(index, 1);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.user.telefones.splice(index, 1);
      }
    },
  },
};
</script>
<style>

</style>
