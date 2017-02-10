<style lang="less">

.ihr-home {
    * {
        box-sizing: border-box;
    }
    .dis-table {
        display: table;
        width: 100%;
    }
    .w-per30 {
        width: 30%;
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
        height: 186px;
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
        font-size: 36px;
        background: url("../../static/images/public/roundness.png") no-repeat center center;
    }
    .panel-content-txt {
        font-size: 14px;
        text-align: center;
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
    .w-per30 {
        width: 30%;
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
}

</style>

<template lang="html">

<div class="content-wrap bdn ihr-home">
    <div class="dF mt16">
        <div class="panel">
            <div class="panel-tit">
                <span>EMPLOYEES</span>
                <!-- <a class="panel-more" href="javascript:void(0)">More</a> -->
            </div>
            <div class="panel-content" id="echartsArea">
                <echarts :options="employeesEC" theme="macarons"></echarts>
            </div>
        </div>
    </div>
    <div class="eF mt16">
        <div class="panel">
            <div class="panel-tit">
                <span>EVALUATION STATISTICS</span>
                <!-- <a class="panel-more" href="javascript:void(0)">More</a> -->
            </div>
            <div class="panel-content">
                <vuetable :api-url="evaluationUrl" :selected-to="selectedRow" table-wrapper=".vuetable-wrapper" pagination-path="" :fields="columns" :item-actions="itemActions" per-page="10">
                </vuetable>
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
import {
    getDictMapping,
    formatDate
}
from '../../util/assist';
export default {
    data() {
            return {
                todoCounts: '', //代办
                profile: {},
                records: [],
                teams: [],
                notifications: [], //通知
                performances: [], //年份绩效
                evaluationUrl: '/performance/performanceEvaluationStatistics', // 所有绩效方案填写情况统计 url
                tableData: [],
                status: '',
                //绩效统计表格字段
                columns: [{
                    name: 'schemeName',
                    title: 'Scheme'
                }, {
                    name: 'employeeCount',
                    title: 'Total',
                    dataClass: 'tr',
                    callback: 'goPerformanceTotal'
                }, {
                    name: 'stage1',
                    title: 'Pending',
                    dataClass: 'tr',
                    callback: 'goPerformancePending'
                }, {
                    name: 'stage2',
                    title: 'Under Approval',
                    dataClass: 'tr',
                    callback: 'goPerformanceUnder'
                }, {
                    name: 'stage6',
                    title: 'Waiting Evaluation',
                    dataClass: 'tr',
                    callback: 'goPerformanceWaiting'
                }, {
                    name: 'stage3',
                    title: 'Self Evaluation',
                    dataClass: 'tr',
                    callback: 'goPerformanceSelf'
                }, {
                    name: 'stage4',
                    title: 'Mutual Evaluation',
                    dataClass: 'tr',
                    callback: 'goPerformanceMutual'
                }, {
                    name: 'stage5',
                    title: 'Completed',
                    dataClass: 'tr',
                    callback: 'goPerformanceCompleted'
                }],
                /*************end***************/

                /**********年度绩效等级走势图表***************/
                polar: {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: []
                    },
                    toolbox: {
                        feature: {}
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        name: 'grade',
                        type: 'line',
                        stack: '总量',
                        data: [],
                        smooth: true
                    }]
                },
                employeesData: {},

                /**********员工数量分布图表***************/
                employeesEC: {
                    title: {
                        text: '',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['Team Leader', 'Individual Contributor', 'Worker (Non-Front Line)', 'Worker (Front Line)']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {
                                show: true
                            },
                            dataView: {
                                show: false,
                                title: 'data view',
                                readOnly: true
                            },
                            magicType: {
                                show: true,
                                type: ['line', 'bar'],
                                title: {
                                    line: 'line',
                                    bar: 'bar'
                                }
                            },
                            restore: {
                                show: true,
                                title: 'restore'
                            },
                            saveAsImage: {
                                show: false
                            }
                        }
                    },
                    calculable: true,
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    },
                    yAxis: [{
                        type: 'value',
                        max:''
                    }],
                    series: []
                }
            };
        },

        created() {

            // this.todoCount();
            // this.employeeProfile();
            // this.myRecords();
            this.performance();
            // this.teammateProfile();
            // this.notification();
            this.employees();
        },
        methods: {
            photoUrl(photoId) {
                    if (photoId)
                        return Vue.config.APIURL + `/system/attachment/downloadImg/${photoId}`;
                    else
                        return `../../static/images/public/xwz.png`;
                },
                InitEchart() {
                    this.polar.xAxis.data = this.handleGrade(this.performances, 'restrictYear');
                    this.polar.series[0].data = this.handleGrade(this.performances, 'adjustGrade');
                },
                todoCount() { //代办
                    this.$http.get(`/performance/employeeScheme/todoCount`).then((response) => {
                        this.todoCounts = response.data;
                    });
                },
                employeeProfile() { //员工简况信息
                    this.$http.get(`/employee/employees/profile`).then((response) => {
                        if (response.data)
                            this.profile = response.data;
                    });
                },
                myRecords() { //员工变动信息列表
                    let _self = this;
                    this.$http.get(`/employee/employees/staffRecord/profile`).then((response) => {
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
                notification() { //通知
                    this.$http.post(`/system/message/getMessageReceiver`).then((response) => {
                        if (response.data)
                            this.notifications = response.data;
                    });
                },
                employees() { //员工分布图(折线图)
                    this.$http.get(`/employee/employees/count`).then((response) => {
                        if (response.data) {
                            this.employeesData = response.data.entitys;
                            this.initEmlp();
                            if(response.data.maxCount){
                              this.employeesEC.yAxis[0].max = response.data.maxCount;
                            }else{
                              this.employeesEC.yAxis[0].max = 5;
                            }

                        }
                    });
                },
                getLocalTime(nS) {
                    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
                },
                initEmlp() {
                    this.employeesEC.xAxis.data = this.handleGrade(this.employeesData, 'countDate').reverse();
                    let ic = this.handleGrade(this.employeesData, 'individualContributor').reverse();
                    let tl = this.handleGrade(this.employeesData, 'teamLeader').reverse();
                    let wfl = this.handleGrade(this.employeesData, 'workerFrontLine').reverse();
                    let wnfl = this.handleGrade(this.employeesData, 'workerNonFrontLine').reverse();
                    let icObj = {
                        name: 'Individual Contributor',
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: ic
                    };
                    let tlObj = {
                        name: 'Team Leader',
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: tl
                    };
                    let wflObj = {
                        name: 'Worker (Front Line)',
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: wfl
                    }
                    let wnflObj = {
                        name: 'Worker (Non-Front Line)',
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: wnfl
                    }
                    let series = [];
                    series.push(icObj);
                    series.push(tlObj);
                    series.push(wflObj);
                    series.push(wnflObj);
                    this.employeesEC.series = series;
                },
                performance() { //年度绩效等级走势图 (折线图)
                    this.$http.get(`/performance/yearPfmScores/yearGrade`).then((response) => {
                        this.performances = response.data;
                    }).then(() => {
                        this.InitEchart();
                    });
                },
                handleGrade(grade, propName) {
                    let result = [];
                    if (grade && grade instanceof Array) {
                        let array = [];
                        for (let key of grade.keys()) {
                            let item = grade[key];
                            if (item && item instanceof Object) {
                                for (let prop of Object.keys(item)) {
                                    if (prop === propName) {
                                        if (propName === 'countDate') {
                                            result.push(formatDate(new Date(item[prop])));
                                        } else {
                                            result.push(item[prop]);
                                        }
                                    }
                                }

                            }
                        }
                    }
                    return result;
                },
                goPerformanceTotal(value, data) {
                    if (data.pfmType === '0') {
                        return `<a href="/#!/ihr/performance/individualPerformance/individualScheme/individualViewPlanStatistics/${data.schemeInfoId}/0/0">${value}</a>`;
                    } else {
                        return `<a href="/#!/ihr/performance/orgPerformance/orgScheme/viewPlanStatistics/${data.schemeInfoId}/0/0">${value}</a>`;
                    }
                },
                goPerformancePending(value, data) {
                    if (data.pfmType === '0') {
                        return `<a href="/#!/ihr/performance/individualPerformance/individualScheme/individualViewPlanStatistics/${data.schemeInfoId}/1/0">${value}</a>`;
                    } else {
                        return `<a href="/#!/ihr/performance/orgPerformance/orgScheme/viewPlanStatistics/${data.schemeInfoId}/1/0">${value}</a>`;
                    }
                },
                goPerformanceUnder(value, data) {
                    if (data.pfmType === '0') {
                        return `<a href="/#!/ihr/performance/individualPerformance/individualScheme/individualViewPlanStatistics/${data.schemeInfoId}/2/0">${value}</a>`;
                    } else {
                        return `<a href="/#!/ihr/performance/orgPerformance/orgScheme/viewPlanStatistics/${data.schemeInfoId}/2/0">${value}</a>`;
                    }
                },
                goPerformanceWaiting(value, data) {
                    if (data.pfmType === '0') {
                        return `<a href="/#!/ihr/performance/individualPerformance/individualScheme/individualViewPlanStatistics/${data.schemeInfoId}/23/0">${value}</a>`;
                    } else {
                        return `<a href="/#!/ihr/performance/orgPerformance/orgScheme/viewPlanStatistics/${data.schemeInfoId}/23/0">${value}</a>`;
                    }
                },
                goPerformanceSelf(value, data) {
                    if (data.pfmType === '0') {
                        return `<a href="/#!/ihr/performance/individualPerformance/individualScheme/individualViewPlanStatistics/${data.schemeInfoId}/3/0">${value}</a>`;
                    } else {
                        return `<a href="/#!/ihr/performance/orgPerformance/orgScheme/viewPlanStatistics/${data.schemeInfoId}/3/0">${value}</a>`;
                    }
                },
                goPerformanceMutual(value, data) {
                    if (data.pfmType === '0') {
                        return `<a href="/#!/ihr/performance/individualPerformance/individualScheme/individualViewPlanStatistics/${data.schemeInfoId}/4/0">${value}</a>`;
                    } else {
                        return `<a href="/#!/ihr/performance/orgPerformance/orgScheme/viewPlanStatistics/${data.schemeInfoId}/4/0">${value}</a>`;
                    }
                },
                goPerformanceCompleted(value, data) {
                    if (data.pfmType === '0') {
                        return `<a href="/#!/ihr/performance/individualPerformance/individualScheme/individualViewPlanStatistics/${data.schemeInfoId}/5/0">${value}</a>`;
                    } else {
                        return `<a href="/#!/ihr/performance/orgPerformance/orgScheme/viewPlanStatistics/${data.schemeInfoId}/5/0">${value}</a>`;
                    }
                },
        },
        components: {
            'echarts': ECharts
        }
};

</script>
