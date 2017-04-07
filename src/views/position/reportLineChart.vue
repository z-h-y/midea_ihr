<style lang="less">

    #position-chart-body {
        font-family: Arial;
        #position-chart-container {
            width: 100%;
        }
        .positionChart-header {
            // width:1070px;
            height: 45px;
            margin: auto;
            // border:1px solid blue;
            border-bottom: 1px solid #e4e7ec;
        }
        .d-panel-content {
            padding: 10px;
        }
        .positionChart-selector-box {
            float: left;
            position: relative;
            width: 330px;
            height: 50px;
            // border:1px solid red;
        }
        .positionChart-selector {
            float: left;
            height: 40px;
            left: -120px;
            top: 10px;
            position: absolute;
            // border:1px solid black;
        }
        .orgChart-history-date {
            position: absolute;
            width: 250px;
            height: 40px;
            // border:1px solid black;
            left: -40px;
            top: 0;
        }
        .positionChart-search-btn {
            // border:1px solid red;
            margin-right: 5px;
            float: right;
        }
        .positionChart-download {
            float: right;
            margin-right: 10px;
            margin-top: 3px;
        }
        .position-relations-info {
            height: 45px;
            float: right;
            margin-right: 5px;
            margin-top: 2px;
            // width:100%;
            // border:1px solid red;
        }
        .position-direct-info,
        .position-dotted-info {
            // width:300px;
            // border:1px solid blue;
            float: right;
            height: 30px;
        }
        .position-dotted-box,
        .position-direct-box {
            width: 48px;
            height: 24px;
            float: right;
            margin-top: 1px;
            // margin-right:10px;
        }
        .position-direct-box {
            border: 2px solid #9cd0f5;
        }
        .position-dotted-box {
            border: 2px dotted #3141b5;
        }
        .position-direct-text,
        .position-dotted-text {
            width: 150px;
            height: 16px;
            line-height: 16px;
            margin-top: 4px;
            padding: 3px;
            font-size: 16px;
            color: #435066;
            text-align: center;
            // border:1px solid black;
            float: right;
        }
        // 图表样式
        @import url('../../assets/lib/css/organizationChart.less');
}

</style>

<template lang="html">

<div>
    <panel class="panel-b content-wrap" header="panel-header" id="position-chart-body">
        <div class="positionChart-header">
            <div class="positionChart-selector-box">
                <v-form ref="positionchartform" :model="positionChart" :schema="positionChartSchema" label-width="100" label-suffix="" :cols="1" form-style="">
                    <text-field property="positionName" 
                    type="selector" 
                    :readonly="true"
                    @open-selector="openSelector"  
                    :show="show" 
                    editor-width="200"></text-field>
                </v-form>
            </div>
            <div class="positionChart-search-btn">
                <div class="position-relations-info">
                    <div class="position-direct-info">
                        <p class="position-direct-text">{{ $t('position.label.repStraightLineReport') }}</p>
                        <div class="position-direct-box"></div>
                    </div>
                    <div class="position-dotted-info">
                        <p class="position-dotted-text">{{ $t('position.label.repDottedLineReport') }}</p>
                        <div class="position-dotted-box"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="position-chart-diagram">
            <div id="position-chart-container">

            </div>

        </div>
    </panel>
    <position-selector
    ref="positionSelector"
    @selected-position="receivePositionInfo"
    :show="show"></position-selector>
    <!-- <ui-modal id="edit-indicator" :show="showMoreInfo" type="large" :title="positionDetail.unitName"></ui-modal> -->
</div>

</template>

<script >

import {
    default as Message
}
from '../../components/basic/message';
import $ from 'jquery';
import {
    default as Schema
}
from '../../schema/index';
import {
    formatDate
}
from '../../util/assist';
require('../../assets/lib/js/positionChart.js');
// import PositionReportChart from '../../assets/lib/js/jquery.orgchart.js';


export default {
        data() {
            let positionChartSchema = new Schema({
                positionName: {
                    label: this.$t('position.label.repPosition'),
                    required: true
                },

            });
            return {
                // downloadButtonText: this.$t('button.download'),
                positionChartSchema: positionChartSchema, //position form
                positionChart: positionChartSchema.newModel(), //position model
                // positionId: '',
                // datascource: datascource,  //结构图本地模拟数据
                show: { //控制组织选择器的显示
                    modal: false
                },

            };
        },
        mounted() {
            this.$nextTick(() => {
                this.initHeight();
            });
        },


        watch: {
            '$route': 'fetchData'
        },
        methods: {
            openSelector() {
                this.$refs['positionSelector'].open();
                this.show.modal = true;
            },
            initHeight() {
                let container = document.getElementById("position-chart-container");
                let height = window.screen.height;
                container.style.height = (height - 320) + 'px';
            },
            receivePositionInfo(positionInfo,orgGroup) {
                let positionId = positionInfo.positionId; // 获取职位ID
                this.positionChart.positionName = positionInfo.positionName; //get position name from the selector
                // data.positionName;
                this.createChart(positionId);
            },
            createChart(positionId) {
                let initUrl = `/pos/positions/${positionId}/PositionChartInfo`;
                let chartContainer = $('#position-chart-container');
                // let aa = 0;
                chartContainer.html("");
                    var ajaxURLs = {
                        'children': function(nodeData) {
                        return '/pos/positions/' + nodeData + '/PositionChartInfo';
                    }
                };

                $(chartContainer).orgchart({
                    'data': initUrl,
                    'ajaxURL': ajaxURLs,
                    'nodeContent': 'notnull',
                    'newItem': 'relationship',
                    'nodeId': 'id',
                    'nodeTitle': 'title',
                    'positionName': 'positionName',
                    'positionId': 'positionId',
                    'employeeName': 'employeeName',
                    'photoId': 'photoId',
                    'unitName': 'unitName',
                    'exportButton': true,
                    'createNode': function($node, data) {
                        let employeeArr = data.employeeArr;
                        if (employeeArr.empNum < 2) {
                            return;
                        }
                        var secondMenuIcon = $('<i>', {
                            'class': 'employerNum ',
                            'text': `${employeeArr.empNum}`,
                            click: function() {
                                if ($(this).text() == 0) {
                                    return false;
                                }
                                $(this).siblings('.second-menu').toggle();
                            }
                        });
                        var secondMenu = `<div class="second-menu">

                            ${createEmp(employeeArr)}

                      </div>`;

                        function createEmp(empArr = []) {
                            let empList = '';
                            empArr.forEach(function(list) {
                                empList += `<div class="emp-container">
                              <div class="emp-pic">
                                <img src="${list.photoId}">
                              </div>
                              <div class="emp-name">
                                ${list.employeeName}
                              </div>
                            </div>`;
                            })
                            return empList;
                        }



                        $node.append(secondMenuIcon).append(secondMenu);
                    }
                });
            }
        },
        events: {
            'selected-position': function(data) { //从选择器中获取参数
                

            }
        },
        components: {
            Panel: require('../../components/basic/panel.vue')
        }

};

</script>
