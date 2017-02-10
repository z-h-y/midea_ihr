<style lang="less">

#process-history-list {
    table {
        th,
        td {
            text-align: center;
        }
        // .num {
        //     width: 28px;
        //     height: 28px;
        //     display: inline-block;
        //     line-height: 28px;
        //     color: #fff;
        //     text-align: center;
        //     display: inline-block;
        //     border-radius: 50%;
        //     background: #97caff;
        // }
    }
    .c-3aa2eb {
        color: #3aa2eb;
    }
    .lh {
        line-height: 24px;
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
            <self-indicator v-ref:indicators :data.sync="indicatorList"></self-indicator>
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
    </panel>
    <div class="btn-group">
        <ui-button color="primary mr16" @click="handleSubmit">Submit</ui-button>
        <ui-button class="btn-default-bd ml-4" @click="handleCancel" type="flat">Cancel</ui-button>
    </div>
</div>
<person-selector :show.sync="showModel"></person-selector>

</template>

<script>

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
        label: 'Employee self Score',
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
        label: 'Employee Self Comment',
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
                basicInfo: {}, //基本信息
                selfEva: {
                    score: 0
                },
                memolist: [],
                processHistory: [], //流程节点
                indicatorList: [],
                loadding: false, //加载中,
                isHasIndicator: false, //显示无数据
                indicatorSchema: indicatorSchema,
                indicator: indicatorSchema.newModel(),
                submitLoading: false

            };
        },
        computed: {
            submitUrl() {
                    return '/performance/SelfPfmScoreDetails'; //自评
                },
                isSelfEvaluate() {
                    if (this.$route.name === 'selfevaluate') return true;
                    return false;
                }
                // selfEvaluateSchema() {
                //     return new Schema(selfEvaluateSchema);
                // }
        },
        created() {
            this.fetchBasicInfo();
            this.fetchIndicators();
            this.fetchProcessHistory();
            this.memoList();
        },
        methods: {
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
                    let _self = this;
                    _self.loadding = true;
                    _self.$http.get('/performance/employeeIndicators', {
                        params: {
                            schemeInfoId: _self.$route.params.sid,
                            schemeEmployeeId: this.$route.params.schemeEmployeeId
                        }
                    }).then((response) => {
                        let indicatorData = response.data;
                        if (indicatorData.length === 0) {
                            _self.isHasIndicator = true;
                        } else {
                            for (let key of indicatorData.keys()) {
                                Object.assign(indicatorData[key], {
                                    schema: _self.indicatorSchema,
                                    model: _self.indicatorSchema.newModel()
                                });
                            }
                            _self.$refs.indicators.initList(indicatorData);
                        }
                        _self.loadding = false;
                    });
                },
                handleParams() {
                    if (this.isSelfEvaluate) {
                        let tempParams = {
                                schemeId: this.$route.params.sid,
                                schemeEmployeeId: this.$route.params.schemeEmployeeId,
                                scoreDetail: []
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
                    }
                },
                handleSubmit() {
                    let _self = this,
                        passed, allPass = true;
                    if (_self.submitLoading)
                        return
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

                    let params = this.handleParams();

                    _self.submitLoading = true;
                    this.$http.post(this.submitUrl, params, {
                        emulateJSON: true
                    }).then((response) => {
                        if (response.body) {

                            Message({
                                type: 'success',
                                message: this.$t('myperformance.message.selfEvaluatehandleSubmit')
                            });

                            this.$router.go({
                                name: 'myOrgPerformance',
                                params: {
                                    openId: this.$route.params.openId
                                }
                            });
                        }
                        _self.submitLoading = false;
                    },(response) => {
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
        }, components: {
            selfIndicator: require('./selfEvaluate-indicator.vue'),
            Panel: require('../../components/basic/panel.vue')
        },
        events: {

        }
};

</script>
