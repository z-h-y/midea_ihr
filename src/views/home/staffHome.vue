<style lang="less">

.ihr-home {
    // min-width: 1079px;
    * {
        box-sizing: border-box;
    }
    .dis-table {
        display: table;
        width: 100%;
    }
    .w90 {
        width: 90px;
    }
    .tab-cell {
        display: table-cell;
    }
    .left-panel {
        height: 270px;
    }
    .right-panel {
        height: 270px;
    }
    .panel-content-line {
        height: 210px;
        border-left: 1px solid #e9eef2;
        position: absolute;
        left: 9px;
    }
    .panel-content-ul {
        height: 188px;
        overflow: hidden;
    }
    .panel-content-img {
        float: left;
        position: relative;
        z-index: 2;
    }
    .panel-content-task {
        margin: 20px auto;
        width: 134px;
    }
    .panel-content-circle {
        width: 134px;
        height: 134px;
        line-height: 134px;
        text-align: center;
        color: #3aa2eb;
        font-size: 28px;
        background: url("../../assets/images/public/roundness.png") no-repeat center center;
    }
    .panel-content-txt {
        font-size: 14px;
        text-align: center;
    }
    .bf {
        .left-panel {
            float: initial;
        }
    }
    .bf-left-table {
        tr {
            vertical-align: top;
            height: 72px;
            .txt a {
                color: #2a3c59;
            }
        }
        .tr-viewed {
            .fa-file,
            .txt a {
                color: #3aa2eb;
            }
        }
        td {}
        .fa-file {
            transition: 0.2s;
        }
    }
    .bF .right-panel {
        height: auto;
        .panel-content {
            padding: 0 15px 16px;
        }
    }
    .bf-right-area {
        width: 50%;
        &:last-child,&:nth-last-child(2){
            border-bottom: none;
            padding: 0;
            margin: 0;
        }
    }
    .cF .panel-content {
        padding: 0;
    }
    .cf-user {
        width: 14px;
        height: 20px;
        float: left;
        background: url("../../assets/images/public/user.png") no-repeat 0 2px;
    }
    .cf-position {
        width: 14px;
        height: 20px;
        float: left;
        background: url("../../assets/images/public/position.png") no-repeat 2px 0;
    }
    .contact {
        background: #81cbff;
        position: absolute;
        bottom: 0;
    }
    .contact li {
        height: 81px;
        float: left;
        transition: 0.3s;
    }
    .contact li:nth-child(2) {
        background: #61bcfc;
    }
    .contact-num {
        color: #fff;
    }
    .w-per40 {
        width: 40%;
    }
    .w400 {
        width: 400px;
    }
    .wh-px40 {
        width: 40px;
        height: 40px;
    }
    .wh-px80 {
        width: 80px;
        height: 80px;
    }
    .pt30 {
        padding-top: 30px;
    }
    .c-a5acbe {
        color: #a5acbe;
    }
    .c-6a707d {
        color: #6a707d;
    }
    .c-e3e3e3 {
        color: #e3e3e3;
    }
    .c-d1ecff {
        color: #d1ecff;
    }
    .echarts {
        height: 300px;
    }
    .pr8 {
        padding-right: 8px;
    }
    .pl16 {
        padding-left: 16px;
    }
    .mt16 {
        margin-top: 16px;
    }
    .wh80 {
        width: 80px;
        height: 80px;
    }
    .ico-noti {
        font-size: 14px;
        float: left;
        margin: 4px 0 0;
    }
    .w340 {
        min-width: 340px;
    }
    .panel-content-center {
        width: 328px;
        margin: 0 auto;
    }
    .teams-ul {
        float: left;
        li {
            float: left;
        }
    }
    .header {
        width: 150px;
        img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
        }
    }
    .name {
        width: 150px;
        height: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #6a707d;
    }
    .bg {
        width: 320px;
        min-height: 24px;
        line-height: 24px;
        border: 1px solid rgba(0, 0, 0, 0);
        border-radius: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background-color: #fafafa;
        margin: 0 10px 10px;
        color: #a5acbe;
    }
    .ico-baseSty() {
        width: 24px;
        height: 24px;
        float: left;
        padding-left: 32px;
    }
    .phone {
        .ico-baseSty();
        background: url("../../assets/images/public/staff-interns-phone-1.png") no-repeat;
    }
    .email {
        .ico-baseSty();
        background: url("../../assets/images/public/staff-interns-mail-1.png") no-repeat;
    }
    .vam {
        vertical-align: middle;
    }
    .pb6 {
        padding-bottom: 6px;
    }
    .mr30 {
        margin-right: 30px;
    }
    .memo {
        padding-right: 16px;
        float: left;
        width: 480px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .mb23 {
        margin-bottom: 23px;
    }
}

</style>

<template lang="html">

<div class="content-wrap bdn ihr-home">
    <div class="aF dis-table">
        <!-- 代办 -->
        <div class="tab-cell w-per40">
            <div class="panel left-panel">
                <div class="panel-tit">
                    <span>{{ $t('home.toDo') }}</span>
                    <!-- <a class="panel-more" href="javascript:void(0)">More</a> -->
                </div>
                <div class="panel-content fix">
                    <div class="panel-content-center fix">
                        <div class="panel-content-task poi l mr30" @click="goToDoPerformance">
                            <div class="panel-content-circle poi">
                                {{todoCounts.schemeCount}}
                            </div>
                            <div class="panel-content-txt">
                                {{ $t('home.performance') }}
                            </div>
                        </div>
                        <div class="panel-content-task poi l" @click="goToDoAnnualPerformance">
                            <div class="panel-content-circle poi">
                                {{todoCounts.annualSchemeCount}}
                            </div>
                            <div class="panel-content-txt">
                                {{ $t('home.annualPerformance') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--
        <div class="pl16 tab-cell">
            <div class="panel right-panel">
                <div class="panel-tit">
                    <span>PERFORMANCE</span>
                    <a class="panel-more" href="javascript:void(0)">More</a>
                </div>
                <div class="panel-content" id="echartsArea">
                    <echarts style="height:200px;" :options="polar" theme="macarons"></echarts>
                </div>
            </div>
        </div>-->
        <div class="tab-cell pl16">
            <div class="panel left-panel">
                <div class="panel-tit">
                    <span>{{ $t('home.notification') }}</span>
                    <a class="panel-more" v-link="{name: 'notification'}">{{ $t('home.more') }}</a>
                </div>
                <div class="panel-content pt16">
                    <table class="bf-left-table f16">
                        <tr v-bind:class="{'tr-viewed':notification.readStatus==='Y'}" v-for="notification in notifications">
                            <td class="pr8 "><i class="fa fa-file c-e3e3e3 ico-noti" aria-hidden="true"></i></td>
                            <td class="pr10 w-per100">
                                <div class="ell txt">
                                    <a v-link="{name: 'viewNotification', params: {id: notification.messageId }, query: {back: 'home'}}">{{notification.messageTitle}}</a>
                                </div>
                                <div class="f14 mt5 w380 ell c-a5acbe">
                                    {{notification.sendUser}}
                                </div>
                            </td>
                            <td class="c-a5acbe w90 nowrap f14">{{notification.planSendDate | formatDate}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="cF dis-table mt16">
        <div class="tab-cell w-per40">
            <div class="panel left-panel rel w590">
                <div class="panel-tit">
                    <span>{{ $t('home.myProfile') }}</span>
                    <a class="panel-more" v-link="{name: 'myProfile'}">{{ $t('home.more') }}</a>
                </div>
                <div class="panel-content">
                    <table class="w-per100 f14 mt20 ml20">
                        <tr>
                            <td style="width:80px;" rowspan="3">
                                <img class="wh80 br50" :src='photoUrl(profile.photoId)' alt="" />
                            </td>
                            <td class="c-6a707d">
                                <span class="pl10">{{profile.fullName}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="c-a5acbe">
                                <i class="cf-user ml10 mr10" aria-hidden="true"></i>
                                <span>{{profile.businessCardTitle}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="c-a5acbe">
                                <i class="cf-position ml10 mr10" aria-hidden="true"></i>
                                <span>{{profile.localJobGrade}}</span>
                            </td>
                        </tr>
                    </table>
                    <ul class="contact w-per100 fix">
                        <li class="float-three pt15 pb15 tc">
                            <div>
                                <i class="fa fa-phone c-d1ecff f22" aria-hidden="true"></i>
                            </div>
                            <div class="contact-num f14 mt10 bk" :title="profile.officePhone">
                                {{profile.officePhone}}
                            </div>
                        </li>
                        <li class="float-three pt15 pb15 tc">
                            <div>
                                <i class="fa fa-envelope c-d1ecff f22" aria-hidden="true"></i>
                            </div>
                            <div class="contact-num f14 mt10 bk" :title="profile.email">
                                {{profile.email}}
                            </div>
                        </li>
                        <li class="float-three pt15 pb15 tc">
                            <div>
                                <i class="fa fa-map-marker c-d1ecff f22 " aria-hidden="true"></i>
                            </div>
                            <div class="contact-num f14 mt10 bk" :title="profile.homeAddress">
                                {{profile.homeAddress}}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="pl16 tab-cell">
            <div class="panel right-panel">
                <div class="panel-tit">
                    <span>{{ $t('home.myRecord') }}</span>
                    <a class="panel-more" v-link="{name: 'myRecord'}">{{ $t('home.more') }}</a>
                </div>
                <div class="panel-content f14">
                    <ul class="mt20 ml20 fix rel panel-content-ul">
                        <li class="l w-per100 mb23" v-for="record in records" v-if="$index < 5">
                            <img class="panel-content-img" src="assets/images/public/home-point.png" alt="" />
                            <span class="pl20 c-a5acbe l mr10" style="width:100px;height:19px;line-height:19px;">{{record.recordTime}}</span>
                            <span class="pl20 c-6a707d memo" :title="record.memo">{{record.memo}}</span>
                        </li>
                        <div class="panel-content-line"></div>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="bF dis-table mt16">

        <div class="tab-cell">
            <div class="panel right-panel">
                <div class="panel-tit">
                    <span>{{ $t('home.myTeam') }}</span>
                    <a class="panel-more poi" @click="goTeam">{{ $t('home.more') }}</a>
                </div>
                <div class="panel-content fix">
                    <div class="bf-right-area bbe8 l" v-for="team in teams" v-if="$index < 6">
                        <table class="bf-right-table w-per100 f12 c-a5acbe">
                            <tr>
                                <td class="pt10 pb6" rowspan="2">
                                    <div class="header tc">
                                        <a><img class="wh-px40 br50" :src='photoUrl(team.photoId)' alt="" /></a>
                                    </div>
                                    <div class="name mt5 tc" :title="team.fullName">
                                        {{team.fullName}}
                                    </div>
                                </td>
                                <td class="w-per100 f16 c-6a707d vam pt10">
                                    <div class="bg fix" :title="team.officePhone">
                                        <span class="phone"></span>
                                        {{team.officePhone}}
                                    </div>
                                    <div class="bg fix" :title="team.email">
                                        <span class="email"></span>
                                        {{team.email}}
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>



</div>

</template>

<script>

import ECharts from '../../components/echarts/ECharts.vue';
import {
    default as Message
}
from '../../components/basic/message';
export default {
    data() {
            return {
                todoCounts: {}, //代办
                profile: {},
                records: [],
                teams: [],
                notifications: [], //通知
                performances: [], //年份绩效
                evaluationUrl: '/performance/performanceEvaluationStatistics', // 所有绩效方案填写情况统计 url
                //绩效统计表格字段
                columns: [{
                    name: 'schemeName',
                    title: this.$t('home.columns.staffScheme'),
                    sortField: 'schemeName'
                }, {
                    name: 'stage1',
                    title: this.$t('home.columns.staffImpending'),
                    sortField: 'stage1'
                }, {
                    name: 'stage2',
                    title: this.$t('home.columns.staffSubmitted'),
                    sortField: 'stage2'
                }, {
                    name: 'stage3',
                    title: this.$t('home.columns.staffAwaitingEvaluation'),
                    sortField: 'stage3'
                }, {
                    name: 'stage4',
                    title: this.$t('home.columns.staffUnderEvaluation'),
                    sortField: 'stage4'
                }, {
                    name: 'stage5',
                    title: this.$t('home.columns.staffCompleted'),
                    sortField: 'stage5'
                }],
                /*************end***************/

                /**********年度绩效等级走势图表***************/
                // polar: {
                //     title: {
                //         text: ''
                //     },
                //     tooltip: {
                //         trigger: 'axis'
                //     },
                //     legend: {
                //         data: []
                //     },
                //     toolbox: {
                //         feature: {}
                //     },
                //     grid: {
                //         left: '3%',
                //         right: '4%',
                //         bottom: '3%',
                //         containLabel: true
                //     },
                //     xAxis: {
                //         type: 'category',
                //         boundaryGap: false,
                //         data: []
                //     },
                //     yAxis: {
                //         type: 'value',
                //         data: ['0', '20', '40', '60', '80', '100']
                //     },
                //     series: [{
                //         name: 'grade',
                //         type: 'line',
                //         stack: '总量',
                //         data: [],
                //         smooth: true
                //     }]
                // },
            };
        },

        created() {
            this.todoCount();
            this.employeeProfile();
            this.myRecords();
            // this.performance();
            this.teammateProfile();
            this.notification();
        },
        methods: {
            goTeam() {
                    this.$router.go({
                        name: 'search',
                        params: {
                            condition: '0',
                            type: 'myteam'
                        }
                    });
                },
                goToDoPerformance() {
                    this.$router.go({
                        name: 'myOrgPerformance',
                        params: {
                            openId: 'myscheme'
                        }
                    });
                },
                goToDoAnnualPerformance() {
                    this.$router.go({
                        name: 'myPerformance',
                    });
                },
                photoUrl(photoId) {
                    if (photoId)
                        return Vue.config.APIURL + `/system/attachment/downloadImg/${photoId}`;
                    else
                        return `../../assets/images/public/xwz.png`;
                },
                // InitEchart() {
                //     this.polar.xAxis.data = this.handleGrade(this.performances, 'restrictYear');
                //     this.polar.series[0].data = this.handleGrade(this.performances, 'finalScore');
                // },

                //代办
                todoCount() {
                    this.$http.get(`/performance/employeeScheme/todoCount`).then((response) => {
                        this.todoCounts = response.data;
                    });
                },
                //员工简况信息
                employeeProfile() {
                    this.$http.get(`/employee/employees/profile`).then((response) => {
                        if (response.data)
                            this.profile = response.data;
                    });
                },
                //员工变动信息列表
                myRecords() {
                    let _self = this;
                    this.$http.get(`/employee/employees/EmployeeStaffRecord/myRecord`).then((response) => {
                        if (response.data)
                            this.records = response.data;
                    });
                },
                teammateProfile() {
                    this.$http.get(`/pos/positions/teammateProfile`).then((response) => {
                        if (response.data)
                            this.teams = response.data;
                    });
                },
                //通知
                notification() {
                    this.$http.post(`/system/message/getMessageReceiver`).then((response) => {
                        if (response.data)
                            this.notifications = response.data;
                    });
                },
                //年度绩效等级走势图 (折线图)
                // performance() {
                //     this.$http.get(`/performance/yearPfmScores/yearGrade`).then((response) => {
                //         this.performances = response.data;
                //     }).then(() => {
                //         this.InitEchart();
                //     });
                // },
                handleGrade(grade, propName) {

                    let result = [];
                    if (grade && grade instanceof Array) {
                        let array = [];
                        for (let key of grade.keys()) {
                            let item = grade[key];
                            if (item && item instanceof Object) {
                                for (let prop of Object.keys(item)) {
                                    if (prop === propName) {
                                        result.push(item[prop]);
                                    }
                                }

                            }
                        }
                    }
                    return result;
                },


        },
        components: {
            'echarts': ECharts
        }
};

</script>
