<style lang="less">

.ihr-system-userPermissionsUpdate {
    min-width: 921px;
    padding-bottom: 88px;
    * {
        box-sizing: border-box;
    }
    .field-row {
        display: table-row;
        position: relative;
    }
    .field-row .icon-area {
        position: absolute;
        right: -40px;
        cursor: pointer;
    }
    .field-row .roles-cell {
        width: 320px;
    }
    .cell {
        width: 210px;
        display: table-cell;
    }
    .cell label {
        padding-left: 4px;
    }
    .fa-plus-circle {
        font-size: 20px;
        color: #3aa2eb;
    }
    .fa-trash-o {
        font-size: 20px;
    }
    .data >label {
        display: none;
    }
    .data-label {
        float: left;
        white-space: nowrap;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 150px;
        height: 28px;
        padding-right: 10px;
        font-size: 14px;
        line-height: 28px;
        text-align: right;
        color: #545454;
    }
    .data-content {
        float: left;
        width: 402px;
        height: auto;
        position: relative;
        .text-editor {
            border: 1px solid #e5e6e7;
        }
    }
    .data {
        .field-content {
            padding-right: 0px;
        }
    }
    .text-editor input {
        border: none;
    }
    .selector .text-editor {
        border: 1px solid #e5e6e7;
    }
}

</style>

<template lang="html">

<div>
    <div class="content-wrap ihr-system-userPermissionsUpdate">
        <panel title="Permission Settings" class="panel-b" header="panel-header">
            <v-form :model="userRoleData" :schema="rolesSchema" label-width="150" label-suffix="" :cols="1" form-style="">
                <text-field class="selector" property='userName' editor-width="392" type="selector" :show.sync="personshow"></text-field>
                <!-- <text-increment property='employeeId' editor-width="400"></text-increment> -->
                <text-increment property='employeeName'></text-increment>
                <text-increment property='positionName' editor-width="400"></text-increment>
                <text-increment property='organization'></text-increment>
                <field class="data fix" property="Roles">
                    <label class="data-label">{{$t('system.userPermissionsUpdate.role')}}</label>
                    <div class="data-content">
                        <div class="field-row">
                            <div class="cell">
                                <label>{{$t('system.userPermissionsUpdate.systemRole')}}</label>
                            </div>
                            <span class="icon-area" @click="handleAdd('role')"><i class="fa fa-plus-circle"></i></span>
                        </div>
                        <template v-for="item in userRoleList">
                            <v-form :model="item" :schema="rolePerSchema" label-width="150" label-suffix="" :cols="1">
                                <div class="field-row">
                                    <div class="cell roles-cell">
                                        <select-field label-width="0" :hide-label="true" property="roleId" editor-width="392"></select-field>
                                    </div>
                                    <span class="icon-area" @click="handleRemove($index,'role')"> <i class="fa fa-trash-o del-bottom"></i></span>
                                </div>
                            </v-form>
                        </template>
                    </div>
                </field>
                <field class="data fix" property="Resources" editor-width="450">
                    <label class="data-label">{{$t('system.userPermissionsUpdate.data')}}</label>
                    <div class="data-content">
                        <div class="field-row">
                            <div class="cell">
                                <label>{{$t('system.userPermissionsUpdate.dataModule')}}</label>
                            </div>
                            <div class="cell">
                                <label>{{$t('system.userPermissionsUpdate.dataPermission')}}</label>
                            </div>
                            <span class="icon-area" @click="handleAdd('resource')"><i class="fa fa-plus-circle"></i></span>
                        </div>
                        <template v-for="item in userPerList">
                            <v-form :model="item" :schema="dataPerSchema" label-width="150" label-suffix="" :cols="1">
                                <div class="field-row">
                                    <div class="cell">
                                        <select-field label-width="0" :hide-label="true" property="dataModuleKey" editor-width="190"></select-field>
                                    </div>
                                    <div class="cell">
                                        <text-field label-width="0" :hide-label="true" property="resourceName" editor-width="190" type="selector" @click="showModal($index)"></text-field>
                                        <!-- <text-field label-width="0" :hide-label="true" property="resourceId" editor-width="260"></text-field> -->
                                    </div>
                                    <span class="icon-area" @click="handleRemove($index,'resource')"> <i class="fa fa-trash-o del-bottom"></i></span>
                                </div>
                            </v-form>
                        </template>
                    </div>
                </field>
            </v-form>
        </panel>
        <div class="btn-group">
            <ui-button @click="submit" color="primary mr10">{{$t('button.submit')}}</ui-button>
            <ui-button @click="cancel" class="btn-default-bd" type="flat">{{$t('button.cancel')}}</ui-button>
        </div>
    </div>
    <organization-selector :show.sync="show" :is-admin="true"></organization-selector>
    <user-selector :show.sync="personshow" v-if="!readonlyFlag"></user-selector>
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
    convert, getDictMapping
}
from '../../util/assist.js';

var dataPerData = {
    label: 'roleId',
    dataModuleKey: {
        mapping: function() {
            return getDictMapping('DATA_MODULE_KEY');
        }
    },
    resourceId: {
        required: false,
        whitespace: false
    },
    resourceName: {
        required: false,
        whitespace: false
    }
};

var rolePerData = {
    label: 'roleId',
    roleId: {
        mapping: function() {
            return Vue.http.post('/system/role/findRoleList').then(function(response) {
                let result = {};
                for (var r of response.data) {
                    result[r.roleName] = r.roleId
                }
                return result;
            });
        }
    },
    roleName: {
        required: false,
        whitespace: false
    }
};

export default {
    data() {
            let rolesSchema = new Schema({
                userName: {
                    label: this.$t('system.userPermissionsUpdate.userName'),
                    required: true,
                    whitespace: false
                },
                employeeId: {
                    label: this.$t('system.userPermissionsUpdate.employeeId'),
                    required: false,
                    whitespace: false
                },
                positionName: {
                    label: this.$t('system.userPermissionsUpdate.positionName'),
                    required: false,
                    whitespace: false
                },
                organization: {
                    label: this.$t('system.userPermissionsUpdate.organization'),
                    required: false,
                    whitespace: false
                },
                employeeName: {
                    label: this.$t('system.userPermissionsUpdate.employeeName'),
                    required: false,
                    whitespace: false
                },
                Roles: {
                    label: this.$t('system.userPermissionsUpdate.roles'),
                    required: false,
                    whitespace: false
                },
                Resources: {
                    label: this.$t('system.userPermissionsUpdate.resources')
                }
            });
            return {
                rolesSchema: rolesSchema,
                readonlyFlag: true,
                userRoleData: rolesSchema.newModel(),
                dataPerSchema: new Schema(dataPerData),
                rolePerSchema: new Schema(rolePerData),
                userPerList: [],
                userRoleList: [],
                show: {
                    modal: false
                },
                personshow: {
                    modal: false
                },
                selIndex: 0
            }
        },
        methods: {
            showModal(index) {
                    this.show.modal = true;
                    this.selIndex = index;
                },
                handleAdd(type) {
                    switch (type) {
                        case 'role':
                            this.userRoleList.push(this.rolePerSchema.newModel());
                            break;
                        case 'resource':
                            this.userPerList.push(this.dataPerSchema.newModel());
                            break;
                    }
                },
                handleRemove(_index, type) {
                    switch (type) {
                        case 'role':
                            this.userRoleList.splice(_index, 1);
                            break;
                        case 'resource':
                            this.userPerList.splice(_index, 1);
                            break;
                    }
                },
                // 提交
                submit() {
                    let _self = this;
                    let datas = [];
                    let datasr = [];
                    if (!_self.userRoleData.userId) {
                        Message({
                            type: 'error',
                            message: 'Please select a User.'
                        })
                        return;
                    }
                    for (let u of _self.userPerList) {
                        let obj = {
                            dataModuleKey: u.dataModuleKey,
                            resourceId: u.resourceId
                        }
                        datas.push(obj);
                    }
                    for (let u of _self.userRoleList) {
                        let obj = {
                            roleId: u.roleId,
                        }
                        datasr.push(obj);
                    }
                    let userPerData = {
                        rolePerList: datasr,
                        dataPerList: datas,
                        userId: _self.userRoleData.userId,
                        employeeId: _self.userRoleData.employeeId
                    }
                    let data = {};
                    convert(userPerData, data, "", true);
                    _self.$http.post('/system/permissions/updateUserDataPermissions', data, {
                        emulateJSON: true
                    }).then((response) => {
                        Message({
                            type: 'success',
                            message: 'Successfully saved'
                        });
                        _self.$router.go({
                            name: 'userPermissions'
                        });
                    });
                },
                cancel() {
                    let _self = this;
                    _self.$router.go({
                        name: 'userPermissions'
                    });
                }
        },
        ready() {

        },
        components: {
            Panel: require('../../components/basic/panel.vue')
        },
        events: {
            'organization-selector:selected': function(node) {
                if (!node) return;
                this.userPerList.forEach((item, i) => {
                    if (i === this.selIndex) {
                        item.resourceId = node.orgId;
                        item.resourceName = node.orgShortName;
                    }
                })
            },
            'selected-user': function(selectedData) {
                let _self = this;
                _self.$http.post('/system/user/findEmployeeForUserId', {
                    userId: selectedData.userId
                }, {
                    emulateJSON: true
                }).then((response) => {
                    let props = response.json();
                    _self.userRoleData.userName = props.userName;
                    _self.userRoleData.positionName = props.positionName;
                    _self.userRoleData.userId = props.userId;
                    _self.userRoleData.organization = props.unitName;
                    _self.userRoleData.employeeId = props.employeeId;
                    _self.userRoleData.employeeName = props.employeeName;


                });


                _self.$http.post('/system/permissions/findUserDataPermissions', {
                    userId: selectedData.userId,
                }, {
                    emulateJSON: true
                }).then((response) => {
                    this.userPerList = [];
                    this.userRoleList = [];
                    let rs = response.json();
                    for (let r of rs.resourceList) {
                        let data = {
                            resourceId: r.resourceId,
                            dataModuleKey: r.dataModuleKey,
                            resourceName: r.resourceName
                        }
                        this.userPerList.push(data);
                    }
                    for (let r of rs.roleList) {
                        let data = {
                            roleId: r.roleId
                        }
                        this.userRoleList.push(data);
                    }
                });
            }
        },
        route: {
            data(transition) {
                let _self = this;

                if (_self.$route.name === 'addUserPermissions') {
                    _self.readonlyFlag = false;
                    this.userPerList.push(this.dataPerSchema.newModel());
                    this.userRoleList.push(this.rolePerSchema.newModel());
                } else if (_self.$route.name === 'editUserPermissions') {
                    _self.userRoleData.userId = transition.to.params.userId;
                    _self.$http.post('/system/permissions/findUserDataPermissions', {
                        userId: _self.userRoleData.userId,
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        let rs = response.json();
                        for (let r of rs.resourceList) {
                            let data = {
                                resourceId: r.resourceId,
                                dataModuleKey: r.dataModuleKey,
                                resourceName: r.resourceName
                            }
                            this.userPerList.push(data);
                        }
                        for (let r of rs.roleList) {
                            let data = {
                                roleId: r.roleId
                            }
                            this.userRoleList.push(data);
                        }
                    });
                    _self.$http.post('/system/user/findEmployeeForUserId', {
                        userId: _self.userRoleData.userId,
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        let props = response.json();
                        _self.userRoleData.userName = props.userName;
                        _self.userRoleData.positionName = props.positionName;
                        _self.userRoleData.organization = props.unitName;
                        _self.userRoleData.employeeId = props.employeeId;
                        _self.userRoleData.employeeName = props.employeeName;

                    });
                }
            }
        }
}

</script>
