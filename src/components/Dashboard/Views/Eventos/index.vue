<template>
  <div class="eventos">
    <go-to-add-page></go-to-add-page>
    <full-calendar :events="events" locale="pt-br" @eventClick="eventClick" @dayClick="dayClick" @moreClick="moreClick">
    </full-calendar>
  </div>
</template>

<script>
// const demoEvents = [
//   {
//     title: 'Sunny Out of Office',
//     start: '2018-03-25',
//     end: null,
//     cssClass: ['family', 'career'],
//   },
// ];
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
  methods: {
    changeMonth(start, end, current) {
      console.log('changeMonth', start, end, current);
    },
    eventClick(event, jsEvent, pos) {
      console.log('eventClick', event, jsEvent, pos);

      this.$router.push({ path: `/admin/eventos/${event.id}` });
    },
    dayClick(day, jsEvent) {
      console.log('dayClick', day, jsEvent);
    },
    moreClick(day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent);
    },
  },
};
</script>
<style lang="scss" >
.eventos {
  h2 {
    text-align: center;
    margin: 15px auto 40px;
  }

  .family {
    background-color: #000;
  }

  .prev-month,
  .next-month {
    border-radius: 20px;
    box-sizing: border-box;
    border-width: 2px;
    background-color: transparent;
    font-size: 12px;
    font-weight: 500;
    border-style: solid;
    padding: 7px 18px;
    border-color: #66615b;
    color: #66615b;
    transition: all 0.15s linear;
  }
  .comp-full-calendar {
    max-width: initial;
  }
}
</style>
