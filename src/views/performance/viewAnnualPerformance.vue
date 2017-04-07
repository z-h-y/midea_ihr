<style lang= "less">
.ihr-position-manageAnnualPerformance{
  .ui-tabs-header-items{
    border-bottom: 2px solid #fafafa;
  }
  .description .text-editor {
    height: auto;
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
    width: 150px;
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

  .weight-field {

  }

  .ratio-tab {
    .cell {
      width: 150px;
    }

    .field-ratio {
      label {
        float: left;
        white-space: nowrap;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 28px;
        padding-right: 10px;
        font-size: 14px;
        line-height: 28px;
        text-align: right;
        color: #72777c;
      }
    }
  }

  .ui-tab-header-item {
    font-weight: bold;
  }


}

</style>

<template lang="html">
<div class="ihr-position-manageAnnualPerformance content-wrap">
  <panel :title="panelTitle" class="panel-b mb-suitable" header="panel-header">
      <ui-tabs type="text" background-color="clear" text-color="gray" text-color-active="primary" :active-tab = "activeTab" @active-tab-changed="changeTabs">
          <ui-tab :title="$t('performance.basicInformation')" id = 'basic' :disabled='false'>
            <v-form :model="group" :schema="groupSchema" label-width="150" label-suffix="" :cols="1">
              <text-increment property='schemeName' editor-width="400"></text-increment>
              <text-increment property='restrictYear' editor-width="400"></text-increment>
              <text-increment property='resultConfirmedEmpName' editor-width="400"></text-increment>
              <div class='field'>
                  <label style="width:150px;">{{$t('performance.weight')}}</label>
                  <div class="field-content weight-field" style="margin-left:150px;">
                    <div class="field-row">
                      <div class="cell"><label>{{$t('performance.businessUnit')}}</label></div>
                      <div class="cell"><label>{{$t('performance.department')}}</label></div>
                      <div class="cell"><label>{{$t('performance.individual')}}</label></div>
                    </div>
                    <div class="field-row">
                        <div class="cell">
                            <label>{{group.businessUnitProportion}}</label>
                        </div>
                        <div class="cell">
                            <label>{{group.unitProportion}}</label>
                        </div>
                        <div class="cell">
                            <label>{{group.personalProportion}}</label>
                        </div>
                    </div>
                  </div>
              </div>
              <text-increment class="description" property='description' editor-width="400"></text-increment>
            </v-form>
            <div class="btn-group">
                <ui-button @click="basicNext" color="primary mr10">{{$t('button.next')}}</ui-button>
                <ui-button @click="cancel" class="btn-default-bd" type="flat">{{$t('button.cancel')}}</ui-button>
            </div>
            <person-selector :show="show" :handle-comfirmed="selectPer"></person-selector>
          </ui-tab>

          <ui-tab :title="$t('performance.employees')" id = 'employees' :disabled='false'>
            <!-- <div class = "field">
                <label class="prop_name">Select Employee(s)</label><ui-button @click = "show2.modal = true" class="query-btn-reset btn-default-bd" type="flat">select</ui-button>
            </div> -->
            <div class="vuetable-wrapper pl16 pr16 pb16">
              <vuetable ref="aemployeestable" @action="action" :api-url="tableUrl" :selected-to="selectedRow" :append-params="empParams"  :fields="columns"  pagination-path = "" table-wrapper=".vuetable-wrapper pl16 pr16 pb16" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
              </vuetable>
            </div>
            <div class="btn-group">
                <ui-button @click="toRatio" color="primary mr10">{{$t('button.next')}}</ui-button>
                <ui-button @click="tabChange('basic','',true)" class="btn-default-bd" type="flat">{{$t('button.back')}}</ui-button>
            </div>
            <person-selector :show="show2" :handle-comfirmed="selectPer"></person-selector>
            <ui-modal id="edit-weight" :show="show.weightModal" type="small" header="Weight Setting">
              <v-form :model="weightModel" :schema="weightSchema" label-width="150" label-suffix="" :cols="1" form-style="org-form">
                <text-field property='businessUnitProportion' editor-width="100">%</text-field>
                <text-field property='unitProportion' editor-width="100">%</text-field>
                <text-field property='personalProportion' editor-width="100">%</text-field>
              </v-form>
              <div slot="footer">
                  <ui-button color="primary mr10" @click = "saveWeight">{{$t('button.save')}}</ui-button>
                  <ui-button class="btn-default-bd" type="flat" @click = "show.weightModal = false">{{$t('button.cancel')}}</ui-button>
              </div>
            </ui-modal>
            <ui-confirm
            ref="delconfirm"
              @confirm="deleteConfirmed" @denied="deleteDenied" :show="show.delConfirm"
              close-on-confirm>
              {{$t('common.deleteConfirm')}}
            </ui-confirm>
          </ui-tab>

          <ui-tab :title="$t('performance.ratio')" id = 'ratio' :disabled='false'>
            <v-form :model="ratioModel" :schema="ratioSchema" label-width="100" label-suffix="">
              <div class = "ratio-tab">
                <div class="field-row field-ratio">
                  <div class="cell"><label>{{$t('performance.defaultRatio')}}</label></div>
                  <div class="cell"><label>{{$t('performance.excellent')}}</label></div>
                  <div class="cell-line"><label>{{ratioModel.excellentRatio}}%</label></div>
                </div>
                <div class="field-row field-ratio">
                  <div class="cell"><label></label></div>
                  <div class="cell"><label>{{$t('performance.veryGood')}}</label></div>
                  <div class="cell-line"><label>{{ratioModel.veryGoodRatio}}%</label></div>
                </div>
                <div class="field-row field-ratio">
                  <div class="cell"><label></label></div>
                  <div class="cell"><label>{{$t('performance.good')}}</label></div>
                  <div class="cell-line"><label>{{ratioModel.goodRatio}}%</label></div>
                </div>
                <div class="field-row field-ratio">
                  <div class="cell"><label></label></div>
                  <div class="cell"><label>{{$t('performance.needsImprovement')}}</label></div>
                  <div class="cell-line"><label>{{ratioModel.needsRatio}}%</label></div>
                </div>
                <div class="field-row field-ratio">
                  <div class="cell"><label></label></div>
                  <div class="cell"><label>{{$t('performance.disqualified')}}</label></div>
                  <div class="cell-line"><label>{{ratioModel.disqualifiedRatio}}%</label></div>
                </div>
              </div>
            </v-form>
            <div class="btn-group">
                <!-- <ui-button @click="submit" color="primary mr10">Submit</ui-button> -->
                <ui-button @click="tabChange('employees')" class="btn-default-bd" type="flat">{{$t('button.back')}}</ui-button>
            </div>
            <ui-confirm
            ref="subconfirm"
                @confirm="submitConfirmed" :show="show.subConfirm"
                close-on-confirm
            >
                {{$t('common.submitConfirm')}}
            </ui-confirm>
          </ui-tab>
      </ui-tabs>
  </panel>
</div>

</template>

<script>

import Vue from 'vue';
import { getDictMapping,initFormData,convert} from '../../util/assist';
import {
    default as Schema
}
from '../../schema/index';
import { default as Message } from '../../components/basic/message';


export default {
    data() {
      let self = this;
      let groupSchema = new Schema({
          schemeName: {
              label: self.$t('performance.schemeName'),
              required: true,
              whitespace: false
          },
          restrictYear: {
              label: self.$t('performance.restrictToYear'),
              required: true,
              mapping: function() {
                return getDictMapping('YEAR');
              }
          },
          resultConfirmedEmpName: {
              label: self.$t('performance.resultConfirmedby'),
              required: true,
              whitespace: false
          },
          businessUnitProportion: {
              label: '',
              whitespace: false
          },
          unitProportion: {
              label: '',
              whitespace: false
          },
          personalProportion: {
              label: '',
              whitespace: false
          },
          description: {
              label: self.$t('performance.description'),
              whitespace: false
          },
          defaultWeight: {
            label: self.$t('performance.defaultWeight'),
            whitespace: false
          }
      });
      let weightSchema = new Schema({
        businessUnitProportion: {
            label: self.$t('staff.organization'),
            whitespace: false
        },
        unitProportion: {
            label: self.$t('staff.employeeName'),
            whitespace: false
        },
        personalProportion: {
            label: self.$t('staff.employeeId'),
            whitespace: false
        }
      });
      let ratioSchema = new Schema({
        excellentRatio: {
            label: '',
            whitespace: false
        },
        veryGoodRatio: {
            label: '',
            whitespace: false
        },
        goodRatio: {
            label: '',
            whitespace: false
        },
        needsRatio: {
            label: '',
            whitespace: false
        },
        disqualifiedRatio: {
            label: '',
            whitespace: false
        }
      });


          return {
              panelTitle: this.$t('performance.viewAnnualScheme'),
              tableUrl:'/performance/yearPfmScores/employees',
              empTableUrl:'person/employees',
              show: {
                modal:false,
                weightModal:false,
                subConfirm:false,
                delConfirm:false
              },
              show2: {
                modal:false
              },
              back:false,
              activeTab:'basic',
              groupSchema: groupSchema,
              group: groupSchema.newModel(),
              weightSchema: weightSchema,
              weightModel: weightSchema.newModel(),
              ratioSchema: ratioSchema,
              ratioModel: ratioSchema.newModel(),
              itemActions: [
                // { name: 'delete-item', label: '', icon: 'fa fa-trash', class: 'operate' }
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
                    name: 'businessUnitProportion',
                    title: this.$t('performance.businessUnit')
                  },
                  {
                    name: 'unitProportion',
                    title: this.$t('performance.department')
                  },
                  {
                    name: 'personalProportion',
                    title: this.$t('performance.individual')
                  }
              ]
          }
        },
        mounted() {
          this.$nextTick(function() {
            this.initRoute()
          })
        },
        computed: {
          queryParams() {
            let employeeName = this.weightModel.employeeName ? this.weightModel.employeeName : "";
            let employeeNumber = this.weightModel.employeeNumber ? this.weightModel.employeeNumber : "";
            let unitId = this.weightModel.unitId ? this.weightModel.unitId : "";
            return [
              `schemeName=${schemeName}`,
              `restrictYear=${year}`
            ]
          },
          empParams() {
            let schemeYearId = this.schemeId ? this.schemeId : "";
            return [
              `schemeYearId=${schemeYearId}`
            ]
          },
          schemeId() {
            return this.$route.params.id ? this.$route.params.id : 0;
          }
        },
        methods: {
          selectPer(selectedData) {
            if(this.$route.params.step === "basic"){
              let containArray1 = [],containArray2 = [];
              for(let i = 0; i < selectedData.length ; i++) {
                containArray1[i] = selectedData[i].employeeName
                containArray2[i] = selectedData[i].employeeId
              }
              this.group.resultConfirmedEmpName = containArray1.join(',');
              this.group.resultConfirmedEmpId = containArray2.join(',');
            } else if(this.$route.params.step === "employees") {
              //校验选中的人员是否在列表里面

              let tableData = this.$refs.aemployeestable.tableData;
              let selectedParam = [];

              for(let i = 0; i < selectedData.length ; i++) {
                if(!this.isExist(selectedData[i],tableData)) {
                  selectedParam.push(selectedData[i]);
                }
              }

              let param = {
                schemeYearId: this.schemeId,
                dtos : selectedParam
              };

              let data = {};
              convert(param, data, "", true);
              this.$http.post('/performance/annualEmployees',data, {
                  emulateJSON: true
              }).then((response) => {
                  this.$refs.aemployeestable.reloadData();
              });
            }
          },
          action(action, data) {
            this.operateRow =  data;
            if (action == 'delete-item') {
              this.$refs.delconfirm.open();
            }
          },
          changeTabs(id) {
            this.tabChange(id,this.schemeId);
          },
          basicNext() {
              this.tabChange("employees",this.schemeId);
          },
          tabChange(tabId,aid,back) {
            let param = {
              step: tabId || 'basic',
              id: aid || this.schemeId || '0'
            };
            let name = this.$route.name;

            this.$router.push({ name: name, params: param, query:{back:back}})
          },
          initEditModal(data){

            this.weightModel.employeeId = data.employeeId;
            this.weightModel.businessUnitProportion = data.businessUnitProportion;
            this.weightModel.unitProportion = data.unitProportion;
            this.weightModel.personalProportion = data.personalProportion;
          },
          saveWeight() {
            let _self = this;

            let weightModel = _self.weightModel;
            let employeeId = weightModel.employeeId;
            let schemeYearId = _self.schemeId;
            let param = {
              businessUnitProportion: weightModel.businessUnitProportion,
              unitProportion: weightModel.unitProportion,
              personalProportion: weightModel.personalProportion
            }
            _self.$http.put(`/performance/annualEmployees/${schemeYearId}/${employeeId}`,param, {
                emulateJSON: true
            }).then((response) => {
              _self.openMessage('success',this.$t('common.saveSuccess'));
              this.$refs.aemployeestable.reloadData();
              this.show.weightModal = false;
            });
          },
          toRatio() {
            this.tabChange('ratio',this.schemeId);
          },
          saveRatio() {
          },
          openMessage(type,message){
            Message({
              type: type,
              message: message
            })
          },
          submit() {
            this.$refs.subconfirm.open();
          },
          submitConfirmed() {
            this.ActivateScheme();
          },
          ActivateScheme(){
            let schemeYearId = this.schemeId;//等待
            this.$http.get(``).then((response) => {
                Message({type: 'success',message: this.$t('performance.message.activateSuccess')})
                forwardUrl('annualPerformance');
            });
          },
          deleteConfirmed() {
            let employeeId = this.operateRow.employeeId;
            let schemeYearId = this.schemeId;
            this.$http.delete(`/performance/annualEmployees/${schemeYearId}/${employeeId}`, {
                emulateJSON: true
            }).then((response) => {
              Message({message: this.$t('common.deleteSuccess'),type:'success'});
              this.$refs.aemployeestable.reloadData();
            });
          },
          cancel() {
            this.$router.push({
                name: 'annualPerformance',
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
                let routeName = _self.$route.name;
                _self.activeTab = step;

                if (routeName === 'viewAnnual') {
                      if(step === 'basic') {
                        initFormData('/performance/yearPfmScores/basicInfo',_self.group,{schemeYearId:this.schemeId});
                      } else if (step === 'employees') {
                        _self.$nextTick(()=>{
                          this.$refs.aemployeestable.reloadData();
                        })
                      } else if (step === 'ratio') {
                        initFormData('/performance/yearPfmScores/ratio',_self.ratioModel,{schemeYearId:this.schemeId});
                      }
                }
            }
        },
        components: {
          Panel: require('../../components/basic/panel.vue')
        }
}

</script>
