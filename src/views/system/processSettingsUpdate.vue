<style lang="less">

.ihr-system-processSettingsUpdate {
    * {
        box-sizing: border-box;
    }
    padding-bottom: 88px;
    min-width: 1087px;
    .panel-b {
        border: 1px solid #ecedee;
    }
    .update-interns {
        position: relative;
    }
    .panel-header {
        overflow: hidden;
        padding-left: 18px;
        height: 60px;
        color: #2a3c59;
        font-size: 18px;
        line-height: 60px;
        border-bottom: solid 1px #e8e8e8;
    }
    .update-interns-rolecoll {
        width: 80%;
    }
    .update-process-form label {
        text-align: left;
        float: none;
        display: inline-block;
    }
    .update-process-form .field-content {
        padding-left: 0px;
        margin-left: 0 !important;
    }
    .d-panel-content {
        padding: 0;
    }
    .avatar {
        width: 20%;
        float: right;
        text-align: center;
        overflow: hidden;
        position: relative;
    }
    .avatar input {
        position: absolute;
        top: -30px;
        height: 150px;
        width: 120px;
        opacity: 0;
        cursor: pointer;
    }
    .add-interns-id {
        position: relative;
    }
    .update-interns-aca {
        background-color: #fafafa;
        padding: 20px;
        margin-bottom: 10px;
    }
    .ui-collapsible-body {
        padding: 0;
        border: none;
        width: auto!important;
    }
    .del-top {
        font-size: 20px;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }
    .save-top {
        font-size: 20px;
        position: absolute;
        top: 10px;
        right: 40px;
        cursor: pointer;
    }
    .del-bottom {
        font-size: 20px;
        position: absolute;
        bottom: 24px;
        right: 10px;
        cursor: pointer;
    }
    .save-basic-info {
        text-align: right;
        margin: 30px 10px;
    }
    .templateName {
        position: relative;
        >label {
            float: left;
            height: 32px;
            line-height: 32px;
        }
        >.field-content {
            float: left;
        }
        .field-hint {
            position: absolute;
            top: 8px;
            left: 275px;
        }
    }
    .selfEvaluateCycle {
        position: relative;
        >label {
            float: left;
            height: 32px;
            line-height: 32px;
        }
        >.field-content {
            float: left;
        }
        .field-hint {
            position: absolute;
            top: 8px;
            left: 275px;
        }
    }
    .ui-collapsible-header {
        padding: 0 20px;
    }
    .select-option {
        height: 34px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-system-processSettingsUpdate">

    <panel title="Add Process Template" class="panel-b" header="panel-header">
        <v-form v-ref:processform :model="processData" :schema="processSchema" class="mt20 mb10 pl20" label-width="125" label-suffix="" :cols="" form-style="update-process-form">
            <text-field class="templateName" property='templateName' editor-width="140"></text-field>
        </v-form>
        <ui-collapsible header="Performance Plan Process" :open.sync="collapsible.arolecoll" id="arolecoll-info">
            <div class="update-interns">
                <div class="p20">
                    <id-role v-ref:arole :data.sync="aroleList" parent-id="arolecoll-info" :employee-id.sync="ptid"></id-role>
                </div>
            </div>
        </ui-collapsible>
        <!-- <select-field class="selfEvaluateCycle" property='selfEvaluateCycle' editor-width="140"></select-field> -->
        <ui-collapsible header="Performance Evaluation Process" :open.sync="collapsible.prolecoll" id="prolecoll-info">
            <div class="update-interns">
                <div class="p20">
                    <id-role v-ref:prole :data.sync="proleList" parent-id="prolecoll-info" :employee-id.sync="ptid"></id-role>
                </div>
            </div>
        </ui-collapsible>

    </panel>

    <div class="btn-group">
        <ui-button @click="submit" color="primary mr10">Submit</ui-button>
        <ui-button @click="cancel" class="btn-default-bd" type="flat">Cancel</ui-button>
    </div>
</div>

</template>

<script type="text/ecmascript-6">

let Vue = require('vue');
import {
    default as Schema
}
from '../../schema/index';
import {
    default as Message
}
from '../../components/basic/message';
import {
    formatDate, getDictMapping, convert
}
from '../../util/assist';

let processSchema = new Schema({
    templateName: {
        label: 'Template Name',
        required: true,
        whitespace: false
    }
});
export default {
    data() {
            return {
                processSchema: processSchema,
                processData: processSchema.newModel(),
                aroleList: [],
                proleList: [],
                ptid: this.$route.params.ptid,
                // 各个collapsible是否展开
                collapsible: {
                    arolecoll: true,
                    prolecoll: true
                }
            };
        },
        computed: {

        },
        created() {

        },
        ready() {
            this.$broadcast('ui-collapsible::refresh-height');
            var templateId = this.ptid;
            if (templateId) {
                this.$http.get('/process/template/' + templateId).then(function(res) {
                    let arole = [],
                        prole = [];
                    for (let r of res.data.roles) {
                        if (r.stageName === 'auditPerformancePlan') {
                            arole.push(r);
                        } else {
                            prole.push(r);
                        }
                    }
                    this.$refs.arole.initList(arole);
                    this.$refs.prole.initList(prole);

                    this.processData.selfEvaluateCycle = res.data.selfEvaluateCycle;
                    this.processData.templateName = res.data.processTemplateName;
                    this.$broadcast('ui-collapsible::refresh-height');
                });
            }
        },
        attached() {},
        methods: {
            submit: function() {
                let _self = this,
                    allPass = true;

                let passed = this.processData.$schema.isFormValidate(this.$refs.processform);
                if (!passed) return;

                _self.aroleList.forEach(function(item, index) {
                    let vform = _self.$refs.arole.$children[index + 1];
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
                _self.proleList.forEach(function(item, index) {
                    let vform = _self.$refs.prole.$children[index + 1];
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
                let roleList = [];
                for (let r of this.aroleList) {
                    let obj = {
                        stageName: 'auditPerformancePlan', //阶段名称
                        approveRole: r.approveRole, //审批角色
                        nodeName: r.nodeName, //节点名称
                        operation: 'approve', //操作
                        orderNo: r.orderNo, //序号
                        mandatory: '1', //是否必需，1是;0否
                        modifiale: '1' //是否可变，1是;0否

                    }
                    roleList.push(obj);
                }
                for (let r of this.proleList) {
                    let obj = {
                        stageName: 'performanceEvaluate', //阶段名称
                        approveRole: r.approveRole, //审批角色
                        nodeName: r.nodeName, //节点名称
                        operation: 'approve', //操作
                        orderNo: r.orderNo, //序号
                        mandatory: '1', //是否必需，1是;0否
                        modifiale: '1' //是否可变，1是;0否
                    }
                    roleList.push(obj);
                }
                let item = {
                    roles: roleList,
                    templateName: this.processData.templateName,
                    selfEvaluateCycle: '1'
                };
                let data = {};
                convert(item, data, "", true);

                if (!this.ptid) {
                    _self.$http.post('/process/template/add', data, {
                        emulateJSON: true
                    }).then((response) => {
                        Message({
                            type: 'success',
                            message: 'Successfully saved'
                        });
                        this.$router.go({
                            name: 'processSettings'
                        });
                    });
                } else {
                    _self.$http.post('/process/template/' + this.ptid + '/update', data, {
                        emulateJSON: true
                    }).then((response) => {
                        Message({
                            type: 'success',
                            message: 'Successfully saved'
                        });
                        this.$router.go({
                            name: 'processSettings'
                        });
                    });
                }
            },
            cancel: function() {
                this.$router.go({
                    name: 'processSettings'
                });
            }
        },
        components: {
            IdRole: require('./processInfo/roles.vue'),
            Panel: require('../../components/basic/panel.vue')
        }
};

</script>
