<template>
  <div class="row">
    <back-button/>
    <add-form :event="event"/>
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
      event: {
        data_inicio_evento: new Date().toISOString().substring(0, 16),
      },
    };
  },
};
</script>
