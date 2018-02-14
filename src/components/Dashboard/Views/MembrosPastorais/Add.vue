<template>
  <div class="row">
    <back-button/>
    <div class="col-lg-12 ">
      <add-form :membroPastoral="membroPastoral" :select-list="selectList"/>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AddForm from "./AddForm";
import { pastoraisApiUrl } from "./../../../../api-url";
export default {
  components: {
    AddForm
  },
  data() {
    return {
      membroPastoral: {},
      selectList: {
        label: "Pastorais",
        name: "pastorais_id",
        options: [{}]
      }
    };
  },
  created() {
    axios
      .get(pastoraisApiUrl)
      .then(({ data }) => {
        const pastoraisToSelectList = data.map(pastoral => ({
          value: pastoral.nome,
          id: pastoral.id
        }));

        this.selectList.options.push(...pastoraisToSelectList);
      })
      .catch(err => console.log(err));
  }
};
</script>

<style lang="sass">

</style>
