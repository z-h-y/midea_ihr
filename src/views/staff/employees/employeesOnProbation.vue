<style lang="less">

.ihr-staff-emp-pro {
    font-size: 14px;
    .ui-radio-label-text {
      line-height: 32px;
      margin: 0 10px;
    }
    .vuetable-wrapper {
      padding: 0 16px 16px 16px;
    }

    .group {
      margin: 16px;
      padding-top: 16px;
      border-top: 1px solid #ecedee;
    }
    .probation-form {
      margin: 0 40px;
      height: 46px;
    }
    .probation-form.expended {
      height: 92px;
    }
}

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-staff-emp-pro">
    <div class="mb20 pt20">
        <div class="search-area">
            <organization-selector ref="orgselect" :show="org" :handel-select="selectOrg"></organization-selector>
            <v-form :class="{expended: expended}" :model="probation" :schema="probationSchema" label-width="170" label-suffix="" :cols="3" form-style="probation-form">
                <text-field property='fullName' editor-width="150"></text-field>
                <text-field property="employeeCode" editor-width="150"></text-field>
                <text-field type="selector" :readonly="true" @open-selector="openSelector" :show="org" property="orgUnitName" editor-width="150"></text-field>
                <text-field v-show="expended" property="positionName" editor-width="150"></text-field>
                <select-field v-show="expended" :mapping="employeeContractDist" property="contractType" editor-width="150"></select-field>
            </v-form>
            <ui-icon-button :class="[{expended: expended},'expend-btn']" :icon="expendIcon" @click="expendSearch"></ui-icon-button>
            <div class="query-btn">
                <ui-button class="query-btn-search mr10" color="primary" @click="search">{{$t('button.search')}}</ui-button>
                <ui-button class="query-btn-reset btn-default-bd" type="flat" @click="reset">{{$t('button.reset')}}</ui-button>
            </div>
        </div>
        <div class="group">
            <ui-button class="mr10 dis-tc btn-primary-bd" @click="goComplete" color="primary">{{$t('staff.completeProbation')}}</ui-button>
            <ui-button class="mr10 dis-tc btn-default-bd" @click="goExtend" type="flat">{{$t('staff.extendProbation')}}</ui-button>
        </div>
        <div class="vuetable-wrapper">
          <vuetable ref="vuetable" api-url="/employee/onProbation/employees" :append-params="moreParams" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="columns" per-page="10">
          </vuetable>
        </div>

    </div>

</div>

</template>

<script>
import {
    default as Schema
}
from '../../../schema/index';
import {default as Message} from '../../../components/basic/message';
import {formatDate,getDictMapping} from '../../../util/assist';

export default {
    data() {
        let probationSchema = new Schema({
            fullName: {
                label: this.$t('staff.employeeName')
            },
            employeeCode:{
              label: this.$t('staff.employeeId')
            },
            orgUnitName: {
              label: this.$t('staff.organization')
            },
            positionName: {
                label: this.$t('staff.mibPostion')
            },
            contractType: {
              label: this.$t('staff.contractType')
            }
        });
            return {
                org: {
                  modal: false
                },
                moreParams: [],
                moreParamsKeys: ['fullName', 'employeeCode', 'unitId', 'positionName', 'contractType'],
                selectedRow: [],
                probationSchema:probationSchema,
                probation:probationSchema.newModel(),
                expendIcon: 'fa-angle-double-down',
                expended: false,
                employeeContractDist: {},
                columns: [{
                      name: '__checkbox:employeeId',
                      title: ''
                    },
                    {
                      name: 'fullName',
                      title: this.$t('staff.name'),
                      callback: 'cName'
                    },
                    {
                      name: 'loginId',
                      title: this.$t('staff.loginId')
                    },
                    {
                      name: 'employeeCode',
                      dataClass: 'tr',
                      title: this.$t('staff.employeeId')
                    },
                    {
                      name: 'positionName',
                      title: this.$t('staff.mibPostion')
                    },
                    {
                      name: 'unitShortName',
                      title: this.$t('staff.organization')
                    },
                    {
                      name: 'hireDate',
                      title: this.$t('staff.hireDate'),
                      dataClass: 'tr',
                      titleClass: 'mw80',
                      callback: 'format'
                    },
                    {
                      name: 'contractType',
                      title: this.$t('staff.contractType'),
                      callback: 'fixContract'
                    },
                    {
                      name: 'mibGrade',
                      title: this.$t('staff.mibGrade')
                    }
                ]
            };
        },
        computed: {},
        created() {
          var self = this;
          getDictMapping('CONTRACT_TYPE').then(function(res){
            self.employeeContractDist = res;
          });
        },
        methods: {
          openSelector() {
            this.$refs['orgselect'].open();
          },
            search() {
              this.moreParams = [];
              for (let i = 0, len = this.moreParamsKeys.length; i < len; i++) {
                let key = this.moreParamsKeys[i];
                let value = this.probation[key];
                if (value || value === 0) {
                  this.moreParams.push(key + '=' + value);
                }
              }
              this.$nextTick(function() {
                this.$refs.vuetable.reloadData();
              })
            },
            reset() {
              this.probation.reset();
              this.probation.unitId = '';
            },
            goComplete() {
              if (this.selectedRow.length === 1) {
                this.$router.push({ name: 'completeProbation', params: { employeeId: this.selectedRow[0] }});
              } else {
                Message({
                    type: 'error',
                    message: this.$t('staff.message.selectOnePerson')
                });
              }
            },
            goExtend() {
              if (this.selectedRow.length === 1) {
                this.$router.push({ name: 'extendProbation', params: { employeeId: this.selectedRow[0] }});
              } else {
                Message({
                    type: 'error',
                    message: this.$t('staff.message.selectOnePerson')
                });
              }
            },
            expendSearch() {
              this.expended = !this.expended;
              this.expendIcon = this.expended ? 'fa-angle-double-up' : 'fa-angle-double-down';
            },
            // 改变列表名字列，给该列加上链接
            cName(value, data) {
              return `<a href="${location.href}/${data.employeeId}">${value}</a>`;
            },
            // 格式化时间
            format(value) {
              if (!value) {
                return ''
              }
              return formatDate(new Date(value));
            },
            // 匹配字典
            fixDist(value, option) {

              var dist = {};
              switch(option) {
                case 'contract': dist = this.employeeContractDist || {}; break;
              }
              for (let key of Object.keys(dist)) {
                if (dist[key] === value) {
                  value = key;
                  break;
                }
              }
              return value;
            },
            fixContract(value) {
              return this.fixDist(value, 'contract');
            },
            selectOrg(value) {
              if (value) {
                  this.probation.orgUnitName = value.orgShortName;
                  this.probation.unitId = value.orgId;
              }
            }
        },
        components: {}
};

</script>
