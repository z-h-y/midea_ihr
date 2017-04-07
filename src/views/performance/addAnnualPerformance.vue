<style lang="less">
.ihr-position-addAnnualPerformance {
  .ui-tabs-header-items {
    border-bottom: 2px solid #fafafa;
  }
  .position-name-number {
    height: 50px;
  }
  .position-name-number .validate-error {
    color: #222;
  }
  .position-name-number .field-hint {
    position: absolute;
  }
  .ihr-staff-annual {
    font-size: 14px;
    .ui-radio-label-text {
      line-height: 32px;
      margin: 0 10px;
    }
    .form {
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
    width: 27px;
    text-align: left;
    display: table-cell;
  }
  .operate {
    background: transparent;
    border: none;
    font-size: 15px;
    margin-left: 20px;
    color: blue;
  }
  .field-row {
    .ratio-label {
      float: left;
      white-space: nowrap;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 150px;
      height: 28px;
      padding-right: 10px;
      font-size: 14px;
      line-height: 28px;
      text-align: right;
      color: #72777c;
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
}
</style>
<template lang="html">
  <div class="ihr-position-addAnnualPerformance content-wrap">
    <panel :title="panelTitle" class="panel-b mb-suitable" header="panel-header">
      <ui-tabs type="text" background-color="clear" text-color="gray" text-color-active="primary" :active-tab="activeTab" @tab-change="changeTabs">
        <ui-tab :title="$t('performance.basicInformation')" id='basic' :disabled='isAdd'>
          <v-form ref="annualform" :model="group" :schema="groupSchema" label-width="150" label-suffix="" :cols="1">
            <text-field ref="schemename" property='schemeName' editor-width="400"></text-field>
            <select-field property="restrictYear" editor-width="400"></select-field>
            <text-field property='resultConfirmedEmpName' @open-selector="openSelector" type="selector" :readonly="true" :show="show" editor-width="400"></text-field>
            <div class='field'>
              <label style="width:150px;">{{$t('performance.weight')}}</label>
              <div class="field-content" style="margin-left:150px;">
                <div class="field-row">
                  <div class="cell">
                    <label>{{$t('performance.businessUnit')}}</label>
                  </div>
                  <div class="cell">
                    <label>{{$t('performance.department')}}</label>
                  </div>
                  <div class="cell">
                    <label>{{$t('performance.individual')}}</label>
                  </div>
                </div>
                <div class="field-row position-name-number">
                  <div class="cell">
                    <text-field ref="positionnumber" label-width="0" :hide-label="true" property="businessUnitProportion" editor-width="100" type="number">%</text-field>
                  </div>
                  <div class="cell">
                    <text-field label-width="0" :hide-label="true" property="unitProportion" editor-width="100" type="number">%</text-field>
                  </div>
                  <div class="cell">
                    <text-field label-width="0" :hide-label="true" property="personalProportion" editor-width="100" type="number">%</text-field>
                  </div>
                </div>
              </div>
            </div>
            <text-field type="textarea" :editor-height="100" editor-width="400" property="description"></text-field>
          </v-form>
          <div class="btn-group">
            <ui-button @click="basicNext" color="primary mr10">{{$t('button.next')}}</ui-button>
            <ui-button @click="cancel" class="btn-default-bd" type="flat">{{$t('button.cancel')}}</ui-button>
          </div>
          <person-selector ref="perselect" :handel-select="selectPer" :show="show" :multi-selected="false"></person-selector>
        </ui-tab>
        <ui-tab :title="$t('performance.employees')" id='employees' :disabled='isAdd'>
          <div class="field emp-select-field">
            <label class="prop-name">{{$t('performance.selectEmployees')}}</label>
            <ui-button @click="show2.modal = true;$refs.perselector.open()" class="query-btn-reset btn-default-bd" type="flat">{{$t('button.select')}}</ui-button>
          </div>
          <div class="vuetable-wrapper pl16 pr16 pb16">
            <vuetable ref="aemployeestable" @action="action" :api-url="tableUrl" :selected-to="selectedRow" :append-params="empParams" :fields="columns" pagination-path="" table-wrapper=".vuetable-wrapper pl16 pr16 pb16" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
            </vuetable>
          </div>
          <div class="btn-group">
            <ui-button @click="toRatio" color="primary mr10">{{$t('button.next')}}</ui-button>
            <ui-button @click="tabChange('basic','',true)" class="btn-default-bd" type="flat">{{$t('button.back')}}</ui-button>
          </div>
          <person-selector ref="perselector" :show="show2" :handle-comfirmed="selectPer"></person-selector>
          <ui-modal ref="weightmodal" id="edit-weight" :show="show.weightModal" :title="$t('performance.weightSetting')">
            <v-form ref="weightform" :model="weightModel" :schema="weightSchema" label-width="150" label-suffix="" :cols="1" form-style="">
              <text-field property='businessUnitProportion' type="number" editor-width="70">%</text-field>
              <text-field property='unitProportion' type="number" editor-width="70">%</text-field>
              <text-field property='personalProportion' type="number" editor-width="70">%</text-field>
            </v-form>
            <div slot="footer">
              <ui-button color="primary mr10" @click="saveWeight">{{$t('button.save')}}</ui-button>
              <ui-button class="btn-default-bd" type="flat" @click="$refs.weightmodal.close()">{{$t('button.cancel')}}</ui-button>
            </div>
          </ui-modal>
          <ui-confirm ref="delconfirm" @confirm="deleteConfirmed" :show="show.delConfirm" close-on-confirm>
            {{$t('common.deleteConfirm')}}
          </ui-confirm>
        </ui-tab>
        <ui-tab :title="$t('performance.ratio')" id='ratio' :disabled='isAdd'>
          <v-form ref="annualratio" :model="ratioModel" :schema="ratioSchema" label-width="150" label-suffix="" :cols="1">
            <div class="field-row">
              <div class="cell">
                <label>{{$t('performance.defaultRatio')}}</label>
              </div>
              <div class="cell">
                <label>{{$t('performance.excellent')}}</label>
              </div>
              <div class="cell">
                <text-field label-width="0" :hide-label="true" property="excellentRatio" editor-width="100">%</text-field>
              </div>
            </div>
            <div class="field-row">
              <div class="cell">
                <label></label>
              </div>
              <div class="cell">
                <label>{{$t('performance.veryGood')}}</label>
              </div>
              <div class="cell">
                <text-field label-width="0" :hide-label="true" property="veryGoodRatio" editor-width="100">%</text-field>
              </div>
            </div>
            <div class="field-row">
              <div class="cell">
                <label></label>
              </div>
              <div class="cell">
                <label>{{$t('performance.good')}}</label>
              </div>
              <div class="cell">
                <text-field label-width="0" :hide-label="true" property="goodRatio" editor-width="100">%</text-field>
              </div>
            </div>
            <div class="field-row">
              <div class="cell">
                <label></label>
              </div>
              <div class="cell">
                <label>{{$t('performance.needsImprovement')}}</label>
              </div>
              <div class="cell">
                <text-field label-width="0" :hide-label="true" property="needsRatio" editor-width="100">%</text-field>
              </div>
            </div>
            <div class="field-row">
              <div class="cell">
                <label></label>
              </div>
              <div class="cell">
                <label>{{$t('performance.disqualified')}}</label>
              </div>
              <div class="cell">
                <text-field label-width="0" :hide-label="true" property="disqualifiedRatio" editor-width="100">%</text-field>
              </div>
            </div>
          </v-form>
          <div class="btn-group">
            <ui-button @click="submitConfirmed" color="primary mr10">{{$t('button.submit')}}</ui-button>
            <ui-button @click="tabChange('employees')" class="btn-default-bd" type="flat">{{$t('button.back')}}</ui-button>
          </div>
        </ui-tab>
      </ui-tabs>
    </panel>
  </div>
</template>
<script>
import Vue from 'vue';
import {
  getDictMapping,
  initFormData,
  convert
} from '../../util/assist';
import {
  default as Schema
}
from '../../schema/index';
import {
  default as Message
} from '../../components/basic/message';




export default {
  data() {
      var self = this;
      let ratioSchema = new Schema({
        excellentRatio: {
          label: self.$t('performance.excellent'),
          required: true,
          whitespace: false
        },
        veryGoodRatio: {
          label: self.$t('performance.veryGood'),
          required: true,
          whitespace: false
        },
        goodRatio: {
          label: self.$t('performance.good'),
          required: true,
          whitespace: false
        },
        needsRatio: {
          label: self.$t('performance.needsImprovement'),
          required: true,
          whitespace: false
        },
        disqualifiedRatio: {
          label: self.$t('performance.disqualified'),
          required: true,
          whitespace: false
        },
        ratioControlId: {
          label: '',
          whitespace: false
        }
      });

      let weightSchema = new Schema({
        businessUnitProportion: {
          label: self.$t('performance.businessUnit'),
          type: 'integer',
          required: true,
          whitespace: false,
          rules: {
            type: 'custom',
            message: self.$t('performance.rules.ruleNumRange'),
            validate() {
              if (this.businessUnitProportion >= 0 && this.businessUnitProportion <= 100) {
                return true;
              } else {
                return false;
              }
            }
          }
        },
        unitProportion: {
          label: self.$t('performance.department'),
          type: 'integer',
          required: true,
          whitespace: false,
          rules: {
            type: 'custom',
            message: self.$t('performance.rules.ruleNumRange'),
            validate() {
              if (this.unitProportion >= 0 && this.unitProportion <= 100) {
                return true;
              } else {
                return false;
              }
            }
          }
        },
        personalProportion: {
          label: self.$t('performance.individual'),
          type: 'integer',
          required: true,
          whitespace: false,
          rules: [{
            type: 'custom',
            message: self.$t('performance.rules.ruleNumRange'),
            validate() {
              if (this.personalProportion >= 0 && this.personalProportion <= 100) {
                return true;
              } else {
                return false;
              }
            }
          }, {
            type: 'custom',
            message: this.$t('performance.rules.ruleNumCount'),
            validate() {
              return self.isAdditonRight;
            }
          }]
        }
      });
      let groupSchema = new Schema({
        schemeName: {
          label: self.$t('performance.schemeName'),
          required: true,
          whitespace: false,
          rules: {
            type: 'custom',
            message: self.$t('performance.rules.ruleSchemeNameExist'),
            validate() {
              return this.isNameNoExits;
            }
          }
        },
        isNameNoExits: {
          default () {
            return true;
          }
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
          label: self.$t('performance.businessUnit'),
          whitespace: false,
          default: 0,
          rules: [{
            type: 'custom',
            message: this.$t('performance.rules.ruleNumRange'),
            validate() {
              return self.isValueRight;
            }
          }, {
            type: 'custom',
            message: this.$t('performance.rules.ruleNumCount'),
            validate() {
              return self.isAdditonRight;
            }
          }]
        },
        unitProportion: {
          label: self.$t('performance.department'),
          whitespace: false,
          default: 0,
          rules: {
            type: 'custom',
            message: '',
            validate() {
              self.$refs.positionnumber.validate();
              return true;
            }
          }
        },
        personalProportion: {
          label: self.$t('performance.individual'),
          whitespace: false,
          default: 0,
          rules: {
            type: 'custom',
            message: '',
            validate() {
              self.$refs.positionnumber.validate();
              return true;
            }
          }
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
      return {
        isAdditonRight: true,
        isAdd: this.$route.name === 'addAnnualPerformance',
        panelTitle: this.$t('performance.addAnnualScheme'),
        tableUrl: '/performance/yearPfmScores/employees',
        empTableUrl: 'person/employees',
        show: {
          modal: false,
          weightModal: false,
          subConfirm: false,
          delConfirm: false
        },
        show2: {
          modal: false
        },
        back: false,
        currentSchemeName: '',
        activeTab: 'basic',
        groupSchema: groupSchema,
        group: groupSchema.newModel(),
        weightSchema: weightSchema,
        weightModel: weightSchema.newModel(),
        ratioSchema: ratioSchema,
        ratioModel: ratioSchema.newModel(),
        itemActions: [{
          name: 'edit-item',
          label: this.$t('performance.weightSetting'),
          icon: '',
          class: 'operate'
        }, {
          name: 'delete-item',
          label: this.$t('button.delete'),
          icon: '',
          class: 'operate'
        }],
        columns: [{
          name: 'employeeName',
          title: this.$t('staff.employeeName')
        }, {
          name: 'employeeCode',
          dataClass: 'tr',
          title: this.$t('staff.employeeId')
        }, {
          name: 'positionName',
          title: this.$t('performance.position')
        }, {
          name: 'businessUnitProportion',
          title: this.$t('performance.businessUnit')
        }, {
          name: 'unitProportion',
          title: this.$t('performance.department')
        }, {
          name: 'personalProportion',
          title: this.$t('performance.individual')
        }, {
          name: '__actions',
          title: this.$t('performance.operate')
        }]
      }
    },
    mounted() {
      this.changeRoute()
    },
    watch: {
      'group.schemeName': {
        handler: function(val, oldVal) {
          if (!val || val === this.currentSchemeName) {
            return;
          }
          this.$http.get(`/performance/schemeYears/validSchemeName`, {
            params: {
              schemeName: val
            }
          }).then((response) => {
            this.group.isNameNoExits = response.body == 'true' ? true : false;
            this.$refs.schemename.validate();
          })
        }
      }
    },
    computed: {
      isValueRight() {
        var num_1 = Number(this.group.businessUnitProportion);
        var num_2 = Number(this.group.unitProportion);
        var num_3 = Number(this.group.personalProportion);
        if (num_1 >= 0 && num_1 <= 100 && num_2 >= 0 && num_2 <= 100 && num_3 >= 0 && num_3 <= 100) {
          return true;
        } else {
          return false;
        }
      },
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
        let schemeYearId = this.schemeId;
        return [
          `schemeYearId=${schemeYearId}`
        ]
      },
      schemeId() {
        return this.$route.params.id ? this.$route.params.id : 0;
      }
    },
    methods: {
      changeRoute() {
        let _self = this;
        let step = this.$route.params.step;
        let routeName = _self.$route.name;
        this.back = this.$route.query.back;
        _self.activeTab = step;

        _self.group.id = this.schemeId;
        if (routeName === 'addAnnualPerformance') {
          if (step === 'basic' && this.back == "true") {
            initFormData('/performance/yearPfmScores/basicInfo', _self.group, {
              schemeYearId: this.schemeId
            });
          } else if (step === 'employees') {
            _self.$nextTick(() => {
              this.$refs.aemployeestable.reloadData();
            })
          }
        } else if (routeName === 'editAnnualPerformance') {
          _self.panelTitle = this.$t('performance.editAnnualScheme');
          if (step === 'basic') {
            _self.$http.get(`/performance/yearPfmScores/basicInfo`, {
              params: {
                schemeYearId: this.schemeId
              }
            }).then((response) => {
              let repData = response.data;
              _self.currentSchemeName = repData.schemeName
              this.group.schemeName = repData.schemeName;
              this.group.schemeYearId = repData.schemeYearId;
              this.group.restrictYear = repData.restrictYear;
              this.group.resultConfirmedEmpId = repData.resultConfirmedEmpId;
              this.group.resultConfirmedEmpName = repData.resultConfirmedEmpName;
              this.group.businessUnitProportion = repData.businessUnitProportion;
              this.group.unitProportion = repData.unitProportion;
              this.group.personalProportion = repData.personalProportion;
              this.group.description = repData.description;
              this.group.defaultWeight = repData.defaultWeight;
            })
          } else if (step === 'employees') {
            _self.$nextTick(() => {
              this.$refs.aemployeestable.reloadData();
            })
          } else if (step === 'ratio') {
            initFormData('/performance/yearPfmScores/ratio', _self.ratioModel, {
              schemeYearId: this.schemeId
            });
          }
        }
      },
      action(action, data) {
        this.operateRow = data;
        if (action == 'edit-item') {
          this.$refs.weightmodal.open();
          this.initEditModal(data);
        } else if (action == 'delete-item') {
          this.$refs.delconfirm.open();
          this.show.delConfirm = true;
        }
      },
      openSelector() {
        this.$refs['perselect'].open();
      },
      selectPer(selectedData) {
        if (this.$route.params.step === "basic") {
          let containArray1 = [],
            containArray2 = [];
          for (let i = 0; i < selectedData.length; i++) {
            containArray1[i] = selectedData[i].employeeName
            containArray2[i] = selectedData[i].employeeId
          }
          this.group.resultConfirmedEmpName = containArray1.join(',');
          this.group.resultConfirmedEmpId = containArray2.join(',');
        } else if (this.$route.params.step === "employees") {
          //校验选中的人员是否在列表里面

          let tableData = this.$refs.aemployeestable.tableData;
          let selectedParam = [];

          for (let i = 0; i < selectedData.length; i++) {
            if (!this.isExist(selectedData[i], tableData)) {
              selectedParam.push(selectedData[i]);
            }
          }

          if (selectedParam.length < 1) {
            this.openMessage('error', this.$t('performance.message.addAnnualSelectPersonExists'));
            return;
          } else {
            let param = {
              schemeYearId: this.schemeId,
              dtos: selectedParam
            };

            let data = {};
            convert(param, data, "", true);
            this.$http.post('/performance/annualEmployees', data, {
              emulateJSON: true
            }).then((response) => {
              this.$refs.aemployeestable.reloadData();
            });
          }

        }
      },
      changeTabs(id) {
        this.tabChange(id, this.schemeId);
      },
      basicNext() {
        let _self = this;
        let _aPerformance = this.group;
        let params = {
          schemeName: _aPerformance.schemeName,
          restrictYear: _aPerformance.restrictYear,
          confirmedEmployeeId: _aPerformance.resultConfirmedEmpId,
          businessUnitProportion: _aPerformance.businessUnitProportion,
          unitProportion: _aPerformance.unitProportion,
          personalProportion: _aPerformance.personalProportion,
          description: _aPerformance.description
        };

        let handlerUrl = "";
        let actionId = "";

        var num_1 = Number(this.group.businessUnitProportion);
        var num_2 = Number(this.group.unitProportion);
        var num_3 = Number(this.group.personalProportion);
        if (num_1 + num_2 + num_3 !== 100) {
          this.isAdditonRight = false;
        } else {
          this.isAdditonRight = true;
        }
        let pass = this.$refs.annualform.isFormValidate();
        if (!pass) {
          this.isAdditonRight = true;
          return;
        }

        if (_self.$route.name === 'addAnnualPerformance') {
          if (this.back === "true") {
            params.schemeYearId = _aPerformance.schemeYearId
            handlerUrl = '/performance/schemeYears/update';
            actionId = "update";
          } else {
            handlerUrl = '/performance/schemeYears';
            actionId = "add";
          }
        } else if (_self.$route.name === 'editAnnualPerformance') {
          params.schemeYearId = _aPerformance.schemeYearId
          handlerUrl = '/performance/schemeYears/update';
          actionId = "update";
        }

        _self.$http.post(handlerUrl, params, {
          emulateJSON: true
        }).then((response) => {
          // _self.openMessage('success',this.$t('common.saveSuccess'));
          let schemeId = actionId == 'add' ? response.body : this.schemeId;
          this.tabChange("employees", schemeId);
        });
      },
      tabChange(tabId, aid, back) {
        let param = {
          step: tabId || 'basic',
          id: aid || this.schemeId || '0'
        };

        let name = this.$route.name === 'addAnnualPerformance' ? 'addAnnualPerformance' : 'editAnnualPerformance';
        this.$router.push({
          name: name,
          params: param,
          query: {
            back: back
          }
        })
        this.changeRoute()
      },
      initEditModal(data) {
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

        var num_1 = Number(weightModel.personalProportion);
        var num_2 = Number(weightModel.unitProportion);
        var num_3 = Number(weightModel.businessUnitProportion);
        if (num_1 + num_2 + num_3 !== 100) {
          this.isAdditonRight = false;
        } else {
          this.isAdditonRight = true;
        }
        //验证表单
        let pass = this.$refs.weightform.isFormValidate();
        if (!pass) {
          this.isAdditonRight = true;
          return;
        };

        let param = {
          businessUnitProportion: weightModel.businessUnitProportion,
          unitProportion: weightModel.unitProportion,
          personalProportion: weightModel.personalProportion
        }
        _self.$http.put(`/performance/annualEmployees/${schemeYearId}/${employeeId}`, param, {
          emulateJSON: true
        }).then((response) => {
          _self.openMessage('success', this.$t('common.saveSuccess'));
          this.$refs.aemployeestable.reloadData();
          this.$refs.weightmodal.close();
        });
      },
      toRatio() {
        this.tabChange('ratio', this.schemeId);
      },
      saveRatio() {
        let _self = this;
        let ratioModel = this.ratioModel;
        let param = {
          schemeYearId: _self.schemeId,
          excellentRatio: ratioModel.excellentRatio,
          veryGoodRatio: ratioModel.veryGoodRatio,
          goodRatio: ratioModel.goodRatio,
          needsRatio: ratioModel.needsRatio,
          disqualifiedRatio: ratioModel.disqualifiedRatio
        }
        if (_self.$route.name === 'addAnnualPerformance' || !ratioModel.ratioControlId) {
          _self.$http.post('/performance/ratios', param, {
            emulateJSON: true
          }).then((response) => {
            _self.$router.push({
              name: 'annualPerformance'
            });
            _self.openMessage('success', this.$t('common.saveSuccess'));
          });
        } else if (_self.$route.name === 'editAnnualPerformance') {
          param.ratioControlId = ratioModel.ratioControlId;
          _self.$http.post('/performance/ratios/update', param, {
            emulateJSON: true
          }).then((response) => {
            _self.$router.push({
              name: 'annualPerformance'
            });
            _self.openMessage('success', this.$t('common.saveSuccess'));
          });
        }
      },
      openMessage(type, message) {
        Message({
          type: type,
          message: message
        })
      },
      submit() {
        this.show.subConfirm = true;
      },
      submitConfirmed() {
        let passed = this.$refs.annualratio.isFormValidate();
        if (!passed) return;
        this.saveRatio();
      },
      deleteConfirmed() {
        let employeeId = this.operateRow.employeeId;
        let schemeYearId = this.schemeId;
        this.$http.delete(`/performance/annualEmployees/${schemeYearId}/${employeeId}`, {
          emulateJSON: true
        }).then((response) => {
          Message({
            message: this.$t('common.deleteSuccess'),
            type: 'success'
          });
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
        for (let i = 0, len = arr.length; i < len; i++) {
          if (obj.employeeId === arr[i].employeeId) {
            isExist = true;
            break;
          }
        }
        return isExist;
      }
    },
    components: {
      Panel: require('../../components/basic/panel.vue')
    }
}
</script>
