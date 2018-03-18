<template>
  <div :class="`${grid} `">
    <div class="card">
      <div class="small-box " :class="colorClass">
        <div class="inner">
          <h3 class="ng-binding">{{value}}</h3>
          <p class="ng-binding">{{text}}</p>
        </div>
        <div class="icon">
          <i :class="iconClass"></i>
        </div>
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
    colorClass: String,
    iconClass: String,
  },
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

.small-box p {
  font-size: 15px;
}

.small-box h3 {
  font-size: 38px;
  font-weight: bold;
  margin: 0 0 10px 0;
  white-space: nowrap;
  padding: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.small-box h3,
.small-box p {
  z-index: 5;
}
.small-box {
  border-radius: 2px;
  position: relative;
  display: block;
  margin-bottom: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  color: #fff;
  border-radius: 5px;
}
.small-box > .inner {
  padding: 10px;
}
.small-box .icon {
  -webkit-transition: all 0.3s linear;
  -o-transition: all 0.3s linear;
  transition: all 0.3s linear;
  position: absolute;
  top: -10px;
  right: 90px;
  z-index: 0;
  font-size: 90px;
  color: rgba(0, 0, 0, 0.15);
}

.small-box h3 {
  font-size: 38px;
  font-weight: bold;
  margin: 0 0 10px 0;
  white-space: nowrap;
  padding: 0;
}
</style>

