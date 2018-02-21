<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <update-form :eventoHome="eventoHome" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import UpdateForm from "./UpdateForm";
import { eventosHomeApiUrl } from "./../../../../api-url";
export default {
  components: {
    UpdateForm
  },
  data() {
    return {
      eventoHome: {}
    };
  },
  created() {
    axios
      .get(`${eventosHomeApiUrl}/${this.$route.params.id}`)
      .then(({ data }) => (this.eventoHome = data))
      .catch(err => console.log(err));
  }
};
</script>

<style lang="sass">

</style>
