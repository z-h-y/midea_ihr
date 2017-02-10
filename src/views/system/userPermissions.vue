<style lang="less">
.ihr-system-userPermissions{
  *{
    box-sizing: border-box;
  }
  .group{
    border: none;
  }
}


</style>

<template lang="html">

<div class="content-wrap bg-w ihr-system-userPermissions">
    <div class="group">
        <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" text="Add" @click="add" button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-pencil-square-o" type="flat" text="Edit" @click="edit" button-type="button"></ui-button>
    </div>
    <div class="pl16 pr16 pb16">
        <vuetable :api-url="usersUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="tableColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
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
    getDictMapping
}
from '../../util/assist';
export default {
    data() {
            var _self = this;

            return {
                usersUrl: '/system/user/pagedQueryUserForSetRoleList',
                selectedRow: [],
                dist: {
                    IS_ENABLED: {},
                },
                tableColumns: [{
                    name: '__checkbox:userId',
                    title: ''
                }, {
                    name: 'userName',
                    title: 'Username',
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
                    name: 'isEnabled',
                    title: 'Account Status',
                    sortField: 'isEnabled',
                    callback: function(value) {
                        return _self.fixIS_ENABLED(value);
                    }
                }]
            }
        },
        computed: {},
        ready() {
            var _self = this;
            getDictMapping('IS_ENABLED').then(function(res) {
                _self.dist.IS_ENABLED = res;
            });
        },
        attached() {},
        methods: {
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
                        name: 'addUserPermissions'
                    });
                },
                edit() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    if (rows.length === 1) {
                        _self.$router.go({
                            name: 'editUserPermissions',
                            params: {
                                userId: `${rows[0]}`
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
