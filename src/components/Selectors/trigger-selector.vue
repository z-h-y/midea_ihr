<style lang="less">

.job-selector {
    .ml0 {
        margin-left: 0;
    }
}

</style>

<template lang="html">

<ui-modal ref="modal" class="job-selector" :show.sync="show.modal" type="large" :title="$t('selectors.triggerSelector')" body="" :backdrop-dismissible="false">
    <div class="leftRight-panel bg-f5f5f5 mt20 fix">
        <div class="right-panel pb20 ml0">
            <div class="vuetable-wrapper">
                <vuetable ref="vuetable" :api-url="schedulerUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="schedulerColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                </vuetable>
            </div>
        </div>
    </div>
    <div slot="footer">
        <ui-button @click="yes" color="primary">{{$t('button.confirm')}}</ui-button>
        <ui-button @click="close">{{$t('button.cancel')}}</ui-button>
    </div>
</ui-modal>

</template>

<script>

import {
    default as Message
}
from '../../components/basic/message';
import {
    convert, formatDate
}
from '../../util/assist.js';
export default {
    props: {
        show: {},
        handleComfirmed: {
            type: Function,
            default () {
                return function() {};
            }
        }
    },
    data() {
        let _self = this;
        return {
            schedulerUrl: "/scheduler/trigger/query",
            selectedRow: [],
            schedulerColumns: [{
                name: '__radio:',
                title: ''
            }, {
                name: 'name',
                title: this.$t('selectors.schedulerName'),
                sortField: 'name'
            }, {
                name: 'type',
                title: this.$t('system.jobTrigger.type'),
                sortField: 'type'
            }, {
                name: 'startTime',
                title: this.$t('system.jobTrigger.startTime'),
                dataClass: 'tr',
                titleClass: 'mw80',
                sortField: 'startTime',
                callback: function(value) {
                    return _self.handleFormatDate(value);
                }
            }, {
                name: 'description',
                title: this.$t('system.jobTrigger.description'),
                sortField: 'description'
            }]
        }
    },
    computed: {
      tableData() {
        return this.$refs.vuetable.tableData
      }
    },
    mounted() {},
    methods: {
      open() {
        this.$refs['modal'].open();
      },
      close() {
        this.$refs['modal'].close()
      },
        handleFormatDate(value) {
                return formatDate(new Date(value));
            },
            yes() {
                let _self = this;
                let rows = _self.selectedRow;
                if (rows.length === 1) {
                    _self.close();
                    _self.tableData.forEach((item, i) => {
                        if (i === rows[0]) {
                            _self.selData = item;
                            _self.handleComfirmed(_self.selData)
                        }
                    })
                } else {
                    Message({
                        type: 'error',
                        message: this.$t("performance.message.reportManage")
                    })
                }
            }
    },
    components: {}
}

</script>
