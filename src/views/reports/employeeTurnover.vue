<style lang="less">

.ihr-reports-employeeTurnover {
    min-width: 1087px;
    * {
        box-sizing: border-box;
    }
    .right-panel{
      margin-left: 0px;
    }
    .right-panel-tit span {
        font-size: 20px;
        font-weight: bold;
        color: #2a3c59;
    }
    .vuetable th,
    td {
        white-space: nowrap;
    }
    .leftRight-panel {
        border: none;
    }
    .indicator-form {
        height: 46px;
    }
    .group {
        margin-top: 16px;
        margin-bottom: 0px;
    }
    .download {
        position: absolute;
        margin: -50px 0 0 0px;
    }
    .vuetable-pagination {
        margin: 16px 0;
    }

}

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-reports-employeeTurnover pt20">
    <div class="search-area">
        <v-form :model="turnover" :schema="turnoverSchema" label-width="124" label-suffix="" :cols="3" form-style="indicator-form">
            <text-field property='empInfo' editor-width="200" placeholder="Search by Employee Name,ID"></text-field>
            <select-field property='turnoverType' :mapping="dist.turnoverType" editor-width="200"></select-field>
            <text-field property="orgUnitName" type="selector" :show.sync="org" editor-width="200"></text-field>
        </v-form>
        <!-- 组织选择器 -->
        <div class="query-btn">
            <ui-button class="query-btn-search mr10" color="primary" @click="search">Search</ui-button>
            <ui-button class="query-btn-reset btn-default-bd" type="flat" @click="reset">Reset</ui-button>
        </div>
    </div>
    <div class="group"></div>
    <div class="leftRight-panel bg-f5f5f5 mt16 fix">
        <div class="right-panel pl16 pr16">
            <div class="right-panel-tit pb16 tc">
                <span>Employee Status</span>
            </div>
            <ui-button class="dis-tc-t btn-default-bd download" icon="fa-download" type="flat" text="Download" @click="download"></ui-button>
            <div class="vuetable-wrapper">
                <vuetable api-url="/report/EmpTurnover" :selected-to="selectedRow" :append-params="queryParams" :fields="columns" pagination-path="" table-wrapper=".vuetable-wrapper" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                </vuetable>
            </div>
        </div>
    </div>
</div>
<organization-selector :show.sync="org"></organization-selector>

</template>

<script>

import {
    getDictMapping, downloadFile
}
from '../../util/assist';
import {
    default as Message
}
from '../../components/basic/message';
import {
    default as Schema
}
from '../../schema/index';

let turnoverSchema = new Schema({
    empInfo: {
        label: 'Employee',
        required: false,
        whitespace: false,
    },
    turnoverType: {
        label: 'Turnover Type'
    },
    orgUnitName: {
        label: 'Organization'
    },
    unitId: {}
});
export default {
    data() {
            let _self = this;
            return {
                tableTotal: '',
                turnoverSchema: turnoverSchema,
                turnover: turnoverSchema.newModel(),
                //职位选择器
                org: {
                    modal: false
                },
                interns: null,
                dist: {
                    turnoverType: {}
                },
                columns: [{
                    name: 'empFullName',
                    title: 'Employee',
                    sortField: 'empFullName'
                }, {
                    name: 'employeeCode',
                    title: 'Employee ID',
                    dataClass: 'tr',
                    sortField: 'employeeCode'
                }, {
                    name: 'gender',
                    title: 'Gender',
                    sortField: 'gender'
                }, {
                    name: 'fullUnitName',
                    title: 'Organization',
                    sortField: 'fullUnitName'
                }, {
                    name: 'turnoverType',
                    title: 'Turnover Type',
                    sortField: 'turnoverType'
                },{
                    name: 'recordTime',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    title: 'Record Time'
                },{
                    name: 'newUnitName',
                    title: 'Organization After Transfer',
                    sortField: 'newUnitName'
                }, {
                    name: 'newJobName',
                    title: 'Position After Transfer',
                    sortField: 'newJobName'
                }, {
                    name: 'newMibGrade',
                    title: 'MIB Grade After Transfer',
                    sortField: 'newMibGrade'
                }, {
                    name: 'oldUnitName',
                    title: 'Organization Before Transfer',
                    sortField: 'oldUnitName'
                }, {
                    name: 'oldJobName',
                    title: 'Position Before Transfer',
                    sortField: 'oldJobName'
                }, {
                    name: 'oldMibGrade',
                    title: 'MIB Grade Before Transfer',
                    sortField: 'oldMibGrade'
                }]
            }
        },
        computed: {
            queryParams() {
                let empInfo = this.turnover.empInfo || "";
                let turnoverType = this.turnover.turnoverType || "";
                let unitId = this.turnover.unitId || "";
                return [
                    `unitId=${unitId}`,
                    `empInfo=${empInfo}`,
                    `turnoverType=${turnoverType}`
                ]
            },
        },
        ready() {
            this.$http.get('/employee/employees/dicts/RECORD_TYPE/items/3').then(function(res) {
                if (res.data) {
                    var data = {};
                    res.data.forEach(function(item) {
                        data[item.NAME] = item.VALUE;
                    })
                    this.dist.turnoverType = data;
                }
            })
        },
        mounted() {},
        methods: {
            search() {
                    this.$broadcast('vuetable:refresh');
                },
                reset() {
                    this.turnover.reset();
                },
                download() {
                    // let unitId = this.turnover.unitId;
                    // if (unitId || unitId === '0') {
                    if (this.tableTotal < 5000) {
                        downloadFile('/report/exportEmpTurnover', {
                            empInfo: this.turnover.empInfo,
                            turnoverType: this.turnover.turnoverType,
                            unitId: this.turnover.unitId
                        });
                    } else {
                        Message({
                            type: 'error',
                            message: this.$t('reports.message.checkReportList')
                        })
                    }
                    // } else {
                    //     Message({
                    //         type: 'error',
                    //         message: 'Please enter a search keyword. '
                    //     })
                    // }
                },
        },
        components: {},
        events: {
            'organization-selector:selected': function(data) {
                if (data) {
                    this.turnover.orgUnitName = data.orgShortName;
                    this.turnover.unitId = data.orgId;
                    return false
                }
            },
            'vuetable:load-success': function(response) {
                this.tableTotal = response.data.total;
            }
        },
}

</script>
