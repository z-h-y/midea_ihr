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
    .panel-b .d-radio-group {
      width: 140px;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-setting-templateUpdate">
    <panel :title="panelTitle" class="panel-b" header="panel-header">
        <v-form v-ref:templateform :model="areaTemplate" :schema="areaTemplateSchema" label-width="145" label-suffix="" :cols="1" form-style="org-form">
            <select-field property='employementCategory' editor-width="250"></select-field>
            <text-field property="areaTemplateName" editor-width="250"></text-field>
            <select-field property="areaId" editor-width="250"></select-field>
        </v-form>
        <template-item v-ref:detailsform :data.sync="templateDetailsList"></template-item>
        <div class="btn-group">
            <ui-button @click="submit" color="primary mr10">Submit</ui-button>
            <ui-button @click="cancel" class="btn-default-bd" type="flat">Cancel</ui-button>
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
let areaTemplateSchema = new Schema({
    areaTemplateName: {
        label: 'Template Name',
        required: true,
        whitespace: false,
    },
    areaName: {
        label: 'Restrict to Country',
        required: true,
        whitespace: false,
    },
    areaId: {
        label: 'Restrict to Country',
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
                panelTitle: 'Add Country Template',
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
            submit() {
                    let _areaTemplateModel = this.areaTemplate,
                        _self = this;
                    let allPass = true;

                    let passed = this.areaTemplate.$schema.isFormValidate(this.$refs.templateform);
                    if (!passed) return;
                    let details = [];

                    _self.templateDetailsList.forEach(function(item, index) {
                        let vform = _self.$refs.detailsform.$children[index];
                        passed = item.$schema.isFormValidate(vform, {
                            focus: allPass
                        });
                        if (!passed) {
                            allPass = false;
                        }
                    });
                    if (!allPass) {
                        return;
                    }
                    for (var t of _self.templateDetailsList) {
                        let obj = {
                            fieldName: t.fieldName,
                            fieldBusinessName: t.fieldBusinessName,
                            fieldType: t.fieldType,
                            dataDictionary: t.dataDictionary,
                            isMustFill: t.isMustFill,
                            isShow: t.isShow
                        }
                        details.push(obj);
                    }
                    let updateAreaTemplateDto = {
                        areaTemplateDetails: details,
                        areaTemplateName: _areaTemplateModel.areaTemplateName,
                        areaId: _areaTemplateModel.areaId,
                        areaName: _areaTemplateModel.areaName,
                        employementCategory: _areaTemplateModel.employementCategory,
                        areaTemplateId: _areaTemplateModel.areaTemplateId,
                        status: _areaTemplateModel.status
                    }
                    let data = {};
                    convert(updateAreaTemplateDto, data, "", true);

                    if (_self.$route.name === 'addAreaTemplate') {
                        _self.$http.post('/area/template/createAreaTemplate', data, {
                            emulateJSON: true
                        }).then((response) => {
                            _self.$router.go({
                                name: 'staffAreaTemplate'
                            });
                            Message({
                                type: 'success',
                                message: 'Successfully saved'
                            });
                        });

                    } else if (_self.$route.name === 'editAreaTemplate') {

                        _self.$http.put(`/area/template/updateAreaTemplate`, data, {
                            emulateJSON: true
                        }).then((response) => {
                            _self.$router.go({
                                name: 'staffAreaTemplate'
                            });
                        });

                    }
                },
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
                if (_self.$route.name === 'addAreaTemplate') {
                    _self.panelTitle = 'Add Country Template';


                } else if (_self.$route.name === 'editAreaTemplate') {
                    _self.panelTitle = 'Edit Country Templatet';

                    _self.$http.post('/area/template/getAreaTemplateById', {
                        areaTemplateId: _self.areaTemplate.areaTemplateId
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        let props = response.json();

                        _self.$refs.detailsform.initList(props.areaTemplateDetails);

                        for (let prop in props) {
                            if (props.hasOwnProperty(prop)) {
                                _self.areaTemplate[prop] = props[prop];
                            }
                        }

                    });
                }
            }
        },
        events: {

        },
        components: {
            templateItem: require('./templateItem.vue'),
            Panel: require('../../../components/basic/panel.vue')
        }
}

</script>
