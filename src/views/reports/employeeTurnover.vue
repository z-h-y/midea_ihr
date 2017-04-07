<style lang="less">

.ihr-reports-employeeTurnover {
    min-width: 1087px;
    * {
        box-sizing: border-box;
    }
    .right-panel {
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

<div>
    <div class="content-wrap bg-w ihr-reports-employeeTurnover pt20">
        <div class="search-area">
            <v-form :model="turnover" :schema="turnoverSchema" label-width="124" label-suffix="" :cols="3" form-style="indicator-form">
                <text-field property='empInfo' editor-width="200" :placeholder="$t('reports.message.searchPlaceholder')"></text-field>
                <select-field property='turnoverType' :mapping="dist.turnoverType" editor-width="200"></select-field>
                <text-field property="orgUnitName" type="selector" :show.sync="org" editor-width="200"></text-field>
            </v-form>
            <!-- 组织选择器 -->
            <div class="query-btn">
                <ui-button class="query-btn-search mr10" color="primary" @click="search">{{$t('button.search')}}</ui-button>
                <ui-button class="query-btn-reset btn-default-bd" type="flat" @click="reset">{{$t('button.reset')}}</ui-button>
            </div>
        </div>
        <div class="group"></div>
        <div class="leftRight-panel bg-f5f5f5 mt16 fix">
            <div class="right-panel pl16 pr16">
                <div class="right-panel-tit pb16 tc">
                    <span>{{$t('reports.labelText.employeeStatus')}}</span>
                </div>
                <ui-button class="dis-tc-t btn-default-bd download" icon="fa-download" type="flat" :text="$t('button.download')" @click="download"></ui-button>
                <div class="vuetable-wrapper">
                    <vuetable api-url="/report/EmpTurnover" :selected-to="selectedRow" :append-params="queryParams" :fields="columns" pagination-path="" table-wrapper=".vuetable-wrapper" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                    </vuetable>
                </div>
            </div>
        </div>
    </div>
    <organization-selector :show.sync="org"></organization-selector>
</div>

</template>

<script>

import {
    getDictMapping, downloadFile, transformDict
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


export default {
    data() {
            let _self = this;

            let turnoverSchema = new Schema({
                empInfo: {
                    label: _self.$t('reports.labelText.employee'),
                    required: false,
                    whitespace: false,
                },
                turnoverType: {
                    label: _self.$t('reports.labelText.turnoverType')
                },
                orgUnitName: {
                    label: _self.$t('reports.labelText.organization')
                },
                unitId: {}
            });

            return {
                tableTotal: '',
                turnoverSchema: turnoverSchema,
                turnover: turnoverSchema.newModel(),
                //职位选择器
                org: {
                    modal: false
                },
                interns: null,
                columns: [{
                    name: 'empFullName',
                    title: _self.$t('reports.labelText.employee'),
                    sortField: 'empFullName'
                }, {
                    name: 'employeeCode',
                    title: _self.$t('reports.labelText.employeeId'),
                    dataClass: 'tr',
                    sortField: 'employeeCode'
                }, {
                    name: 'gender',
                    title: _self.$t('reports.labelText.gender'),
                    sortField: 'gender',
                    callback: function(value) {
                        return _self.fixgender(value);
                    }
                }, {
                    name: 'fullUnitName',
                    title: _self.$t('reports.labelText.organization'),
                    sortField: 'fullUnitName'
                }, {
                    name: 'turnoverType',
                    title: _self.$t('reports.labelText.turnoverType'),
                    sortField: 'turnoverType',
                    callback: function(value) {
                        return _self.firecordType(value);
                    }
                }, {
                    name: 'recordTime',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    title: _self.$t('reports.labelText.recordTime')
                }, {
                    name: 'newUnitName',
                    title: _self.$t('reports.labelText.orgAfterTransfer'),
                    sortField: 'newUnitName'
                }, {
                    name: 'newJobName',
                    title: _self.$t('reports.labelText.positionAfterTransfer'),
                    sortField: 'newJobName'
                }, {
                    name: 'newMibGrade',
                    title: _self.$t('reports.labelText.MIBGradeAfterTransfer'),
                    sortField: 'newMibGrade'
                }, {
                    name: 'oldUnitName',
                    title: _self.$t('reports.labelText.orgBeforeTransfer'),
                    sortField: 'oldUnitName'
                }, {
                    name: 'oldJobName',
                    title: _self.$t('reports.labelText.positionBeforeTransfer'),
                    sortField: 'oldJobName'
                }, {
                    name: 'oldMibGrade',
                    title: _self.$t('reports.labelText.MIBGradeBeforeTransfer'),
                    sortField: 'oldMibGrade'
                }],
                dist: {
                    turnoverType: {},
                    gender: {}
                },
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
        created() {
            let dictCodes = ['RECORD_TYPE', 'GENDER'];
            this.$http.post('/public-access/dicts/items', {
                dictCodes
            }, {
                emulateJSON: true
            }).then((response) => {
                for (var d of response.data) {
                    if (d.dictName === 'RECORD_TYPE') {
                        this.dist.recordType = transformDict(d.dict);
                    }
                    if (d.dictName === 'GENDER') {
                        this.dist.gender = transformDict(d.dict);
                    }
                }
            })
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
            fixDist(value, option) {
                    var dist = {};
                    switch (option) {
                        case 'RECORD_TYPE':
                            dist = this.dist.recordType || {};
                            break;
                        case 'GENDER':
                            dist = this.dist.gender || {};
                            break;
                    }
                    for (let key of Object.keys(dist)) {
                        if (dist[key] === value) {
                            value = key;
                            break;
                        }
                    }
                    return value;
                },
                firecordType(value) {
                    return this.fixDist(value, 'RECORD_TYPE');
                },
                fixgender(value) {
                    return this.fixDist(value, 'GENDER');
                },
                search() {
                    this.$broadcast('vuetable:refresh');
                },
                reset() {
                    this.turnover.reset();
                },
                download() {
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
