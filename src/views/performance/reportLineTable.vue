<style lang="less">

.ihr-staff-reportLine {
    font-size: 14px;
    .ui-radio-label-text {
        line-height: 32px;
        margin: 0 10px;
    }
    .form {
        height: 46px;
    }
    // .group {
    //     margin: 20px 0;
    //     padding-top: 20px;
    //     border-top: 1px solid #ecedee;
    // }
    .reportLine-form {
        height: 46px;
        overflow: hidden;
        transition: height .3s linear;
    }
    .reportLine-form.expended {
        height: 92px;
        transition: height .3s linear;
    }
    .employeeCode {
        width: 216px;
        word-break: break-all;
        line-height: 24px;
    }
}

</style>

<template lang="html">
<div class="content-wrap bg-w ihr-staff-reportLine">
    <div class="mb20 pt20">
        <div class="search-area">
            <v-form :class="{expended: expended}" :model="reportLine" :schema="reportLineSchema" label-width="130" :cols="3" form-style="reportLine-form">
                <text-field type="selector" @open-selector="openSelector" :readonly="true" :show="org" property="organization" editor-width="150"></text-field>
                <text-field property='employeeId' editor-width="150"></text-field>
                <text-field property='employeeName' editor-width="150"></text-field>
            </v-form>
            <organization-selector ref="orgselect" :show="org" :handel-select="selectOrg"></organization-selector>
            <!-- <ui-icon-button class="expend-btn" :class="{expended: expended}" :icon="expendIcon" @click="expendSearch"></ui-icon-button> -->
            <div class="query-btn">
                <ui-button class="query-btn-search mr10" color="primary" @click="searchTable">{{$t('button.search')}}</ui-button>
                <ui-button class="query-btn-reset btn-default-bd" type="flat" @click="resetTable">{{$t('button.reset')}}</ui-button>
            </div>
        </div>
        <div class="group">
            <ui-button class="mr10 dis-tc btn-primary-bd" @click="downloadAsExcel" color="primary" button-type="button">{{$t('button.download')}}</ui-button>
        </div>
        <div class="vuetable-wrapper pl16 pr16 pb16">
            <vuetable ref="vuetable" :api-url="tableUrl" :selected-to="selectedRow" :append-params="queryParams" :fields="columns" pagination-path="" table-wrapper=".vuetable-wrapper pl16 pr16 pb16" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
            </vuetable>
        </div>
    </div>
</div>

</template>

<script>
import { downloadFile } from '../../util/assist';
import {
    default as Schema
}
from '../../schema/index';



export default {
    data() {
      let self = this;
      let reportLineSchema = new Schema({
          organization: {
              label: self.$t('staff.organization')
          },
          employeeId: {
              label: self.$t('staff.employeeId')
          },
          employeeName: {
              label: self.$t('staff.employeeName')
          },
          unitId: {}
      });
            return {
                // tableUrl:`/org/orgs/{unitId}/reportLine`,
                reportLineSchema: reportLineSchema,
                reportLine: reportLineSchema.newModel(),
                expendIcon: 'fa-angle-double-down',
                selectedRow: [],
                expended: false,
                org: {
                    modal: false
                },
                show: {
                    genericConfirm: false,
                    modal: false
                },
                favourite: {
                    group: 'yes',
                },
                options: {
                    group: [{
                        value: 'yes',
                        text: 'Yes'
                    }, {
                        value: 'no',
                        text: 'No'
                    }]
                },
                columns: [{
                    name: '__checkbox:employeeId',
                    title: ''
                }, {
                    name: 'fullName',
                    title: this.$t('staff.employeeName')
                }, {
                    name: 'employeeCode',
                    dataClass: 'tr',
                    title: this.$t('staff.employeeId')
                }, {
                    name: 'positionName',
                    title: this.$t('performance.position')
                }, {
                    name: 'reportLinePositionName',
                    title: this.$t('staff.reportLine')
                }, {
                    name: 'reportLineEmployeeName',
                    title: this.$t('performance.teportto'),
                    dataClass: 'employeeCode'
                }, {
                    name: 'dottedReportLinepositionName',
                    title: this.$t('staff.dottedReportLine')
                }, {
                    name: 'dottedReportLineEmployeeName',
                    title: this.$t('performance.dottedReportto'),
                    dataClass: 'employeeCode'
                }]
            }
        },
        computed: {
            queryParams() {
                    let employeeCode = this.reportLine.employeeId ? this.reportLine.employeeId : "";
                    let employeeName = this.reportLine.employeeName ? this.reportLine.employeeName : "";
                    let unitId = this.reportLine.unitId ? this.reportLine.unitId : "";
                    return [
                        `employeeCode=${employeeCode}`,
                        `employeeName=${employeeName}`,
                        `unitId=${unitId}`
                    ]
                },
                tableUrl() {
                    let unitId = this.reportLine.unitId ? this.reportLine.unitId : "";
                    return `/performance/reportLine`;
                }
        },
        methods: {
            selectOrg(value) {

                if (value) {
                    this.reportLine.organization = value.orgShortName;
                    this.reportLine.unitId = value.orgId;
                }
            },
            openSelector() {
              this.$refs.orgselect.open();
            },
            searchTable() {
                    this.$nextTick(function() {
                        this.$refs.vuetable.reloadData()
                    })
                },
            resetTable() {
                this.reportLine.reset();
                this.$nextTick(() => {
                    this.$refs.vuetable.reloadData();
                })
            },
            expendSearch() {
                this.expended = !this.expended;
                this.expendIcon = this.expended ? 'fa-angle-double-up' : 'fa-angle-double-down';
                this.$refs.vuetable.reloadData();
            },
            confirmed() {
                this.show.delConfirm = false;
                this.$refs.vuetable.reloadData();
            },
            menuOptionSelected(option) {
                console.log(option);
            },
            downloadAsExcel() {
              let exportParam = {
                employeeCode : this.reportLine.employeeId ? this.reportLine.employeeId : "",
                employeeName : this.reportLine.employeeName ? this.reportLine.employeeName : "",
                unitId : this.reportLine.unitId ? this.reportLine.unitId : ""
              }
              downloadFile('/performance/exportReportLineInfo',exportParam);
            }
        },
        components: {}
};

</script>
