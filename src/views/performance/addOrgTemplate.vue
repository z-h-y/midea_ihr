<style lang= "less">

.ihr-performance-addOrgTemplate {
    .ui-tabs-header-items {
        border-bottom: 2px solid #fafafa;
    }
    .vtable-header {
        text-align: center;
    }
    .vuetable-actions {
        text-align: center;
        margin-left: -30px;
    }
    .addOrgTem-btn {
        height: 37px;
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
            margin: 16px;
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
        height: 38px;
        line-height: 38px;
    }
    .ind-select-field {
        margin-bottom: 16px !important;
    }
    .field-hint-ind {
        line-height: 43px;
        margin-left: 10px;
        color: #ed5565;
        float: left;
    }
    .bd-float {
        float: left;
    }
    .operate {
        background: transparent;
        border: none;
        font-size: 15px;
        margin-left: 0px;
        /*margin-left: 20px;*/
    }
    .ml0 {
        margin-left: 0 !important;
    }
    .addOrgTem-btn {
        background-color: #f3f3f3;
    }
    .field-content {
        padding-right: 0;
    }
}

</style>

<template lang="html">

<div>
    <div class="content-wrap ihr-performance-addOrgTemplate">
        <panel :title="panelTitle" class="panel-b" header="panel-header">
            <v-form :class="['rel']" ref="orgtempform" :model="orgModel" :schema="orgSchema" label-width="150" label-suffix="" :cols="1">
                <text-field property='templateName' :placeholder="$t('performance.departmentPerformanceTemplate')" editor-width="400" @click="show.tipsShow='true'"></text-field>
                <!-- <div class="alert-tips" v-if="show.tipsShow">
                e.g.2016 MIB HR Department Performance Template
                <i class="fa fa-remove r poi" aria-hidden="true" @click="remove"></i>
            </div> -->
                <select-field property="templateCategory" editor-width="400"></select-field>
                <select-field property="indicatorsSetting" editor-width="400" :select-change="setingSelected"></select-field>
                <text-field type="textarea" :editor-height="100" editor-width="400" property="description"></text-field>
            </v-form>
            <div v-show="show.isInd">
                <div class="field ind-select-field fix">
                    <label class="prop_name">{{$t('performance.includedIndicators')}}</label>
                    <ui-button @click="show.modal = true" class="query-btn-reset btn-default-bd bd-float addOrgTem-btn" type="flat">{{$t('button.select')}}</ui-button>
                    <div class="field-hint field-hint-ind" v-show="show.indlistCheck">
                        <i class="icon icon-error"></i>{{$t('performance.message.completeIndicator')}}
                    </div>
                </div>
                <div class='field-content'>
                    <vuetable ref="indicatortable" @action="action" :api-url="tableUrl" pagination-path="" :selected-to="selectedRow" :append-params="queryParams" :fields="columns" :item-actions="itemActions" show-pagination="false" table-wrapper=".vuetable-wrapper pl16 pr16 pb16" load-on-start="false"
                    :sort-order="sortOrder" per-page="10">
                    </vuetable>
                </div>
                <ind-table-selector :show="show" :handle-comfirmed="handleComfirmed" :selected-indicators="selectedInds" :ind-type="indtypes"></ind-table-selector>
            </div>
            <!-- <text-field property='description' editor-width="400"></text-field> -->
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
            <ui-button class="btn-default-bd" type="flat" @click="show.modal2 = false;$refs.modal2.close()">{{$t('button.cancel')}}</ui-button>
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
                templateCategory: {
                    label: self.$t('performance.templateCategory'),
                    required: true,
                    mapping: function() {
                        return getDictMapping('TEMPLATE_CATEGORY');
                    }
                },
                indicatorsSetting: {
                    label: self.$t('performance.indicatorsSetting'),
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
                panelTitle: this.$t('performance.addOrgTemplate'),
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
                        title: this.$t('performance.operate'),
                        titleClass: 'vtable-header',
                        class: 'vtable-icon-operate'
                    }

                ],
                itemActions: [{
                    name: 'edit-item',
                    label: '',
                    icon: 'fa fa-pencil',
                    class: 'operate ml0'
                }, {
                    name: 'delete-item',
                    label: '',
                    icon: 'fa fa-trash',
                    class: 'operate'
                }]
            }
        },
        mounted() {
            this.$nextTick(function() {
                this.initRoute()
            })
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
        methods: {
            action(action, data) {
                this.operateRow = data;
                if (action == 'edit-item') {
                    this.$refs.modal2.open();
                    this.initEditModal(data);
                } else if (action == 'delete-item') {
                    this.$refs.genericconfirm.open();
                }
            },
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
                                weightCount += Number(item.weight);
                            }
                            if (!overZero) {
                                this.openMessage('error', this.$t('performance.message.weightPositiveInteger'));
                                return;
                            }
                            if (weightCount > 100 && _aPerformance.indicatorsSetting == 1) {
                                this.openMessage('error', this.$t('performance.message.addOrgTemplateSubmitForm'));
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
                        templateCategory: _aPerformance.templateCategory,
                        indicatorsSetting: _aPerformance.indicatorsSetting,
                        description: _aPerformance.description,
                        indicatorList: indicatorList
                    };

                    let data = {};
                    convert(params, data, "", true);

                    if (_self.$route.name === 'addOrgTemplate') {
                        _self.$http.post('/performance/templates/department/create', data, {
                            emulateJSON: true
                        }).then((response) => {
                            _self.openMessage('success', this.$t('common.saveSuccess'));
                            this.$router.push({
                                name: 'orgTemplate'
                            })
                        }, (response) => {
                            //失败
                        });
                    } else if (_self.$route.name === 'editOrgTemplate') {
                        data.templateId = _aPerformance.templateId
                        _self.$http.post('/performance/templates/update', data, {
                            emulateJSON: true
                        }).then((response) => {
                            _self.openMessage('success', this.$t('common.saveSuccess'));
                            this.$router.push({
                                name: 'orgTemplate'
                            })
                        }, (response) => {
                            //失败
                        });
                    }
                },
                tabChange(tabId, aid) {
                    let param = {
                        step: (!!tabId) ? tabId : 'basic',
                        id: (!!aid) ? aid : 0
                    };
                    this.$router.push({
                        name: 'addAnnualPerformance',
                        params: param
                    })
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
                        name: 'orgTemplate',
                    });
                },
                deleteConfirmed() {
                    var data = this.$refs.indicatortable.tableData;
                    var index = data.indexOf(this.operateRow);
                    data.splice(index, 1)
                },
                setingSelected(value) {
                    if (value == 2) {
                        this.show.isInd = false;
                        this.$refs.indicatortable.tableData = [];
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
                _self.orgModel.id = _self.$route.params.id;

                if (_self.$route.name === 'addOrgTemplate') {
                    if (!!_self.$route.params.step) {

                        _self.activeTab = _self.$route.params.step
                    }
                } else if (_self.$route.name === 'editOrgTemplate') {
                    _self.panelTitle = _self.$t('performance.editOrgTemplate');
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
                        this.orgModel.templateCategory = result.templateCategory;
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
