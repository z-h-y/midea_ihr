<style lang="less">

.ihr-orgPerformance {
    .ui-tabs-body {
        padding: 16px 0px;
    }
    .operate {
        // color: #2196f3
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-orgPerformance">
    <panel :title="panelTitle" class=" panel-b" header="panel-header" id="org-perfor">
        <ui-tabs type="text" background-color="clear" text-color="gray" text-color-active="primary" :active-tab="openId">
            <ui-tab header="My Scheme" :num="mySchemeNum" id="myscheme">
                <div class="vuetable-wrapper">
                    <vuetable api-url="/performance/schemeEmployees/myScheme" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="myScheme" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                    </vuetable>
                </div>
            </ui-tab>
            <ui-tab header="My Performance History" :num="historyNum" id="myhistory">
                <div class="vuetable-wrapper">
                    <vuetable api-url="/performance/schemeEmployees/myPerformaceHistory" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="myHistory" :sort-order="sortOrder" per-page="10">
                    </vuetable>
                </div>
            </ui-tab>
            <ui-tab header="Under Evaluation" :num="underNum" id="under">
                <div class="vuetable-wrapper">
                    <vuetable api-url="/performance/schemeEmployees/underEvaluation" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="evaluation" :sort-order="sortOrder" per-page="10">
                    </vuetable>
                </div>
            </ui-tab>
            <ui-tab header="Evaluation History" id="evaluation">
                <div class="vuetable-wrapper">
                    <vuetable api-url="/performance/schemeEmployees/mySubordinateScheme" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="mySubordinate" :sort-order="sortOrder" per-page="10">
                    </vuetable>
                </div>
            </ui-tab>
        </ui-tabs>
    </panel>
</div>

</template>

<script>

import {
    convert,
    getDictMapping,
    formatDate
}
from '../../util/assist.js';
export default {
    name: 'stack-overflow',
    data() {
        let _self = this;
        return {
            openId: "myscheme",
            mySchemeNum: '0',
            underNum: '0',
            historyNum:'0',
            dist: {
                SCHEME_CATEGORY: {},
                SCHEME_CYCLE: {}
            },
            myScheme: [{
                name: 'schemeName',
                title: 'Scheme Name'
            }, {
                name: 'schemeCategory',
                title: 'Scheme Category',
                callback: function(value, data) {
                    return _self.fixScheme(value, data);
                }
            }, {
                name: 'restrictYear',
                title: 'Year',
                dataClass:'tr'
            }, {
                name: 'frequency',
                title: 'Frequency',
                callback: function(value, data) {
                    return _self.fixCYCLE(value, data);
                }
            }, {
                name: 'startDate',
                title: 'Start Date',
                dataClass:'tr',
                callback: function(value) {
                    return _self.handleFormatDate(value);
                }

            }, {
                name: 'endDate',
                title: 'End Date',
                dataClass:'tr',
                callback: function(value) {
                    return _self.handleFormatDate(value);
                }
            }, {
                name: 'processStatus',
                title: 'Status'
            }, {
                name: 'processStatusValue',
                title: 'Operate',
                callback: function(value, data) {
                    return _self.getUrl(value, data);
                }
            }],
            myHistory: [{
                name: 'schemeName',
                title: 'Scheme Name'
            }, {
                name: 'schemeCategory',
                title: 'Scheme Category',
                callback: function(value, data) {
                    return _self.fixScheme(value, data);
                }
            }, {
                name: 'restrictYear',
                dataClass: 'tr',
                title: 'Year'
            }, {
                name: 'frequency',
                title: 'Frequency',
                callback: function(value, data) {
                    return _self.fixCYCLE(value, data);
                }
            }, {
                name: 'processStatus',
                title: 'Status'
            }, {
                name: 'processStatusValue',
                title: 'Operate',
                callback: function(value, data) {
                    return _self.viewUrl(value, data);
                }

            }],
            evaluation: [{
                name: 'employeeName',
                title: 'Employee Name'
            }, {
                name: 'schemeName',
                title: 'Scheme Name'
            }, {
                name: 'schemeCategory',
                title: 'Scheme Category',
                callback: function(value, data) {
                    return _self.fixScheme(value, data);
                }
            }, {
                name: 'restrictYear',
                dataClass: 'tr',
                title: 'Year'
            }, {
                name: 'frequency',
                title: 'Frequency',
                callback: function(value, data) {
                    return _self.fixCYCLE(value, data);
                }
            }, {
                name: 'schemePeriod',
                title: 'Restrict To',
                callback: function(value, data) {
                    return _self.showTo(value, data);
                }
            }, {
                name: 'processStatus',
                title: 'Status'
            }, {
                name: 'processStatusValue',
                title: 'Operate',
                callback: function(value, data) {
                    return _self.getApproveUrl(value, data);
                }
            }],
            mySubordinate: [{
                name: 'employeeName',
                title: 'Employee Name'
            }, {
                name: 'schemeName',
                title: 'Scheme Name'
            }, {
                name: 'schemeCategory',
                title: 'Scheme Category',
                callback: function(value, data) {
                    return _self.fixScheme(value, data);
                }
            }, {
                name: 'restrictYear',
                dataClass: 'tr',
                title: 'Year'
            }, {
                name: 'frequency',
                title: 'Frequency',
                callback: function(value, data) {
                    return _self.fixCYCLE(value, data);
                }
            }, {
                name: 'processStatus',
                title: 'Status'
            }, {
                name: 'adjustScore',
                dataClass: 'tr',
                title: 'Score'
            }, {
                name: 'processStatusValue',
                title: 'Operate',
                callback: function(value, data) {
                    return _self.viewUrl(value, data);
                }
            }]
        };
    },
    computed: {
        panelTitle() {
            return 'My Performance';
        }
    },
    created() {
        var self = this;
        getDictMapping('SCHEME_CATEGORY').then(function(res) {
            self.dist.SCHEME_CATEGORY = res;
        });

        getDictMapping('SCHEME_CYCLE').then(function(res) {
            self.dist.SCHEME_CYCLE = res;
        });

        this.$http.get(`/performance/schemeEmployees/myScheme/Count`).then(response => {
            if (response.data) this.mySchemeNum = response.data;
        });
        this.$http.get(`/performance/schemeEmployees/underEvaluation/Count`).then(response => {
            if (response.data) this.underNum = response.data;
        });
        this.$http.get(`/performance/schemeEmployees/myPerformaceHistoryNoRead/Count`).then(response => {
            if (response.data) this.historyNum = response.data;
        });
    },
    methods: {
        chenge() {
                // alert(1111);
            },
            showTo(value, data) {
                if (data.pfmType === '1') {
                    return data.restrictYear;
                }
                if (data.pfmType === '0') {
                    return data.schemePeriod;
                }
            },
            fixDist(value, option) {
                var dist = {};
                switch (option) {
                    case 'SCHEME_CATEGORY':
                        dist = this.dist.SCHEME_CATEGORY || {};
                        break;
                    case 'SCHEME_CYCLE':
                        dist = this.dist.SCHEME_CYCLE || {};
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
            fixScheme(value, data) {
                if (data.pfmType === '0') {
                    return "Individual";
                }
                return this.fixDist(value, 'SCHEME_CATEGORY');
            },
            fixCYCLE(value, data) {
                if ((data.schemeCategory === '0' || data.schemeCategory === '1') && !value) {
                    return "Annual";
                }
                return this.fixDist(value, 'SCHEME_CYCLE');
            },
            handleFormatDate(value) {
                return formatDate(new Date(value));
            },
            getUrl: function(value, data) {
                if (data) {
                    let procInstId = -1;
                    if (data.procInstId) {
                        procInstId = data.procInstId;
                    }
                    if (value === '1') {
                        return `<a class="operate" href="/#!/ihr/myPerformance/furnish/${this.openId}/${data.schemeId}/${data.processTemplateId}/${data.indicatorsSetting}/${data.schemeEmployeeId}/${procInstId}/${data.employeeId}">Edit</a>`;
                    }
                    if (value === '3') {
                        return `<a class="operate" href="/#!/ihr/myPerformance/self_evaluate/${this.openId}/${data.schemeId}/${data.procInstId}/${data.schemeEmployeeId}">Self Evaluate</a>`;
                    }
                    if (value === '5') {
                        return `<a class="operate" href="/#!/ihr/myPerformance/view/${this.openId}/${data.schemeId}/${data.processTemplateId}/${data.procInstId}/${data.schemeEmployeeId}/0/0/0">View</a>`;
                    }
                    if (value === '2' || value === '4') {
                        return `<a class="operate" href="/#!/ihr/myPerformance/process/view/${this.openId}/${data.schemeId}/${data.processTemplateId}/${procInstId}/${data.schemeEmployeeId}">View</a>`;
                    }
                }
            },
            getApproveUrl: function(value, data) {
                if (data) {
                    let procInstId = -1;
                    if (data.procInstId) {
                        procInstId = data.procInstId;
                    }
                    if (value === '2') {
                        return `<a class="operate" href="/#!/ihr/myPerformance/approve/${this.openId}/${data.schemeId}/${data.procInstId}/${data.schemeEmployeeId}/${data.employeeId}">Approve</a>`;
                    }
                    if (value === '4') {
                        return `<a class="operate" href="/#!/ihr/myPerformance/evaluate/${this.openId}/${data.schemeId}/${data.procInstId}/${data.schemeEmployeeId}/${data.employeeId}">Evaluate</a>`;
                    }
                    if (value === '5') {
                        return `<a class="operate" href="/#!/ihr/myPerformance/view/${this.openId}/${data.schemeId}/${data.processTemplateId}/${procInstId}/${data.schemeEmployeeId}/0/0/0">View</a>`;
                    }
                    if (value === '1' || value === '3') {
                        return `<a class="operate" href="/#!/ihr/myPerformance/view/${this.openId}/${data.schemeId}/${data.processTemplateId}/${procInstId}/${data.schemeEmployeeId}/0/0/0">View</a>`;
                    }
                }
            },
            viewUrl: function(value, data) {
                if (data) {
                    let procInstId = -1;
                    if (data.procInstId) {
                        procInstId = data.procInstId;
                    }
                    if (value === '1' || value === '3') {
                        return `<a class="operate" href="/#!/ihr/myPerformance/view/${this.openId}/${data.schemeId}/${data.processTemplateId}/${procInstId}/${data.schemeEmployeeId}/${data.employeeId}/0/0">View</a>`;
                    }
                    return `<a class="operate" href="/#!/ihr/myPerformance/view/${this.openId}/${data.schemeId}/${data.processTemplateId}/${procInstId}/${data.schemeEmployeeId}/0/0/0">View</a>`;
                }
            }
    },
    events: {
        'active-tab-changed': function(id) {
            this.openId = id;
        }
    },
    components: {
      Panel: require('../../components/basic/panel.vue')
    },
    route: {
        data(transition) {
            let _self = this;
            let openId = transition.to.params.openId;
            if (openId) {
                _self.openId = openId;
            }
        }
    }
};

</script>
