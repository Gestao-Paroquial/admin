<template>
  <div>
    <back-button/>
    <div class="row">
      <div class="col-md-12">
        <update-form :user="user" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import UpdateForm from './Form';
import { usersApiUrl } from './../../../../api-url';

export default {
  components: {
    UpdateForm,
  },
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    axios
      .get(`${usersApiUrl}/${this.$route.params.id}`)
      .then(({ data }) => {
        this.user = data;
      })
      .catch(err => console.log(err));
  },
};
</script>
