<style lang="less">

.ihr-staff-emp-res {
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
    .resigned-form {
      height: 46px;
      margin: 0 40px;
    }
    .resigned-form.expended {
      height: 138px;
    }
    .vuetable-area.oxc{
      overflow-x: scroll;
    }
}

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-staff-emp-res">
    <div class="mb20 pt20">
        <div class="search-area">
            <organization-selector :show.sync="org"></organization-selector>
            <v-form :class="{expended: expended}" :model="resigned" :schema="resignedSchema" label-width="170" label-suffix="" :cols="3" form-style="resigned-form">
                <text-field property='fullName' editor-width="150"></text-field>
                <text-field property="positionName" editor-width="150"></text-field>
                <text-field type="selector" :readonly="true" :show.sync="org" property="orgUnitName" editor-width="150"></text-field>
                <select-field v-show="expended" property="dimissionType" :mapping="dimissionType" editor-width="150"></select-field>
                <select-field v-show="expended" property="resignationReason" :mapping="resignationReason" editor-width="150"></select-field>
                <select-field v-show="expended" property="staffCategory" :mapping="staffCategory" editor-width="150"></select-field>
                <radioGroup-field v-show="expended" property="addToBlacklist" :mapping="whetherType" editor-width="150"></radioGroup-field>
                <radioGroup-field v-show="expended" property="contractTermination" :mapping="whetherType" editor-width="150"></radioGroup-field>
            </v-form>
            <ui-icon-button :class="[{expended: expended},'expend-btn']" :icon="expendIcon" @click="expendSearch"></ui-icon-button>
            <div class="query-btn">
                <ui-button class="query-btn-search mr10" color="primary" @click="search">{{$t('button.search')}}</ui-button>
                <ui-button class="query-btn-reset btn-default-bd" type="flat" @click="reset">{{$t('button.reset')}}</ui-button>
            </div>
        </div>
        <div class="group">
            <ui-button class="mr10 dis-tc btn-primary-bd" @click="rehire" color="primary" icon="fa-user" :text="$t('button.rehire')"></ui-button>
            <ui-button class="mr10 dis-tc btn-default-bd" @click="download" type="primary" icon="fa-cloud-download" :text="$t('button.download')"></ui-button>
        </div>
        <div class="vuetable-wrapper">
          <vuetable v-ref:vuetable api-url="/employee/resigned/employees" :append-params="moreParams" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="columns" per-page="10">
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
import {formatDate,getDictMapping,downloadFile,transformDict} from '../../../util/assist';
import {default as Message} from '../../../components/basic/message';

export default {
    data() {
        let resignedSchema = new Schema({
            fullName: {
                label: this.$t('staff.employeeName')
            },
            positionName: {
                label: this.$t('staff.position')
            },
            orgUnitName:{
              label: this.$t('staff.organization')
            },
            dimissionType:{
              label: this.$t('staff.typeOfDimission')
            },
            resignationReason:{
              label: this.$t('staff.resignationReason')
            },
            staffCategory:{
              label: this.$t('staff.staffCategory')
            },
            addToBlacklist:{
              label: this.$t('staff.addToBlacklist')
            },
            contractTermination:{
              label: this.$t('staff.contractTermination')
            }
        });
            return {
                org: {
                  modal: false
                },
                moreParams: [],
                moreParamsKeys: ['fullName', 'positionName', 'unitId', 'dimissionType', 'resignationReason', 'staffCategory', 'addToBlacklist', 'contractTermination'],
                selectedRow: [],
                resignedSchema:resignedSchema,
                resigned:resignedSchema.newModel(),
                expendIcon: 'fa-angle-double-down',
                expended: false,
                dimissionType: {},
                resignationReason: {},
                whetherType: {},
                staffCategory: {},
                employementCategory: {},
                columns: [{
                      name: '__checkbox:employeeId',
                      title: ''
                    },
                    {
                      name: 'fullName',
                      title: this.$t('staff.name'),
                      callback: 'cname'
                    },
                    {
                      name: 'loginId',
                      title: this.$t('staff.loginId')
                    },
                    {
                      name: 'positionName',
                      title: this.$t('staff.position')
                    },
                    {
                      name: 'orgShortName',
                      title: this.$t('staff.organization')
                    },
                    {
                      name: 'employementDate',
                      dataClass: 'tr',
                      titleClass: 'mw80',
                      title: this.$t('staff.hireDate'),
                      callback: 'format'
                    },
                    {
                      name: 'effectiveDate',
                      dataClass: 'tr',
                      titleClass: 'mw80',
                      title: this.$t('staff.dismissionDate'),
                      callback: 'format'
                    },
                    {
                      name: 'dimissionType',
                      title: this.$t('staff.typeOfDimission'),
                      callback: 'fixDimissionType'
                    },
                    {
                      name: 'resignationReason',
                      title: this.$t('staff.resignationReason'),
                      callback: 'fixResignationReason'
                    },
                    {
                      name: 'employementCategory',
                      title: this.$t('staff.staffCategory'),
                      callback: 'fixEmployeeCategory'
                    },
                    {
                      name: 'addToBlacklist',
                      title: this.$t('staff.addToBlacklist'),
                      callback: 'isBlacklist'
                    },
                    {
                      name: 'contractTermination',
                      title: this.$t('staff.contractTermination'),
                      callback: 'contractTermination'
                    }
                ]
            };
        },
        computed: {},
        created() {
          var self = this;
          let dictCodes = ['TERMINATION_TYPE', 'TERMINATION_REASON', 'WHETHER_TYPE', 'EMPLOYEE_CATEGORY'];
          let obj = {
            dictCodes : dictCodes
          }

          this.$http.post('/public-access/dicts/items', {
            dictCodes
          }, {
              emulateJSON: true
          }).then((response) => {
            for (var d of response.data) {
                if (d.dictName === 'TERMINATION_TYPE') {
                   self.dimissionType = transformDict(d.dict);
                }
                if (d.dictName === 'TERMINATION_REASON') {
                   self.resignationReason = transformDict(d.dict);
                }
                if (d.dictName === 'WHETHER_TYPE') {
                   self.whetherType = transformDict(d.dict);
                }
                if (d.dictName === 'EMPLOYEE_CATEGORY') {
                   self.employementCategory = transformDict(d.dict);
                }
            }
          });
          this.$http.get('/employee/employees/dicts/EMPLOYEE_CATEGORY/items/1').then(function(res) {
            if(res.data) {
              var data = {};
              res.data.forEach(function(item) {
                data[item.NAME] = item.VALUE;
              })
              this.staffCategory = data;
            }
          })
        },
        ready() {},
        attached() {},
        methods: {
            rehire() {
              if (this.selectedRow.length === 1) {
                this.$http.get('/employee/resigned/employees/rehire?employeeId=' + this.selectedRow[0]).then(function(res){
                  if(!res.data) {
                    this.$route.router.go({ name: 'resignedEmployeeEdit', params: { employeeId: this.selectedRow[0] }});
                  } else {
                    Message({type:'error',message:this.$t('staff.message.cannotReHire')});
                  }
                })
              } else {
                Message({
                    type: 'error',
                    message: this.$t('staff.message.selectOnePerson')
                });
              }
            },
            download() {
              var tablePagination = this.$refs.vuetable.tablePagination;
              if (tablePagination && tablePagination.total > 5000) {
                Message({
                    type: 'error',
                    message: this.$t('staff.message.downloadLimit')
                });
                return;
              }
              var resigned = this.resigned;
              var data = {};
              this.moreParamsKeys.forEach(function(item) {
                var value = resigned[item];
                if (value || value === '0') {
                  data[item] = value;
                }
              });
              downloadFile('/employee/resigned/exportEmployees', data);
            },
            search() {
              this.moreParams = [];
              for (let i = 0, len = this.moreParamsKeys.length; i < len; i++) {
                let key = this.moreParamsKeys[i];
                let value = this.resigned[key];
                if (value || value === 0) {
                  this.moreParams.push(key + '=' + value);
                }
              }
              this.$nextTick(function() {
                this.$broadcast('vuetable:refresh')
              })
            },
            reset() {
              this.resigned.reset();
              this.resigned.unitId = '';
            },
            expendSearch() {
              this.expended = !this.expended;
              this.expendIcon = this.expended ? 'fa-angle-double-up' : 'fa-angle-double-down';
            },
            // 匹配字典
            fixDist(value, option) {

              var dist = {};
              switch(option) {
                case 'dimissionType': dist = this.dimissionType || {}; break;
                case 'resignationReason': dist = this.resignationReason || {}; break;
                case 'whetherType': dist = this.whetherType; break;
                case 'employementCategory': dist = this.employementCategory; break;
              }
              for (let key of Object.keys(dist)) {
                if (dist[key] === value) {
                  value = key;
                  break;
                }
              }
              return value;
            },
            cname(value, data) {
              return `<a href="${location.href}/${data.employeeId}">${value}</a>`;
            },
            // 格式化时间
            format(value) {
              if (!value) {
                return ''
              }
              return formatDate(new Date(value));
            },
            isBlacklist(value) {
              return this.fixDist(value, 'whetherType');
            },
            contractTermination(value) {
              return this.fixDist(value, 'whetherType');
            },
            fixDimissionType(value) {
              return this.fixDist(value, 'dimissionType');
            },
            fixResignationReason(value) {
              return this.fixDist(value, 'resignationReason');
            },
            fixEmployeeCategory(value) {
              return this.fixDist(value, 'employementCategory');
            }
        },
        events: {
            'organization-selector:selected': function(value) {
                if (value) {
                    this.resigned.orgUnitName = value.orgShortName;
                    this.resigned.unitId = value.orgId;
                }
            }
        },
        components: {}
};

</script>
