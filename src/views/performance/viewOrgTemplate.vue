<style lang= "less">

.ihr-performance-viewOrgTemplate {
    .ui-tabs-header-items {
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
        .group {
            margin: 20px 0;
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
    .org-form {
        padding: 0px;
    }
    .field-content {
        padding: 0;
    }
    /*解决详情字段太多,不能换行*/
    .text-editor {
        height: auto;
        .inrement-text {
            word-break: break-all;
        }
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-performance-viewOrgTemplate">
    <panel :title="panelTitle" class=" panel-b" header="panel-header">
        <v-form :model="orgModel" :schema="orgSchema" label-width="150" label-suffix="" :cols="1" form-style="org-form">
            <text-increment property='templateName' editor-width="400"></text-increment>
            <text-increment property='templateCategoryName' editor-width="400"></text-increment>
            <text-increment property='indicatorsSettingName' editor-width="400"></text-increment>
            <text-increment property='description' editor-width="400"></text-increment>
            <div v-show="show.isInd" class="l w-per100">
                <div class="field">
                    <label class="prop_name">Included Indicators</label>
                </div>
                <div class='field-content'>
                    <vuetable v-ref:indicatortable :api-url="tableUrl" pagination-path="" :selected-to="selectedRow" :fields="columns" :item-actions="itemActions" show-pagination="false" table-wrapper=".vuetable-wrapper pl16 pr16 pb16" :sort-order="sortOrder" per-page="10">
                    </vuetable>
                </div>
                <indicator-selector :show.sync="show" :ind-type="indtypes"></indicator-selector>
            </div>
            <!-- <text-field property='description' editor-width="400"></text-field> -->
        </v-form>
        <div class="btn-group">
            <!-- <ui-button @click="submitForm" color="primary mr10">Submit</ui-button> -->
            <ui-button @click="cancel" class="btn-default-bd" type="flat">Cancel</ui-button>
        </div>
    </panel>
</div>
<ui-modal id="edit-indicator" :show.sync="show.modal2" type="large" header="Edit Indicator">
    <v-form :model="editIndicatorModel" :schema="editIndicatorSchema" label-width="150" label-suffix="" :cols="1" form-style="org-form">
        <text-field property='indicatorName' editor-width="400"></text-field>
        <text-field property='unit' editor-width="400"></text-field>
        <text-field property='target' editor-width="400"></text-field>
        <text-field property='weight' editor-width="400"></text-field>
        <text-field property='criteria' editor-width="400"></text-field>
        <radioGroup-field property='mandatory'></radioGroup-field>
    </v-form>
    <div slot="footer">
        <ui-button color="primary mr10" @click="saveEditModal">Submit</ui-button>
        <ui-button class="btn-default-bd" type="flat" @click="show.modal2 = false">Cancel</ui-button>
    </div>
</ui-modal>

</template>

<script type="text/ecmascript-6">

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

let orgSchema = new Schema({
    templateName: {
        label: 'Template Name',
        required: true,
        whitespace: false
    },
    templateCategoryName: {
        label: 'Template Category',
        required: true,
        mapping: function() {
            return getDictMapping('TEMPLATE_CATEGORY');
        }
    },
    indicatorsSettingName: {
        label: 'Indicators Setting',
        required: true,
        mapping: function() {
            return getDictMapping('INDICATORS_SETTING');
        }
    },
    description: {
        label: 'Description',
        whitespace: false
    }
});
let editIndicatorSchema = new Schema({
    indicatorId: {
        label: 'IndicatorId',
        whitespace: false
    },
    indicatorName: {
        label: 'Indicator Name',
        whitespace: false
    },
    unit: {
        label: 'Unit',
        whitespace: false
    },
    target: {
        label: 'Target',
        whitespace: false
    },
    weight: {
        label: 'Weight',
        whitespace: false
    },
    criteria: {
        label: 'Criteria',
        whitespace: false
    },
    mandatory: {
        label: 'Mandatory',
        mapping: {
            'Yes': 1,
            'No': 0
        }
    }
});

export default {
    data() {
            return {
                panelTitle: 'View Org Template',
                tableUrl: '',
                empTableUrl: 'person/employees',
                show: {
                    modal: false,
                    modal2: false,
                    genericConfirm: false,
                    isInd: true
                },
                indtypes: ['organization', 'individual', 'fundamentals'],
                activeTab: 'basic',
                orgSchema: orgSchema,
                orgModel: orgSchema.newModel(),
                editIndicatorSchema: editIndicatorSchema,
                editIndicatorModel: editIndicatorSchema.newModel(),
                tableParamArray: [],
                operateRow: {},
                columns: [{
                    name: 'indicatorName',
                    title: 'Indicator Name'
                }, {
                    name: 'unit',
                    title: 'Unit'
                }, {
                    name: 'target',
                    dataClass: 'tr',
                    title: 'Target'
                }, {
                    name: 'weight',
                    dataClass: 'tr',
                    title: 'Weight(%)'
                }, {
                    name: 'criteria',
                    title: 'Criteria'
                }, {
                    name: 'mandatory',
                    title: 'Mandatory',
                    callback: function(value) {
                        return value == 1 ? "YES" : "NO"
                    }
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
            // queryParams() {
            //
            //   let params = this.tableParamArray;
            //   let result = [];
            //   for(let i = 0 ; i < params.length ; i++ ) {
            //     result.push('indicatorIdes[]=' + params[i]);
            //   }
            //   return result;
            // }
        },
        events: {
            'orgTemplate:submitSelector': function(selectedData) {
                let tableData = this.$refs.indicatortable.tableData;
                let sameItem = [];
                for (var item in selectedData) {
                    if (!this.isExist(selectedData[item], tableData)) {
                        tableData.push({
                            indicatorId: selectedData[item].indicatorId,
                            indicatorName: selectedData[item].indicatorName,
                            unit: selectedData[item].unit,
                            criteria: selectedData[item].formula,
                        });
                    }
                }
            },
            'vuetable:action': function(action, data) {

                this.operateRow = data;
                if (action == 'edit-item') {
                    this.show.modal2 = true;
                    this.initEditModal(data);
                } else if (action == 'delete-item') {
                    this.show.genericConfirm = true;
                }
            },
            'vuetable:load-error': function(response) {
                console.log('Load Error: ', response)
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
                    this.operateRow.indicatorName = this.editIndicatorModel.indicatorName;
                    this.operateRow.unit = this.editIndicatorModel.unit;
                    this.operateRow.criteria = this.editIndicatorModel.criteria;
                    this.$set('operateRow.target', this.editIndicatorModel.target);
                    this.$set('operateRow.weight', this.editIndicatorModel.weight);
                    this.$set('operateRow.mandatory', this.editIndicatorModel.mandatory);
                    this.$set('operateRow.mandatoryName', this.editIndicatorModel.mandatory == '1' ? 'YES' : 'NO');
                    this.show.modal2 = false;
                    // this.operateRow. = this.editIndicatorModel.;
                },
                submitForm() {
                    // this.$broadcast('vuetable:refresh');
                    let _self = this;
                    let _aPerformance = this.orgModel;
                    let indicatorList = this.$refs.indicatortable.tableData;
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
                            this.$router.go({
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
                            this.$router.go({
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
                    this.$router.go({
                        name: 'addAnnualPerformance',
                        params: param
                    })
                },
                saveRatio() {
                    let _self = this;
                    let ratioModel = this.ratioModel;
                    let param = {
                        schemeYearId: _self.$route.params.id,
                        excellent: ratioModel.excellent,
                        veryGoodStart: ratioModel.veryGoodStart,
                        veryGoodStop: ratioModel.veryGoodStop,
                        goodStart: ratioModel.goodStart,
                        goodStop: ratioModel.goodStop,
                        needsStart: ratioModel.needsStart,
                        needsStop: ratioModel.needsStop,
                        disqualifiedStart: ratioModel.disqualifiedStart,
                        disqualifiedStop: ratioModel.disqualifiedStop
                    }
                    if (_self.$route.name === 'addAnnualPerformance') {
                        _self.$http.post('/performance/ratios', param, {
                            emulateJSON: true
                        }).then((response) => {
                            _self.$router.go({
                                name: 'annualPerformance'
                            });
                        });
                    } else if (_self.$route.name === 'editAnnualPerformance') {
                        _self.$http.post('/performance/ratios', param, {
                            emulateJSON: true
                        }).then((response) => {
                            _self.$router.go({
                                name: 'annualPerformance'
                            });
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
                    this.show.genericConfirm = true;
                },
                submitConfirmed() {
                    this.saveRatio();
                },
                cancel() {
                    this.$router.go({
                        name: 'orgTemplate',
                    });
                },
                deleteConfirmed() {
                    this.$refs.indicatortable.tableData.$remove(this.operateRow);
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
                }
        },
        route: {
            data(transition) {
                let _self = this;
                _self.orgModel.id = transition.to.params.id;

                if (_self.$route.name === 'viewOrgTemplate') {

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
                        this.orgModel.templateCategoryName = result.templateCategoryName;
                        this.orgModel.indicatorsSettingName = result.indicatorsSettingName;
                        this.orgModel.description = result.description;
                        this.$refs.indicatortable.tableData = result.indicatorList;
                        if (result.indicatorsSetting == 2) {
                            this.show.isInd = false;
                        }
                    });
                }
            }
        },
        components: {
          Panel: require('../../components/basic/panel.vue')
        }
}

</script>
