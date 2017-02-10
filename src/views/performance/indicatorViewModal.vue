<style lang="less">
#select-indicator .ui-modal-footer .ui-button {
  float: none;
}
</style>
<template>
<ui-modal id="select-indicator" :show.sync="show" type="large" header="Indicators Settings">
  <vuetable :api-url="tableUrl" :selected-to="selectedRow" :append-params="tableParams"  :fields="columns"  pagination-path = "" table-wrapper=".vuetable-wrapper pl16 pr16 pb16" :sort-order="sortOrder" per-page="10">
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
      type: {
        type: String,
        default: ""
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
      let schemeEmployeeId = this.params.schemeEmployeeId ? this.params.schemeEmployeeId : "";
      return [
        `schemeId=${schemeId}`,
        `employeeId=${employeeId}`,
        `schemeEmployeeId=${schemeEmployeeId}`
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
          title: 'Indicator Name'
        },
        {
          name: 'unit',
          title: 'Unit'
        },
        {
          name: 'target',
          dataClass: 'tr',
          title: 'Target'
        },
        {
          name: 'weight',
          dataClass: 'tr',
          title: 'Weight(%)'
        },
        {
          name: 'criteria',
          title: 'Criteria'
        },
        {
          name: 'mandatory',
          title: 'Mandatory',
          callback: function(value) {
              return value == '1' ? "YES" : "NO"
          }
        },
      ]
    };
  },
  events: {
    'indModal:refresh': function(params) {

        this.initTable(params);
    },
  },
  ready() {
    // this.initTable();
  },
  methods: {
    initTable(params) {
        this.params = params;
        this.tableUrl = this.type == "organization" ? "/performance/schemeInfos/department/indicatorList" : "/performance/schemeInfos/indicatorList";
        this.$nextTick(()=>{
          this.$broadcast('vuetable:refresh');
        })
    }
  }
}
</script>
