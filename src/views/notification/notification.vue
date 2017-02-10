<style lang="less">

.ihr-system-notification {
    * {
        box-sizing: border-box;
    }
    .button-sty {
        background: rgba(0, 0, 0, 0);
        border: #fff;
        color: #2196f3;
        &:hover {
            text-decoration: underline;
        }
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-system-notification">
    <!-- <div class="group mb16">
        <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" text="Add" @click="add"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-pencil-square-o" type="flat" text="Edit" @click="edit"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-remove" type="flat" text="Delete" @click="delete"></ui-button>
    </div> -->
    <div class="vuetable-wrapper bg-w p16 bd-e8e8e8">
        <vuetable :api-url="receiverUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="receiverColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
        </vuetable>
    </div>
</div>

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
    data() {
            let _self = this;
            return {
                receiverUrl: "/system/message/pageQuerySysMessageByUser",
                selectedRow: [],
                receiverColumns: [{
                    name: 'messageTitle',
                    title: 'Subject',
                    sortField: 'messageTitle',
                    callback: 'goDetail'
                }, {
                    name: 'createDate',
                    title: 'Creation Time',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    sortField: 'createDate',
                    callback: function(value) {
                        return _self.handleFormatDate(value);
                    }
                }, {
                    name: 'sendUser',
                    title: 'Issuer',
                    sortField: 'sendUser'
                }]
            }
        },
        computed: {},
        mounted() {},
        methods: {
            handleFormatDate(value) {
                    return formatDate(new Date(value));
                },
                add() {
                    let _self = this;
                    _self.$router.go({
                        name: ''
                    });
                },
                delete() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    if (rows.length === 1) {
                        _self.$http.post('/system/message/deleteMessageReciever', {
                            ids: rows,
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            this.$broadcast('vuetable:refresh'); //刷新表格
                        });
                    } else {
                        Message({
                            type: 'error',
                            message: 'Please select a valid node.'
                        })
                    }
                },
                goDetail(value, data) {
                    return `<a href="/#!/ihr/notification/view/${data.messageId}">${value}</a>`;
                }

        },
        components: {}
}

</script>
