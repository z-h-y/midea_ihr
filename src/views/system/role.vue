<style lang="less">

.ihr-system-role {
    * {
        box-sizing: border-box;
    }
    .group {
        border: none;
    }
}

</style>

<template lang="html">

<div class="content-wrap bg-w ihr-system-role">
    <ui-confirm header="Delete this" @confirmed="deleteBtn" :show.sync="showdel" close-on-confirm autofocus="confirm-button">
        Do you want to delete this? May prevent the system from running!
    </ui-confirm>
    <div class="group mb16">
        <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" :text="$t('button.add')" @click="add"></ui-button>
        <!-- <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-pencil-square-o" type="flat" text="Edit" @click=""></ui-button> -->
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-remove" type="flat" :text="$t('button.delete')"  @click="beforeDel"></ui-button>
        <ui-button class="dis-tc-t btn-default-bd" icon="" type="flat" :text="$t('system.role.functionsPermission')"  @click="functionsPermission"></ui-button>
    </div>
    <div class="pl16 pr16 pb16">
        <vuetable :api-url="tableUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="tableColumns" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
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
            let _self = this;
            return {
                tableUrl: "/system/role/pagedQueryRoleList",
                selectedRow: [],
                showdel: false,
                tableColumns: [{
                    name: '__checkbox:roleId',
                    title: ''
                }, {
                    name: 'roleName',
                    title:  this.$t('system.role.roleName'),
                    sortField: 'roleName',
                    callback: 'goView'
                }, {
                    name: 'roleType',
                    title: this.$t('system.role.roleType'),
                    sortField: 'roleType',
                    callback: function(value) {
                        return _self.fixRoleType(value);
                    }
                }, {
                    name: 'description',
                    title: this.$t('system.role.description'),
                    sortField: 'description',
                }],
                dist: {
                    ROLETYPE: {},
                }
            }
        },
        computed: {},
        ready() {},
        attached() {},
        created() {
            var self = this;
            getDictMapping('SYS_ROLE_TYPE').then(function(res) {
                self.dist.ROLETYPE = res;
            });
        },
        methods: { // 匹配字典
            fixDist(value, option) {
                    var dist = {};
                    switch (option) {
                        case 'roleType':
                            dist = this.dist.ROLETYPE || {};
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
                fixRoleType(value) {
                    return this.fixDist(value, 'roleType');
                },
                add() {
                    this.$router.go({
                        name: 'addRole'
                    });
                },
                beforeDel: function(index) {
                    let _self = this;
                    let rows = _self.selectedRow;
                    if (rows.length === 0) {
                        Message({
                            type: 'error',
                            message: 'Please select a valid node.'
                        })
                    } else {
                        this.showdel = true;
                    }
                },
                deleteBtn() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    _self.$http.post('/system/role/deleteRoles', {
                        ids: rows
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        _self.$broadcast('vuetable:refresh');
                        Message({
                            type: 'success',
                            message: 'Delete Success!'
                        });
                    });
                },
                functionsPermission() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    if (rows.length === 1) {
                        _self.$router.go({
                            name: 'functionPermission',
                            params: {
                                roleId: `${rows[0]}`
                            }
                        });
                    } else {
                        Message({
                            type: 'error',
                            message: 'Please select a valid node.'
                        })
                    }
                },
                goView(value, data) {
                    return `<a href="/#!/ihr/system/role/view/${data.roleId}">${value}</a>`;
                }
        },
        components: {}
}

</script>
