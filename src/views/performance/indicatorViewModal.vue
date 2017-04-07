<style lang="less">
#select-indicator .ui-modal-footer .ui-button {
  float: none;
}
</style>
<template>
<ui-modal ref="modal" id="select-indicator" :show="show" type="large" :title="$t('performance.indicatorSetting')">
  <vuetable ref="vuetable" :api-url="tableUrl" :selected-to="selectedRow" :append-params="tableParams"  :fields="columns"  pagination-path = "" table-wrapper=".vuetable-wrapper pl16 pr16 pb16" :sort-order="sortOrder" per-page="10">
  </vuetable>
 </ui-modal>
 </template>

<script>
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
    var self = this;
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
          title: this.$t('performance.weight') + '(%)'
        },
        {
          name: 'criteria',
          title: this.$t('performance.criteria')
        },
        {
          name: 'mandatory',
          title: this.$t('performance.mandatory'),
          callback: function(value) {
              return value == 1 ? self.$t('common.yes') : self.$t('common.no')
          }
        },
      ]
    };
  },
  methods: {
    open() {
      this.$refs.modal.open()
    },
    close() {
      this.$refs.modal.close()
    },
    initTable(params) {
        this.params = params;
        this.tableUrl = this.type == "organization" ? "/performance/schemeInfos/department/indicatorList" : "/performance/schemeInfos/indicatorList";
        this.$nextTick(()=>{
          this.$refs.vuetable.reloadData();
        })
    }
  }
}
</script>
