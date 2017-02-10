<style lang="less">

.ihr-reports-employeeInformation {
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
    .vuetable {
        th {
            padding: 20px 10px 10px 10px;
            vertical-align: middle;
            white-space: nowrap;
            text-align: center;
        }
        td {
            white-space: nowrap;
        }
    }
    .cell-1-3 {
        width: 30%;
        min-width: 360px;
    }
    .leftRight-panel {
        border: none;
    }
    .indicator-form {
        position: relative;
        left: -58px;
        min-width: 1125px;
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

<div class="content-wrap bg-w ihr-reports-employeeInformation pt20">
    <position-selector :show.sync="show"></position-selector>
    <div class="search-area">
        <v-form :model="information" :schema="informationSchema" label-width="170" label-suffix="" :cols="3" form-style="indicator-form">
            <text-field property='empInfo' editor-width="175" placeholder="Search by Employee Name,ID"></text-field>
            <text-field property="positionName" type="selector" :show.sync="show" :hide-label="false" editor-width="175"></text-field>
            <select-field property='employeeStatus' :mapping="dist.currentStatus" editor-width="175"></select-field>
            <select-field v-show="expended" property='gender' :mapping="dist.gender" editor-width="175"></select-field>
            <select-field v-show="expended" property='mibGrade' :mapping="dist.mibrank" editor-width="175"></select-field>
            <select-field v-show="expended" property='highestEducationLevel' :mapping="dist.degree" editor-width="175"></select-field>
            <text-field v-show="expended" property='major' editor-width="175"></text-field>
            <text-field v-show="expended" property='institution' editor-width="175"></text-field>
            <select-field v-show="expended" property='positionCategory' :mapping="dist.positionCategory" editor-width="175"></select-field>
            <text-field v-show="expended" property="orgUnitName" type="selector" :show.sync="org" editor-width="175"></text-field>
            <select-field v-show="expended" property='employementCategory' :mapping="dist.employmentCategory" editor-width="175"></select-field>
        </v-form>
        <ui-icon-button :class="['expend-btn']" :icon="expendIcon" @click="expendSearch"></ui-icon-button>
        <div class="query-btn">
            <ui-button class="query-btn-search mr10" color="primary" @click="search">Search</ui-button>
            <ui-button class="query-btn-reset btn-default-bd" type="flat" @click="reset">Reset</ui-button>
        </div>
    </div>
    <div class="group"></div>
    <div class="leftRight-panel bg-f5f5f5 mt16 fix">
        <div class="right-panel pl16 pr16">
            <div class="right-panel-tit pb16 tc">
                <span>Basic Information</span>
            </div>
            <ui-button class="dis-tc-t btn-default-bd download" icon="fa-download" type="flat" text="Download" @click="download"></ui-button>
            <div class="vuetable-wrapper">
                <vuetable api-url="/report/EmpBasicInfo" :selected-to="selectedRow" :append-params="moreParams" :fields="columns" pagination-path="" table-wrapper=".vuetable-wrapper" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                </vuetable>
            </div>
        </div>
    </div>
</div>
<organization-selector :show.sync="org"></organization-selector>

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

let informationSchema = new Schema({
    empInfo: {
        label: 'Employee',
        required: false,
        whitespace: false,
    },
    positionId: {},
    positionName: {
        label: 'Position',
        required: false,
        whitespace: false,
    },
    employeeStatus: {
        label: 'Current Status'
    },
    gender: {
        label: 'Gender'
    },
    mibGrade: {
        label: 'MIB Grade'
    },
    highestEducationLevel: {
        label: 'Highest Level Education'
    },
    major: {
        label: 'Major',
        required: false,
        whitespace: false,
    },
    institution: {
        label: 'Insitution',
        required: false,
        whitespace: false,
    },
    positionCategory: {
        label: 'Position Category'
    },
    orgUnitName: {
        label: 'Organization'
    },
    unitId: {},
    employementCategory: {
        label: 'Employment Category'
    }
});
export default {
    data() {
            let _self = this;
            return {
                show: {
                    modal: false
                },
                expended: false,
                informationSchema: informationSchema,
                information: informationSchema.newModel(),
                trees: [],
                expendIcon: 'fa-angle-double-down',
                org: {
                    modal: false
                },
                tableTotal: '',
                dist: {
                    gender: {},
                    currentStatus: {},
                    employmentCategory: {},
                    mibrank: {},
                    degree: {},
                    positionCategory: {},
                    employeeCategory: {},
                },
                tableUrl: '', //vuetable url
                unitId: '0', //root node Object
                levelConfig: {
                    labelProperty: 'orgShortName',
                    children: {
                        lazy: true,
                        recursive: true,
                        labelProperty: 'orgShortName',
                        load: function(node, callback) {
                            if (node.data.isParent) {
                                let parentId = node.data.orgId;
                                _self.$http.get(`/org/orgs/${parentId}/children`).then((response) => {
                                    node.children = response.data;
                                    if (callback) {
                                        callback();
                                    }

                                }, (response) => {
                                    console.log('错误信息 ：' + response.statusText);
                                });
                            } else {
                                node.children = [];
                            }
                        }
                    }
                },
                showCheckbox: false,
                columns: [{
                    name: 'fullName',
                    title: 'Name',
                    sortField: 'fullName'
                }, {
                    name: 'idType',
                    title: ' ID Type',
                    sortField: 'idType'
                }, {
                    name: 'idNo',
                    title: 'ID NO.',
                    sortField: 'idNo'
                }, {
                    name: 'gender',
                    title: 'Gender',
                    sortField: 'gender'
                }, {
                    name: 'unitShortName',
                    title: 'Organization',
                    sortField: 'unitShortName'
                }, {
                    name: 'abbreviation',
                    title: 'Abbreviation',
                    sortField: 'abbreviation'
                }, {
                    name: 'positionName',
                    title: 'Position',
                    sortField: 'positionName'
                }, {
                    name: 'mibGrade',
                    title: 'MIB Grade',
                    sortField: 'mibGrade'
                }, {
                    name: 'localGrade',
                    title: 'Local Grade',
                    sortField: 'localGrade'
                }, {
                    name: 'employeeStatus',
                    title: 'Current Status',
                    sortField: 'employeeStatus'
                }, {
                    name: 'hireDate',
                    title: 'Employement Date',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    sortField: 'hireDate'
                }, {
                    name: 'takeWorkTime',
                    title: 'Take Work Time',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    sortField: 'takeWorkTime'
                }, {
                    name: 'highestEducationLevel',
                    title: 'Highest Education Level',
                    sortField: 'highestEducationLevel'
                }, {
                    name: 'institution',
                    title: 'Institution',
                    sortField: 'institution'
                }, {
                    name: 'major',
                    title: 'Major',
                    sortField: 'major'
                }, {
                    name: 'graduationDate',
                    title: 'Graduation Date',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    sortField: 'graduationDate'
                }, {
                    name: 'positionCategory',
                    title: 'Position Category',
                    sortField: 'positionCategory'
                }, {
                    name: 'employementCategory',
                    title: 'Employment Category',
                    sortField: 'employementCategory'
                }],
                moreParams: [],
                moreParamsKeys: ['empInfo', 'positionName', 'employeeStatus', 'gender', 'mibGrade', 'highestEducationLevel', 'major', 'institution', 'positionCategory', 'unitId', 'employementCategory']
            }
        },
        created() {
            let dictCodes = ['GENDER', 'MIB_RANK', 'DEGREE', 'POSITION_CATEGORY', 'EMPLOYEE_CATEGORY'];
            this.$http.post('/public-access/dicts/items', {
                dictCodes
            }, {
                emulateJSON: true
            }).then((response) => {
                for (var d of response.data) {
                    if (d.dictName === 'GENDER') {
                        this.dist.gender = transformDict(d.dict);
                    }
                    if (d.dictName === 'MIB_RANK') {
                        this.dist.mibrank = transformDict(d.dict);
                    }
                    if (d.dictName === 'DEGREE') {
                        this.dist.degree = transformDict(d.dict);
                    }
                    if (d.dictName === 'POSITION_CATEGORY') {
                        this.dist.positionCategory = transformDict(d.dict);
                    }
                    if (d.dictName === 'EMPLOYEE_CATEGORY') {
                        this.dist.employeeCategory = transformDict(d.dict);
                    }
                }
            })
        },
        ready() {
            this.$http.get('/employee/employees/dicts/EMPLOYEE_STATUS/items/4').then(function(res) {
                if (res.data) {
                    var data = {};
                    res.data.forEach(function(item) {
                        data[item.NAME] = item.VALUE;
                    })
                    this.dist.currentStatus = data;
                }
            })

            this.$http.get('/employee/employees/dicts/EMPLOYEE_CATEGORY/items/1').then(function(res) {
                if (res.data) {
                    var data = {};
                    res.data.forEach(function(item) {
                        data[item.NAME] = item.VALUE;
                    })
                    this.dist.employmentCategory = data;
                }
            })
        },
        methods: {
            handleMoreParams() {
                    this.moreParams = [];
                    for (let i = 0, len = this.moreParamsKeys.length; i < len; i++) {
                        let key = this.moreParamsKeys[i];
                        let value = this.information[key];
                        if (value || typeof value === 'number') {
                            this.moreParams.push(key + '=' + value);
                        }
                    }
                },
                search() {

                    this.handleMoreParams();
                    this.$nextTick(function() {
                        this.$broadcast('vuetable:refresh')
                    });
                },
                reset() {
                    this.information.reset();
                },
                expendSearch() {
                    this.expended = !this.expended;
                    this.expendIcon = this.expended ? 'fa-angle-double-up' : 'fa-angle-double-down';
                },
                download() {
                    if (!this.tableTotal) {
                        return;
                    }
                    if (this.tableTotal && this.tableTotal < 5000) {
                        downloadFile('/report/exportEmpBasicInfo', {
                            empInfo: this.information.empInfo,
                            positionName: this.information.positionName || '',
                            employeeStatus: this.information.employeeStatus || '',
                            gender: this.information.gender || '',
                            mibGrade: this.information.mibGrade,
                            highestEducationLevel: this.information.highestEducationLevel || '',
                            major: this.information.major || '',
                            institution: this.information.institution || '',
                            positionCategory: this.information.positionCategory || '',
                            unitId: this.information.unitId || ''
                        });
                    } else {
                        Message({
                            type: 'error',
                            message: this.$t('reports.message.checkReportList')
                        })
                    }
                }
        },
        events: {
            'selected-position': function(data) {
                if (data) {
                    this.information.positionName = data.positionName;
                    this.information.positionId = data.positionId;
                    return false
                }
            },
            'organization-selector:selected': function(data) {
                if (data) {
                    this.information.orgUnitName = data.orgShortName;
                    this.information.unitId = data.orgId;
                    return false
                }
            },
            'vuetable:load-success': function(response) {
                this.tableTotal = response.data.total;
            }
        }
}

</script>
