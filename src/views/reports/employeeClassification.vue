<style lang="less">

.ihr-reports-employeeClassification {
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
    .right-panel-info {
        background: #fafafa;
        padding: 0 20px;
    }
    .right-panel-info li {
        float: left;
        margin-right: 165px;
    }
    .right-panel-label {
        font-size: 14px;
        color: #a5acbe;
        display: inline-block;
        padding: 20px 0;
        width: 130px;
    }
    .right-panel-txt {
        font-size: 14px;
        color: #6a707d;
    }
    .ui-tabs-body {
        padding-left: 0;
        padding-right: 0;
    }
    .bg-f5f5f5 {
        background: #f5f5f5;
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

<div class="content-wrap bg-w ihr-reports-employeeClassification pt20">
    <div class="search-area">
        <v-form v-ref:classificationform :model="classification" :schema="classificationSchema" label-width="124" label-suffix="" :cols="3" form-style="indicator-form">
            <select-field property='year' editor-width="200"></select-field>
            <select-field property='month' editor-width="200"></select-field>
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
        <div id="classRightPanel" class="right-panel pl16 pr16">
            <div class="right-panel-tit pb16 tc">
                <span>Employee Classification</span>
            </div>
            <ui-button class="dis-tc-t btn-default-bd download" icon="fa-download" type="flat" text="Download" @click="download"></ui-button>
            <div class="vuetable-wrapper">
                <vuetable api-url="/report/EmpClassification" v-ref:annualtable :selected-to="selectedRow" :append-params="queryParams" :fields="columns" pagination-path="" table-wrapper=".vuetable-wrapper" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                </vuetable>
            </div>
        </div>
    </div>
</div>
<organization-selector :show.sync="org"></organization-selector>

</template>

<script>

import {
    default as Schema
}
from '../../schema/index';
import {
    default as Message
}
from '../../components/basic/message';
import {
    getDictMapping, downloadFile
}
from '../../util/assist.js';
let classificationSchema = new Schema({
    orgUnitName: {
        label: 'Organization',
        required: true,
        whitespace: false
    },
    unitId: {},
    year: {
        label: 'Year',
        required: true,
        whitespace: false,
        mapping: function() {
            return getDictMapping('CLASSIFICATION_YEAR');
        }
    },
    month: {
        label: 'Month',
        required: true,
        whitespace: false,
        mapping: function() {
            return getDictMapping('SCHEME_CYCLE_MONTHLY');
        }
    }

});
export default {
    data() {
            return {
                paginationComponent: 'vuetable-pagination',
                org: {
                    modal: false
                },
                unitId: '',
                tablelists: [],
                tableTotal: '',
                classificationSchema: classificationSchema,
                classification: classificationSchema.newModel(),
                columns: [{
                    name: 'unitShortName',
                    title: '',
                    sortField: 'unitShortName',
                    titleClass: 'dn'
                }, {
                    name: 'unitSize',
                    title: '',
                    sortField: 'unitSize',
                    dataClass: 'tr',
                    titleClass: 'dn'
                }, {
                    name: 'tlS',
                    title: 'Start of Month',
                    dataClass: 'tr',
                    sortField: 'tlS'
                }, {
                    name: 'tlE',
                    title: 'End of Month',
                    dataClass: 'tr',
                    sortField: 'tlE'
                }, {
                    name: 'tlAvg',
                    title: 'Average',
                    dataClass: 'tr',
                    sortField: 'tlAvg'
                }, {
                    name: 'icS',
                    title: 'Start of Month',
                    dataClass: 'tr',
                    sortField: 'icS'
                }, {
                    name: 'icE',
                    title: 'End of Month',
                    dataClass: 'tr',
                    sortField: 'icE'
                }, {
                    name: 'icAvg',
                    title: 'Average',
                    dataClass: 'tr',
                    sortField: 'icAvg'
                }, {
                    name: 'wnflS',
                    title: 'Start of Month',
                    dataClass: 'tr',
                    sortField: 'wnflS'
                }, {
                    name: 'wnflE',
                    title: 'End of Month',
                    dataClass: 'tr',
                    sortField: 'wnflE'
                }, {
                    name: 'wnflAvg',
                    title: 'Average',
                    dataClass: 'tr',
                    sortField: 'wnflAvg'
                }, {
                    name: 'wflS',
                    title: 'Start of Month',
                    dataClass: 'tr',
                    sortField: 'wflS'
                }, {
                    name: 'wflE',
                    title: 'End of Month',
                    dataClass: 'tr',
                    sortField: 'wflE'
                }, {
                    name: 'wflAvg',
                    title: 'Average',
                    dataClass: 'tr',
                    sortField: 'wflAvg'
                }, {
                    name: 'tl1',
                    title: 'G0',
                    dataClass: 'tr',
                    sortField: 'tl1'
                }, {
                    name: 'tl2',
                    title: 'G1',
                    dataClass: 'tr',
                    sortField: 'tl2'
                }, {
                    name: 'tl3',
                    title: 'G2',
                    dataClass: 'tr',
                    sortField: 'tl3'
                }, {
                    name: 'tl4',
                    title: 'G3',
                    dataClass: 'tr',
                    sortField: 'tl4'
                }, {
                    name: 'tl5',
                    title: 'G4',
                    dataClass: 'tr',
                    sortField: 'tl5'
                }, {
                    name: 'tl6',
                    title: 'G5',
                    dataClass: 'tr',
                    sortField: 'tl6'
                }, {
                    name: 'ic1',
                    title: 'G0',
                    dataClass: 'tr',
                    sortField: 'ic1'
                }, {
                    name: 'ic2',
                    title: 'G1',
                    dataClass: 'tr',
                    sortField: 'ic2'
                }, {
                    name: 'ic3',
                    title: 'G2',
                    dataClass: 'tr',
                    sortField: 'ic3'
                }, {
                    name: 'ic4',
                    title: 'G3',
                    dataClass: 'tr',
                    sortField: 'ic4'
                }, {
                    name: 'ic5',
                    title: 'G4',
                    dataClass: 'tr',
                    sortField: 'ic5'
                }, {
                    name: 'ic6',
                    title: 'G5',
                    dataClass: 'tr',
                    sortField: 'ic6'
                }, {
                    name: 'wnfl1',
                    title: 'G0',
                    dataClass: 'tr',
                    sortField: 'wnfl1'
                }, {
                    name: 'wnfl2',
                    title: 'G1',
                    dataClass: 'tr',
                    sortField: 'wnfl2'
                }, {
                    name: 'wnfl3',
                    title: 'G2',
                    dataClass: 'tr',
                    sortField: 'wnfl3'
                }, {
                    name: 'wnfl4',
                    title: 'G3',
                    dataClass: 'tr',
                    sortField: 'wnfl4'
                }, {
                    name: 'wnfl5',
                    title: 'G4',
                    dataClass: 'tr',
                    sortField: 'wnfl5'
                }, {
                    name: 'wnfl6',
                    title: 'G5',
                    dataClass: 'tr',
                    sortField: 'wnfl6'
                }, {
                    name: 'wfl1',
                    title: 'G0',
                    dataClass: 'tr',
                    sortField: 'wfl1'
                }, {
                    name: 'wfl2',
                    title: 'G1',
                    dataClass: 'tr',
                    sortField: 'wfl2'
                }, {
                    name: 'wfl3',
                    title: 'G2',
                    dataClass: 'tr',
                    sortField: 'wfl3'
                }, {
                    name: 'wfl4',
                    title: 'G3',
                    dataClass: 'tr',
                    sortField: 'wfl4'
                }, {
                    name: 'wfl5',
                    title: 'G4',
                    dataClass: 'tr',
                    sortField: 'wfl5'
                }, {
                    name: 'wfl6',
                    title: 'G5',
                    dataClass: 'tr',
                    sortField: 'wfl6'
                }]
            };
        },
        ready() {
            let oThead = document.getElementsByTagName('thead')[0];
            // let html = oThead.innerHTML;
            let oTr = '<thead><tr><th rowspan="2">Organization</th><th rowspan="2">In Total</th><th colspan="3">Team Leader</th><th colspan="3">Individual Contributor</th><th colspan="3">Worker(Non-Front Line)</th><th colspan="3">Worker(Front Line)</th><th colspan="6">Team Leader</th><th colspan="6">Individual Contributor</th><th colspan="6">Worker(Non-Front Line)</th><th colspan="6">Worker(Front Line)</th></tr><tr><th id="_unitShortName"class="dn sortable"></th><th id="_unitSize"class="dn sortable"></th><th id="_tlS"class=" sortable">Start of Month</th><th id="_tlE"class=" sortable">End of Month</th><th id="_tlAvg"class=" sortable">Average</th><th id="_icS"class=" sortable">Start of Month</th><th id="_icE"class=" sortable">End of Month</th><th id="_icAvg"class=" sortable">Average</th><th id="_wnflS"class=" sortable">Start of Month</th><th id="_wnflE"class=" sortable">End of Month</th><th id="_wnflAvg"class=" sortable">Average</th><th id="_wflS"class=" sortable">Start of Month</th><th id="_wflE"class=" sortable">End of Month</th><th id="_wflAvg"class=" sortable">Average</th><th id="_tl1"class=" sortable">G0</th><th id="_tl2"class=" sortable">G1</th><th id="_tl3"class=" sortable">G2</th><th id="_tl4"class=" sortable">G3</th><th id="_tl5"class=" sortable">G4</th><th id="_tl6"class=" sortable">G5</th><th id="_ic1"class=" sortable">G0</th><th id="_ic2"class=" sortable">G1</th><th id="_ic3"class=" sortable">G2</th><th id="_ic4"class=" sortable">G3</th><th id="_ic5"class=" sortable">G4</th><th id="_ic6"class=" sortable">G5</th><th id="_wnfl1"class=" sortable">G0</th><th id="_wnfl2"class=" sortable">G1</th><th id="_wnfl3"class=" sortable">G2</th><th id="_wnfl4"class=" sortable">G3</th><th id="_wnfl5"class=" sortable">G4</th><th id="_wnfl6"class=" sortable">G5</th><th id="_wfl1"class=" sortable">G0</th><th id="_wfl2"class=" sortable">G1</th><th id="_wfl3"class=" sortable">G2</th><th id="_wfl4"class=" sortable">G3</th><th id="_wfl5"class=" sortable">G4</th><th id="_wfl6"class=" sortable">G5</th></tr></thead>'
            setTBodyInnerHTML(oThead, oTr);

            function setTBodyInnerHTML(thead, html) {
                var div = document.createElement('div')
                div.innerHTML = '<table>' + html + '</table>'
                thead.parentNode.replaceChild(div.firstChild.firstChild, thead)
            }
        },
        methods: {
            search() {
                    let passed = this.classification.$schema.isFormValidate(this.$refs.classificationform);
                    if (!passed) return;
                    this.$broadcast('vuetable:refresh');
                },
                reset() {
                    this.classification.reset();
                },
                download() {
                    if (this.$refs.annualtable.tableData.length < 1) {
                        return;
                    }
                    let d = new Date();
                    let unitId = this.classification.unitId || '0',
                        y = d.getFullYear(),
                        m = (d.getMonth() + 1),
                        year = this.classification.year || y,
                        month = this.classification.month || m;
                    if (this.tableTotal < 5000) {
                        downloadFile('/report/exportEmpClassification', {
                            unitId: unitId,
                            year: year,
                            month: month
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
        computed: {
            queryParams() {
                let d = new Date();
                let y = d.getFullYear();
                let m = (d.getMonth() + 1);
                let unitId = this.classification.unitId || "1";
                let year = this.classification.year || y;
                let month = this.classification.month || m;

                return [
                    `unitId=${unitId}`,
                    `year=${year}`,
                    `month=${month}`
                ]
            },
        },
        events: {
            'organization-selector:selected': function(data) {
                if (data) {
                    this.classification.orgUnitName = data.orgShortName;
                    this.classification.unitId = data.orgId;
                    return false
                }
            },
            'vuetable:load-success': function(response) {
                this.tableTotal = response.data.total;
            }
        },
};

</script>
