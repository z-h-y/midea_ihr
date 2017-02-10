<style lang="less">

// 用户基本信息列表展示区域
#basicinfo-section {
    padding: 20px;
    div:only-of-type {
        box-flex: 1;
    }
    .basicinfo-section-cnt {
        overflow: hidden;
        position: relative;
        .employees-with-list {
            display: block;
            .wrap {
                user-select: none;
                align-items: center;
                display: inline-flex;
                padding-bottom: 7px;
                padding-top: 7px;
                font-size: 14px;
                // position: absolute;
                // left: 80px;
                label {
                    width: 135px;
                    display: inline-block;
                    text-align: left;
                    color: #a5acbe;
                }
                span {
                    margin-left: 8px;
                    display: inline-block;
                    color: #6a707d;
                    width: 500px;
                }
            }
        }
        #score-area {
            position: absolute;
            display: block;
            width: 160px;
            height: 80px;
            right: 172px;
            top: 30px;
            .avatar-wrap {

                label {
                    min-width: 60px;
                    margin-right: 20px;
                    text-align: center;
                    font-size: 18px;
                    color: #2a3c59;
                    line-height: 80px;
                    float: left;
                }
                .wrap {
                    border-radius: 50%;
                    background: #70bff6;
                    width: 80px;
                    height: 80px;
                    float: left;
                    .number {
                        overflow: hidden;
                        display: inline-block;
                        width: 100%;
                        font-size: 24px;
                        color: #fff;
                        line-height: 80px;
                        text-align: center;
                    }
                }
            }
        }
    }
}

#indicators-ctn-wrap {
    .indicators-item {
        .score {
            border-radius: 3px;
            padding: 16px 16px;
            background-color: #fafafa;
            font-size: 14px;
            font-weight: bold;
            .score-ctn {
                padding: 16px 0px 0 0;
                display: flex;
            }
            .avater {
                float:left;
                width: 64px;
                height: 64px;
                padding: 2px;
                overflow: hidden;
                .img-wrap {
                    display: inline-flex;
                    text-align: center;
                    vertical-align: middle;
                    height: 60px;
                    width: 60px;
                    background: #f2f2f2;
                    border-radius: 50%;
                    img {
                        width: 60px;
                        height: 60px;
                    }
                }
            }
            .score-number {
                float:left;
                width: 80px;
                height: 64px;
                text-align: center;
                margin-left: 15px;
                span {
                    font-size: 14px;
                    line-height: 64px;
                    font-weight: bold;
                    color: #3aa2eb;
                }
            }
            .comment {
                margin-left: 10px;
                float:left;
                min-width: 600px;
                line-height: 64px;
                overflow: hidden;
                p {
                    color: #6a707d;
                    font-size: 14px;
                }
            }
        }
        .score-type {
            span {
                color: #a5acbe;
            }
        }
    }
}

.user-valign-inner-img {
    border-radius: 50%;
    width: 70px;
    height: 70px;
}

// 业务样式
.ihr-myPerformance-view {
    .prop-name {
        width: 160px !important;
        margin-right: 10px;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-annualPerformance ihr-myPerformance-view">
    <panel :title="panelTitle" class=" panel-b" header="panel-header">
        <section id="basicinfo-section">
            <div class="basicinfo-section-cnt">
                <div class="employees-with-list">
                    <div class="wrap">
                        <label class="prop-name">Employee Name</label>
                        <span>{{basicInfo.employeeName}}</span>
                    </div>
                </div>
                <div v-if="basicInfo.pfmType==='1'" class="employees-with-list">
                    <div class="wrap">
                        <label class="prop-name">Unit Name</label>
                        <span>{{basicInfo.unitName}}</span>
                    </div>
                </div>
                <div class="employees-with-list">
                    <div class="wrap">
                        <label class="prop-name">Position</label>
                        <span>{{basicInfo.positionName}}</span>
                    </div>
                </div>
                <div class="employees-with-list">
                    <div class="wrap">
                        <label class="prop-name">Restrict To Year</label>
                        <span>{{basicInfo.restrictYear}}</span>
                    </div>
                </div>
                <div class="employees-with-list">
                    <div class="wrap">
                        <label class="prop-name">Evaluation Location</label>
                        <span>{{basicInfo.startDate | formatDate }} To {{basicInfo.endDate | formatDate}}</span>
                    </div>
                </div>
                <div id="score-area">
                    <div class="avatar-wrap fix">
                        <label>Score</label>
                        <div class="wrap">
                            <span class="number">{{basicInfo.finalScore}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
                        <div class="score" v-if="item.selfScoreDetails || item.scoreDetails.length > 0">
                            <div class="cell-g" v-if="item.selfScoreDetails !== null">
                                <div class="cell-1-1 score-type"><span>Self Evaluation</span></div>
                                <div class="cell-1-1 score-ctn">
                                    <div class="avater">
                                        <div class="img-wrap">
                                            <img class="valign-inner" :src='photoUrl(item.selfScoreDetails.photoId)'>
                                        </div>
                                    </div>
                                    <div class="score-number">
                                        <span>{{item.selfScoreDetails.score}}</span>
                                    </div>
                                    <div class="comment">
                                        <p>{{item.selfScoreDetails.comment}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="cell-g" v-show="item.scoreDetails && item.scoreDetails.length > 0">

                                <div class="cell-1-1 score-type"><span>Mutual Evaluation</span></div>

                                <template v-for="(index,scoreItem) of item.scoreDetails">
                                    <div class="cell-1-1 score-ctn">
                                        <div class="avater">
                                            <div class="img-wrap">
                                                <img class="valign-inner" :src='photoUrl(scoreItem.photoId)'>
                                            </div>
                                        </div>
                                        <div class="score-number">
                                            <span>{{scoreItem.score}}</span>
                                        </div>
                                        <div class="comment">
                                            <p>{{scoreItem.comment}}</p>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>

        <div class="loadding" v-show="loadding"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
        <!-- <div class="alert" v-show="isHasIndicator">
            <div class="alert-ctn">
                <i class="fa fa-exclamation-triangle warning-Icon" aria-hidden="true"></i>
                <span>No Data</span>
            </div>
        </div> -->
        <ui-collapsible :open="true" id="coll-process-history" header="Process History">
            <div id="process-history" class="process-history">
                <div class="process-history-ctn">
                    <ul class="fix cell-g ">
                        <template v-for="(index,item) in processHistory">
                            <li class="process-history-item cell-1-6">
                                <div class="img-wrap rel">
                                    <div class="valign">
                                        <div v-bind:class="{'valign-ctn active':item.nowNode,'valign-ctn': !item.nowNode}">
                                            <img v-if="item.nodeUserDetailList.length > 0" class="valign-inner" :src='photoUrl(item.nodeUserDetailList[0].photoId)' />
                                            <img v-if="item.nodeUserDetailList.length == 0" class="valign-inner" src='/static/images/public/xwz.png' />
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
                                    <p class="employee-name" v-if="item.nodeUserDetailList.length > 0">{{item.nodeUserDetailList[0].employeeName}}</p>
                                    <div class="role">
                                        <p>{{item.nodeName}}</p>
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
        <ui-button class="btn-default-bd" @click="handleCancel" type="flat">Close</ui-button>
    </div>
</div>

</template>

<script>

import {
    default as performance
}
from './performance-schema';
import {
    default as Schema
}
from '../../schema/index';
import {
    default as Message
}
from '../../components/basic/message';
import {
    formatDate
}
from '../../util/assist';
export default {
    data() {
            let _self = this;
            return {
                panelTitle: '',
                basicInfo: {}, //基本信息
                memolist: [],
                processHistory: [], //流程节点
                indicatorList: [],
                loadding: false, //加载中,
                isHasIndicator: false //显示无数据
            };
        },
        computed: {

        },
        ready() {
            this.fetchBasicInfo();
            this.fetchIndicators();
            this.memoList();
            this.fetchProcessHistory();


        },
        methods: {
            photoUrl(photoId) {
                    if (photoId)
                        return Vue.config.APIURL + `/system/attachment/downloadImg/${photoId}`;
                    else
                        return `/static/images/public/xwz.png`;
                },
                handleFormatDate(value) {
                    return formatDate(new Date(value));
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
                    let url = '/performance/getPerformanceViewByEmployeeId';
                    let params = {
                        schemeId: this.$route.params.sid,
                        employeeId: this.$route.params.employeeId,
                        schemeEmployeeId: this.$route.params.schemeEmployeeId
                    }
                    if (this.$route.params.employeeId === '0') {
                        url = '/performance/getPerformanceView';
                    }
                    this.$http.get(url, {
                        params
                    }).then((response) => {

                        let indicatorData = response.data;
                        if (indicatorData.length === 0) {
                            this.isHasIndicator = true;
                        } else {
                            this.indicatorList = indicatorData;
                        }
                        this.loadding = false;
                        // this.$nextTick(function() {
                        //     this.$dispatch('ui-collapsible::refresh-height');
                        // });
                    });
                },
                memoList() {
                    this.$http.get(`/process/performanceApproval/procInst/${this.$route.params.procInstId}/node/memo`).then(response => {
                        if (response.data) {
                            this.memolist = response.data.data;
                            this.$nextTick(function() {
                                this.$broadcast('ui-collapsible::refresh-height', 'coll-memo');
                            });
                        }
                    });
                },
                fetchProcessHistory() {
                    if (this.$route.params.procInstId === '-1') {
                        let data = {
                            employeeId: this.$route.params.employeeId,
                            processTemplateId: this.$route.params.processTemplateId,
                            schemeInfoId: this.$route.params.sid
                        }
                        this.$http.post(`/process/performanceApproval/processTemplate/nodeUsers`, data, {
                            emulateJSON: true
                        }).then((response) => {
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
                    } else {
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
                    }
                },
                handleCancel() {
                    if (this.$route.params.employeeId === '0') {
                        this.$router.go({
                            name: 'myOrgPerformance',
                            params: {
                                openId: this.$route.params.openId
                            }
                        });
                    } else {
                        if (this.$route.params.back === '1') {
                            history.back()
                        }
                        if (this.$route.params.back === '2') {
                            history.back()
                        }

                    }
                }
        },
        components: {
            Panel: require('../../components/basic/panel.vue')
        }
};

</script>
