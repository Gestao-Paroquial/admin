<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <add-form :user="user" />
    </div>
  </div>
</template>
<script>
import AddForm from './Form';

export default {
  components: {
    AddForm,
  },
  data() {
    return {
      user: { },
    };
  },
  mounted() {

  },
};
</script>

<style lang="sass">

</style>
