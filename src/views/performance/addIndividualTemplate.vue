<style lang= "less">

.ihr-performance-addOrgTemplate {
    .ui-tabs-header-items {
        border-bottom: 2px solid #fafafa;
    }
    .panel-b {
        padding-bottom: 88px;
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
    .prop_name {
        width: 150px;
    }
    .operate {
        background: transparent;
        border: none;
        font-size: 15px;
        margin-left: 20px;
    }
    .ind-select-field {
        margin-bottom: 5px;
    }
    .field-hint-ind {
        line-height: 43px;
        height: 43px;
        margin-left: 10px;
        color: #ed5565;
        float: left;
    }
    .bd-float {
        float: left;
    }
    .alert-tips {
        background-color: #e4f3fe;
        padding: 5px 10px;
        width: 400px;
        height: 24px;
        box-sizing: border-box;
        position: absolute;
        top: 5px;
        left: 560px;
    }
    .form{
      width: 555px;
    }
}

</style>

<template lang="html">
<div>
    <div class="content-wrap ihr-performance-addOrgTemplate">
        <panel :title="panelTitle" class="panel-b" header="panel-header">
            <v-form :class="['rel']" ref="orgtempform" :model="orgModel" :schema="orgSchema" label-width="150" label-suffix="" :cols="1">
                <text-field property='templateName' editor-width="400" @click="show.tipsShow='true'" :placeholder="$t('performance.performanceIndividual')"></text-field>
                <select-field property="indicatorsSetting" editor-width="400" :select-change="setingSelected"></select-field>
                <text-field type="textarea" :editor-height="100" editor-width="400" property="description"></text-field>
            </v-form>
            <div v-show="show.isInd">
                <div class="field ind-select-field">
                    <label class="prop_name">{{$t('performance.includedIndicators')}}</label>
                    <ui-button @click="$refs.indtablemodel.open()" class="query-btn-reset btn-default-bd bd-float" type="flat">{{$t('button.select')}}</ui-button>
                    <div class="field-hint field-hint-ind" v-show="show.indlistCheck">
                        <i class="icon icon-error"></i>{{$t('performance.message.completeIndicator')}}
                    </div>
                </div>
                <div class='field-content'>
                    <vuetable ref="indicatortable" :api-url="tableUrl" pagination-path="" :selected-to="selectedRow" :append-params="queryParams" :fields="columns" :item-actions="itemActions" :show-pagination="false" table-wrapper=".vuetable-wrapper pl16 pr16 pb16" load-on-start="false"
                    :sort-order="sortOrder" per-page="10">
                    </vuetable>
                </div>
                <ind-table-selector ref="indtablemodel" :show="show" :handle-comfirmed="handleComfirmed" :selected-indicators="selectedInds" :ind-type="indtypes"></ind-table-selector>
            </div>
            <div class="btn-group">
                <ui-button @click="submitForm" color="primary mr10">{{$t('button.submit')}}</ui-button>
                <ui-button @click="cancel" class="btn-default-bd" type="flat">{{$t('button.cancel')}}</ui-button>
            </div>
        </panel>
    </div>
    <ui-modal ref="modal2" id="edit-indicator" :show="show.modal2" type="large" :title="$t('performance.editIndicator')">
        <v-form ref="editindmodal" :model="editIndicatorModel" :schema="editIndicatorSchema" label-width="150" label-suffix="" :cols="1" form-style="org-form">
            <text-field property='indicatorName' editor-width="400"></text-field>
            <text-field property='unit' editor-width="400"></text-field>
            <text-field property='target' editor-width="400"></text-field>
            <text-field property='weight' type="number" editor-width="400">%</text-field>
            <text-field property='criteria' editor-width="400"></text-field>
            <radioGroup-field property='mandatory'></radioGroup-field>
        </v-form>
        <div slot="footer">
            <ui-button color="primary mr10" @click="saveEditModal">{{$t('button.submit')}}</ui-button>
            <ui-button class="btn-default-bd" type="flat" @click="$refs.modal2.open()">{{$t('button.cancel')}}</ui-button>
        </div>
    </ui-modal>
    <ui-confirm ref="genericconfirm" :title="$t('button.delete')" @confirm="deleteConfirmed" @denied="deleteDenied" :show="show.genericConfirm" close-on-confirm>
        {{$t('common.deleteConfirm')}}
    </ui-confirm>
</div>
</template>

<script>

import Vue from 'vue';
import {
    getDictMapping, initFormData, convert
}
from '../../util/assist';
import {
    default as Schema
}
from '../../schema/index';
import {
    default as Message
}
from '../../components/basic/message';


export default {
    data() {
      let self = this;
      let orgSchema = new Schema({
          templateName: {
              label: self.$t('performance.templateName'),
              required: true,
              whitespace: false
          },
          indicatorsSetting: {
              label: self.$t('performance.indicatorSetting'),
              required: true,
              mapping: function() {
                  return getDictMapping('INDICATORS_SETTING');
              }
          },
          description: {
              label: self.$t('performance.description'),
              whitespace: false
          }
      });
      let editIndicatorSchema = new Schema({
          indicatorId: {
              label: self.$t('performance.indicatorId'),
              whitespace: false
          },
          indicatorName: {
              label: self.$t('performance.indicatorName'),
              required: true,
              whitespace: false
          },
          unit: {
              label: self.$t('performance.unit'),
              required: true,
              whitespace: false
          },
          target: {
              label: self.$t('performance.target'),
              required: true,
              whitespace: false
          },
          weight: {
              label: self.$t('performance.weight'),
              required: true,
              whitespace: false,
              rules: {
                  type: 'custom',
                  message: self.$t('performance.message.positiveInteger'),
                  validate() {
                      var isValidate = true;
                      if (this.weight < 1 || this.weight > 100) {
                          isValidate = false;
                      } else {
                          if (this.weight % 1 !== 0) {
                              isValidate = false;
                          }
                      }
                      return isValidate;
                  }
              }
          },
          criteria: {
              label: self.$t('performance.criteria'),
              required: true,
              whitespace: false
          },
          mandatory: {
              label: self.$t('performance.mandatory'),
              required: true,
              mapping() {
                var key1 = self.$t('common.yes');
                var key2 = self.$t('common.no');
                var obj = {};
                obj[key1] = 1;
                obj[key2] = 0;
                return obj;
              }
          }
      });

            return {
                panelTitle: this.$t('performance.addIndividualTemplate'),
                tableUrl: '/performance/indicators/findIndicatorList',
                empTableUrl: 'person/employees',
                show: {
                    modal: false,
                    modal2: false,
                    genericConfirm: false,
                    isInd: true,
                    indlistCheck: false,
                    tipsShow: false
                },
                activeTab: 'basic',
                orgSchema: orgSchema,
                orgModel: orgSchema.newModel(),
                editIndicatorSchema: editIndicatorSchema,
                editIndicatorModel: editIndicatorSchema.newModel(),
                tableParamArray: [],
                selectedInds: [],
                operateRow: {},
                indtypes: ['organization', 'fundamentals', 'individual'],
                columns: [{
                    name: 'indicatorName',
                    title: this.$t('performance.indicatorName')
                }, {
                    name: 'unit',
                    title: this.$t('performance.unit')
                }, {
                    name: 'target',
                    dataClass: 'tr',
                    title: this.$t('performance.target')
                }, {
                    name: 'weight',
                    dataClass: 'tr',
                    title: this.$t('performance.weight') + '(%)'
                }, {
                    name: 'criteria',
                    title: this.$t('performance.criteria')
                }, {
                    name: 'mandatory',
                    title: this.$t('performance.mandatory'),
                    callback: function(value) {
                        return value == 1 ? self.$t('common.yes') : self.$t('common.no')
                    }
                }, {
                    name: '__actions',
                    title: this.$t('performance.operate')
                }],
                itemActions: [{
                    name: 'edit-item',
                    label: '',
                    icon: 'fa fa-pencil',
                    class: 'operate'
                }, {
                    name: 'delete-item',
                    label: '',
                    icon: 'fa fa-trash',
                    class: 'operate'
                }]
            }
        },
        computed: {
            queryParams() {
                let params = this.tableParamArray;
                let result = [];
                for (let i = 0; i < params.length; i++) {
                    result.push('indicatorIdes[]=' + params[i]);
                }
                return result;
            }
        },
        mounted() {
          this.initRoute()
        },
        events: {
            'vuetable:action': function(action, data) {
                this.operateRow = data;
                if (action == 'edit-item') {
                    this.$refs.modal2.open();
                    this.initEditModal(data);
                } else if (action == 'delete-item') {
                    this.$refs.genericconfirm.open();
                }
            }
        },
        methods: {
            initEditModal(data) {

                    this.editIndicatorModel.indicatorName = data.indicatorName;
                    this.editIndicatorModel.unit = data.unit;
                    this.editIndicatorModel.target = data.target;
                    this.editIndicatorModel.weight = data.weight;
                    this.editIndicatorModel.criteria = data.criteria;
                    this.editIndicatorModel.mandatory = data.mandatory;

                },
                saveEditModal() {

                    let passed = this.$refs.editindmodal.isFormValidate();
                    if (!passed) return;
                    this.operateRow.indicatorName = this.editIndicatorModel.indicatorName;
                    this.operateRow.unit = this.editIndicatorModel.unit;
                    this.operateRow.criteria = this.editIndicatorModel.criteria;
                    this.$set(this.operateRow, 'target', this.editIndicatorModel.target);
                    this.$set(this.operateRow, 'weight', this.editIndicatorModel.weight);
                    this.$set(this.operateRow, 'mandatory', this.editIndicatorModel.mandatory);
                    this.$refs.modal2.close();
                },
                submitForm() {
                    let indicatorList = this.$refs.indicatortable.tableData;
                    let _self = this;
                    let _aPerformance = this.orgModel;



                    let pass = this.$refs.orgtempform.isFormValidate();
                    if (!pass) return;

                    if (_aPerformance.indicatorsSetting != 2) {
                        if (indicatorList.length < 1) {
                            // this.openMessage('error', "Please complete the indicator information")
                            _self.show.indlistCheck = true;
                            return;
                        } else {
                            let weightCount = 0;
                            var overZero = true;
                            for (let item of indicatorList) {
                                if (Number(item.weight) <= 0) {
                                  overZero = false;
                                  break;
                                }
                                weightCount += Number(item.weight)
                            }
                            if (!overZero) {
                              this.openMessage('error', this.$t('performance.message.weightPositiveInteger'));
                              return;
                            }
                            if (weightCount > 100 && _aPerformance.indicatorsSetting == 1) {
                                this.openMessage('error', this.$t('performance.message.addIndividualTempSubmitForm'));
                                return;
                            }
                            if (weightCount > 100 && _aPerformance.indicatorsSetting == 3) {
                                this.openMessage('error', this.$t('performance.message.weightsSum'));
                                return
                            }
                        }
                    }

                    let params = {
                        templateName: _aPerformance.templateName,
                        indicatorsSetting: _aPerformance.indicatorsSetting,
                        description: _aPerformance.description,
                        indicatorList: indicatorList
                    };

                    let data = {};
                    convert(params, data, "", true);

                    if (_self.$route.name === 'addIndividualTemplate') {
                        _self.$http.post('/performance/templates/personal/create', data, {
                            emulateJSON: true
                        }).then((response) => {
                            _self.openMessage('success', this.$t('common.saveSuccess'));
                            this.$router.push({
                                name: 'individualTemplate'
                            })
                        }, (response) => {
                            //失败
                        });
                    } else if (_self.$route.name === 'editIndividualTemplate') {
                        data.templateId = _aPerformance.templateId
                        _self.$http.post('/performance/templates/update', data, {
                            emulateJSON: true
                        }).then((response) => {
                            _self.openMessage('success', this.$t('common.saveSuccess'));
                            this.$router.push({
                                name: 'individualTemplate'
                            })
                        }, (response) => {
                            //失败
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
                    this.$refs.genericconfirm.open();
                },
                cancel() {
                    this.$router.push({
                        name: 'individualTemplate',
                    });
                },
                deleteConfirmed() {
                    var data = this.$refs.indicatortable.tableData;
                    var index = data.indexOf(this.operateRow);
                    data.splice(index, 1)
                },
                setingSelected(value) {
                    if (value == 2) {
                        this.$refs.indicatortable.tableData = [];
                        this.show.isInd = false;
                    } else {
                        this.show.isInd = true;
                    }
                },
                isExist(obj, arr) {

                    let isExist = false;
                    if (!obj) {
                        return isExist;
                    }
                    for (let i = 0, len = arr.length; i < len; i++) {
                        if (obj.indicatorId === arr[i].indicatorId) {
                            isExist = true;
                            break;
                        }
                    }
                    return isExist;
                },
                handleComfirmed(selectedData) {

                    let tableData = this.$refs.indicatortable.tableData;
                    let sameItem = [];
                    for (var item in selectedData) {
                        if (!this.isExist(selectedData[item], tableData)) {
                            tableData.push({
                                indicatorId: selectedData[item].indicatorId,
                                indicatorName: selectedData[item].indicatorName,
                                target: selectedData[item].target || 0,
                                weight: selectedData[item].weight || 0,
                                unit: selectedData[item].unit,
                                criteria: selectedData[item].formula || "default criteria",
                                mandatory: selectedData[item].mandatory || 0,
                            });
                            this.show.indlistCheck = false;
                        }
                    }
                },
                remove() {
                    this.show.tipsShow = !this.show.tipsShow;
                },
                initRoute() {
                  let _self = this;
                  _self.orgModel.id = this.$route.params.id;

                  if (_self.$route.name === 'addIndividualTemplate') {
                      if (!!this.$route.params.step) {

                          _self.activeTab = this.$route.params.step
                      }
                  } else if (_self.$route.name === 'editIndividualTemplate') {
                      _self.panelTitle = this.$t('performance.editIndividualTemplate');
                      _self.$http.get('/performance/templates/detail', {
                          params: {
                              templatesId: this.$route.params.id
                          },
                          emulateJSON: true
                      }).then((response) => {

                          let result = response.data;
                          let tableData = this.$refs.indicatortable.tableData;
                          this.orgModel.templateId = result.templateId;
                          this.orgModel.templateName = result.templateName;
                          this.orgModel.indicatorsSetting = result.indicatorsSetting;
                          this.orgModel.description = result.description;
                          if (result.indicatorsSetting == 2) {
                              this.show.isInd = false;
                          }
                          // for(let item of  result.indicatorList) {
                          //   item.mandatoryName =   item.mandatory == '1' ? 'YES' : 'NO';
                          // }
                          this.$refs.indicatortable.tableData = result.indicatorList || [];
                      });
                  }
                }
        },
        components: {
            Panel: require('../../components/basic/panel.vue')
        }
}

</script>
