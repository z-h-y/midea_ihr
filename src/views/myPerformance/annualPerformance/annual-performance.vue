<style lang="less">

.ihr-myPerformance-performance {
    .ui-tabs-body {
        padding: 20px 0px;
    }
    .opera-btn {
        background: transparent;
        border: none;
        text-decoration: underline;
        color: #3aa2eb;
        font-size: 14px;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-myPerformance-performance">
    <panel :title="$t('myperformance.tabText.annualPerformance')" class="panel-b performance" header="panel-header" id="org-perfor">
        <ui-tabs type="text" background-color="clear" text-color="gray" text-color-active="primary">
            <ui-tab :header="$t('myperformance.tabText.myAnnualPerformance')">
                <div class="vuetable-wrapper">
                    <vuetable api-url="/performance/MyAnnualPerformances" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="annualPerformance" :sort-order="sortOrder" per-page="10">
                    </vuetable>
                </div>
            </ui-tab>
            <ui-tab :header="$t('myperformance.tabText.confirmAnnualPerformance')" :num="num">
                <div class="vuetable-wrapper">
                    <vuetable api-url="/performance/ConfirmAnnualPerformances" :load-success-callback="confirmAnnualPerformances" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="confirmAnnualPerformance" :sort-order="sortOrder" per-page="10">
                    </vuetable>
                </div>
            </ui-tab>
        </ui-tabs>
    </panel>
</div>

</template>

<script>

import {
    formatDate
}
from '../../../util/assist';
export default {
    data() {
            let _self = this;
            return {
                annualPerformance: [{
                    name: 'schemeName',
                    title: this.$t('myperformance.annualperformance.schemeName')
                }, {
                    name: 'restrictYear',
                    dataClass: 'tr',
                    title: this.$t('myperformance.annualperformance.restrictYear')
                }, {
                    name: 'finalScore',
                    dataClass: 'tr',
                    title: this.$t('myperformance.annualperformance.restrictYear')
                }, {
                    name: 'grade',
                    title: this.$t('myperformance.annualperformance.grade')
                }],
                confirmAnnualPerformance: [{
                    name: 'schemeName',
                    title: this.$t('myperformance.annualperformance.schemeName')
                }, {
                    name: 'restrictYear',
                    dataClass: 'tr',
                    title: this.$t('myperformance.annualperformance.restrictYear')
                }, {
                    name: 'validStatusName',
                    title: this.$t('myperformance.annualperformance.validStatusName')
                }, {
                    name: 'operate',
                    title: this.$t('myperformance.annualperformance.operate') ,
                    callback: function(value, data) {
                        return _self.operate(value, data);
                    }
                }],
                num: ''
            };
        },
        computed: {},
        methods: {
            operate(value, data) {
                if (data) {
                    if (data.confirmedHod == '0') {
                        return `<a href="${location.href}/annualPerformanceConfirm/${data.schemeYearId}/${data.schemeName}/0">${this.$t('button.confirm')}</a>`;
                    } else {
                        return `<a href="${location.href}/annualPerformanceConfirm/${data.schemeYearId}/${data.schemeName}/1">${this.$t('button.view')}</a>`;
                    }
                }
            }
        },
        created() {
            // 获取列表 Confirm 状态的条数
            this.$http.get(`/performance/getConfirmAnnualPerformancesCount`).then((response) => {
                this.num = response.data;
            });
        },
        components: {
            Panel: require('../../../components/basic/panel.vue')
        }
};

</script>
