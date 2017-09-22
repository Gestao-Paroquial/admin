<template>
  <div>
    <div class="header">
      <slot name="header">
        <h4 class="title">{{title}}</h4>
        <p class="category">{{subTitle}}</p>
      </slot>
    </div>
    <div class="content table-responsive table-full-width">
      <table class="table" :class="tableClass">
        <thead>
          <th v-for="column in columns" :key="column">{{column}}</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td v-for="(column, index) in columns" :key="index" v-if="hasValue(item, column)">{{itemValue(item, column)}}</td>
            <td>
              <div class="cell">
                <a class="btn btn-simple btn-xs btn-warning btn-icon edit" @click="update(item.id)">
                  <i class="ti-pencil-alt"></i>
                </a>
                <a class="btn btn-simple btn-xs btn-danger btn-icon remove " @click="del(item.id)">
                  <i class="ti-close"></i>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    columns: Array,
    data: Array,
    del: Function,
    update: Function,
    type: {
      type: String, // striped | hover
      default: 'Striped'
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''

    }
  },
  computed: {
    tableClass() {
      return `table-${this.type}`
    }
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== 'undefined'
    },
    itemValue(item, column) {
      return item[column.toLowerCase()]
    },
    getId(id) {
      this.del(id)
    },
  }
}

</script>
<style>

</style>
