<style lang="less">

.ihr-setting-templateUpdate {
    .label-hide > label {
        display: none;
    }
    label {
        color: #545454;
    }
    .field-content {
        padding-right: 0px;
    }
    .field-row {
        display: table;
        width: 100%;
    }
    .cell {
        width: auto;
    }
    .radio-input-wrapper label {
        margin-right: 15px;
    }
    .d-radio-group {
        width: 120px;
    }
    .w160 {
        width: 160px;
    }
    .pl4 {
        padding-left: 4px;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-setting-templateUpdate">
    <panel :title="panelTitle" class="panel-b" header="panel-header">
        <v-form ref="templateform" :model="areaTemplate" :schema="areaTemplateSchema" label-width="145" label-suffix="" :cols="1" form-style="org-form">
            <select-field property='employementCategory' editor-width="250" readonly="true"></select-field>
            <text-field property="areaTemplateName" editor-width="250" readonly="true"></text-field>
            <select-field property="areaId" editor-width="250" readonly="true"></select-field>
        </v-form>
        <div class="content-wrap ihr-setting-templateUpdate">


            <div class="label-hide" property="details">
                <div class="field-row">
                    <div class="cell tl w160 pl4">
                        <label>{{$t('system.template.defaultLabel')}}</label>
                    </div>
                    <div class="cell tl w160">
                        <label>{{$t('system.template.label')}}</label>
                    </div>
                    <div class="cell tl w160">
                        <label>{{$t('system.template.fieldType')}}</label>
                    </div>
                    <div class="cell tl w160">
                        <label>{{$t('system.template.dataDictionary')}}</label>
                    </div>
                    <div class="cell tl w160">
                        <label>{{$t('system.template.mandatory')}}</label>
                    </div>
                    <div class="cell tl w160">
                        <label>{{$t('system.template.enabled')}}</label>
                    </div>
                </div>
                <template v-for="item in templateDetailsList">
                    <v-form class="mt5" :model="item" :schema="templateDetailsSchema" label-width="0" label-suffix="" :cols="1">
                        <div class="field-row">
                            <div class="cell w160 tl">
                                <text-increment label-width="0" property='fieldName' editor-width="160" :hide-label="true" readonly="true"></text-increment>
                            </div>
                            <div class="cell w160">
                                <text-field label-width="0" :hide-label="true" property='fieldBusinessName' editor-width="140" readonly="true"></text-field>
                            </div>
                            <div class="cell w160">
                                <select-field label-width="0" :hide-label="true" property='fieldType' editor-width="140" readonly="true"></select-field>
                            </div>
                            <div class="cell w160">
                                <text-field v-if="item.fieldType === '1'" readonly="true" label-width="0" :hide-label="true" property='dataDictionary' editor-width="140"></text-field>
                                <text-field v-if="item.fieldType === '2'" readonly="true" label-width="0" :hide-label="true" property='dataDictionary' editor-width="140" :readonly="true"></text-field>
                            </div>
                            <div class="cell w160">
                                <text-increment label-width="0" property='isMustFill' editor-width="160" :hide-label="true" readonly="true"></text-increment>
                            </div>
                            <div class="cell w160">
                                <text-increment label-width="0" property='isShow' editor-width="160" :hide-label="true" readonly="true"></text-increment>
                            </div>
                        </div>
                    </v-form>
                </template>
            </div>
        </div>
        <div class="btn-group">
            <ui-button @click="cancel" class="btn-default-bd" type="flat">{{$t('button.back')}}</ui-button>
        </div>
    </panel>
</div>

</template>

<script>

import {
    default as Schema
}
from '../../../schema/index';
import {
    default as Message
}
from '../../../components/basic/message';
import {
    convert,
    getDictMapping,
    formatDate
}
from '../../../util/assist.js';

var templateDetailsData = {
    fieldName: {
        default () {
            return 'Auto';
        }
    },
    fieldBusinessName: {
        required: true,
        whitespace: false,
    },
    fieldType: {
        required: true,
        whitespace: false,
        mapping: function() {
            return getDictMapping('AREA_TEMPLATE_FIELD_TYPE');
        },
        multiSelect: false
    },
    dataDictionary: {
        required: true,
        whitespace: false,
    },
    isMustFill: {

    },
    isShow: {

    }
};

let areaTemplateSchema = new Schema({
    areaTemplateName: {
        label: this.$t('system.template.areaTemplateName'),
        required: true,
        whitespace: false,
    },
    areaName: {
        label: this.$t('system.template.areaRestrictToCountry'),
        required: true,
        whitespace: false,
    },
    areaId: {
        label: this.$t('system.template.areaRestrictToCountry'),
        whitespace: false,
        required: true,
        mapping: function() {
            return Vue.http.get('/org/area/0/child').then((response) => {
                if (response.data) {
                    let result = {},
                        datas = response.data;
                    for (var i = 0, l = datas.length; i < l; i++) {
                        result[datas[i].areaName] = datas[i].areaId;
                    }
                    return result;
                }
            });
        },
        multiSelect: false
    },
    employementCategory: {
        label: 'Category',
        whitespace: false,
        required: true,
        mapping: function() {
            return getDictMapping('EMPLOYEE_CATEGORY');
        },
        multiSelect: false
    },
    details: {

    },
    status: {

    }
});

export default {
    data() {
            let _self = this;
            return {
                panelTitle: this.$t('system.template.addCountryTemplate'),
                templateDetailsSchema: new Schema(templateDetailsData),
                areaTemplateSchema: areaTemplateSchema,
                areaTemplate: areaTemplateSchema.newModel(),
                templateDetailsList: [], //最多20个
                selIndex: 0,
                // 字典的列表
                dist: {
                    area: {}
                },

            }
        },
        created() {
            var self = this;
            this.$http.get('/org/area/0/child').then((response) => {
                if (response.data) {
                    let result = {},
                        datas = response.data;
                    for (var i = 0, l = datas.length; i < l; i++) {
                        result[datas[i].areaName] = datas[i].areaId;
                    }
                    self.dist.area = result;
                }
            });
        },
        ready() {

        },
        methods: {
            cancel() {
                this.$router.go({
                    name: 'staffAreaTemplate'
                });
            }
        },
        route: {
            data(transition) {
                let _self = this;
                _self.areaTemplate.areaTemplateId = transition.to.params.areaTemplateId;
                _self.panelTitle = this.$t('system.template.viewCountryTemplatet');

                _self.$http.post('/area/template/getAreaTemplateById', {
                    areaTemplateId: _self.areaTemplate.areaTemplateId
                }, {
                    emulateJSON: true
                }).then((response) => {
                    let props = response.json();
                    _self.templateDetailsList = props.areaTemplateDetails;
                    for (let r of _self.templateDetailsList) {
                        if (r.isMustFill === 'Y') {
                            r.isMustFill = 'Yes';
                        } else {
                            r.isMustFill = 'No';
                        }
                        if (r.isShow === 'Y') {
                            r.isShow = 'Yes';
                        } else {
                            r.isShow = 'No';
                        }
                    }
                    for (let prop in props) {
                        if (props.hasOwnProperty(prop)) {
                            _self.areaTemplate[prop] = props[prop];
                        }
                    }
                });
            }
        },
        components: {
          Panel: require('../../../components/basic/panel.vue')
        }
}

</script>
