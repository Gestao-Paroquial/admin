<template>
  <div :class="grid + colorClass">
    <div class="small-box bg-red">
      <div class="inner">
        <h3 class="ng-binding">{{value}}</h3>
        <p class="ng-binding">{{text}}</p>
      </div>
      <div class="icon">
        <i class="fa fa-credit-card"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    grid: String,
    text: String,
    value: String,
    colorClass: String
  }
};
</script>

<style lang="scss" scoped>
.bg-green,
.callout.callout-success,
.alert-success,
.label-success,
.modal-success .modal-body {
  background-color: #00a65a !important;
}

.bg-red,
.callout.callout-danger,
.alert-danger,
.alert-error,
.label-danger,
.modal-danger .modal-body {
  background-color: #dd4b39 !important;
}

.bg-blue {
  background-color: #0073b7 !important;
}
</style>

