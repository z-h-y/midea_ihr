<style lang="less">

.ihr-evaluate {
    #process-history-list {
        height: 150px;
    }
    .regular li {
        width: 50% !important;
    }
    .help-desk .prop-name {
        width: 160px;
        margin-right: 10px;
    }
    .help-desk .prop-val {
        width: 295px;
        margin-right: 10px;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-annualPerformance ihr-evaluate">
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
            <evaluate-indicator v-ref:indicators :data.sync="indicatorList"></evaluate-indicator>

            <div class="loadding" v-show="loadding"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
            <!-- <div class="alert" v-show="isHasIndicator">
                <div class="alert-ctn">
                    <i class="fa fa-exclamation-triangle warning-Icon" aria-hidden="true"></i>
                    <span>No Data</span>
                </div>
            </div> -->
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
                                <!-- <td> -->
                                <!-- <div class="lh">10/02/2016</div> -->
                                <!-- <div class="lh c-3aa2eb">11/02/2016</div> -->
                                <!-- </td> -->
                                <td>
                                    <div class="lh">{{m.createTime | formatDate }}</div>
                                    <!-- <div class="lh c-3aa2eb">10:02</div> -->
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
                        <div class="field posSelect fix" v-show="radioValue === '2' || radioValue === '3'">
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
        <ui-button color="primary mr20" @click="handleSubmit">Submit</ui-button>
        <ui-button class="btn-default-bd" @click="handleCancel" type="flat">Cancel</ui-button>
    </div>
    <person-selector :show.sync="showModel" :multi-selected="false" :limit="false"></person-selector>
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
    default as Message
}
from '../../components/basic/message';
import {
    convert
}
from '../../util/assist';
let indicatorSchema = new Schema({
    employeeSelfScore: {
        label: 'Score',
        required: true,
        whitespace: false,
        rules: {
            type: 'custom',
            message: 'Please enter a 1~999 positive integer!',
            validate() {
                var isValidate = true;
                if (this.employeeSelfScore < 0 || this.employeeSelfScore > 999) {
                    isValidate = false;
                } else {
                    if (this.employeeSelfScore % 1 !== 0) {
                        isValidate = false;
                    }
                }
                return isValidate;
            }
        }
    },
    comment: {
        label: 'Comment',
        required: true,
        whitespace: false
    }
});
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
                profile: {},
                loadding: false, //加载中,
                isHasIndicator: false, //显示无数据
                indicatorSchema: indicatorSchema,
                indicator: indicatorSchema.newModel(),
                submitLoading: false

            };
        },
        computed: {
            submitUrl() {
                    return '/performance/PfmScoreDetails';
                },
                aproveSchema() {
                    return new Schema(aproveSchema);
                },
                aprove() {
                    return this.aproveSchema.newModel();
                },
                radioValue() {
                    return this.aprove.veteran;
                }
        },
        created() {
            this.fetchBasicInfo();
            this.fetchIndicators();
            this.fetchScore();
            this.memoList();
            this.fetchProcessHistory();
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
                /*
                 * 查询顶头信息
                 *
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
                fetchIndicators() {
                    this.$http.get(`/employee/employees/profile`).then((response) => {
                        if (response.data) {
                            this.profile = response.data;
                            this.fetchIndicatorsList();
                        }
                    });
                },
                /**
                 * 查询个人指标
                 */
                fetchIndicatorsList() {
                    let _self = this;
                    _self.loadding = true;
                    _self.$http.get('/performance/getEvaluePerformanceView', {
                        params: {
                            schemeId: _self.$route.params.sid,
                            employeeId: _self.$route.params.eid,
                            schemeEmployeeId: this.$route.params.schemeEmployeeId
                        }
                    }).then((response) => {
                        let indicatorData = response.data;
                        if (indicatorData.length === 0) {
                            this.isHasIndicator = true;
                        } else {
                            for (let key of indicatorData.keys()) {
                                Object.assign(indicatorData[key], {
                                    photoId: _self.profile.photoId,
                                    schema: _self.indicatorSchema,
                                    model: _self.indicatorSchema.newModel()
                                });
                            }
                            _self.$refs.indicators.initList(indicatorData);
                        }
                        _self.loadding = false;
                    });
                },
                fetchScore() {
                    this.$http.get('/performance/getPerformanceView', {
                        params: {
                            schemeId: this.$route.params.sid
                        }
                    }).then(response => {

                    })
                },
                handleParams() {
                    let tempParams = {
                            schemeId: this.$route.params.sid,
                            schemeEmployeeId: this.$route.params.schemeEmployeeId,
                            scoreDetail: [],
                            submitType: this.aprove.veteran,
                            suggestion: this.aprove.suggestions,
                            referEmployeeId: this.aprove.employeeId
                        },
                        indicatorData = this.indicatorList,
                        params = {};
                    for (let key of indicatorData.keys()) {
                        let val = indicatorData[key],
                            model = val.model;
                        tempParams.scoreDetail.push({
                            employeeIndicatorId: val.employeeIndicatorId,
                            score: model.employeeSelfScore,
                            comment: model.comment
                        });
                    }
                    convert(tempParams, params, "", true);
                    return params;
                },
                handleSubmit() {
                    let _self = this,
                        passed, allPass = true;

                    if (_self.submitLoading)
                        return

                    if (this.aprove.veteran === '3' && !this.aprove.employeeId) {
                        let passed = this.aprove.$schema.isFormValidate(this.$refs.aproveform);
                        if (!passed) return;
                    }

                    if (this.aprove.veteran === '1') {
                        _self.indicatorList.forEach(function(item, index) {
                            let vform = _self.$refs.indicators.$children[index];
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
                    }

                    let params = this.handleParams();

                    _self.submitLoading = true;
                    this.$http.post(this.submitUrl, params, {
                        emulateJSON: true
                    }).then((response) => {
                        if (response.body) {

                            Message({
                                type: 'success',
                                message: this.$t('myperformance.message.evaluatehandleSubmit')
                            });

                            this.$router.go({
                                name: 'myOrgPerformance',
                                params: {
                                    openId: this.$route.params.openId
                                }
                            });
                        }
                        _self.submitLoading = false;
                    }, (response) => {
                        _self.submitLoading = false;
                    });
                },
                handleCancel() {
                    this.$router.go({
                        name: 'myOrgPerformance',
                        params: {
                            openId: this.$route.params.openId
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
                        message: this.$t('myperformance.message.evaluateselectedperson')
                    });
                }
            }
        },
        components: {
            evaluateIndicator: require('./evaluate-indicator.vue'),
            Panel: require('../../components/basic/panel.vue')
        }


};

</script>
