<style lang="less">

.ihr-system-email {
    *{
      box-sizing: border-box;
    }
    .vuetable th {
        white-space: nowrap;
    }
    .group{
      border: none;
    }
}

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-system-email">
    <div class="group">
        <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" :text="$t('button.add')" @click="add" button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-pencil-square-o" type="flat" :text="$t('button.edit')" @click="edit" button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-remove" type="flat" :text="$t('button.delete')" @click="deleteBtn" button-type="button"></ui-button>
    </div>
    <div class="vuetable-wrapper pl16 pr16 pb16">
        <vuetable :api-url="emailUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="emailColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
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
                emailUrl: '/system/emailConfig/pageQueryEmailConfig',
                emailColumns: [{
                    name: '__checkbox:emaililConfigId',
                    title: ''
                }, {
                    name: 'companyCode',
                    title: this.$t('system.mail.companyCode'),
                    sortField: 'companyCode'
                }, {
                    name: 'companyName',
                    title: this.$t('system.mail.companyName'),
                    sortField: 'companyName',
                }, {
                    name: 'ip',
                    title: this.$t('system.mail.ip'),
                    sortField: 'ip'
                }, {
                    name: 'port',
                    title: this.$t('system.mail.port'),
                    dataClass: 'tr',
                    sortField: 'port'
                }, {
                    name: 'emailAccount',
                    title: this.$t('system.mail.emailAccount'),
                    dataClass: 'tr',
                    sortField: 'emailAccount'
                }, {
                    name: 'onceSendNum',
                    title: this.$t('system.mail.onceSendNum'),
                    dataClass: 'tr',
                    sortField: 'onceSendNum'
                }, {
                    name: 'maxReceiverNum',
                    title: this.$t('system.mail.maxReceiverNum'),
                    dataClass: 'tr',
                    sortField: 'maxReceiverNum'
                }, {
                    name: 'status',
                    title: this.$t('system.mail.status'),
                    sortField: 'status'
                }, {
                    name: 'encryptType',
                    title: this.$t('system.mail.encryptType'),
                    sortField: 'encryptType'
                }, {
                    name: 'createDate',
                    title: this.$t('system.mail.createDate'),
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    sortField: 'createDate',
                    callback: function(value) {
                        return _self.handleFormatDate(value);
                    }
                }, {
                    name: 'lastUpdateDate',
                    title: this.$t('system.mail.lastUpdateDate'),
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    sortField: 'lastUpdateDate'
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
                        name: 'addMail'
                    });
                },
                deleteBtn() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    _self.$http.post('/system/emailConfig/deleteEmailConfig', {
                        emailIds: rows
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        Message({
                            type: 'success',
                            message: 'Delete Success!'
                        });
                        _self.$broadcast('vuetable:refresh'); //刷新表格
                    });
                },
                edit() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    if (rows.length === 1) {
                        _self.$router.go({
                            name: 'editMail',
                            params: {
                                mailId: `${rows[0]}`
                            }
                        });
                    } else {
                        Message({
                            type: 'error',
                            message: 'Please select a valid node.'
                        })
                    }
                }
        },
        components: {}
}

</script>
