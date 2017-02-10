<style lang="less">

.ihr-position-positionSetting {
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
}

</style>

<template lang="html">

<div class="content-wrap fix ihr-position-positionSetting">
    <div class="group" id="group" style="height:40px;">
        <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" text="Add" @click="add"  button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-pencil-square-o" type="flat" text="Edit" @click="edit" button-type="button"></ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-remove" type="flat" text="Delete" @click="delete" button-type="button"></ui-button>
        <ui-button class="dis-tc-t btn-default-bd" icon="fa-download" type="flat" text="Download" @click="downloadExcel" button-type="button"></ui-button>
        <!-- <ui-button class="dis-tc-t btn-default-bd" type="flat" show-menu-icons has-dropdown-menu :menu-options="shareMenuOptions" icon="fa-caret-down" :icon-right="true" open-dropdown-on="click" @menu-option-selected="menuOptionSelected" :text="$t('button.more')"></ui-button> -->
        <!-- <input id="excelFile" class="dn" type="file" name="file" v-on:change="uploadExcel($event)"> -->
        <div class="search-ctx">
            <div class="search-pos">
                <span class="search-bg">
         <input @keydown="goSearch($event)" class="search-input" placeholder="Search" type="text" v-model="searchTxt" />
         <span @click="search" class="search-btn"><i class="fa fa-search"></i></span>
                </span>
            </div>
        </div>
    </div>

    <ui-modal :show.sync="show.modal" header="Delete" :body="delShowText">
        <div slot="footer">
            <ui-button @click="deleteAlert" color="primary">Confirm</ui-button>
            <ui-button @click="show.modal = false">Close</ui-button>
        </div>
    </ui-modal>
    <div class="tree-panel fix">
        <div class="treelist p10" id="treePanel">
            <tree :data="regions" :level-config="levelConfig" :show-checkbox="showCheckbox" v-ref:tree :click-node="clickNode"></tree>
        </div>
        <div class="help-desk treelist-detail" id="treelistDetail">
            <div class="vuetable-wrapper">
                <vuetable :api-url="tableUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="tableColumns" :item-actions="itemActions" per-page="10">
                </vuetable>
            </div>
        </div>
    </div>
</div>
</div>

</template>

<script>

import {
    default as Message
}
from '../../components/basic/message';
import {
    Datashaping, downloadFile, getDictMapping
}
from '../../util/assist.js';
export default {
    data() {
            let _self = this;
            return {
                delShowText: '',
                orgGroup: {},
                orgGroupOrgId:'',
                selectedRow: [],
                show: {
                    genericConfirm: false,
                    modal: false
                },
                disabled: true,
                tableUrl: "",
                tableColumns: [{
                    name: '__radio:positionId',
                    title: ''
                }, {
                    name: 'positionName',
                    title: 'MIB Position',
                    callback: 'goPositionDetail'
                }, {
                    name: 'standardJobName',
                    title: 'Restrict To Title'
                }, {
                    name: 'positionCode',
                    title: 'Position ID'
                }, {
                    name: 'positionCategory',
                    title: 'Position Category',
                    callback: function(value) {
                        return _self.fixPOSITIONType(value);
                    }
                }, {
                    name: 'mibGrade',
                    title: 'MIB Grade',
                    callback: function(value) {
                        return _self.fixMIBType(value);
                    }
                }, {
                    name: 'localGrade',
                    title: 'Job Grade'
                }, {
                    name: 'businessTitle',
                    title: 'Position'
                }],
                dist: {
                    POSITION_CATEGORY: {},
                    MIB_RANK: {}
                },
                regions: {},
                currentNode: 0, //organization trees root node
                levelConfig: {
                    labelProperty: 'orgShortName',
                    children: {
                        lazy: true,
                        recursive: true,
                        labelProperty: 'orgShortName',
                        load: function(node, callback) {
                            _self.$root.$data.orgPosTreeCache = _self.$refs.tree.data;
                            if (node.data.isParent) {
                                let parentId = node.data.orgId;
                                _self.$http.get(`/org/orgs/${parentId}/children`).then((response) => {
                                    node.children = response.data;
                                    if (callback) {
                                        callback();
                                    }

                                });
                            } else {
                                node.children = [];
                            }
                        }
                    }
                },
                showCheckbox: false
            };
        },
        computed: {},
        ready() {
            let _self = this;
            window.addEventListener('resize', function() {
                _self.initHeight();
            })
            _self.initHeight();
            var orgId = this.$route.query.orgId;
            if (orgId !== undefined || orgId !== null) {
                this.$refs.tree.setNodeActive(orgId, 'orgId');
            }
        },
        created() {
            var self = this;
            self.fetchTree();
            getDictMapping('POSITION_CATEGORY').then(function(res) {
                self.dist.POSITION_CATEGORY = res;
            });
            getDictMapping('MIB_RANK').then(function(res) {
                self.dist.MIB_RANK = res;
            });
        },
        methods: {
            clickNode: function(node) {
                let _self = this;
                _self.tableUrl = '/pos/positions/' + node.orgId + '/positionList';
                _self.orgGroup = node;
                _self.disabled = false;
            },
            fetchTree() {
                let _self = this;
                var cache = this.$root.$data.orgPosTreeCache;
                if (cache) {
                    this.currentOrg = cache[0];
                    if (cache instanceof Array) {
                        //TODO load  node organization detail
                        let org = cache[0];
                        var orgId = this.$route.query.orgId;
                        var walk = function(data) {
                            if (data && data.length > 0) {
                                data.forEach(function(child, key) {
                                    if (orgId === String(child['orgId'])) {
                                        org = child;
                                    } else {
                                        var children = child['children'];
                                        walk(children);
                                    }
                                });
                            }
                        };
                        walk(cache);
                        if (org instanceof Object) {
                            if (org.orgId) {
                                this.clickNode(org);
                            }
                        }
                    }
                    this.regions = cache;
                } else {
                    _self.$http.get('/org/orgs/parent').then((response) => {
                        _self.regions = response.data;
                        var orgId = this.$route.query.orgId || response.data.orgId;
                        _self.tableUrl = `/pos/positions/${orgId}/positionList`;
                    }, (response) => {
                        Message({
                            type: 'error',
                            message: response.statusText
                        });
                    });
                }
            },
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
            fixDist(value, option) {
                var dist = {};
                switch (option) {
                    case 'POSITION_CATEGORY':
                        dist = this.dist.POSITION_CATEGORY || {};
                        break;
                    case 'MIB_RANK':
                        dist = this.dist.MIB_RANK || {};
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
            fixPOSITIONType(value) {
                return this.fixDist(value, 'POSITION_CATEGORY');
            },
            fixMIBType(value) {
                return this.fixDist(value, 'MIB_RANK');
            },
            add() {
                let _self = this;
                let orgid = _self.orgGroup.orgId;
                let orgShortName = _self.orgGroup.orgShortName;
                if (_self.orgGroup.orgId) {
                    _self.$router.go({
                        name: 'addPosition',
                        params: {
                            id: _self.orgGroup.orgId,
                            orgShortName: _self.orgGroup.orgShortName
                        }
                    });
                } else {
                    Message({
                        type: 'error',
                        message: this.$t('position.message.selectPostionNode')
                    });
                }
            },
            delete() {
                let _self = this;
                let rows = _self.selectedRow;
                if (rows.length === 0) {
                    Message({
                        type: 'error',
                        message: this.$t('position.message.selectDelPostionName')
                    });
                    return;
                }
                _self.$http.get(`/pos/positions/${rows[0]}/checkPositionReport`).then((response) => {
                    if (response.body) {
                        if (response.body === '0') {
                            this.deleteAlert();
                        } else if (response.body === '1') {
                            Message({
                                type: 'error',
                                message: this.$t('position.message.checkPositionReport1')
                            });
                        } else if (response.body === '2') {
                            Message({
                                type: 'error',
                                message: this.$t('position.message.checkPositionReport2')
                            });
                        } else if (response.body === '3') {

                            _self.delShowText = this.$t('position.message.checkPositionReport3');
                            _self.show.modal = true;
                        }
                    }
                });


            },
            deleteAlert() {
                let _self = this;
                let rows = _self.selectedRow;
                _self.$http.post('/pos/positions/deletePositionIds', {
                    positionIds: rows
                }, {
                    emulateJSON: true
                }).then((response) => {
                    Message({
                        type: 'success',
                        message: this.$t('common.deleteSuccess')
                    });
                    this.$broadcast('vuetable:refresh'); //刷新表格
                });
                _self.show.modal = false;
            },
            edit() {
                let _self = this;
                let positionId = _self.selectedRow[0];
                let orgShortName = _self.orgGroup.orgShortName;
                if (_self.selectedRow.length === 1) {
                    // window.open(`${location.href}/edit/${positionId}/${orgShortName}`);
                    _self.$router.go({
                        name: 'editPosition',
                        params: {
                            positionId: _self.selectedRow[0], //组织id
                            orgShortName: _self.orgGroup.orgShortName //职位名称
                        }
                    });
                } else {
                    Message({
                        type: 'error',
                        message: this.$t('position.message.selectPositionName')
                    })
                }
            },

            //下载职位数据列表
            downloadExcel() {
                var orgId = this.orgGroup.orgId;
                if (orgId || orgId === '0') {
                    downloadFile('/pos/positions/exportPositions', {
                        unitId: orgId
                    });
                } else {
                    Message({
                        type: 'error',
                        message: this.$t('common.selectNode')
                    })
                }
            },
            //下载导入职位模版
            downloadTemplate() {
                downloadFile('/pos/positions/dowloadPositionInfo');
            },
            //上传职位模版
            // uploadExcel(e) {
            //     var srcElement__src = e.srcElement.files;
            //     var files = Array.prototype.slice.call(srcElement__src, 0);
            //     var formData = new FormData();
            //     files.forEach(function(file) {
            //         formData.append('file', file);
            //     });
            //     e.srcElement.value = '';
            //     this.$http.post('pos/positions/importPositionInfo', formData).then(function(res) {
            //         Message({
            //             type: 'success',
            //             message: this.$t('staff.message.importSuccess')
            //         });
            //     });
            // },
            goPositionDetail(value, data) {
                return `<a href="/#!/ihr/position/positionSetting/positionDetails/${data.positionId}/${this.orgGroup.orgId}" >${value}</a>`;
            },
            search() {
                let unitId = this.orgGroup.orgId || '';
                let positionName = this.searchTxt;
                this.tableUrl = `/pos/positions/getPositionsByName?positionName=${positionName}&unitId=${unitId}`;
            },
            goSearch(event) {
                if (event.keyCode === 13) {
                    this.search();
                }
            }
        },
        components: {
            Tree: require('../../components/tree/tree.vue')
        }
};

</script>
