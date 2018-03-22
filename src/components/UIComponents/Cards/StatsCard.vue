<template>
  <div class="card">
    <div class="content">
      <div class="row">
        <div class="col-xs-5">
          <slot name="header" />
        </div>
        <div class="col-xs-7">
          <slot name="content" />
        </div>
      </div>
      <div class="footer">
        <hr>
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StatsCard',
};
</script>
<style>

</style>
