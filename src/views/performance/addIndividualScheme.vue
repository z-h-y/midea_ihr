<style lang="less">
.ihr-performance-addIndividualScheme{
  .ui-tabs-header-items{
    border-bottom: 2px solid #fafafa;
  }

  .ihr-staff-annual {
      font-size: 14px;
      .ui-radio-label-text {
        line-height: 32px;
        margin: 0 10px;
      }

      .form{
        height: 46px;
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
    width: 150px;
  }

  .cell-line {
    width:120px;
    text-align: left;
    display: table-cell;
  }

  .operate {
    background: transparent;
    border: none;
    font-size: 15px;
  }

  .nodeStyle {
    display:table-cell;
    .field-content {
      margin-left: 0px;
    }
  }

  .prop-name {
    width: 150px;
  }

  .emp-select-field {
    margin-bottom: 16px;
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

  .proc-operate {
    background: transparent;
    color: blue;
    border: none;
    font-size: 15px;
  }

  .proc-input {
    margin-left: -19px;
  }

  .operate {
    margin-top: 5px;
    color: blue;
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

  #process {
    .field-hint {
      visibility: hidden;
    }
  }
  .vuetable-actions {
    text-align: center;
  }

}

</style>

<template lang="html">
<div class="content-wrap ihr-performance-addIndividualScheme">
  <panel :title="panelTitle" class="panel-b" header="panel-header">
      <ui-tabs ref="uitabs" type="text" background-color="clear" text-color="gray" text-color-active="primary" @tab-change="handelTabChange">
          <ui-tab :title="$t('performance.basicInformation')" id = 'basic' :disabled='!isEdit'>
            <v-form ref="basicform" :model="basicModel" :schema="basicSchema" label-width="150" label-suffix="" :cols="1" form-style="org-form">
              <text-field ref="schemename" property='schemeName' editor-width="400"></text-field>
              <select-field property="restrictYear" editor-width="400" :mapping = "dictList.years"></select-field>
              <select-field property="frequency" editor-width="400" :select-change="setingSelected" :mapping="dictList.cycle"></select-field>
              <select-field property="schemePeriod" editor-width="400" :mapping="periodMapping" v-if = "showPeriod"></select-field>
              <text-field property='templateName' @open-selector="openSelector('tempselect')" type="selector" v-show="show.isView == false" :readonly="true" :show="tempShow" editor-width="400">
                <input type="hidden" v-model="basicModel.templateId">
              </text-field>
              <text-increment property="templateName" v-show = "show.isView == true" editor-width="400"></text-increment>
              <text-field property='startDate' editor-width="400"></text-field>
              <text-field property='endDate' editor-width="400"></text-field>
            </v-form>
            <div class="btn-group">
                <ui-button @click="basicNext" color="primary mr10">{{$t('button.next')}}</ui-button>
                <ui-button @click="cancel" class="btn-default-bd" type="flat">{{$t('button.cancel')}}</ui-button>
            </div>
          </ui-tab>

          <ui-tab :title="$t('performance.employees')" id = 'employees' :disabled='!isEdit'>
            <div class = "field emp-select-field">
                <label class="prop-name">{{$t('performance.selectEmployees')}}</label><ui-button @click = "empShow.modal = true;$refs.personselector.open()" class="query-btn-reset btn-default-bd" type="flat">{{$t('button.select')}}</ui-button>
            </div>
            <div class="vuetable-wrapper pb16">
              <vuetable ref="aemployeestable" :api-url="tableUrl" :selected-to="selectedRow" :append-params="empParams"  :fields="empColumns"  pagination-path = "" table-wrapper=".vuetable-wrapper pb16" @action="action" @empaction="empAction" :sort-order="sortOrder" :item-actions="empActItem" per-page="10">
              </vuetable>
            </div>
            <div class="btn-group">
                <ui-button @click="toProcess" color="primary mr10">{{$t('button.next')}}</ui-button>
                <ui-button @click="tabChange('basic')" class="btn-default-bd" type="flat">{{$t('button.back')}}</ui-button>
            </div>
            <ind-model ref="indmodel" @modelsubmit="modelSubmit" :show="show.indview" :params="indModalParam"></ind-model>
            <ui-confirm
              ref="delconfirm" @confirm="deleteConfirmed" @denied="deleteDenied" :show="show.delConfirm"
              close-on-confirm>
              {{$t('common.deleteConfirm')}}
            </ui-confirm>
            <person-selector ref="personselector" :show="empShow" :handle-comfirmed="selectedPerson"></person-selector>
          </ui-tab>

          <ui-tab :title="$t('performance.process')" id = 'process' :disabled='!isEdit' ref="itemforms">
              <div class="field-row">
                <v-form ref="processform" :model="processModel" :schema="processSchema" label-width="0" label-suffix=""  form-style="nodeStyle">
                  <div class="cell field textfield"><label>{{$t('performance.selectProcess')}}</label></div>
                  <!-- <div class="cell"><select-field label-width="0" :hide-label="true" property="processId" editor-width="200" :select-change="selectProcess"></select-field></div> -->
                  <div class="cell">
                    <text-field :hide-label="true" property='processTemplateName' @open-selector="openSelector('protemp')" type="selector" :readonly="true" :show="proTempShow" editor-width="200">
                      <input type="hidden" v-model="processModel.processTemplateId">
                    </text-field>
                  </div>
                </v-form>
              </div>
              <div class="process-set-ctn">
                  <ul class="fix cell-g">
                      <template v-for="(item, index) in nodeData">
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
                              <div class="text proc-input">
                                  <text-field :hide-label="true" property='employeeName' @open-selector="openSelector('proshow')" type="selector" :readonly="true" :show="proShow" editor-width="120" @click="catchItem(item)"  v-if="item.approveRole == 4">
                                    <input type="hidden" v-model="item.employeeId">
                                  </text-field>
                              </div>
                              <div class="text proc-input" v-show="item.stageName == 'performanceEvaluate' && countEvaluate != 1">
                                  <text-field ref="schemename" :hide-label="true" property='nodeWeight' editor-width="50">%</text-field>
                              </div>
                              <div class="text operationText" v-if="item.stageName == 'performanceEvaluate' && countEvaluate == 1">
                                <label>100%</label>
                                <input type="hidden" v-model="item.nodeWeight" value = "100">
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
                <ui-button @click="submitConfirmed" color="primary mr10">{{$t('button.submit')}}</ui-button>
                <ui-button @click="tabChange('employees')" class="btn-default-bd" type="flat">{{$t('button.back')}}</ui-button>
            </div>
            <person-selector ref="proshow" :show="proShow" multi-selected = "false" :handle-comfirmed="personCallback"></person-selector>
          </ui-tab>
      </ui-tabs>
  </panel>
<template-table-selector ref="tempselect" template-type="Individual" multi-selected="false" :show="tempShow" :handle-comfirmed="templateCallback"></template-table-selector>
<process-template-selector ref="protemp" :show="proTempShow" multi-selected="false" :handle-comfirmed="proTempCallback"></process-template-selector>
</div>

</template>

<script type="text/ecmascript-6">

import Vue from 'vue';
import {initFormData,transformDict,convert,formatDate} from '../../util/assist';
import {
    default as Schema
}
from '../../schema/index';
import { default as Message } from '../../components/basic/message';
import indicatorSettings from './indicatorSettingsModal.vue';

Vue.component('addIndividual-custom-action', {
  template: [
    '<div class="action-custom">',
      '<button class="operate-custom" v-show="showActivate==true" @click="itemAction(\'edit-item\', rowData)"><i>{{$t(\'performance.indicatorSetting\')}}</i></button>',
      '<button class="operate-custom" @click="itemAction(\'delete-item\', rowData)"><i>{{$t(\'button.delete\')}}</i></button>',
    '</div>'
  ].join(''),
  //
  computed: {
    showActivate() {
      return this.rowData.indicatorsSetting == '2' ? false : true;
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
        this.$parent.$emit('empaction', action, data)
      // console.log('custom-action: ' + action, data.name)
    }
  }
})



export default {
      data() {
            let _self = this;
            let basicSchema = new Schema({
            schemeName: {
                label: _self.$t('performance.schemeName'),
                required: true,
                whitespace: false,
                rules: {
                  type: 'custom',
                  message:  _self.$t('performance.rules.ruleSchemeNameExist'),
                  validate() {
                    return this.isNameNoExits;
                  }
                }
            },
            isNameNoExits: {
                default() {
                  return true;
                }
            },
            restrictYear: {
                label: _self.$t('performance.restrictToYear'),
                required: true,
                whitespace: false
            },
            frequency: {
                label: _self.$t('performance.frequency'),
                required: true
            },
            schemePeriod: {
                label: _self.$t('performance.schemePeriod'),
                required: true,
                rules: {
                  type: 'custom',
                  message: _self.$t('performance.rules.addIndividualSchemaRequired'),
                  validate() {
                    if(this.frequency== "1") {
                      return true;
                    } else if (this.schemePeriod != ''){
                      return true;
                    }
                  }
                }
            },
            templateName: {
              label: _self.$t('performance.selectTemplate'),
              required: true
            },
            startDate: {
                label: _self.$t('staff.startDate'),
                required: true,
                type: 'datetime'
            },
            endDate: {
                label: _self.$t('staff.endDate'),
                required: true,
                type: 'datetime'
            }
        });
        let processSchema = new Schema({
          processId: {
              label: '',
              whitespace: false
          },
          processTemplateName: {
            required: true,
            whitespace: false
          },
          nodeWeight: {
            required: true,
            whitespace: false,
            type: 'integer'
          },
          employeeName: {
            required: true,
            whitespace: false
          }
        });
            return {
                isEdit: false,
                panelTitle: this.$t('performance.addIndividualScheme'),
                // tableUrl:'/performance/schemeInfos/employeeList',
                tableUrl:'/performance/schemeInfos/employeeList',
                proTableUrl:'/performance/schemeInfos/processList',
                dictList: {
                  years:{},
                  cycle:{}
                },
                optPerson:{},
                periodMapping:{},
                empOperaterow:{},
                show: {
                  indview:false,
                  submitConfirm:false,
                  delConfirm:false,
                  isView:false
                },
                empShow: {
                  modal:false
                  // multiSelected:true
                },
                tempShow: {
                  modal:false
                },
                proShow:{
                  modal:false,
                },
                proTempShow: {
                  modal:false,
                },
                indModalParam : {},
                currentSchemeName:'',
                nodeData:[],
                basicSchema: basicSchema,
                basicModel: basicSchema.newModel(),
                processSchema: processSchema,
                processModel: processSchema.newModel(),
                empActItem: [
                  { name: 'edit-item', label: 'Indicator Setting', class: 'operate'},
                  { name: 'delete-item', label: 'Delete', class: 'operate' }
                ],
                empColumns: [
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
                      name: '__component:addIndividual-custom-action',
                      title: this.$t('performance.actions')
                    }
                ],
                proActItem: [
                  { name: 'edit-item', label: '', icon: 'fa fa-pencil', class: 'operate'},
                  { name: 'delete-item', label: '', icon: 'fa fa-trash', class: 'operate' }
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
                        if(!(value instanceof Array)) return;
                        value.forEach(function(item, index) {
                          let approvePeople = item.approvePeople ? item.approvePeople.join(",") : _self.$t('performance.noPeople');
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
        watch: {
          'basicModel.schemeName': {
            handler: function (val, oldVal) {

              if(!val || val === this.currentSchemeName) {
                return;
              }
              this.$http.get(`/performance/schemeInfo/personal/validSchemeName`,{params:{schemeName:val}}).then((response)=>{
                this.basicModel.isNameNoExits = response.body == 'true' ? true : false;
                this.$refs.schemename.validate();
              })
            }
          }
        },
        created() {
          this.initDictList();
        },
        mounted() {
          this.changeRoute()
        },
        components: {
          'ind-model' : indicatorSettings,
          Panel: require('../../components/basic/panel.vue')
        },
        computed: {
          empParams() {
            let schemeId = this.schemeId;
            return [
              `schemeId=${schemeId}`
            ]
          },
          proParams() {
            let schemeId = this.schemeId;
            let processTemplateId = this.processModel.processId || "";
            return [
              `schemeId=${schemeId}`,
              `processTemplateId=${processTemplateId}`
            ]
          },
          schemeId() {
            return this.$route.params.id ? this.$route.params.id : 0;
          },
          showPeriod() {
            if(!this.basicModel.frequency || this.basicModel.frequency == 1) {
              return false;
            } else {
              return true;
            }
          },
          countEvaluate() {
            let count = 0;
            for(let item of this.nodeData) {
              item.stageName == 'performanceEvaluate' ? count++ : '';
            }
            return count;
          }
        },

        methods: {
          empAction(action, data) {
              this.empOperaterow =  data;
              if (action == 'edit-item') {
                this.indModalParam.schemeId = this.schemeId;
                this.indModalParam.employeeId = data.employeeId;
                this.indModalParam.schemeEmployeeId = data.schemeEmployeeId;
                this.$refs.indmodel.open();
                this.$nextTick(()=>{
                  this.$refs.indmodel.initTable();
                })
              } else if (action == 'delete-item') {
                this.$refs.delconfirm.open()
              }
          },
          selectedPerson(selectedData) {
            if(this.$route.params.step === "employees") {
              //校验选中的人员是否在列表里面

              let tableData = this.$refs.aemployeestable.tableData;
              let selectedParam = [];

              for(let i = 0; i < selectedData.length ; i++) {
                if(!this.isExist(selectedData[i],tableData)) {
                  selectedParam.push(selectedData[i]);
                }
              }

              if(selectedParam.length < 1) {
                this.openMessage('error',this.$t('performance.message.selectPersonExists'));
                return;
              } else {
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
            }
          },
          action(action, data) {
              this.empOperaterow =  data;
              if (action == 'edit-item') {
                this.indModalParam.schemeId = this.schemeId;
                this.indModalParam.employeeId = data.employeeId;
                this.indModalParam.schemeEmployeeId = data.schemeEmployeeId;
                this.$refs.indmodel.open();
                this.$nextTick(()=>{
                  this.$refs.indmodel.initTable();
                })
              } else if (action == 'delete-item') {
                this.$refs.delconfirm.open()
              }
          },
          handelTabChange(tabId) {
            switch(tabId) {
              case 'basic': this.tabChange('basic',this.schemeId);break;
              case 'employees': this.tabChange("employees",this.schemeId);break;
              case 'process': this.tabChange('process',this.schemeId);break;
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
              this.$refs.indmodel.close();
            },(response) => {
              //失败
            });
          },
          openSelector(selector) {
            this.$refs[selector].open();
          },
          initDictList() {
            let dictCodes = ['SCHEME_CYCLE','YEAR', 'WHETHER_TYPE'];
            let obj = {
              dictCodes : dictCodes
            }
            this.$http.post('/public-access/dicts/items', {
              dictCodes
            }, {
                emulateJSON: true
            }).then((response) => {
              for (var d of response.data) {
                if (d.dictName === 'SCHEME_CYCLE') {
                   this.dictList.cycle = transformDict(d.dict);
                }
                if (d.dictName === 'YEAR') {
                   this.dictList.years = transformDict(d.dict);
                }
                if (d.dictName === 'WHETHER_TYPE') {
                   this.periodMapping = transformDict(d.dict);
                }
              }
            })
          },
          setDateType(date) {
            if (typeof date === 'string') {
              date = date.replace(/-/g,"/");
            }
            return date;
          },
          basicNext() {
            let _self = this;
            let _aPerformance = this.basicModel;

            let passed = this.$refs.basicform.isFormValidate();
            if (!passed) return;
            var startDate = this.setDateType(_aPerformance.startDate);
            var endDate = this.setDateType(_aPerformance.endDate);
            let params = {
              schemeName: _aPerformance.schemeName,
              restrictYear: _aPerformance.restrictYear,
              frequency: _aPerformance.frequency,
              schemePeriod: _aPerformance.schemePeriod,
              templateId: _aPerformance.templateId,
              startDate: formatDate(new Date(startDate)),
              endDate: formatDate(new Date(endDate))
            };
            //新增个人绩效  /performance/schemeInfos/personal/create
            if(_self.$route.name === 'addIndividualScheme') {
              _self.$http.post('/performance/schemeInfos/personal/create',params,{
                emulateJSON: true
              }).then((response) => {
                // _self.openMessage('success',this.$t('common.saveSuccess'));
                this.tabChange("employees",response.body);
              },(response) => {
                //失败
              });
              //编辑个人绩效
            } else if (_self.$route.name === 'editIndividualScheme') {
              let schemeInfoId = this.schemeId;
              _self.$http.post(`/performance/update/personal/schemeBasic/${schemeInfoId}`,params,{
                emulateJSON: true
              }).then((response) => {
                if(!!response.body) {
                  // _self.openMessage('success',this.$t('common.saveSuccess'));
                  this.tabChange("employees",this.schemeId);
                }
              });
            }
          },
          tabChange(tabId,aid) {
            let param = {
              step: tabId || 'basic',
              id: aid || this.schemeId || '0'
            };
            let name = !this.schemeId ? 'addIndividualScheme' : 'editIndividualScheme';
            this.$router.push({ name: name, params: param});
          },
          toFindPerson(opt) {
              this.proShow.modal = true;
          },
          toProcess() {
            this.tabChange('process',this.schemeId);
          },
          saveProc() {
            let _self = this;
            let processRatioList = [];
            let approvePeopleList = [];

            for(let item of this.nodeData) {
              if(item.stageName == 'performanceEvaluate') {
                processRatioList.push({
                  schemeInfoId:item.schemeId,
                  processTemplateId:item.templateId,
                  processNodeId:item.templateRoleId,
                  ratio:item.nodeWeight
                });
              }

              if(item.approveRole == '4') {
                approvePeopleList.push({
                  templateRoleId: item.templateRoleId,
                  employeeId: item.employeeId
                });
              }
            }

            let param = {
                schemeId: this.schemeId,
                processTemplateId: this.processModel.processId,
                processRatioList: processRatioList,
                templateRolePersonDtoList:approvePeopleList
            };

            let data = {};
            convert(param, data, "", true);

            //提交
            _self.$http.post('/performance/schemeInfos/updateSchemeTemplateId',data,{
              emulateJSON: true
            }).then((response) => {
              _self.openMessage('success', this.$t('common.saveSuccess'));
              this.$router.push({ name: 'individualScheme'});
            });
          },
          openMessage(type,message){
            Message({
              type: type,
              message: message
            })
          },
          submit() {
            // if (!this.checkForSubmit()) return;
            this.show.submitConfirm = true;
          },
          submitConfirmed() {
            if (!this.checkForSubmit()) return;
            this.saveProc();
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
          findNodeList(templateId) {
            let _self = this;
            this.nodeData = [];
            this.$http.get(`/performance/processTemplateRoles/${templateId}`).then((response) => {
              let nodeData = response.data;
              for(let item of nodeData) {
                let proModel = _self.processSchema.newModel();
                proModel.approveRoleName = item.approveRoleName;
                proModel.approveRole = item.approveRole;
                proModel.nodeName = item.nodeName;
                proModel.templateRoleId = item.templateRoleId;
                proModel.employeeId = item.employeeId;
                proModel.employeeName = item.employeeName;
                proModel.templateId = item.templateId;
                proModel.operation = item.operation;
                proModel.stageName = item.stageName;
                proModel.schemeId = this.schemeId;
                this.nodeData.push(proModel);
              }
              _self.$refs.aemployeestable.reloadData();
            })
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
              this.$refs.delconfirm.close()
            })
          },
          selectProcess(value) {
            this.findNodeList(value);
          },
          setingSelected(value) {
            this.$set(this.basicModel, 'schemePeriod','');
            let dictCode = this.getDictCode(value);
            this.loadPeriod(dictCode);
          },
          getDictCode(value) {
            switch (value) {
              case '2' :
                return 'SCHEME_CYCLE_SEMIYEAR';
                break;
              case '3' :
                return 'SCHEME_CYCLE_QUARTERLY';
                break;
              case '4' :
                return 'SCHEME_CYCLE_MONTHLY';
                break;
            }
          },
          loadPeriod(dictCode) {
            let _self = this;
            if(!!dictCode) {
              this.$http.get(`/public-access/dicts/${dictCode}/items`).then((response) => {
                if (response.data) {
                  // _self.basicModel.schemePeriod = '';
                  _self.periodMapping = transformDict(response.data);
                }
              });
            }
          },
          checkForSubmit() {
            return this.checkWeight() && this.checkCount() && true;
          },
          checkWeight() {
            let _self = this;
            let passed = true;
            passed = this.$refs.processform.isFormValidate();
            if (passed) {
              _self.nodeData.forEach(function(item, index) {
                  let vform = _self.$refs.itemforms.$children[index+5];
                  if(vform) {
                    passed = vform.isFormValidate();
                  }
              });
            }
            return passed;
          },
          checkCount() {
            let count = 0;
            for(let item of this.nodeData) {
              if(item.nodeWeight) {
                count += parseInt(item.nodeWeight);
              }
            }

            if(count != 100) {
              Message({
                type:'error',
                message: this.$t('performance.message.numCountTwo')
              })
              return false;
            } else {
              return true;
            }
          },
          personCallback(SelectedPer) {
            this.$set(this.optPerson, 'employeeId',SelectedPer[0].employeeId);
            this.$set(this.optPerson, 'employeeName',SelectedPer[0].employeeName);
          },
          templateCallback(SelectedPer) {
            this.$set(this.basicModel, 'templateId',SelectedPer[0].templateId);
            this.$set(this.basicModel, 'templateName',SelectedPer[0].templateName);
          },
          proTempCallback(SelectedPer) {
            this.$set(this.processModel, 'processId',SelectedPer[0].processTemplateId);
            this.$set(this.processModel, 'processTemplateName',SelectedPer[0].processTemplateName);
            this.findNodeList(this.processModel.processId);
          },
          catchItem(item) {
            this.optPerson = item;
          },
          changeRoute() {
            let _self = this;
            let routeName = _self.$route.name;
            let step = _self.$route.params.step;


            if (routeName === 'addOrgScheme') {
              if(!!step){
                _self.$refs.uitabs.setActiveTab(step)
                if(step === 'basic') {

                } else if(step === 'employees') {
                  _self.$nextTick(()=>{
                    this.$refs.aemployeestable.reloadData();
                  })
                } else if (step === 'process') {
                  this.nodeData = [];
                }
              }
            } else if (routeName === 'editIndividualScheme') {
                _self.isEdit = true;
                if(!!step){
                  _self.panelTitle = this.$t('performance.editIndividualScheme');
                  _self.$refs.uitabs.setActiveTab(step)
                  if(step === 'basic') {
                    _self.show.isView = true;
                    _self.$http.get(`/performance/schemeInfos/detail`,{params:{schemeId:this.schemeId}}).then((response)=>{
                      let repData = response.data;
                      let dictCode = _self.getDictCode(repData.frequency);

                      _self.currentSchemeName = repData.schemeName;
                      _self.basicModel.schemeName = _self.currentSchemeName;
                      _self.basicModel.restrictYear = repData.restrictYear;
                      _self.basicModel.templateId = repData.templateId;
                      _self.basicModel.templateName = repData.templateName;
                      _self.basicModel.frequency = repData.frequency;
                      _self.loadPeriod(dictCode);
                      _self.basicModel.schemePeriod = repData.schemePeriod;
                      _self.basicModel.startDate = formatDate(new Date(repData.startDate),'YYYY-MM-DD HH:mm');
                      _self.basicModel.endDate = formatDate(new Date(repData.endDate),'YYYY-MM-DD HH:mm');
                    })

                  } else if (step === 'employees') {
                    // _self.$refs.aemployeestable.reloadData();
                  } else if (step === 'process') {
                    _self.$http.get('/performance/process/schemeProcessRatioList', {
                        params: {
                          schemeInfoId:_self.schemeId
                        },
                        emulateJSON: true
                    }).then((response) => {
                        _self.nodeData = [];
                        let rep = response.data;
                        _self.processModel.processId = rep.processTemplateId;
                        _self.processModel.processTemplateName = rep.processTemplateName;
                        for(let item of rep.processRatioNameList) {
                          let proModel = _self.processSchema.newModel();
                          proModel.approveRoleName = item.approveRoleName;
                          proModel.approveRole = item.approveRole;
                          proModel.nodeName = item.nodeName;
                          proModel.employeeId = item.employeeId;
                          proModel.employeeName = item.employeeName;
                          proModel.templateRoleId = item.templateRoleId;
                          proModel.templateId = item.templateId;
                          proModel.operation = item.operation;
                          proModel.stageName = item.stageName;
                          proModel.nodeWeight = item.ratio;
                          proModel.schemeId = this.schemeId;
                          _self.nodeData.push(proModel);
                        }
                    });
                  }
                }
            }
          }
        }
}

</script>
