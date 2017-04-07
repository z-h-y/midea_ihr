<style lang="less">

.ihr-position-positionDetails {
    min-width: 921px;
    padding-bottom: 88px;
    .treelist-detail {
        margin-left: 0 !important;
        border-left: none;
    }
    .ui-tabs-body {
        padding-left: 0;
        padding-right: 0;
    }
    .ui-tab-table {
        width: 100%;
        font-size: 14px;
        tr {
            vertical-align: center;
            height: 36px;
            td {
                color: #545454;
            }
        }
    }
    .c-a5acbe {
        color: #a5acbe !important;
    }
    .word-break {
        width: 500px;
        word-break: break-all;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-position-positionDetails fix">

    <div class="tree-panel fix">
        <div class="help-desk treelist-detail">
            <div class="help-desk-header">
                <h3 class="headline">{{positionDetails.positionName}}</h3>
            </div>
            <div class="help-desk-cnt">
                <ul class="regular fix">
                    <li>
                        <span class="prop-name">{{ $t('position.label.posEffectiveDate') }}</span>
                        <span class="prop-val">{{basicinfo.effectiveDate}}</span>
                    </li>
                    <li>
                        <span class="prop-name">{{ $t('position.label.posPositionID') }}</span>
                        <span class="prop-val">{{basicinfo.positionCode}}</span>
                    </li>
                    <li>
                        <span class="prop-name">{{ $t('position.label.posRestricttoOrganization') }}</span>
                        <span class="prop-val">{{basicinfo.unitShortName}}</span>
                    </li>
                    <li>
                        <span class="prop-name">{{ $t('position.label.posSuperiorPosition') }}</span>
                        <span class="prop-val">{{basicinfo.parentPositionName}}</span>
                    </li>
                </ul>
            </div>
            <div class="tabs">
                <ui-tabs type="text" background-color="clear" text-color="gray" text-color-active="primary">
                    <ui-tab :header="$t('position.label.posPositionDetails')">
                        <table class="ui-tab-table">
                            <tr>
                                <td class="c-a5acbe" style="width:220px;">{{ $t('position.label.posBusinessModule') }}</td>
                                <td>{{positionDetails.module}}</td>
                            </tr>
                            <tr>
                                <td class="c-a5acbe">{{ $t('position.label.posJobTitle') }}</td>
                                <td>{{positionDetails.standardJobName}}</td>
                            </tr>
                            <tr>
                                <td class="c-a5acbe">{{ $t('position.label.posMIBPosition') }}</td>
                                <td>{{positionDetails.positionName}}</td>
                            </tr>
                            <tr>
                                <td class="c-a5acbe">{{ $t('position.label.posPosition') }}</td>
                                <td>{{positionDetails.businessTitle}}</td>
                            </tr>
                            <tr>
                                <td class="c-a5acbe">{{ $t('position.label.posRestricttoOrganization') }}</td>
                                <td>{{positionDetails.unitShortName}}</td>
                            </tr>
                            <tr>
                                <td class="c-a5acbe">{{ $t('position.label.posMIBGrade') }}</td>
                                <td>{{positionDetails.mibGrade}}</td>
                            </tr>
                            <tr>
                                <td class="c-a5acbe">{{ $t('position.label.posJobGrade') }}</td>
                                <td>{{positionDetails.localGrade}}</td>
                            </tr>
                            <tr>
                                <td class="c-a5acbe">{{ $t('position.label.posPositionID1') }}</td>
                                <td>{{positionDetails.positionCode}}</td>
                            </tr>
                            <tr>
                                <td class="c-a5acbe">{{ $t('position.label.posEffectiveDate') }}</td>
                                <td>{{positionDetails.beginDate | formatDate}}</td>
                            </tr>
                            <tr>
                                <td class="c-a5acbe">{{ $t('position.label.posJobDescription') }}</td>
                                <td>
                                    <div class="word-break">
                                        {{positionDetails.businessUnderstanding}}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="c-a5acbe">{{ $t('position.label.posJobDescriptionAttachment') }}</td>
                                <td>
                                    <span class="fileName">{{positionDetailsDownloadFile.posAttachmentName}}</span>
                                    <i class="fa fa-download poi f14 ml5" v-if="showDownloadBtn" aria-hidden="true" @click="downloadFile"></i>
                                </td>
                            </tr>
                            <tr>
                                <td class="c-a5acbe">{{ $t('position.label.posGeneralRequirements') }}</td>
                                <td>{{positionDetails.generalRequirements}}</td>
                            </tr>
                            <tr>
                                <td class="c-a5acbe">{{ $t('position.label.posCertificationRequirement') }}</td>
                                <td>{{positionDetails.expertiseRequirements}}</td>
                            </tr>
                            <tr>
                                <td class="c-a5acbe">{{ $t('position.label.posAcademicRequirements') }}</td>
                                <td>{{positionDetails.academicRequirements}}</td>
                            </tr>
                            <tr>
                                <td class="c-a5acbe">{{ $t('position.label.posWorkExperience') }}</td>
                                <td>{{positionDetails.experienceRequire}}</td>
                            </tr>
                        </table>
                    </ui-tab>
                    <ui-tab :header="$t('position.label.posMembers')">
                        <vuetable :api-url="membersTable" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="membersColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                        </vuetable>
                    </ui-tab>
                    <ui-tab :header="$t('position.label.posSubordinatePositions')">
                        <vuetable :api-url="positionTable" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="positionsColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                        </vuetable>
                    </ui-tab>
                </ui-tabs>
            </div>
        </div>
    </div>
    <div class="btn-group">
        <ui-button class="btn-default-bd" type="flat" @click="cancel">{{ $t('button.cancel') }}</ui-button>
    </div>
</div>

</template>

<script>

import {
    formatDate, getDictMapping, downloadFile
}
from '../../util/assist';

export default {
    data() {
            let _self = this;
            return {
                membersTable: '',
                positionTable: '',
                backName: '',
                basicinfo: {},
                positionDetails: {},
                dist: {
                    POSITION_CATEGORY: {},
                    MIB_RANK: {}
                },
                membersColumns: [{
                    name: 'employeeName',
                    title: this.$t('position.columns.posEmployeeName')
                }, {
                    name: 'employeeCode',
                    dataClass: 'tr',
                    title: this.$t('position.columns.posEmployeeID')
                }, {
                    name: 'positionName',
                    title: this.$t('position.columns.posMIBPosition')
                }, {
                    name: 'officePhone',
                    dataClass: 'tr',
                    title: this.$t('position.columns.posPhone')
                }, {
                    name: 'email',
                    title: this.$t('position.columns.posEmail')
                }, {
                    name: 'officeAddress',
                    title: this.$t('position.columns.posLocation')
                }],
                positionsColumns: [{
                    name: 'position_name',
                    title: this.$t('position.columns.posMIBPosition')
                }, {
                    name: 'position_code',
                    title: this.$t('position.columns.posPositionID')
                }, {
                    name: 'positio_category',
                    title: this.$t('position.columns.posPositionCategory'),
                    callback: function(value) {
                        return _self.fixPOSITIONType(value);
                    }
                }, {
                    name: 'mib_grade',
                    title: this.$t('position.columns.posMIBGrade'),
                    callback: function(value) {
                        return _self.fixMIBType(value);
                    }
                }, {
                    name: 'create_date',
                    title: this.$t('position.columns.posEffectiveDate'),
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    callback: function(value) {
                        return _self.handleFormatDate(value);
                    }
                }],
                attachmentId: '',
                positionDetailsDownloadFile: {},
                showDownloadBtn: false
            };
        },
        methods: {
            cancel() {

                    var backName = this.backName;
                    var id = this.$route.params.orgId;
                    var query = backName ? {
                        jobFamilyId: id
                    } : {
                        orgId: id
                    };
                    this.$router.push({
                        name: backName || 'positionSetting',
                        query: query
                    });
                },
                handleFormatDate(value) {
                    return formatDate(new Date(value));
                },
                fixDist(value, option) {
                    var dist = {};
                    switch (option) {
                        case 'POSITION_CATEGORY':
                            dist = this.dist.POSITION_CATEGORY || {};
                            break;
                        case 'MIB_RANK':
                            dist = this.dist.MIB_RANK || {};
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
                fixPOSITIONType(value) {
                    return this.fixDist(value, 'POSITION_CATEGORY');
                },
                fixMIBType(value) {
                    return this.fixDist(value, 'MIB_RANK');
                },
                downloadFile() {
                    let exportParam = {
                        attachmentId: this.attachmentId || ""
                    }
                    downloadFile('/system/attachment/downloadFile', exportParam);
                },
                fetchData() {
                    let _self = this;
                    let id = _self.$route.params.positionId;
                    _self.backName = _self.$route.query.backName;
                    _self.$http.get(`/pos/positions/${id}/basicInfo`).then((response) => {
                        _self.basicinfo = response.data;
                    });


                    _self.$http.get(`/pos/positions/${id}/loadData`).then((response) => {
                        _self.positionDetailsDownloadFile = response.data;
                        _self.attachmentId = response.data.posAttachmentId;
                        if (_self.positionDetailsDownloadFile.posAttachmentName) {
                            _self.showDownloadBtn = true;
                        }
                    });

                    _self.$http.get(`/pos/positions/${id}/positionDetails`).then((response) => {
                        _self.positionDetails = response.data;
                        _self.attachmentId = response.data.posAttachmentId;
                    });
                    _self.membersTable = `/pos/positions/${id}/members`;
                    _self.positionTable = `/pos/positions/${id}/subordinatePositions`;
                }
        },
        created() {
            var self = this;
            getDictMapping('POSITION_CATEGORY').then(function(res) {
                self.dist.POSITION_CATEGORY = res;
            });
            getDictMapping('MIB_RANK').then(function(res) {
                self.dist.MIB_RANK = res;
            });
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData' // 如果路由有变化，会再次执行该方法
        }
};

</script>
