<style lang="less">

.job-selector {
    .ml0 {
        margin-left: 0;
    }
}

</style>

<template lang="html">

<ui-modal class="job-selector" :show.sync="show.modal" type="large" header="Trigger Selector" body="" :backdrop-dismissible="false">
    <div class="leftRight-panel bg-f5f5f5 mt20 fix">
        <div class="right-panel pb20 ml0">
            <div class="vuetable-wrapper">
                <vuetable :api-url="schedulerUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="schedulerColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                </vuetable>
            </div>
        </div>
    </div>
    <div slot="footer">
        <ui-button @click="yes" color="primary">Confirm</ui-button>
        <ui-button @click="show.modal = false">Cancel</ui-button>
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
        show: {}
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
                title: 'scheduler name',
                sortField: 'name'
            }, {
                name: 'type',
                title: 'type',
                sortField: 'type'
            }, {
                name: 'startTime',
                title: 'startTime',
                dataClass: 'tr',
                titleClass: 'mw80',
                sortField: 'startTime',
                callback: function(value) {
                    return _self.handleFormatDate(value);
                }
            }, {
                name: 'description',
                title: 'description',
                sortField: 'description'
            }]
        }
    },
    computed: {},
    mounted() {},
    methods: {
        handleFormatDate(value) {
                return formatDate(new Date(value));
            },
            yes() {
                let _self = this;
                let rows = _self.selectedRow;
                if (rows.length === 1) {
                    _self.show.modal = false;
                    _self.tableData.forEach((item, i) => {
                        if (i === rows[0]) {
                            _self.selData = item;
                            _self.$dispatch('triggerselector', _self.selData)
                        }
                    })
                } else {
                    Message({
                        type: 'error',
                        message: 'Please select a valid node.'
                    })
                }
            }
    },
    components: {},
    events: {
        'vuetable:load-success': function(response) {
            this.tableData = response.data.data;
        }
    }
}

</script>
