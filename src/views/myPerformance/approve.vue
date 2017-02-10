<style lang="less">

.valign-inner {
    border-radius: 50%;
}

</style>

<template lang="html">

<div class="content-wrap ihr-annualPerformance">
    <panel :title="panelTitle" class=" panel-b" header="panel-header">
        <div id="ind-per" class="help-desk ind-per">
            <div class="help-desk-ctn">
                <ul class="regular fix">
                    <li>
                        <span class="prop-name">Employee Name</span>
                        <span class="prop-val">{{basicInfo.employeeName}}</span>
                    </li>
                    <li v-if="basicInfo.pfmType==='1'">
                        <span class="prop-name">Unit Name</span>
                        <span class="prop-val">{{basicInfo.unitName}}</span>
                    </li>
                    <li>
                        <span class="prop-name">Position</span>
                        <span class="prop-val">{{basicInfo.positionName}}</span>
                    </li>
                    <li>
                        <span class="prop-name">Restrict To Year</span>
                        <span class="prop-val">{{basicInfo.restrictYear}}</span>
                    </li>
                    <li>
                        <span class="prop-name">Evaluation Location</span>
                        <span class="prop-val">{{basicInfo.startDate | formatDate }} To {{basicInfo.endDate | formatDate}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div id="total-indicators" class="total-indicators-head">
            <div class="bte bg">
                <h3 class="head-title"> Indicators（Weight 100%）</h3>
            </div>
        </div>
        <div id="indicators-ctn-wrap" class="indicators-ctn-wrap">
            <template v-for="(index,item) in indicatorList">
                <div class="indicators-item" v-show="!item.isEdit">
                    <div class="indicators-head">
                        <div class="title">
                            <i class="number">{{ index + 1}}</i>
                            <span class="indicators-weight-title">{{item.indicatorName}} ({{item.unit}})</span>
                        </div>
                    </div>
                    <div class="indicators-body">
                        <div class="cell-1-1">
                            <label class="prop-name">Weight</label>
                            <div class="field-content"><span class="text-editor">{{item.weight}} %</span></div>
                        </div>
                        <div class="cell-1-1">
                            <label class="prop-name">Targets</label>
                            <div class="field-content"><span class="text-editor">{{item.target}}</span></div>
                        </div>
                        <div class="cell-1-1">
                            <label class="prop-name">Criteria/Formula</label>
                            <div class="field-content"><span class="text-editor">{{item.criteria}}</span></div>
                        </div>
                        <div class="cell-1-1">
                            <label class="prop-name">Data Source Dept</label>
                            <div class="field-content"><span class="text-editor">{{item.dataSources}}</span></div>
                        </div>
                    </div>
                </div>
            </template>
            <div class="loadding" v-show="loadding"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
        </div>
        <ui-collapsible :open="true" id="coll-process-history" header="Process History">
            <div id="process-history" class="process-history">
                <div class="process-history-ctn">
                    <ul class="fix cell-g ">
                        <template v-for="(index,item) in processHistory">
                            <li class="process-history-item cell-1-6">
                                <div class="img-wrap rel">
                                    <div class="valign">
                                        <div v-bind:class="{'valign-ctn active':item.nowNode,'valign-ctn': !item.nowNode}">
                                            <img class="valign-inner" :src='photoUrl(item.nodeUserDetailList[0].photoId)' />
                                        </div>
                                    </div>
                                    <div class="person-ico" v-if="item.templateRoleId && item.nodeUserDetailList.length > 1">
                                        <i class="fa fa-users" aria-hidden="true"></i>
                                        <div class="user-area">
                                            <div class="tc l user-msg" v-for="(index,u) in item.nodeUserDetailList">
                                                <img class="user-valign-inner-img" :src='photoUrl(u.photoId)' />
                                                <div class="mt5 mb16 c-c6a707d">
                                                    <p class="f12">{{u.employeeName}}</p>
                                                    <p class="f12">{{u.nodeName}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text">
                                    <p class="employee-name">{{item.nodeUserDetailList[0].employeeName}}</p>
                                    <div class="role">
                                        <p>{{item.nodeUserDetailList[0].nodeName}}</p>
                                    </div>
                                </div>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </ui-collapsible>

        <ui-collapsible class="mt16" :open="true" id="coll-memo" header="Process Record">
            <div id="process-history-list">
                <div class="process-history-ctn">
                    <table class="vuetable ui blue striped selectable celled stackable attached table">
                        <thead>
                            <tr>
                                <th>Stage</th>
                                <th>Role</th>
                                <th>Recipient</th>
                                <th>Operation</th>
                                <th>Suggestion</th>
                                <!-- <th></th> -->
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="m in memolist">
                                <td>
                                    <span class="num">{{$index+1}}</span>
                                </td>
                                <td>{{m.roleName}}</td>
                                <td>
                                    <div class="lh">{{m.employeeName}}</div>
                                </td>
                                <td>
                                    <div class="lh">{{m.operation}}</div>
                                </td>
                                <td>{{m.suggestion}}</td>
                                <td>
                                    <div class="lh">{{m.createTime | formatDate }}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </ui-collapsible>

        <ui-collapsible class="mt16" :open="true" id="aprove">
            <div id="process-history-list">
                <div class="process-history-ctn">
                    <v-form class="rel" :model="aprove" :schema="aproveSchema" v-ref:aproveform>
                        <div class='field'>
                            <label style="width:120px;">Operate</label>
                            <div class="field-content" style="margin-left:120px;">
                                <div class="cell-g">
                                    <div class="cell-1-1">
                                        <radioGroup-field property="veteran" label-width="0" :hide-label="true" editor-width="250" @click="refreshaprove"></radioGroup-field>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field posSelect" v-show="radioValue === '2' || radioValue === '3'">
                            <label style="width:30px;" v-show="radioValue === '3'">To</label>
                            <div class="field-content posSelect-select">
                                <div class="cell-g">
                                    <div class="cell-1-1">
                                        <!-- <select-field property="countryScope" label-width="0" :hide-label="true" :mapping="mapping" editor-width="250" v-show="radioValue === '2'"></select-field> -->
                                        <text-field property="employeeName" type="selector" :readonly="true" :show.sync="showModel" label-width="0" :hide-label="true" editor-width="250" v-show="radioValue === '3'"></text-field>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <text-field property="suggestions" type="textarea" :editor-height="100" editor-width="400"></text-field>
                    </v-form>
                </div>
            </div>
        </ui-collapsible>
    </panel>
    <div class="btn-group">
        <ui-button color="primary mr16" @click="handleSubmit">Submit</ui-button>
        <ui-button class="btn-default-bd ml-4" @click="handleCancel" type="flat">Cancel</ui-button>
    </div>
    <person-selector :show.sync="showModel" :multi-selected="false" :limit="false"></person-selector>
    <ui-confirm header="Delete" type="danger" confirm-button-text="Delete" confirm-button-icon="delete" deny-button-text="Cancel" @confirmed="deleteConfirmed" @denied="deleteDenied" :show.sync="show.deleteConfirm" close-on-confirm>
        Are you sure to delete this?
    </ui-confirm>
</div>

</template>

<script>

import {
    default as aproveSchema
}
from './aprove-schema';
import {
    default as Schema
}
from '../../schema/index';
import {
    default as selfEvaluateSchema
}
from './selfEvaluate-schema';
import {
    default as Message
}
from '../../components/basic/message';
import {
    convert
}
from '../../util/assist';
export default {
    data() {
            return {
                show: {
                    deleteConfirm: false
                },
                showModel: {
                    modal: false
                },
                panelTitle: '',
                mapping: {
                    'Simple-1': 1
                },
                basicInfo: {}, //基本信息
                selfEva: {
                    score: 0
                },
                memolist: [],
                processHistory: [], //流程节点
                indicatorList: [],
                loadding: false, //加载中,
                isHasIndicator: false, //显示无数据
                profile: {},
                submitLoading: false
            };
        },
        computed: {
            submitUrl() {
                    return '/performance/auditPerformance';
                },
                isSelfEvaluate() {
                    if (this.$route.name === 'selfevaluate') return true;
                    return false;
                },
                aproveSchema() {
                    return new Schema(aproveSchema);
                },
                aprove() {
                    return this.aproveSchema.newModel();
                },
                selfEvaluateSchema() {
                    return new Schema(selfEvaluateSchema);
                },
                selfEvaluate() {
                    return this.selfEvaluateSchema.newModel();
                },
                radioValue() {
                    return this.aprove.veteran;
                }
        },
        created() {
            this.fetchBasicInfo();
            this.fetchIndicators();
            this.fetchScore();
            this.fetchProcessHistory();
            this.memoList();
            this.initProfile();
        },
        methods: {
            refreshaprove() {
                    var timer;
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        this.$broadcast('ui-collapsible::refresh-height', 'aprove');
                    }, 200);
                },
                photoUrl(photoId) {
                    if (photoId)
                        return Vue.config.APIURL + `/system/attachment/downloadImg/${photoId}`;
                    else
                        return `/static/images/public/xwz.png`;
                },
                memoList() {
                    this.$http.get(`/process/performanceApproval/procInst/${this.$route.params.procInstId}/node/memo`).then(response => {
                        if (response.data) this.memolist = response.data.data;
                        this.$nextTick(function() {
                            this.$broadcast('ui-collapsible::refresh-height', 'coll-memo');
                        });
                    });
                },
                /*
                 * 查询顶头信息
                 */
                fetchBasicInfo() {
                    this.$http.get('/performance/schemeEmployees/basicInfo', {
                        params: {
                            schemeEmployeeId: this.$route.params.schemeEmployeeId
                        }
                    }).then((response) => {
                        if (response.data) {
                            this.basicInfo = response.data;
                            this.panelTitle = response.data.schemeName;
                        }
                    });
                },
                /**
                 * 查询个人指标
                 */
                fetchIndicators() {
                    this.loadding = true;
                    this.$http.get('/performance/approveEmployeeIndicators', {
                        params: {
                            schemeInfoId: this.$route.params.sid,
                            employeeId: this.$route.params.eid,
                            schemeEmployeeId: this.$route.params.schemeEmployeeId
                        }
                    }).then((response) => {

                        let indicatorData = response.data;
                        if (indicatorData.length === 0) {
                            this.isHasIndicator = true;
                        } else {
                            for (let key of indicatorData.keys()) {
                                let schema = this.selfEvaluateSchema;
                                Object.assign(indicatorData[key], {
                                    schema: schema,
                                    model: schema.newModel()
                                });
                            }
                            this.indicatorList = indicatorData;
                        }
                        this.loadding = false;
                    });
                },
                /**
                 * 流程记录
                 */
                fetchProcessHistory() {
                    this.$http.get(`/process/performanceApproval/procInst/${this.$route.params.procInstId}/nodeUsers`).then(response => {
                        if (response.data) {
                            this.processHistory = response.data;
                            let flag = false;
                            for (let r of this.processHistory) {
                                if (r.nowNode) {
                                    flag = true;
                                }
                                if (!flag) {
                                    r.arrow = false;
                                } else {
                                    r.arrow = true;
                                }
                            }
                        }
                        this.$nextTick(function() {
                            this.$broadcast('ui-collapsible::refresh-height', 'coll-process-history');
                        });
                    });
                },
                fetchScore() {
                    this.$http.get('/performance/getPerformanceView', {
                        params: {
                            schemeId: this.$route.params.sid,
                            schemeEmployeeId: this.$route.params.schemeEmployeeId
                        }
                    }).then(response => {

                    })
                },
                handleParams() {
                    let tempParams = {
                        submitType: this.aprove.veteran,
                        suggestion: this.aprove.suggestions,
                        referEmployeeId: this.aprove.employeeId,
                        schemeEmployeeId: this.$route.params.schemeEmployeeId

                    };
                    let params = {};
                    convert(tempParams, params, "", true);
                    return params;
                },
                handleSubmit() {
                    if (this.submitLoading)
                        return
                    if (this.aprove.veteran === '3' && !this.aprove.employeeId) {
                        let passed = this.aprove.$schema.isFormValidate(this.$refs.aproveform);
                        if (!passed) return;
                    }
                    let params = this.handleParams();
                    this.submitLoading = true;
                    this.$http.post(this.submitUrl, params, {
                        emulateJSON: true
                    }).then((response) => {
                        if (response.body) {
                            this.$router.go({
                                name: 'myOrgPerformance',
                                params: {
                                    openId: this.$route.params.openId
                                }
                            });
                            Message({
                                type: 'success',
                                message: this.$t('myperformance.message.approvehandleSubmit')
                            });
                        }
                        this.submitLoading = false;
                    }, (response) => {
                        this.submitLoading = false;
                    });
                },
                handleCancel() {
                    this.$router.go({
                        name: 'myOrgPerformance',
                        params: {
                            openId: this.$route.params.openId
                        }
                    });
                },
                initProfile() {
                    this.$http.get(`/employee/employees/profile`).then((response) => {
                        if (response.data) {
                            this.profile = response.data;
                        }
                    });
                }
        },
        events: {
            'selected-person': function(selectedData) {
                if (this.profile.employeeId != selectedData[0].employeeId && this.$route.params.employeeId != selectedData[0].employeeId) {
                    this.aprove.employeeName = selectedData[0].employeeName
                    this.aprove.employeeId = selectedData[0].employeeId
                } else {
                    Message({
                        type: 'error',
                        message: this.$t('myperformance.message.approveselectedperson')
                    });
                }
            }
        },
        components: {
            Panel: require('../../components/basic/panel.vue')
        }
};

</script>
