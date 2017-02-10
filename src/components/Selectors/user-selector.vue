<style lang="less">

.title-select {
    *{
      box-sizing:border-box;
    }
    .ui-modal-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    .leftRight-panel {
        height: 386px;
    }
    .left-panel {
        height: 385px;
    }
    .vuetable-pagination {
        margin-top: 32px;
        padding-right: 20px;
    }
    .vuetable-wrapper {
        width: auto;
        height: 367px;
        overflow: auto;
    }
    .query-btn-search,.query-btn-reset {
        height: 30px;
        float: left;
        margin: 2px 10px 0 0;
    }
    .vuetable-pagination{
      margin-top: 20px;
    }
}

</style>

<template lang="html">

<ui-modal class="title-select" :show.sync="show.modal" type="large" header="Select User" body="" :backdrop-dismissible="false">
    <div class="bg-w ihr-staff-user">
        <div class="">
            <div class="search fix">
                <v-form class="l" :model="user" :schema="userSchema" label-width="70" label-suffix="" :cols="3" form-style="user-form">
                    <text-field property='loginId' editor-width="150"></text-field>
                </v-form>
                <div class="query-btn l fix">
                    <ui-button class="query-btn-search mr20" color="primary" @click="searchTable">Search</ui-button>
                    <ui-button class="query-btn-reset btn-default-bd" type="flat" @click="resetTable">Reset</ui-button>
                </div>
            </div>
            <div class="vuetable-wrapper">
                <vuetable :api-url="selectedTableUrl" :selected-to="selectedRow" :append-params="queryParams" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="usersColumns" per-page="5">
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

<script type="text/ecmascript-6">

import {
    default as Message
}
from '../../components/basic/message';

import {
    default as Schema
}
from '../../schema/index';

let userSchema = new Schema({
    loginId: {
        label: 'Login ID'
    }
});

export default {
    props: {
        show: {}
    },
    data() {
        let _self = this;
        return {
            selectedTableUrl: '/system/user/findUserList',
            userSchema: userSchema,
            user: userSchema.newModel(),
            selData: {},
            tableData: [],
            selectedRow: [],
            usersColumns: [{
                name: '__radio:',
                title: ''
            }, {
                name: 'userName',
                title: 'User Name',
                sortField: 'userName'
            }, {
                name: 'loginId',
                title: 'LoginId ID',
                sortField: 'loginId'
            }, {
                name: 'email',
                title: 'Email',
                sortField: 'email'
            }, {
                name: 'phone',
                title: 'Phone',
                dataClass: 'tr',
                sortField: 'phone'
            }, {
                name: 'isEnabled',
                title: 'Account Status',
                sortField: 'isEnabled'
            }]
        }
    },
    computed: {
        queryParams() {
            let loginId = this.user.loginId ? this.user.loginId : "";
            return [
                `loginId=${loginId}`
            ]
        }
    },
    ready() {

    },
    methods: {
        searchTable() {
                this.$broadcast('vuetable:refresh');
            },
            resetTable() {
                this.user.loginId = '';
                this.$nextTick(() => {
                    this.$broadcast('vuetable:refresh');
                })
            },
            yes() {
                let _self = this;
                let rows = _self.selectedRow;
                if (rows.length === 1) {
                    _self.show.modal = false;
                    _self.tableData.forEach((item, i) => {
                        if (i === rows[0]) {
                            _self.selData = item;
                            _self.$dispatch('selected-user', _self.selData)
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
    events: {
        'vuetable:load-success': function(response) {
            this.tableData = response.data.data;
        }
    }
}

</script>
