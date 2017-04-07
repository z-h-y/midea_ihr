<style lang="less">

    .ihr-system-users {
        min-width: 921px;
        font-size: 14px;
        .ui-radio-label-text {
            line-height: 32px;
            margin: 0 10px;
        }
        .group {
            margin: 16px;
            padding-top: 16px;
            border-top: 1px solid #ecedee;
        }
        .searchModel-form {
            height: 46px;
            margin: 0 40px;
        }
        .searchModel-form.expended {
            height: 92px;
        }
        .form {
            height: 46px;
        }
    }

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-system-users pt20">
    <div class="search-area">
        <ui-confirm header="Delete this" @confirmed="deleteBtn" :show.sync="showdel" close-on-confirm autofocus="confirm-button">
            Do you want to delete this? May prevent the system from running!
        </ui-confirm>
        <v-form :model="searchModel" :schema="searchSchema" label-width="170" label-suffix="" :cols="3" form-style="searchModel-form">
            <text-field property="loginId" editor-width="140"></text-field>
            <text-field property="userName" editor-width="140"></text-field>
        </v-form>
        <div class="query-btn">
            <ui-button class="query-btn-search mr10" color="primary" @click="search">{{ $t('button.search') }}</ui-button>
            <ui-button class="query-btn-reset btn-default-bd" @click="reset" type="flat">{{ $t('button.reset') }}</ui-button>
        </div>
    </div>
    <div class="group">
        <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" @click="add" button-type="button">
            {{$t('button.add')}}
        </ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-pencil-square-o" type="flat" @click="edit" button-type="button">
            {{$t('button.edit')}}
        </ui-button>
    </div>
    <div class="vuetable-wrapper pl16 pr16 pb16">
        <vuetable :append-params="queryParams" :api-url="usersUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="usersUrlColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
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
    getDictMapping
}
from '../../util/assist';

export default {

    data() {
            let searchSchema = new Schema({
                loginId: {
                    label: this.$t('system.user.loginId'),
                    required: false,
                    whitespace: false
                },
                userName: {
                    label: this.$t('system.user.userName'),
                    required: false,
                    whitespace: false
                }
            });
            var _self = this;
            return {
                usersUrl: '/system/user/findUserList',
                selectedRow: [],
                searchSchema: searchSchema,
                searchModel: searchSchema.newModel(),
                dist: {
                    IS_ENABLED: {},
                },
                usersUrlColumns: [{
                    name: '__checkbox:loginId',
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
                    sortField: 'isEnabled',
                    callback: function(value) {
                        return _self.fixIS_ENABLED(value);
                    }
                }]
            }
        },
        computed: {
            queryParams() {
                let loginId = this.searchModel.loginId || "";
                let userName = this.searchModel.userName || "";
                return [
                    `loginId=${loginId}`,
                    `userName=${userName}`
                ]
            }
        },
        ready() {
            var _self = this;
            getDictMapping('IS_ENABLED').then(function(res) {
                _self.dist.IS_ENABLED = res;
            });
        },
        attached() {},
        methods: {
            search() {
                    this.$broadcast('vuetable:refresh');
                },
                reset() {
                    this.searchModel.reset();
                },
                fixDist(value, option) {
                    var dist = {};
                    switch (option) {
                        case 'IS_ENABLED':
                            dist = this.dist.IS_ENABLED || {};
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
                fixIS_ENABLED(value) {
                    return this.fixDist(value, 'IS_ENABLED');
                },
                add() {
                    let _self = this;
                    _self.$router.go({
                        name: 'addUser'
                    });
                },
                edit() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    if (rows.length === 1) {
                        _self.$router.go({
                            name: 'editUser',
                            params: {
                                loginId: `${rows[0]}`
                            }
                        });
                    } else {
                        Message({
                            type: 'error',
                            message: _self.$t('system.message.selectNode')
                        })
                    }
                }
        },
        components: {}
}

</script>
