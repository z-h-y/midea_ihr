<style lang="less">

    #organization-history-chart-body {
        font-family: Arial;
        .orgChart-header {
            // width:1070px;
            height: 70px;
            margin: auto;
            border-bottom: 1px solid #e4e7ec;
        }
        .orgChart-selector {
            position: absolute;
            left: 250px;
            top: 10px;
            height: 60px;
            overflow: hidden;
            margin-left: 10px;
            // border:1px solid yellow;
        }
        .orgChart-selector-box {
            float: left;
            position: relative;
            width: 600px;
            height: 45px;
            // border:1px solid blue;
        }
        .orgChart-history-box {
            float: left;
            height: 40px;
            left: -15px;
            top: 10px;
            position: absolute;
            // border:1px solid black;
        }
        .orgChart-history {
            position: absolute;
            padding: 5px;
            width: 250px;
            font-size: 16px;
            line-height: 30px;
            color: blue;
            text-decoration: underline;
            height: 30px;
            // border:1px solid black;
            left: 10px;
            top: 0px;
        }
        .orgChart-history-date {
            position: absolute;
            width: 250px;
            height: 40px;
            // border:1px solid black;
            left: -40px;
            top: 0;
        }
        .orgChart-search-btn {
            // border:1px solid red;
            margin-top: 3px;
            float: left;
        }
        .orgChart-download {
            float: right;
            margin-right: 10px;
            margin-top: 3px;
        }
        // 图表样式
        @import url('../../assets/lib/css/jquery.orgchart.less');
}

</style>

<template lang="html">

<div>
    <panel class="panel-b content-wrap" header="panel-header" id="organization-history-chart-body">
        <div class="orgChart-header">
            <div class="orgChart-selector-box">
                <v-form ref="orgchartform" :model="orgChart" :schema="orgChartSchema" label-width="120" label-suffix="" :cols="1" form-style="org-form">
                    <div class="orgChart-selector">
                        <text-field property="selecteOrg" @open-selector="openSelector" type="selector" :readonly="true" :show="show" editor-width="200"></text-field>
                    </div>
                    <div class="orgChart-history-box">
                        <div class="orgChart-history-date">
                            <text-field property="stratDate" :min-date="minDate" editor-width="200"></text-field>
                        </div>
                    </div>
                </v-form>
            </div>
            <div class="orgChart-search-btn">
                <div class="query-btn">
                    <!-- <ui-button class="query-btn-search mr20" color="primary" @click="searchHistoryOrg">Show Orgchart</ui-button> -->
                    <!-- <ui-button class="query-btn-reset btn-default-bd" type="flat" @click="resetTable">Reset</ui-button> -->
                </div>
            </div>

        </div>
        <div id="orgHistoryChartContainer">

        </div>

    </panel>
    <organizationchart-selector 
    ref="organizationchart" 
    :show="show" 
    :history-date="searchHistoryDate" 
    @select-organization="receiveOrganization"
    :disable-value="disableValue">
    </organizationchart-selector>
    <!-- <organization-selector :show.sync="show" :disable-value="disableValue"></organization-selector> -->

</div>

</template>

<script>

import {
    default as Message
}
from '../../components/basic/message';
import {
    default as Schema
}
from '../../schema/index';
import {
    formatDate
}
from '../../util/assist';
import $ from 'jquery';
require('../../assets/lib/js/orgHistoryChart') 





export default {
    data() {
            let orgChartSchema = new Schema({
                selecteOrg: {
                    label: this.$t('organization.mergeOrg.org'),
                    required: true
                },

                stratDate: {
                    label: this.$t('organization.orgInfo.date'),
                    type: 'date',
                    default () {
                        return new Date();
                    },
                    required: true
                },
            });
            return {
                initUrl: '/org/orgs/getUserHisOrg',
                orgChartSchema: orgChartSchema,
                orgChart: orgChartSchema.newModel(),
                show: { //控制组织选择器的显示
                    modal: false
                },
                minDate: '',
                submitLoading: false,
                searchHistoryDate: '' //查询组织用的日期
            };
        },

        created() {
            // let self = this;
            let date = formatDate(new Date(), 'YYYY-MM-DD'); //将当日日期传入选择器
            this.searchHistoryDate = date;
            this.initUrl = '/org/orgs/getUserHisOrg'; //初始获取用户当前数据
        },
        mounted() {
            this.$nextTick(() => {
                this.resizeBox();
                this.createHistoryChart();
            });
            

        },
        watch: {
            'orgChart.stratDate': function() { //select a date to search the history organization info
                // let self = this;
                let queryDate = this.orgChart.stratDate; //修改选择器查询日期
                // let date = formatDate(queryDate,'YYYY-MM-DD');
                this.searchHistoryDate = formatDate(queryDate, 'YYYY-MM-DD');
                this.$refs.organizationchart.reloadTree()
            },
            // '$route': 'fetchData'
        },
        methods: {
            openSelector() {
                this.$refs['organizationchart'].open();
                this.show.modal = true;
            },
            receiveOrganization(node) {
                this.initUrl = '/org/orgs/getHisOrgInfo';
                let name = node.shortName !== undefined ? node.shortName : node.fullUnitName;
                let orgId = node.unitId;
                this.orgChart.selecteOrg = name;
                // this.searchId = node.unitId;
                this.createHistoryChart(orgId); //获取组织后查询
           }, 
            resizeBox() {
                    let container = document.getElementById("orgHistoryChartContainer");
                    let height = window.screen.height;
                    container.style.minHeight = (height - 360) + 'px';
                },


                createHistoryChart(orgId = '') {
                    let currntUrl = this.initUrl;
                    let chartContainer = $('#orgHistoryChartContainer');
                    chartContainer.html("");
                    var ajaxURLs = {
                        'children': function(nodeData) {
                            let childUrl = '/org/orgs/getHisOrgInfo';
                            return childUrl;
                        }
                    };

                    $(chartContainer).orgHistoryChart({
                        'data': currntUrl,
                        'ajaxURL': ajaxURLs,
                        'orgShortName': 'orgShortName',
                        'unitId': 'unitId',
                        'searchId': orgId,
                        'employeeName': 'employeeName',
                        'imgUrl': 'imgUrl',
                        'jobName': 'jobName',
                        'exportButton': true,
                        'querydate': this.searchHistoryDate
                    });
                }


        },
        events: {
            getSearchId(node) { //从选择器中获取参数
                this.initUrl = '/org/orgs/getHisOrgInfo';
                let name = node.shortName !== undefined ? node.shortName : node.fullUnitName;
                let orgId = node.unitId;
                this.orgChart.selecteOrg = name;
                // this.searchId = node.unitId;
                this.createHistoryChart(orgId); //获取组织后查询
            }
        },
        components: {
            Panel: require('../../components/basic/panel.vue')
        }


};

</script>
