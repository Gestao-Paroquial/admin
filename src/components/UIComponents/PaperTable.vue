<template>
  <div style="overflow: hidden;" class="paper-table">
    <div class="header">
      <slot name="header">
        <h4 class="title">{{ title }}</h4>
        <p class="category">{{ subTitle }}</p>
      </slot>
    </div>
    <div class="content table-responsive table-full-width">
      <div class="col-sm-12">
        <table class="table " :class="tableClass">
          <thead>
            <th v-for="column in columns" :key="column">{{ getColumn(column) }}</th>
            <th>Ações</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="index" v-if="index >= start && index < (start + itemsPerPage) ">
              <td v-for="(column, index) in columns" :key="index" v-if="hasValue(item, column)" v-html=" itemValue(item, column)"></td>
              <td>
                <div class="cell">
                  <router-link v-bind:to="{ path: item.id.toString() , query: { update: true }}" class="btn btn-simple btn-xs btn-warning btn-icon view" append>
                    <i class="ti-pencil-alt" />
                  </router-link>

                  <router-link v-bind:to="{ path: item.id.toString() }" class="btn btn-simple btn-xs btn-info btn-icon edit" append>
                    <i class="ti-eye" />
                  </router-link>

                  <router-link v-bind:to="{ path: item.id.toString(), query: { delete: true }}" class="btn btn-simple btn-xs btn-danger btn-icon remove" append>
                    <i class="ti-close" />
                  </router-link>

                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-6 pagination-info">
        <p class="category">Mostrando {{ start + 1 }} até {{ start+itemsPerPage >= data.length? data.length :start+itemsPerPage }} de {{ data.length }} registros</p>
      </div>
      <div class="col-sm-12">
        <ul class="pagination pull-right pagination-default">
          <li class="page-item" :class="{'disabled': start == 0}" @click="previous">
            <a href="javascript:void(0)" aria-label="Previous" class="page-link">
              <i aria-hidden="true" class="fa fa-angle-double-left" />
            </a>
          </li>
          <li class="page-item" :class="{'active': page == index}" v-for="(item, index) in data" :key="index" v-if="index < data.length/itemsPerPage">
            <a href="javascript:void(0)" class="page-link" @click="start = itemsPerPage * index; page = index ">{{ index+1 }}</a>
          </li>
          <li class="page-pre" :class="{'disabled': data.length-start < itemsPerPage }" @click="next">
            <a href="javascript:void(0)" aria-label="Next" class="page-link">
              <i aria-hidden="true" class="fa fa-angle-double-right" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { backEndUrl } from './../../api-url';

export default {
  props: {
    columns: Array,
    data: Array,
    del: Function,
    show: Function,
    getId: Function,
    type: {
      type: String, // striped | hover
      default: 'Striped',
    },
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
    itemsPerPage: {
      default: 10,
      type: Number,
    },
  },
  data() {
    return {
      page: 0,
      start: 0,
    };
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    },
  },
  methods: {
    next() {
      if (this.data.length - this.start > this.itemsPerPage) {
        this.start += this.itemsPerPage;
        this.page += 1;
      }
    },
    previous() {
      if (this.start !== 0) {
        this.start -= this.itemsPerPage;
        this.page -= 1;
      }
    },
    hasValue(item, column) {
      return item[column.toLowerCase()] !== 'undefined';
    },
    itemValue(item, column) {
      // Verificar as colunas que tem pontos para buscar propriedades dentro de propriedades
      if (column.match(/\./g)) {
        const splited = column.split('.');
        return item[splited[0].toLowerCase()][splited[1].toLowerCase()];
      }

      if (item[column.toLowerCase()].toString().match('/uploads/img/')) {
        return `<img src=${backEndUrl +
          item[column.toLowerCase()]} style="max-width: 200px">`;
      }

      return item[column.toLowerCase()];
    },
    getColumn(column) {
      return this.capitalize(column.split('.')[0]);
    },
  },
};
</script>
<style scoped>
th {
  padding: 12px;
  vertical-align: middle;
  text-align: center;
}
.pagination > li > a:hover,
.pagination > li > a:focus,
.pagination > li > a:active,
.pagination > li.active > a,
.pagination > li.active > span,
.pagination > li.active > a:hover,
.pagination > li.active > span:hover,
.pagination > li.active > a:focus,
.pagination > li.active > span:focus {
  background-color: #66615b !important;
  border-color: #66615b !important;
  color: #ffffff !important;
}

.pagination > li > a,
.pagination > li > span {
  background-color: transparent;
  border: 2px solid #66615b;
  border-radius: 20px;
  color: #66615b !important;
  height: 36px;
  font-weight: 600;
  margin: 0 2px;
  min-width: 36px;
  padding: 6px;
  line-height: 22px;
  text-align: center;
}

.pagination > li:first-child > a,
.pagination > li:first-child > span,
.pagination > li:last-child > a,
.pagination > li:last-child > span {
  border-radius: 20px !important;
}

.filter-options {
  background: #fff;
  padding: 10px 15px;
  border-radius: 4px;
  border: 1px solid #dedede;
}

img {
  max-width: 200px;
  width: 100%;
}
</style>
