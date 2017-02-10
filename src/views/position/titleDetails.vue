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
                        <span class="prop-name">Effective Date</span>
                        <span class="prop-val">{{basicinfo.createDate | formatDate }}</span>
                    </li>
                    <li>
                        <span class="prop-name">Title ID</span>
                        <span class="prop-val">{{basicinfo.standardJobCode}}</span>
                    </li>
                    <li>
                        <span class="prop-name">Family</span>
                        <span class="prop-val">{{basicinfo.jobFamilyName}}</span>
                    </li>
                    <li>
                        <span class="prop-name">MIB Grade</span>
                        <span class="prop-val">{{basicinfo.mibGrade}}</span>
                    </li>
                </ul>
            </div>
            <div class="tabs">
                <ui-tabs type="text" background-color="clear" text-color="gray" text-color-active="primary">
                    <ui-tab header="Positions">
                        <div class="vuetable-wrapper">
                            <vuetable :api-url="positionsUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="positionsColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                            </vuetable>
                        </div>
                    </ui-tab>
                    <ui-tab header="Members">
                        <vuetable :api-url="membersUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="membersColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                        </vuetable>
                    </ui-tab>
                </ui-tabs>
            </div>
        </div>
    </div>
    <div class="btn-group">
        <ui-button class="btn-default-bd" type="flat" @click="back">Cancel</ui-button>
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
                    title: 'Employee Name'
                }, {
                    name: 'employeeCode',
                    dataClass: 'tr',
                    title: 'Employee ID'
                }, {
                    name: 'positionName',
                    title: 'MIB Position'
                }, {
                    name: 'officePhone',
                    dataClass: 'tr',
                    title: 'Phone'
                }, {
                    name: 'email',
                    title: 'Email'
                }, {
                    name: 'officeAddress',
                    title: 'Location'
                }],
                positionsColumns: [{
                    name: 'positionName',
                    title: 'MIB Position'
                }, {
                    name: 'positionCode',
                    title: 'Position ID'
                }, {
                    name: 'mibGrade',
                    title: 'MIB Grade'
                }, {
                    name: 'localGrade',
                    title: 'Job Grade'
                }, {
                    name: 'businessCardTitle',
                    title: 'Position'
                }, {
                    name: 'effectiveDate',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    title: 'Effective Date'
                }]
            }
        },
        computed: {},
        ready() {},
        methods: {
          back() {
            var jobFamilyId = this.jobFamilyId;
            var backName = this.backName;
            this.$router.go({
                name: backName,
                query: {
                  jobFamilyId: jobFamilyId
                }
            });
          }
        },
        components: {},
        route: {
            data(transition) {
                let _self = this;
                let id = transition.to.params.id;
                _self.backName = transition.to.query.backName;
                _self.jobFamilyId = transition.to.query.jobFamilyId;
                _self.membersUrl = "/pos/standardJobs/" + id + "/members";
                _self.positionsUrl = "/pos/standardJobs/" + id + "/positions";
                _self.$http.get("/pos/standardJobs/" + id + "/basicInfo").then((response) => {
                    _self.basicinfo = response.data;
                }, (response) => {
                    Message({
                        type: 'error',
                        message: response.statusText
                    });
                });
            }
        }
};

</script>
