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
<div>
    <div class="content-wrap bg-w ihr-reports-employeeInformation pt20">

        <position-selector :show.sync="show"></position-selector>
        <div class="search-area">
            <v-form :model="information" :schema="informationSchema" label-width="170" label-suffix="" :cols="3" form-style="indicator-form">
                <text-field property='empInfo' editor-width="175" :placeholder="$t('reports.message.searchPlaceholder')"></text-field>
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
                <ui-button class="query-btn-search mr10" color="primary" @click="search">{{$t('button.search')}}</ui-button>
                <ui-button class="query-btn-reset btn-default-bd" type="flat" @click="reset">{{$t('button.reset')}}</ui-button>
            </div>
        </div>
        <div class="group"></div>
        <div class="leftRight-panel bg-f5f5f5 mt16 fix">
            <div class="right-panel pl16 pr16">
                <div class="right-panel-tit pb16 tc">
                    <span>{{$t('reports.labelText.basicInformation')}}</span>
                </div>
                <ui-button class="dis-tc-t btn-default-bd download" icon="fa-download" type="flat" :text="$t('button.download')" @click="download"></ui-button>
                <div class="vuetable-wrapper">
                    <vuetable api-url="/report/EmpBasicInfo" :selected-to="selectedRow" :append-params="moreParams" :fields="columns" pagination-path="" table-wrapper=".vuetable-wrapper" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
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

            let informationSchema = new Schema({
                empInfo: {
                    label: _self.$t('reports.labelText.employee'),
                    required: false,
                    whitespace: false,
                },
                positionId: {},
                positionName: {
                    label: _self.$t('reports.labelText.position'),
                    required: false,
                    whitespace: false,
                },
                employeeStatus: {
                    label: _self.$t('reports.labelText.employee')
                },
                gender: {
                    label: _self.$t('reports.labelText.gender')
                },
                mibGrade: {
                    label: _self.$t('reports.labelText.MIBGrade')
                },
                highestEducationLevel: {
                    label: _self.$t('reports.labelText.highestEducationLevel')
                },
                major: {
                    label: _self.$t('reports.labelText.major'),
                    required: false,
                    whitespace: false,
                },
                institution: {
                    label: _self.$t('reports.labelText.institution'),
                    required: false,
                    whitespace: false,
                },
                positionCategory: {
                    label: _self.$t('reports.labelText.positionCategory')
                },
                orgUnitName: {
                    label: _self.$t('reports.labelText.organization')
                },
                unitId: {},
                employementCategory: {
                    label: _self.$t('reports.labelText.employmentCategory')
                }
            });

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
                    title: _self.$t('reports.labelText.name'),
                    sortField: 'fullName'
                }, {
                    name: 'idType',
                    title: _self.$t('reports.labelText.IDType'),
                    sortField: 'idType',
                    callback: function(value) {
                        return _self.fixidType(value);
                    }
                }, {
                    name: 'idNo',
                    title: _self.$t('reports.labelText.IDNumber'),
                    sortField: 'idNo'
                }, {
                    name: 'gender',
                    title: _self.$t('reports.labelText.gender'),
                    sortField: 'gender',
                    callback: function(value) {
                        return _self.fixgender(value);
                    }
                }, {
                    name: 'unitShortName',
                    title: _self.$t('reports.labelText.organization'),
                    sortField: 'unitShortName'
                }, {
                    name: 'abbreviation',
                    title: _self.$t('reports.labelText.abbreviation'),
                    sortField: 'abbreviation'
                }, {
                    name: 'positionName',
                    title: _self.$t('reports.labelText.position'),
                    sortField: 'positionName'
                }, {
                    name: 'mibGrade',
                    title: _self.$t('reports.labelText.MIBGrade'),
                    sortField: 'mibGrade'
                }, {
                    name: 'localGrade',
                    title: _self.$t('reports.labelText.localGrade'),
                    sortField: 'localGrade'
                }, {
                    name: 'employeeStatus',
                    title: _self.$t('reports.labelText.currentStatus'),
                    sortField: 'employeeStatus',
                    callback: function(value) {
                        return _self.fixemployeeStatus(value);
                    }
                }, {
                    name: 'hireDate',
                    title: _self.$t('reports.labelText.employementDate'),
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    sortField: 'hireDate'
                }, {
                    name: 'takeWorkTime',
                    title: _self.$t('reports.labelText.takeWorkTime'),
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    sortField: 'takeWorkTime'
                }, {
                    name: 'highestEducationLevel',
                    title: _self.$t('reports.labelText.highestEducationLevel'),
                    sortField: 'highestEducationLevel',
                    callback: function(value) {
                        return _self.fixeducationLevel(value);
                    }
                }, {
                    name: 'institution',
                    title: _self.$t('reports.labelText.institution'),
                    sortField: 'institution'
                }, {
                    name: 'major',
                    title: _self.$t('reports.labelText.major'),
                    sortField: 'major'
                }, {
                    name: 'graduationDate',
                    title: _self.$t('reports.labelText.graduationDate'),
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    sortField: 'graduationDate'
                }, {
                    name: 'positionCategory',
                    title: _self.$t('reports.labelText.positionCategory'),
                    sortField: 'positionCategory',
                    callback: function(value) {
                        return _self.fixpositionCategory(value);
                    }
                }, {
                    name: 'employementCategory',
                    title: _self.$t('reports.labelText.employmentCategory'),
                    sortField: 'employementCategory',
                    callback: function(value) {
                        return _self.fixemployeeCategory(value);
                    }
                }],
                dist: {
                    idType: {},
                    gender: {},
                    employeeStatus: {},
                    positionCategory: {},
                    employeeCategory: {},
                    currentStatus: {},
                    employmentCategory: {},
                    mibrank: {},
                    degree: {},
                    employeeCategory: {},
                },
                moreParams: [],
                moreParamsKeys: ['empInfo', 'positionName', 'employeeStatus', 'gender', 'mibGrade', 'highestEducationLevel', 'major', 'institution', 'positionCategory', 'unitId', 'employementCategory']
            }
        },
        created() {
            let dictCodes = ['ID_TYPE', 'GENDER', 'EMPLOYEE_STATUS', 'POSITION_CATEGORY', 'EMPLOYEE_CATEGORY', 'MIB_RANK', 'DEGREE'];
            this.$http.post('/public-access/dicts/items', {
                dictCodes
            }, {
                emulateJSON: true
            }).then((response) => {
                for (var d of response.data) {
                    if (d.dictName === 'ID_TYPE') {
                        this.dist.idType = transformDict(d.dict);
                    }
                    if (d.dictName === 'GENDER') {
                        this.dist.gender = transformDict(d.dict);
                    }
                    if (d.dictName === 'EMPLOYEE_STATUS') {
                        this.dist.employeeStatus = transformDict(d.dict);
                    }
                    if (d.dictName === 'POSITION_CATEGORY') {
                        this.dist.positionCategory = transformDict(d.dict);
                    }
                    if (d.dictName === 'EMPLOYEE_CATEGORY') {
                        this.dist.employeeCategory = transformDict(d.dict);
                    }
                    if (d.dictName === 'MIB_RANK') {
                        this.dist.mibrank = transformDict(d.dict);
                    }
                    if (d.dictName === 'DEGREE') {
                        this.dist.degree = transformDict(d.dict);
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
            fixDist(value, option) {
                    var dist = {};
                    switch (option) {
                        case 'ID_TYPE':
                            dist = this.dist.idType || {};
                            break;
                        case 'GENDER':
                            dist = this.dist.gender || {};
                            break;
                        case 'EMPLOYEE_STATUS':
                            dist = this.dist.employeeStatus || {};
                            break;
                        case 'POSITION_CATEGORY':
                            dist = this.dist.positionCategory || {};
                            break;
                        case 'EMPLOYEE_CATEGORY':
                            dist = this.dist.employeeCategory || {};
                            break;
                        case 'DEGREE':
                            dist = this.dist.degree || {};
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
                fixidType(value) {
                    return this.fixDist(value, 'ID_TYPE');
                },
                fixgender(value) {
                    return this.fixDist(value, 'GENDER');
                },
                fixemployeeStatus(value) {
                    return this.fixDist(value, 'EMPLOYEE_STATUS');
                },
                fixpositionCategory(value) {
                    return this.fixDist(value, 'POSITION_CATEGORY');
                },
                fixemployeeCategory(value) {
                    if (value === "1" || value === "4") {
                        return;
                    }
                    return this.fixDist(value, 'EMPLOYEE_CATEGORY');
                },
                fixeducationLevel(value) {
                    return this.fixDist(value, 'DEGREE');
                },
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
