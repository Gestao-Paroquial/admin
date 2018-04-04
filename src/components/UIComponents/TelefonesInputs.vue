<template>
  <div class="row telefone-row">
    <h4>Telefones
      <button @click="addTelefone" class="btn" type="button" v-if="!disabled">
        <i aria-hidden="true" class="fa fa-plus"></i>
      </button>
    </h4>
      <transition-group name="list" tag="div">
        <div class="col-md-4" v-for="(telefone, index) in telefones" :key="index">
          <fg-input :disabled="disabled" type="text" :required="true" label="Número" placeholder="Número" v-model="telefone.telefone" v-mask="['(##) ####-####', '(##) #####-####']" :pattern="'.{14}|.{15}'" :title="'Número inválido'" />
          <button class="btn" @click="removeTelefone(index, 'telefones')" type="button" v-if="!disabled">
            <i aria-hidden="true" class="fa fa-minus"></i>
          </button>
        </div>
      </transition-group>
    </div>
</template>
<script>
export default {
  props: {
    disabled: Boolean,
    telefones: Array,
    removeTelefone: Function,
  },
  methods: {
    addTelefone() {
      this.telefones.push({});
    },
  },
};
</script>

<style>
.telefone-row {
  padding: 15px;
}
.telefone-row [class*="col-"] {
  padding-left: 5px !important;
  padding-right: 5px !important;
}
.telefone-row .form-group {
  display: inline-block;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
