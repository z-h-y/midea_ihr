<style lang="less">

.ihr-system-processSettingsView {
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

<div class="content-wrap ihr-system-processSettingsView">

    <panel title="View Process Template" class="panel-b" header="panel-header">
        <v-form v-ref:processform :model="processData" :schema="processSchema" class="mt20 mb10 pl20" label-width="125" label-suffix="" :cols="" form-style="update-process-form">
            <text-increment class="templateName" property='templateName' editor-width="140"></text-increment>
        </v-form>
        <ui-collapsible header="Performance Plan Process" :open.sync="collapsible.arolecoll" id="arolecoll-info">
            <div class="update-interns">
                <div class="p20">
                    <template v-for="item in aroleList">
                        <div class="add-interns-id">
                            <v-form :model="item" :schema="processSchema" label-width="140" label-suffix="" :cols="6" form-style="update-interns-form">
                                <text-increment class="orderNo" :hide-label="$index !== 0" type="number" property="orderNo" editor-width="80"></text-increment>
                                <text-increment class="approveRole" :hide-label="$index !== 0" property='approveRole' editor-width="140"></text-increment>
                                <text-increment class="nodeName" :hide-label="$index !== 0" property='nodeName' editor-width="140"></text-increment>
                            </v-form>
                        </div>
                    </template>
                </div>
            </div>
        </ui-collapsible>
        <ui-collapsible header="Performance Evaluation Process" :open.sync="collapsible.prolecoll" id="prolecoll-info">
            <div class="update-interns">
                <div class="p20">
                    <template v-for="item in proleList">
                        <div class="add-interns-id">
                            <v-form :model="item" :schema="processSchema" label-width="140" label-suffix="" :cols="6" form-style="update-interns-form">
                                <text-increment class="orderNo" :hide-label="$index !== 0" type="number" property="orderNo" editor-width="80"></text-increment>
                                <text-increment class="approveRole" :hide-label="$index !== 0" property='approveRole' editor-width="140"></text-increment>
                                <text-increment class="nodeName" :hide-label="$index !== 0" property='nodeName' editor-width="140"></text-increment>
                            </v-form>
                        </div>
                    </template>
                </div>
            </div>
        </ui-collapsible>

    </panel>

    <div class="btn-group">

        <ui-button @click="cancel" class="btn-default-bd" type="flat">Back</ui-button>
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

            let _self = this;
            let processSchema = new Schema({
                orderNo: {
                    label: 'Order No',
                },
                approveRole: {
                    label: 'Approve Role',
                },
                nodeName: {
                    label: 'Node Name',
                }
            });

            return {
                processSchema: processSchema,
                processData: processSchema.newModel(),
                aroleList: [],
                proleList: [],
                ptid: this.$route.params.ptid,
                collapsible: {
                    arolecoll: true,
                    prolecoll: true
                },
                dist: {
                    PROCESS_TEMPLATE_APPROVE_ROLE: {},
                }
            };
        },
        computed: {

        },
        ready() {
            this.$broadcast('ui-collapsible::refresh-height');
            var templateId = this.ptid;
            if (templateId) {
                this.$http.get('/process/template/' + templateId).then(function(res) {
                    let arole = [],
                        prole = [];
                    for (let r of res.data.roles) {
                        r.approveRole = this.fixDist(r.approveRole);
                    }
                    for (let r of res.data.roles) {
                        if (r.stageName === 'auditPerformancePlan') {
                            arole.push(r);
                        } else {
                            prole.push(r);
                        }
                    }
                    this.aroleList = arole;
                    this.proleList = prole;

                    this.processData.selfEvaluateCycle = res.data.selfEvaluateCycle;
                    this.processData.templateName = res.data.processTemplateName;
                    this.$broadcast('ui-collapsible::refresh-height');
                });
            }
        },
        created() {
            var _self = this;
            getDictMapping('PROCESS_TEMPLATE_APPROVE_ROLE').then(function(res) {
                _self.dist.PROCESS_TEMPLATE_APPROVE_ROLE = res;
            });
        },
        attached() {

        },
        methods: {
            cancel: function() {
                this.$router.go({
                    name: 'processSettings'
                });
            },
            fixDist(value) {
                var dist = this.dist.PROCESS_TEMPLATE_APPROVE_ROLE || {};
                for (let key of Object.keys(dist)) {
                    if (dist[key] === value) {
                        value = key;
                        break;
                    }
                }
                return value;
            }
        },
        components: {
          Panel: require('../../components/basic/panel.vue')
        }

};

</script>
