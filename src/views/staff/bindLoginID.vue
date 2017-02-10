<style lang="less">

.bind-loginid {
    min-width: 921px;
    * {
        box-sizing: border-box;
    }
    .right-panel-tit span {
        font-size: 20px;
        font-weight: bold;
        color: #2a3c59;
    }
    .right-panel-info {
        background: #fafafa;
        padding: 0 20px;
    }
    .right-panel-info li {
        float: left;
        margin-right: 165px;
    }
    .right-panel-label {
        font-size: 14px;
        color: #a5acbe;
        display: inline-block;
        padding: 20px 0;
        width: 130px;
    }
    .right-panel-txt {
        font-size: 14px;
        color: #6a707d;
    }
    .ui-tabs-body {
        padding-left: 0;
        padding-right: 0;
    }
    .bg-f5f5f5 {
        background: #f5f5f5;
    }
    .group {
        border: none;
        padding-top: 0px;
        margin-left: 0px;
    }
    .search-ctx {
        position: absolute;
        width: 280px;
        height: 48px;
        top: 0;
        right: 0;
    }
    .search-pos {
        position: absolute;
        right: 16px;
        top: 8px;
    }
    .search-pos .search-bg {
        display: inline-block;
        border: 1px solid #e8e8e8;
        height: 100%;
        background: #fff;
        padding: 2px 16px 2px 10px;
        border-radius: 16px;
    }
    .search-pos .search-input {
        border: none;
        background: transparent;
        width: 202px;
        height: 26px;
        line-height: 26px;
    }
    .search-pos .search-input::placeholder {
        color: #a5acbe;
        font-size: 12px;
    }
    .search-pos .search-input:focus {
        outline: none;
        border: none;
    }
    .search-btn {
        cursor: pointer;
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

<div class="content-wrap fix bind-loginid">
    <div class="group" id="group" style="height:40px;">
        <div class="search-ctx">
            <div class="search-pos">
                <span class="search-bg">
           <input @keydown="goSearch($event)" class="search-input" placeholder="Search" type="text" v-model="searchTxt" />
           <span @click="search" class="search-btn"><i class="fa fa-search"></i></span>
                </span>
            </div>
        </div>
    </div>

    <div class="tree-panel fix">
        <div class="treelist p10" id="treePanel">
            <tree :data="regions" :level-config="levelConfig" :show-checkbox="showCheckbox" v-ref:tree :click-node="clickNode"></tree>
        </div>
        <div class="help-desk treelist-detail" id="treelistDetail">
            <div class="vuetable-wrapper">
                <vuetable v-ref:vuetable :api-url="selectedTableUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="tableColumns" :item-actions="itemActions" per-page="10">
                </vuetable>
            </div>
        </div>
    </div>
</div>
</div>

<user-selector :show.sync="personshow" v-if="!readonlyFlag"></user-selector>

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
            let tableColumns = [{
                name: 'employeeName',
                title: 'Employee Name'
            }, {
                name: 'positionName',
                title: 'Position'
            }, {
                name: 'officePhone',
                dataClass: 'tr',
                title: 'Phone'
            }, {
                name: 'email',
                title: 'Email'
            }, {
                name: 'loginId',
                title: 'Login ID'
            }, {
                name: 'userName',
                title: 'User Name'
            }, {
                name: '__actions',
                title: 'operation',
                sortField: ''
            }];
            return {
                personshow: {
                    modal: false
                },
                searchTxt: '',
                employeeId: '',
                orgGroup: {},
                selData: [],
                tableData: [],
                selectedRow: [],
                loadTableData: false,
                tableColumns: tableColumns,
                itemActions: [
                    {
                        name: 'user-btn',
                        label: 'bind Login ID',
                        icon: 'fa fa-plus mr5',
                        class: 'mr10 button-sty',
                        extra: {
                            'title': '',
                            'data-toggle': "tooltip",
                            'data-placement': "left"
                        }
                    }, {
                        name: 'unbind-btn',
                        label: 'unbind',
                        icon: 'fa fa-hand-o-up mr5',
                        class: 'button-sty',
                        extra: {
                            title: '',
                            'data-toggle': "tooltip",
                            'data-placement': "top"
                        }
                    }
                ],
                regions: [],
                levelConfig: {
                    labelProperty: 'orgShortName',
                    children: {
                        lazy: true,
                        recursive: true,
                        labelProperty: 'orgShortName',
                        load: function(node, callback) {
                            var data;
                            if (node.data.isParent) {
                                let parentId = node.data.orgId;
                                _self.$http.get(`/org/orgs/${parentId}/children`).then((response) => {
                                    node.children = response.data;
                                    if (callback) {
                                        callback();
                                    }

                                }, (response) => {
                                    console.log('错误信息 ：' + response.statusText);
                                });
                            } else {
                                node.children = [];
                            }
                        }
                    }
                },
                showCheckbox: false,
                // 弹框选择器表格接口
                selectedTableUrl: '',
                clickNode: function(node) {
                    _self.selectedTableUrl = '/employee/bindloginid/' + node.orgId + '/members';
                    _self.orgGroup = node;
                }
            }
        },
        computed: {},
        ready() {
            var url = '/org/orgs/0/children';
            this.$http.get(url).then((response) => {
                // this.orgGroup = response.data;
                this.regions = response.data;
            }, (response) => {
                Message({
                    type: 'error',
                    message: response.statusText
                });
            });

            this.$http.get(`/employee/employees/profile`).then((response) => {
                if (response.data)
                    this.selectedTableUrl = '/employee/bindloginid/' + response.data.defunitId + '/members';
            });

            let _self = this;
            window.addEventListener('resize', function() {
                _self.initHeight();
            })
            _self.initHeight();
        },
        methods: {
            initHeight() {
                    let treePanel = document.getElementById('treePanel'),
                        treelistDetail = document.getElementById('treelistDetail'),
                        bodyHeight = document.body.clientHeight, //body 高度
                        navHeight = parseInt(document.getElementsByClassName('navbar')[0].style.height) || 0, //顶部搜索导航 高度
                        breadcrumbHeight = parseInt(document.getElementsByClassName('breadcrumb')[0].style.height) || 0; //面包屑 高度

                    let groupHeight;
                    if (document.getElementsByClassName('group').length !== 0) {
                        groupHeight = parseInt(document.getElementsByClassName('group')[0].style.height) + 32; //按钮组 高度
                    } else {
                        groupHeight = 0;
                    }
                    if (treePanel) {
                        let treePanelHeight = bodyHeight - navHeight - breadcrumbHeight - groupHeight - 17;
                        treePanel.style.height = treePanelHeight - 5 + 'px';
                        treelistDetail.style.height = treePanelHeight - 5 + 'px';
                    }
                },
                goSearch(event) {
                    if (event.keyCode === 13) {
                        this.search();
                    }
                },
                search() {
                    if (this.orgGroup.orgId === undefined || this.orgGroup.orgId === null) {
                        this.orgGroup.orgId = 1;
                        return;
                    }
                    this.selectedTableUrl = '/employee/bindloginid/' + this.orgGroup.orgId + '/members?employeeName=' + this.searchTxt;
                }
        },
        components: {
            Tree: require('../../components/tree/tree.vue')
        },
        events: {
            'selected-user': function(selectedData) {
                let _self = this;
                _self.$http.post('/employee/bindloginid/set', {
                    userId: selectedData.userId,
                    employeeId: _self.employeeId
                }, {
                    emulateJSON: true
                }).then((response) => {
                   this.$broadcast('vuetable:refresh'); //刷新表格
                   Message({
                       type: 'success',
                       message: 'Successfully saved'
                   });
                });
            },
            'vuetable:action': function(action, data) {
                let _self = this;
                if (action == 'user-btn') {
                    _self.personshow.modal = true;
                    _self.employeeId = data.employeeId;
                }
                if (action == 'unbind-btn') {
                    _self.$http.post('/employee/bindloginid/unbind', {
                        employeeId: data.employeeId
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        this.$broadcast('vuetable:refresh'); //刷新表格
                        Message({
                            type: 'success',
                            message: 'Successfully saved'
                        });

                    });
                }
            }
        }
}

</script>
