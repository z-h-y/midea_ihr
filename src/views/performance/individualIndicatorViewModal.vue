<style lang="less">

</style>
<template>
<ui-modal id="select-indicator" :show="show" type="large" :title="$t('performance.indicatorsSetting')">
  <vuetable ref="vuetable" :api-url="tableUrl" :selected-to="selectedRow" :append-params="tableParams"  :fields="columns"  pagination-path = "" table-wrapper=".vuetable-wrapper pl16 pr16 pb16" :sort-order="sortOrder" per-page="10">
  </vuetable>
 </ui-modal>
 </template>

<script type="text/ecmascript6">
import {
    removeClass, addClass
}
from 'wind-dom';

let mandatoryOption = [
    {
        text: 'Yes',
        value: '1'
    },
    {
        text: 'NO',
        value: '0'
    }
]
export default {
  props: {
      show: {
          type: Boolean,
          default: false
      },
      params: {
          type: Object,
          default: {}
      }
  },
  computed: {
    tableParams() {

      let schemeId = this.params.schemeId ? this.params.schemeId: "";
      let employeeId = this.params.employeeId ? this.params.employeeId : "";
      return [
        `schemeId=${schemeId}`,
        `employeeId=${employeeId}`,
      ]
    }
  },
  data() {
    return {
      tableUrl:'/performance/schemeInfos/indicatorList',
      tableData:[],
      mandatoryOption,
      params:{},
      columns:[
        {
          name: 'indicatorName',
          title: this.$t('performance.indicatorName')
        },
        {
          name: 'unit',
          title: this.$t('performance.unit')
        },
        {
          name: 'target',
          dataClass: 'tr',
          title: this.$t('performance.target')
        },
        {
          name: 'weight',
          dataClass: 'tr',
          title: this.$t('performance.weight')
        },
        {
          name: 'criteria',
          title: this.$t('performance.criteria')
        },
        {
          name: 'mandatory',
          title: this.$t('performance.mandatory')
        },
      ]
    };
  },
  events: {
    'indModal:refresh': function(params) {

        this.initTable(params);
    },
  },
  methods: {
    initTable(params) {
        this.params = params;
        this.$nextTick(()=>{
          this.$refs.vuetable.reloadData();
        })
    }
  }
}
</script>
