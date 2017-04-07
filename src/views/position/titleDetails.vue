<style lang="less">

.ihr-position-titleDetails {
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
            td {
                padding: 20px 15px;
            }
        }
    }
}

</style>

<template lang="html">

<div class="content-wrap fix ihr-position-titleDetails">

    <div class="tree-panel fix">
        <div class="help-desk treelist-detail">
            <div class="help-desk-header">
                <h3 class="headline">{{basicinfo.standardJobName}}</h3>
            </div>
            <div class="help-desk-cnt">
                <ul class="regular fix">
                    <li>
                        <span class="prop-name">{{ $t('position.label.titleEffectiveDate') }}</span>
                        <span class="prop-val">{{basicinfo.createDate | formatDate }}</span>
                    </li>
                    <li>
                        <span class="prop-name">{{ $t('position.label.titleTitleID') }}</span>
                        <span class="prop-val">{{basicinfo.standardJobCode}}</span>
                    </li>
                    <li>
                        <span class="prop-name">{{ $t('position.label.titleFamily') }}</span>
                        <span class="prop-val">{{basicinfo.jobFamilyName}}</span>
                    </li>
                    <li>
                        <span class="prop-name">{{ $t('position.label.titleMIBGrade') }}</span>
                        <span class="prop-val">{{basicinfo.mibGrade}}</span>
                    </li>
                </ul>
            </div>
            <div class="tabs">
                <ui-tabs type="text" background-color="clear" text-color="gray" text-color-active="primary">
                    <ui-tab :title="$t('position.titlePositions')">
                        <div class="vuetable-wrapper">
                            <vuetable :api-url="positionsUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="positionsColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                            </vuetable>
                        </div>
                    </ui-tab>
                    <ui-tab :title="$t('position.titleMembers')">
                        <vuetable :api-url="membersUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="membersColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                        </vuetable>
                    </ui-tab>
                </ui-tabs>
            </div>
        </div>
    </div>
    <div class="btn-group">
        <ui-button class="btn-default-bd" type="flat" @click="back">{{$t('button.cancel')}}</ui-button>
    </div>
</div>
</div>

</template>

<script>

import {
    default as Message
}
from '../../components/basic/message';
import Datashaping from '../../util/assist.js';
export default {
    data() {
            let _self = this;
            return {
                show: {
                    genericConfirm: false,
                    modal: false
                },
                membersUrl: "",
                positionsUrl: "",
                jobFamilyId: '',
                backName: '',
                basicinfo: {},
                membersColumns: [{
                    name: 'employeeName',
                    title: this.$t('position.columns.titEmployeeName')
                }, {
                    name: 'employeeCode',
                    dataClass: 'tr',
                    title: this.$t('position.columns.titEmployeeID')
                }, {
                    name: 'positionName',
                    title: this.$t('position.columns.titMIBPosition')
                }, {
                    name: 'officePhone',
                    dataClass: 'tr',
                    title: this.$t('position.columns.titPhone')
                }, {
                    name: 'email',
                    title: this.$t('position.columns.titEmail')
                }, {
                    name: 'officeAddress',
                    title: this.$t('position.columns.titLocation')
                }],
                positionsColumns: [{
                    name: 'positionName',
                    title: this.$t('position.columns.titMIBPosition')
                }, {
                    name: 'positionCode',
                    title: this.$t('position.columns.titPositionID')
                }, {
                    name: 'mibGrade',
                    title: this.$t('position.columns.titMIBGrade')
                }, {
                    name: 'localGrade',
                    title: this.$t('position.columns.titJobGrade')
                }, {
                    name: 'businessCardTitle',
                    title: this.$t('position.columns.titPosition')
                }, {
                    name: 'effectiveDate',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    title: this.$t('position.columns.titEffectiveDate')
                }]
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            back() {
                    var jobFamilyId = this.jobFamilyId;
                    var backName = this.backName;
                    this.$router.push({
                        name: backName,
                        query: {
                            jobFamilyId: jobFamilyId
                        }
                    });
                },
                fetchData() {
                    let id = this.$route.params.id;
                    this.backName = this.$route.query.backName;
                    this.jobFamilyId = this.$route.query.jobFamilyId;
                    this.membersUrl = "/pos/standardJobs/" + id + "/members";
                    this.positionsUrl = "/pos/standardJobs/" + id + "/positions";
                    this.$http.get("/pos/standardJobs/" + id + "/basicInfo").then((response) => {
                        this.basicinfo = response.data;
                    }, (response) => {
                        Message({
                            type: 'error',
                            message: response.statusText
                        });
                    });
                }
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        }
};

</script>
