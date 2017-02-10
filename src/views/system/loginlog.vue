<style lang="less">

.ihr-system-log {}

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-system-log">
    <div class="vuetable-wrapper p16">
        <vuetable :api-url="logUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="logColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
        </vuetable>
    </div>
</div>

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
    convert, formatDate
}
from '../../util/assist.js';
export default {
    data() {
            let _self = this;

            return {
                selectedRow: [],
                logUrl: '/system/log/findSysLogLogin',
                logColumns: [{
                    name: '__checkbox:logId',
                    title: ''
                }, {
                    name: 'businessType',
                    title: 'Business Type',
                    sortField: 'businessType'
                }, {
                    name: 'moduleName',
                    title: 'Module Name',
                    sortField: 'moduleName',
                }, {
                    name: 'event',
                    title: 'Event',
                    sortField: 'event'
                }, {
                    name: 'serverIp',
                    title: 'Server IP',
                    sortField: 'serverIp'
                }, {
                    name: 'clientIp',
                    title: 'Client IP',
                    sortField: 'clientIp'
                }, {
                    name: 'operate',
                    title: 'Operate',
                    sortField: 'operate'
                }, {
                    name: 'logTime',
                    title: 'Log Time',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    sortField: 'logTime',
                    callback: function(value) {
                        return _self.handleFormatDate(value);
                    }
                }, {
                    name: 'userId',
                    title: 'User ID',
                    sortField: 'userId'
                }, {
                    name: 'userName',
                    title: 'User Name',
                    sortField: 'userName'
                }]
            }
        },
        computed: {},
        mounted() {},
        methods: {
            handleFormatDate(value) {
                return formatDate(new Date(value));
            }
        },
        components: {}
}

</script>
