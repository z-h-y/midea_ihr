<style lang="less">

.ihr-system-admin-notification {
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
    .group{
      margin-top: 0px;
      padding-top: 0px;
      margin-left: 0px;
      border-top: none;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-system-admin-notification">
    <div class="group">
        <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" text="Add" @click="add" button-type="button"></ui-button>
        <!-- <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-pencil-square-o" type="flat" text="Edit" @click="edit"></ui-button> -->
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-remove" type="flat" text="Delete" @click="delete" button-type="button"></ui-button>
    </div>
    <div class="vuetable-wrapper bg-w p16 bd-e8e8e8">
        <vuetable :api-url="sysMessageUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="sysMessageColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
        </vuetable>
    </div>
</div>

</template>

<script>

import {
    default as Message
}
from '../../../components/basic/message';
import {
    convert, formatDate
}
from '../../../util/assist.js';
export default {
    data() {
            let _self = this;
            return {
                sysMessageUrl: "/system/message/pageQuerySysMessage",
                selectedRow: [],
                sysMessageColumns: [{
                    name: '__checkbox:messageId',
                    title: ''
                }, {
                    name: 'messageTitle',
                    title: 'Subject',
                    sortField: 'messageTitle',
                    callback: 'goDetail'
                }, {
                    name: 'createDate',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    title: 'Creation Time',
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
                        name: 'addNotification'
                    });
                },
                delete() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    _self.$http.post('/system/message/deleteMessage', {
                        ids: rows,
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        this.$broadcast('vuetable:refresh'); //刷新表格
                    });
                },
                edit() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    if (rows.length === 1) {
                        _self.$router.go({
                            name: 'editJob',
                            params: {
                                id: `${rows[0]}`
                            }
                        });
                    } else {
                        Message({
                            type: 'error',
                            message: 'Please select a valid node.'
                        })
                    }
                },
                goDetail(value, data) {
                    return `<a href="/#!/ihr/notification/view/manage/${data.messageId}">${value}</a>`;
                }
        },
        components: {}
}

</script>
