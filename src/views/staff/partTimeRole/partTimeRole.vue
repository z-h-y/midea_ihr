<style lang="less">

.ihr-staff-parttime {
    font-size: 14px;
    .vuetable-wrapper {
      padding: 0 16px 16px 16px;
    }
    .group {
      margin: 16px;
      padding-top: 16px;
      border-top: 1px solid #ecedee;
    }
    .interns-form {
      height: 46px;
      margin: 0 40px;
    }
    .interns-form.expended {
      height: 92px;
    }
}

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-staff-parttime">
    <div class="mb20 pt20">
        <organization-selector ref="orgselect" :show="org" :handel-select="selectOrg"></organization-selector>
        <div class="search-area">
            <v-form :class="{expended: expended}" :model="parttime" :schema="parttimeSchema" label-width="170" label-suffix="" :cols="3" form-style="interns-form">
                <text-field property="empFullName" editor-width="150"></text-field>
                <text-field property="employeeCode" editor-width="150"></text-field>
                <text-field type="selector" :readonly="true" @open-selector="openSelector" :show="org" property="orgUnitName" editor-width="150"></text-field>
                <text-field v-show="expended" property="positionName" editor-width="150"></text-field>
                <select-field v-show="expended" property="status" editor-width="150" :mapping="statusDist"></select-field>
            </v-form>
            <ui-icon-button :class="[{expended: expended},'expend-btn']" :icon="expendIcon" @click="expendSearch"></ui-icon-button>
            <div class="query-btn">
                <ui-button class="query-btn-search mr10" color="primary" @click="search">{{ $t('button.search') }}</ui-button>
                <ui-button class="query-btn-reset btn-default-bd" @click="reset" type="flat">{{ $t('button.reset') }}</ui-button>
            </div>
        </div>
        <div class="group">
            <ui-button class="mr10 dis-tc btn-primary-bd" @click="goInterim" color="primary" button-type="button">{{$t('staff.interimPartTimeRole')}}</ui-button>
            <ui-button class="mr10 dis-tc btn-default-bd" @click="goTransfer" type="flat" button-type="button">{{$t('staff.transfer')}}</ui-button>
            <ui-button class="mr10 dis-tc btn-default-bd" @click="goTerminate" type="flat" button-type="button">{{$t('staff.terminate')}}</ui-button>
        </div>
        <div class="vuetable-wrapper">
          <vuetable ref="vuetable" :append-params="moreParams" api-url="/employee/parttimes" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="columns" per-page="10">
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
import {getDictMapping,transformDict } from '../../../util/assist';
import {default as Message} from '../../../components/basic/message';


export default {
    data () {
        let parttimeData = {
            empFullName: {
                label: this.$t('staff.employeeName')
            },
            employeeCode:{
              label: this.$t('staff.employeeId')
            },
            orgUnitName: {
              label: this.$t('staff.organization')
            },
            positionName: {
                label: this.$t('staff.position')
            },
            status: {
                label: this.$t('staff.status')
            }
        };
            return {
                moreParams: [],
                moreParamsKeys: ['empFullName', 'employeeCode', 'unitId', 'positionName', 'status'],
                org: {
                  modal: false
                },
                selectedRow: [],
                parttimeSchema:new Schema(parttimeData),
                parttime: {},
                idTypeDist: {},
                statusDist: {},
                mibGradeDist: {},
                expendIcon: 'fa-angle-double-down',
                expended: false,
                columns: [{
                      name: '__checkbox:',
                      title: ''
                    },
                    {
                      name: 'empFullName',
                      title: this.$t('staff.name'),
                      callback: 'cname'
                    },
                    {
                      name: 'idType',
                      title: this.$t('staff.idType'),
                      callback: 'fixIdType'
                    },
                    {
                      name: 'employeeCode',
                      dataClass: 'tr',
                      title: this.$t('staff.employeeId')
                    },
                    {
                      name: 'empPositionName',
                      title: this.$t('staff.hostPosition1')
                    },
                    {
                      name: 'empUnitShortName',
                      title: this.$t('staff.hostOrganizatoin1')
                    },
                    {
                      name: 'positionName',
                      title: this.$t('staff.parttimePosition')
                    },
                    {
                      name: 'unitName',
                      title: this.$t('staff.parttimeOrganization')
                    },
                    {
                      name: 'mibGrade',
                      title: this.$t('staff.mibGrade'),
                      callback: 'fixMibGrade'
                    },
                    {
                      name: 'beginDate',
                      titleClass: 'mw80',
                      dataClass: 'tr',
                      title: this.$t('staff.startDate')
                    },
                    {
                      name: 'expectedEndDate',
                      dataClass: 'tr',
                      titleClass: 'mw80',
                      title: this.$t('staff.expectedEndDate')
                    },
                    {
                      name: 'endDate',
                      dataClass: 'tr',
                      titleClass: 'mw80',
                      title: this.$t('staff.endDate')
                    },
                    {
                      name: 'status',
                      title: this.$t('staff.status'),
                      callback: 'fixStatus'
                    }
                ]
            };
        },
        computed: {},
        created() {
          var self = this;
          let dictCodes = ['ID_TYPE', 'PART_TIME_STATUS', 'MIB_RANK'];
          let obj = {
            dictCodes : dictCodes
          }

          this.$http.post('/public-access/dicts/items', {
            dictCodes
          }, {
              emulateJSON: true
          }).then((response) => {
            for (var d of response.data) {
                if (d.dictName === 'ID_TYPE') {
                   self.idTypeDist = transformDict(d.dict);
                }
                if (d.dictName === 'PART_TIME_STATUS') {
                   self.statusDist = transformDict(d.dict);
                }
                if (d.dictName === 'MIB_RANK') {
                   self.mibGradeDist = transformDict(d.dict);
                }
            }
          });
        },
        mounted() {
          this.parttime = this.parttimeSchema.newModel();
        },
        methods: {
            openSelector() {
              this.$refs['orgselect'].open();
            },
            search() {
              this.moreParams = [];
              for (let i = 0, len = this.moreParamsKeys.length; i < len; i++) {
                let key = this.moreParamsKeys[i];
                let value = this.parttime[key];
                if (value || value === 0) {
                  this.moreParams.push(key + '=' + value);
                }
              }
              this.$nextTick(function() {
                this.$refs.vuetable.reloadData();
              })
            },
            reset() {
              this.parttime.reset();
              this.parttime.unitId = '';
            },
            goInterim() {
              this.$router.push({ name: 'interim'});
            },
            goTransfer() {
              var tableData = this.$refs.vuetable.tableData;
              if (this.selectedRow.length === 1) {
                if (tableData[this.selectedRow[0]].status === '0') {
                  Message({
                      type: 'error',
                      message: this.$t('staff.message.isTerminate')
                  });
                  return;
                }
                this.$router.push({ name: 'partTimeTransfer', params: { employeeId: tableData[this.selectedRow[0]].employeeId, partTimeId: tableData[this.selectedRow[0]].partTimeId }});
              } else {
                Message({
                    type: 'error',
                    message: this.$t('staff.message.selectOnePerson')
                });
              }
            },
            goTerminate() {
              var tableData = this.$refs.vuetable.tableData;
              if (this.selectedRow.length === 1) {
                if (tableData[this.selectedRow[0]].status === '0') {
                  Message({
                      type: 'error',
                      message: this.$t('staff.message.isTerminate')
                  });
                  return;
                }
                this.$router.push({ name: 'partTimeTerminate', params: { employeeId: tableData[this.selectedRow[0]].employeeId, partTimeId: tableData[this.selectedRow[0]].partTimeId }});
              } else {
                Message({
                    type: 'error',
                    message: this.$t('staff.message.selectOnePerson')
                });
              }
            },
            fixIdType(value) {
              return this.fixDist(value, this.idTypeDist);
            },
            fixStatus(value) {
              return this.fixDist(value, this.statusDist);
            },
            fixMibGrade(value) {
              return this.fixDist(value, this.mibGradeDist);
            },
            fixDist(value, dist) {
              var result = '';
              for (var key of Object.keys(dist)) {
                if (dist[key] === value) {
                  result = key;
                  break;
                }
              }
              return result;
            },
            expendSearch() {
              this.expended = !this.expended;
              this.expendIcon = this.expended ? 'fa-angle-double-up' : 'fa-angle-double-down';
            },
            cname(value, data) {
              return `<a href="${location.href}/view/${data.employeeId}">${value}</a>`;
            },
            selectOrg(value) {
              if (value) {
                  this.parttime.orgUnitName = value.orgShortName;
                  this.parttime.unitId = value.orgId;
              }
            }
        },
        components: {}
};

</script>
