<template>
  <div class="eventos">
    <h2 class="title">Eventos</h2>
    <hr>
    <vue-event-calendar :events="events" class="events">
      <template scope="props">
        <div v-for="(event) in props.showEvents" class="event-item" :key="event.id">
          <!-- In here do whatever you want, make you owner event template -->
          <div class="row">
            <!-- <router-link v-bind:to="{ path: event.id.toString()}" append> </router-link> -->
            <div class="col-md-11">
              <h3 class="title">{{event.title}}</h3>
              <p class="time">{{event.date}}</p>
              <p class="desc">{{event.description}}</p>
            </div>
            <div class="col-md-1">
              <router-link v-bind:to="{ path: event.id.toString(), }" append class="btn btn-simple btn-xs btn-info btn-icon edit ">
                <i class="ti-eye "></i>
              </router-link>
              <router-link v-bind:to="{ path: event.id.toString(), query: { update: true }}" append class="btn btn-simple btn-xs btn-warning btn-icon view">
                <i class="ti-pencil-alt"></i>
              </router-link>
              <router-link v-bind:to="{ path: event.id.toString(), query: { delete: true }} " append class="btn btn-simple btn-xs btn-danger btn-icon remove ">
                <i class="ti-close "></i>
              </router-link>
            </div>
          </div>
        </div>
      </template>
    </vue-event-calendar>

  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [],
    };
  },
  mounted() {
    const events = JSON.parse(localStorage.getItem('events'));
    if (events) this.events = events;
  },
};
</script>
<style lang="scss" scoped>
h2 {
  text-align: center;
  margin: 15px auto 40px;
}
</style>
