<style lang= "less">
.ihr-performance-manageOrgScheme{
  .ui-tabs-header-items{
    border-bottom: 2px solid #fafafa;
  }

  .ihr-staff-annual {
      font-size: 14px;
      .ui-radio-label-text {
        line-height: 32px;
        margin: 0 10px;
      }
      .search {
        position: relative;
      }
      .search .expend-btn {
        position: absolute;
        right: 0;
        top: 5px;
      }
      .search .query-btn {
        text-align: center;
        margin: 20px;
        padding-top: 20px;
        border-top: 1px solid #ecedee;
      }

      .annual-form {
        height: 46px;
        overflow: hidden;
        transition: height .3s linear;
      }
      .annual-form.expended {
        height: 92px;
        transition: height .3s linear;
      }
  }


  .cell {
    width: 50px;
    .label-text {
      text-align:left;
    }
  }

  .proc-label {
    text-align:left;
    width: 200px;
  }
  .cell-line {
    width:27px;
    text-align: left;
    display: table-cell;
  }

  .operate {
    background: transparent;
    border: none;
    font-size: 15px;
    margin-left: 20px;
  }

  .nodeStyle {
    display:table-cell;
  }

  .ui-tab-header-item {
    font-weight: bold;
  }

  .process-default {
    width: 120px;
    height: 40px;
    line-height: 41px;
    text-align: center;
    border: 1px solid #e3e3e3 !important;
  }

  .process-default:after {
    content: '';
    display: inline-block;
    position: relative;
    top: -42px;
    right: -73px;
    width: 12px;
    height: 1px;
    background: #68b8f0;
}
  .operationText{
    width: 120px;
    height: 25px;
    margin-bottom: 5px;
    text-align: center;
    label {
      line-height: 25px;
    }
  }

  .cell-1-5 {
      width: 13%;
  }


  .process-set-ctn li:last-child .process-default:after  {
    display:none;
  }

  .label-proccess {
    text-align:left;
    width:200px;
  }

  .weight-form {
    .field-content {
      vertical-align: top;
      font-size: 14px;
      padding-left: 20px;
      padding-right: 0px;
      box-sizing: border-box;
      border-radius: 2px;
      line-height: 32px;
    }
  }

  .percentClass{
    position: relative;
    right: -45px;
    top: -43px;
  }

  .proc-input {
    margin-left: 14px;
  }

  .action-custom {
    width: 127px;
    text-align:center;
    .operate-custom {
      display: block;
      margin: 5px auto;
      color: blue;
      background: transparent;
      border: none;
      font-size: 15px;
    }
  }
}

</style>

<template lang="html">
<div class="content-wrap ihr-performance-manageOrgScheme">
  <panel :title="panelTitle" class="panel-b" header="panel-header">
      <ui-tabs ref="uitabs" type="text" background-color="clear" text-color="gray" text-color-active="primary" @tab-change="activeTabChanged">
          <ui-tab :title="$t('performance.basicInformation')" id = 'basic'>
            <v-form :model="basicModel" :schema="basicSchema" label-width="150" label-suffix="" :cols="1" form-style="org-form">
              <text-increment property='schemeName' editor-width="400"></text-increment>
              <text-increment property="restrictYear" editor-width="400"></text-increment>
              <text-increment property="frequencyName" editor-width="400"></text-increment>
              <text-increment property="schemePeriodName" editor-width="400"></text-increment>
              <text-increment property="templateName" editor-width="400"></text-increment>
              <text-increment property='startDate' editor-width="400"></text-increment>
              <text-increment property='endDate' editor-width="400"></text-increment>
            </v-form>
            <div class="btn-group">
                <!-- <ui-button @click="basicNext" color="primary mr10">Next</ui-button> -->
                <ui-button @click="cancel" class="btn-default-bd" type="flat">{{$t('button.cancel')}}</ui-button>
            </div>
          </ui-tab>

          <ui-tab :title="$t('performance.employees')" id = 'employees'>
            <div class = "field emp-select-field">
                <label class="prop-name">{{$t('performance.selectEmployees')}}</label><ui-button @click = "empShow.modal = true; $refs.perselect.open()" class="query-btn-reset btn-default-bd" type="flat">{{$t('button.select')}}</ui-button>
            </div>
            <div class="pb16">
              <vuetable ref="aemployeestable" @emptable="empTable" :api-url="tableUrl" :selected-to="selectedRow" :append-params="empParams"  :fields="columns"  pagination-path = "" table-wrapper=".vuetable-wrapper pl16 pr16 pb16" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
              </vuetable>
            </div>
            <div class="btn-group">
                <!-- <ui-button @click="toProcess" color="primary mr10">Next</ui-button>
                <ui-button @click="tabChange('basic')" class="btn-default-bd" type="flat">Back</ui-button> -->
                <ui-button @click="cancel" class="btn-default-bd" type="flat">{{$t('button.cancel')}}</ui-button>
            </div>
            <person-selector ref="perselect" :show="empShow"></person-selector>
            <ind-model ref="indmodel" @modelsubmit="modelSubmit" :show="show.indSetView" :params = "indModalParam"></ind-model>
            <indview-model ref="indviewmodel" :show="show.indview"></indview-model>
            <ui-confirm
              ref="delconfirm" 
              @confirm="deleteConfirmed" @denied="deleteDenied" :show="show.delConfirm"
              close-on-confirm>
              {{$t('common.deleteConfirm')}}
            </ui-confirm>
          </ui-tab>

          <ui-tab :title="$t('performance.process')" id="process">
            <div class="field-row">
                <div class="cell field"><label>{{$t('performance.processName')}}</label></div>
                <div class="cell field"><label class="label-proccess">{{processData.processName}}</label></div>
            </div>
            <div class="process-set-ctn">
                <ul class="fix cell-g">
                    <template v-for="(item, index) in processData.nodeList">
                        <li class="process-set-item cell-1-5">
                            <div class="img-wrap process-default">
                                <div class="valign">
                                  <label>{{item.approveRoleName}}</label>
                                </div>
                            </div>
                            <div class="text operationText">
                              <label>{{item.nodeName}}</label>
                            </div>
                            <v-form :model="item" :schema="processSchema" label-width="0" form-style="weight-form">
                              <div class="text proc-input" v-show="item.approveRole == 4">
                                <text-increment property='employeeName' editor-width="100"></text-increment>
                              </div>
                              <div class="text proc-input" v-show="item.stageName == 'performanceEvaluate'">
                                <text-increment property='nodeWeight' editor-width="100"></text-increment>
                              </div>
                            </v-form>
                        </li>
                    </template>
                </ul>
            </div>
            <div class="vuetable-wrapper">
              <vuetable ref="protable" :api-url="proTableUrl" :append-params="proParams"  :fields="proColumns"  pagination-path = "" table-wrapper=".vuetable-wrapper" :sort-order="sortOrder" :item-actions="proActItem" per-page="10">
              </vuetable>
            </div>
            <div class="btn-group">
                <ui-button @click="cancel" class="btn-default-bd" type="flat">{{$t('button.cancel')}}</ui-button>
            </div>
            <ui-confirm ref="submitconfirm" @confirm="submitConfirmed" :show="show.submitConfirm" close-on-confirm>
                {{$t('common.submitConfirm')}}
            </ui-confirm>
          </ui-tab>
      </ui-tabs>
  </panel>
</div>
</template>

<script type="text/ecmascript-6">

import Vue from 'vue';
import { getDictMapping,initFormData,convert,formatDate,transformDict} from '../../util/assist';
import {
    default as Schema
}
from '../../schema/index';
import { default as Message } from '../../components/basic/message';
import indicatorView from './indicatorViewModal.vue';
import indicatorSettings from './indicatorSettingsModal.vue';
Vue.component('individual-custom-action', {
  template: [
    '<div class="action-custom">',
      '<button class="operate-custom" v-show="showInd==true && showActivate==false" @click="itemAction(\'view-item\', rowData)"><i>{{$t(\'performance.indicatorView\')}}</i></button>',
      '<button class="operate-custom" v-show="showInd==true && showActivate==true" @click="itemAction(\'edit-item\', rowData)"><i>{{$t(\'performance.indicatorSetting\')}}</i></button>',
      '<button class="operate-custom" v-show="showActivate"  @click="itemAction(\'activate-item\', rowData)"><i>{{$t(\'button.activate\')}}</i></button>',
      '<button class="operate-custom" @click="itemAction(\'delete-item\', rowData)"><i>{{$t(\'button.delete\')}}</i></button>',
    '</div>'
  ].join(''),
  //
  computed: {
    showInd() {
      return  this.rowData.indicatorsSetting == '2' ? false : true;
    },
    showActivate() {
      return this.rowData.status == '2' ? true : false;
    }
  },

  // vuetable will inject the row data via `row-data` prop
  props: {
    rowData: {
      type: Object,
      required: true
    }
  },
  methods: {
    itemAction: function(action, data) {
        this.$parent.$emit('emptable', action, data)
      // console.log('custom-action: ' + action, data.name)
    }
  }
})


export default {
    data() {
      let self = this;
      let basicSchema = new Schema({
          schemeName: {
              label: self.$t('performance.schemeName'),
              required: true,
              whitespace: false
          },
          schemeCategoryName: {
              label: self.$t('performance.schemeCategory'),
          },
          templateName: {
              label: self.$t('performance.selectTemplate'),
          },
          restrictYear: {
              label: self.$t('performance.restrictToYear'),
              required: true,
              whitespace: false,
              mapping: function() {
                return getDictMapping('YEAR');
              }
          },
          frequencyName: {
              label: self.$t('performance.frequency'),
              whitespace: false
          },
          schemePeriodName: {
              label: self.$t('performance.schemePeriod'),
              whitespace: false
          },
          startDate: {
              label: self.$t('staff.startDate'),
              required: true,
              type: 'datetime',
              default () {
                  return new Date();
              }
          },
          endDate: {
              label: self.$t('staff.endDate'),
              required: true,
              type: 'datetime',
              default () {
                  return new Date();
              }
          }
      });
      let processSchema = new Schema({
        processId: {
            label: '',
            required:false,
            whitespace: false,
            mapping: function() {
              return new Promise((resolve) => {
                Vue.http.get(`/performance/processTemplates/dropdownList`).then((response) => {

                  let data = response.data;
                  if(data) {
                    let result = {};
                    if(data && data instanceof Array) {
                      for(let i = 0;i < data.length;i++) {
                        result[data[i].processTemplateName] = data[i].processTemplateId
                      }
                    resolve(result);
                    }
                  }
                })
              });
            }
        },
        employeeName: {
          whitespace: false
        },
        nodeWeight: {
          mobile: true,
          rules: {
            type:'number'
          },
          whitespace: false
        },
        processTemplateName: {
          label: '',
          whitespace: false
        }

      });

            return {
                panelTitle: this.$t('performance.manageIndividualScheme'),
                tableUrl:'/performance/schemeInfos/employeeList',
                empTableUrl:'person/employees',
                proTableUrl:'/performance/schemeInfos/processList',
                empOperaterow:{},
                indModalParam : {},
                processData:{
                  processName:'',
                  nodeList:[]
                },
                show: {
                  indview:false,
                  indSetView:false,
                  submitConfirm:false,
                  delConfirm:false
                },
                empShow: {
                  modal:false
                },
                basicSchema: basicSchema,
                basicModel: basicSchema.newModel(),
                processSchema: processSchema,
                processModel: processSchema.newModel(),
                schemeValidStatus: {},
                itemActions: [
                  { name: 'view-item', label: '', icon: 'fa fa-eye', class: 'operate'},
                  { name: 'delete-item', label: '', icon: 'fa fa-trash', class: 'operate' }
                ],
                columns: [
                  {
                    name: 'employeeName',
                    title: this.$t('staff.employeeName')
                  },
                  {
                    name: 'employeeCode',
                    dataClass: 'tr',
                    title: this.$t('staff.employeeId')
                  },
                  {
                    name: 'positionName',
                    title: this.$t('performance.position')
                  },
                  {
                    name: 'orgFullName',
                    title: this.$t('staff.organization')
                  },
                  {
                    name: 'status',
                    title: this.$t('performance.status'),
                    callback: function(value) {
                      return self.fixStatus(value);
                    }
                  },
                  {
                    name: '__component:individual-custom-action',
                    title: this.$t('performance.actions')
                  }
                ],
                proActItem: [
                  { name: 'view-item', label: '', icon: 'fa fa-eye', class: 'operate'}
                ],
                proColumns: [
                    {
                      name: 'employeeName',
                      title: this.$t('staff.employeeName')
                    },
                    {
                      name: 'employeeCode',
                      dataClass: 'tr',
                      title: this.$t('staff.employeeId')
                    },
                    {
                      name: 'positionName',
                      title: this.$t('performance.position')
                    },
                    {
                      name: 'approveStagesList',
                      title: this.$t('performance.approveStages'),
                      callback: function(value) {
                        let resStr = ""
                        if(!value instanceof Array) return;
                        value.forEach(function(item, index) {
                          let approvePeople = item.approvePeople ? item.approvePeople.join(",") : self.$t('performance.noPeople');
                          resStr += approvePeople;
                          if(index < (value.length-1)) {
                            resStr += "<img class='wh-px40 br50 ml5 mr5' src='../../assets/images/public/arrows.png' alt='' />";
                          }
                        })
                        return resStr;
                      }
                    }
                ]
            }
        },
        components: {
          'indview-model' : indicatorView,
          'ind-model' : indicatorSettings,
            Panel: require('../../components/basic/panel.vue')
        },
        created() {
          var self = this;
          let dictCodes = ['SCHEME_VALID_STATUS'];
          this.$http.post('/public-access/dicts/items', {
              dictCodes
          }, {
              emulateJSON: true
          }).then((response) => {
              for (var d of response.data) {
                  if (d.dictName === 'SCHEME_VALID_STATUS') {
                      self.schemeValidStatus = transformDict(d.dict);
                  }
              }
          });
        },
        mounted() {
          this.$nextTick(function() {
            this.initRoute()
          })
        },
        computed: {
          empParams() {
            let schemeId = this.schemeId ? this.schemeId : "";
            return [
              `schemeId=${schemeId}`
            ]
          },
          proParams() {
            let schemeId = this.schemeId ? this.schemeId : "";
            return [
              `schemeId=${schemeId}`
            ]
          },
          schemeId() {
            return this.$route.params.id ? this.$route.params.id : 0;
          }
        },
        events: {
          'selected-person': function(selectedData) {
            if(this.$route.params.step === "employees") {
              //校验选中的人员是否在列表里面
              let tableData = this.$refs.aemployeestable.tableData;
              let selectedParam = [];

              for(let i = 0; i < selectedData.length ; i++) {
                if(!this.isExist(selectedData[i],tableData)) {
                  selectedParam.push(selectedData[i]);
                }
              }

              let param = {
                schemeId: this.schemeId,
                schemeEmployeeList : selectedParam
              };

              let data = {};
              convert(param, data, "", true);
              this.$http.post('/performance/schemeInfos/createRelated',data, {
                  emulateJSON: true
              }).then((response) => {
                  this.$refs.aemployeestable.reloadData();
              });
            }
          },
          'vuetable:action': function(action, data) {
              this.empOperaterow = data;
              if (action == 'view-item') {
                let params = {
                  schemeId:this.schemeId,
                  employeeId:data.employeeId
                };
                this.$refs.indviewmodel.open()
                this.$nextTick(()=>{
                  this.$refs.indviewmodel.initTable(params)
                })
              } else if (action == 'delete-item') {
                this.$refs.delconfirm.open()
              }
          }
        },

        methods: {
          activeTabChanged(id) {
            if(id === 'basic') {
              this.tabChange("basic",this.schemeId);
            } else if (id === 'employees') {
              this.tabChange("employees",this.schemeId);
            } else {
              this.tabChange("process",this.schemeId);
            }
          },
          empTable(action, data) {
              this.empOperaterow = data;
              if (action == 'view-item') {
                let params = {
                  schemeId:this.schemeId,
                  employeeId:data.employeeId
                };
                this.$refs.indviewmodel.open()
                this.$nextTick(()=>{
                  this.$refs.indviewmodel.initTable(params)
                })
              } else if (action == 'activate-item') {
                this.setEmpActivate(data.schemeEmployeeId);
              } else if (action == 'edit-item') {
                this.indModalParam.schemeId = this.schemeId;
                this.indModalParam.employeeId = data.employeeId;
                this.indModalParam.schemeEmployeeId = data.schemeEmployeeId;
                this.$refs.indmodel.open()
                this.$nextTick(()=>{
                  this.$refs.indmodel.initTable()
                })
              } else if (action == 'delete-item') {
                this.$refs.delconfirm.open()
              }
          },
          modelSubmit(params) {
            let _self = this;
            let data = {};
            convert(params, data, "", true);
            _self.$http.post('/performance/schemeInfos/updateIndicator',data,{
              emulateJSON: true
            }).then((response) => {
              _self.openMessage('success',this.$t('common.saveSuccess'));
              this.$refs.indmodel.close()
            });
          },
          fixStatus(value) {
            var dist = this.schemeValidStatus;
            var result = '';
            for (let key of Object.keys(dist)) {
                if (dist[key] === value) {
                    result = key;
                    break;
                }
            }
            return result;
          },
          basicNext() {
            this.tabChange("employees",this.schemeId);
          },
          tabChange(tabId,aid) {
              let param = {
                step: tabId || 'basic',
                id: aid || this.schemeId || '0'
              };
              let name = 'manageIndividualScheme';
              this.$router.push({ name: name, params: param});
          },
          initEditModal(data){
            this.weightModel.employeeId = data.employeeId;
            this.weightModel.businessUnitProportion = data.businessUnitProportion;
            this.weightModel.unitProportion = data.unitProportion;
            this.weightModel.personalProportion = data.personalProportion;
          },
          toProcess() {
            this.tabChange('process',this.schemeId);
          },
          openMessage(type,message){
            Message({
              type: type,
              message: message
            })
          },
          submit() {
            this.$refs.submitconfirm.open();
          },
          setEmpActivate(id) {
            let _self = this;
            let param = {
              schemeEmployeeIds : [id]
            };
            _self.$http.post('/performance/schemeInfos/activateRelated',param,{
              emulateJSON: true
            }).then((response) => {
              _self.openMessage('success',this.$t('performance.message.activateSuccess'));
              this.$refs.aemployeestable.reloadData();
            });
          },
          submitConfirmed() {
            this.forwardUrl('individualScheme');
          },
          deleteConfirmed() {
            let _self = this;

            let employeeId = this.empOperaterow.employeeId
            this.$http.delete(`/performance/schemeEmployees/${employeeId}`,{
              params:{
                schemeInfoId:this.schemeId
              }
            }).then((response) => {
              _self.openMessage('success',this.$t('common.deleteSuccess'));
              this.$refs.aemployeestable.reloadData();
              this.show.delConfirm = false;
            })
          },
          cancel() {
            this.$router.push({
                name: 'individualScheme',
            });
          },
          isExist(obj, arr) {
              let isExist = false;
              if (!obj) {
                return isExist;
              }
              for(let i = 0, len = arr.length; i < len; i++) {
                  if (obj.employeeId === arr[i].employeeId) {
                      isExist = true;
                      break;
                  }
              }
              return isExist;
          },
          forwardUrl(pathName, params) {
              params = params || {};
              this.$router.push({
                  name: pathName,
                  params: params
              });
              this.$router.push({name:pathName,params:params});
          },
          initRoute() {
                let _self = this;
                let step = _self.$route.params.step;
                _self.basicModel.id = _self.$route.params.id;

                if (_self.$route.name === 'manageIndividualScheme') {
                    if(!!step){
                      _self.$refs.uitabs.setActiveTab(step)
                      if(step === 'basic') {
                        initFormData('/performance/schemeInfos/detail',_self.basicModel,{schemeId:this.schemeId}).then(()=>{
                          _self.basicModel.startDate = formatDate(new Date(_self.basicModel.startDate));
                          _self.basicModel.endDate = formatDate(new Date(_self.basicModel.endDate));
                        });
                      } else if (step === 'employees') {
                      } else if (step === 'process') {
                        _self.processData.nodeList = [];
                        _self.$http.get('/performance/process/schemeProcessRatioList', {
                            params: {
                              schemeInfoId:_self.schemeId
                            },
                            emulateJSON: true
                        }).then((response) => {
                            let rep = response.data;

                            _self.processData.processName = rep.processTemplateName
                            for(let item of rep.processRatioNameList) {
                              let proModel = _self.processSchema.newModel();
                              proModel.approveRoleName = item.approveRoleName;
                              proModel.nodeName = item.nodeName;
                              proModel.templateRoleId = item.templateRoleId;
                              proModel.templateId = item.templateId;
                              proModel.operation = item.operation;
                              proModel.stageName = item.stageName;
                              proModel.nodeWeight = item.ratio + '%';
                              proModel.schemeId = this.schemeId;
                              proModel.employeeId = item.employeeId;
                              proModel.employeeName = item.employeeName;
                              proModel.approveRole = item.approveRole;
                              _self.processData.nodeList.push(proModel);
                              // _self.processData.nodeList.push({
                              //   nodeName: item.nodeName,
                              //   nodeWeight:item.ratio
                              // });
                            }
                        });
                      }
                    }
                }
            }
        }
}

</script>
