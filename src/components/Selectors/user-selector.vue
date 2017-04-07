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

<ui-modal ref="selector" class="title-select" :show.sync="show.modal" type="large" :title="$t('selectors.selectUser')" body="" :backdrop-dismissible="false">
    <div class="bg-w ihr-staff-user">
        <div class="">
            <div class="search fix">
                <v-form class="l" :model="user" :schema="userSchema" label-width="70" label-suffix="" :cols="3" form-style="user-form">
                    <text-field property='loginId' editor-width="150"></text-field>
                </v-form>
                <div class="query-btn l fix">
                    <ui-button class="query-btn-search mr20" color="primary" @click="searchTable">{{$t('button.search')}}</ui-button>
                    <ui-button class="query-btn-reset btn-default-bd" type="flat" @click="resetTable">{{$t('button.reset')}}</ui-button>
                </div>
            </div>
            <div class="vuetable-wrapper">
                <vuetable ref="vuetable" :api-url="selectedTableUrl" :selected-to="selectedRow" :append-params="queryParams" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="usersColumns" per-page="5">
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

<script type="text/ecmascript-6">

import {
    default as Message
}
from '../../components/basic/message';

import {
    default as Schema
}
from '../../schema/index';



export default {
    props: {
        show: {},
        handelSelect: {
            type: Function,
            default() {
              return function() {}
            }
        }
    },
    data() {
        let _self = this;
        let userSchema = new Schema({
            loginId: {
                label: _self.$t('system.user.loginId')
            }
        });
        return {
            selectedTableUrl: '/system/user/findUserList',
            userSchema: userSchema,
            user: userSchema.newModel(),
            selData: {},
            selectedRow: [],
            usersColumns: [{
                name: '__radio:',
                title: ''
            }, {
                name: 'userName',
                title: this.$t('system.user.userName'),
                sortField: 'userName'
            }, {
                name: 'loginId',
                title: this.$t('system.user.loginId'),
                sortField: 'loginId'
            }, {
                name: 'email',
                title: this.$t('system.user.email'),
                sortField: 'email'
            }, {
                name: 'phone',
                title: this.$t('system.user.phone'),
                dataClass: 'tr',
                sortField: 'phone'
            }, {
                name: 'isEnabled',
                title: this.$t('system.user.isEnabled'),
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
        },
        tableData() {
          return this.refs.vuetable.tableData
        }
    },
    methods: {
      open() {
        this.$refs['selector'].open();
      },
      close() {
        this.$refs['selector'].close()
      },
        searchTable() {
                this.$refs.vuetable.reloadData();
            },
            resetTable() {
                this.user.loginId = '';
                this.$nextTick(() => {
                    this.$refs.vuetable.reloadData();
                })
            },
            yes() {
                let _self = this;
                let rows = _self.selectedRow;
                if (rows.length === 1) {
                    _self.close();
                    _self.tableData.forEach((item, i) => {
                        if (i === rows[0]) {
                            _self.selData = item;
                            _self.handelSelect(_self.selData);
                        }
                    })
                } else {
                    Message({
                        type: 'error',
                        message: this.$t("performance.message.reportManage")
                    })
                }
            }
    }
}

</script>
