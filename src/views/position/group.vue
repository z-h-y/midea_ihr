<style lang="less">

.ihr-position-group {
    min-width: 921px;
    * {
        box-sizing: border-box;
    }
    .right-panel-tit span {
        font-size: 20px;
        font-weight: bold;
        color: #2a3c59;
    }
    .right-panel-info li {
        width: 50%;
        float: left;
    }
    .right-panel-label {
        font-size: 14px;
        color: #a5acbe;
        display: inline-block;
        padding: 10px 0;
        width: 130px;
        white-space: nowrap;
    }
    .right-panel-txt {
        font-size: 14px;
        color: #6a707d;
        white-space: nowrap;
        width: 49%;
    }
    .ui-tabs-body {
        padding-left: 0;
        padding-right: 0;
        padding-bottom: 0;
    }
    .bg-f5f5f5 {
        background: #f5f5f5;
    }
    .group {
        border: none;
        padding-top: 0px;
        margin-left: 0px;
    }
    .ui-tabs {
        margin-bottom: 0;
    }
    .vuetable-pagination {
        margin-bottom: 0px;
    }
}

</style>

<template lang="html">

<div>
    <div class="content-wrap fix ihr-position-group fix-height">
        <div class="group" id="group" style="height:40px;">
            <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" @click="add" button-type="button">{{$t('button.add')}}</ui-button>
            <ui-button class="mr10 dis-tc btn-default-bd" color="white" icon="fa-pencil-square-o" type="flat" @click="edit" button-type="button">{{$t('button.edit')}}</ui-button>
            <ui-button class="mr10 dis-tc btn-default-bd" color="white" icon="fa-remove" type="flat" @click="deleteBtn('confirm')" :disabled="!isLoadTitles" button-type="button">{{$t('button.delete')}}</ui-button>
        </div>
        <ui-modal ref="confirm" :title="$t('position.del')">
            {{delText}}
            <div slot="footer">
                <ui-button @click="deleteAlert" color="primary">{{ $t('button.confirm') }}</ui-button>
                <ui-button @click="closeModal('confirm')">{{ $t('button.close') }}</ui-button>
            </div>
        </ui-modal>
        <div class="tree-panel fix fix-height">
            <div class="treelist fix-height" id="treePanel">
                <tree :data="regions" :level-config="levelConfig" :show-checkbox="showCheckbox" ref="tree" :click-node="clickNode"></tree>
            </div>
            <div class="help-desk treelist-detail" id="treelistDetail">
                <div class="help-desk-header">
                    <h3 class="headline">{{basicinfo.jobFamilyName}}</h3>
                </div>
                <div class="help-desk-cnt">
                    <ul class="regular fix">
                        <li>
                            <span class="prop-name">{{ $t('position.label.groupEffectiveDate') }}</span>
                            <span class="prop-val">{{basicinfo.createDate | formatDate}}</span>
                        </li>
                        <li>
                            <span class="prop-name">{{ $t('position.label.groupFamilyID') }}</span>
                            <span class="prop-val">{{basicinfo.jobFamilyCode }}</span>
                        </li>
                        <li>
                            <span class="prop-name">{{ $t('position.label.groupSuperiorFamily') }}</span>
                            <span class="prop-val">{{basicinfo.parentJobfamilyName}}</span>
                        </li>
                        <li>
                            <span class="prop-name">{{ $t('position.label.groupAbbreviation') }}</span>
                            <span class="prop-val">{{basicinfo.standardJobCodePrefix}}</span>
                        </li>
                    </ul>
                </div>
                <div class="tabs">
                    <ui-tabs type="text" background-color="clear" text-color="gray" text-color-active="primary">
                        <ui-tab :header="$t('position.groupTitles')">
                            <div class="vuetable-wrapper">
                                <vuetable :api-url="titlesUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="titlesColumns" :item-actions="itemActions" per-page="10" :load-success-callback="loadTitles">
                                </vuetable>
                            </div>
                        </ui-tab>
                        <ui-tab :header="$t('position.groupPositions')">
                            <vuetable :api-url="positionsUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="positionsColumns" :item-actions="itemActions" per-page="10">
                            </vuetable>
                        </ui-tab>
                    </ui-tabs>
                </div>
            </div>
        </div>
    </div>
    <!-- 弹框 -->
    <ui-confirm ref="chooseConfirm" header="Warm prompt" refs autofocus="">
        {{ $t('position.groupChooseGroup') }}
    </ui-confirm>
</div>

</template>

<script>

import {
    default as Message
}
from '../../components/basic/message';
import {
    Datashaping, getDictMapping
}
from '../../util/assist.js';
export default {
    data() {
            let _self = this;
            return { //初始化
                isLoadTitles: false,
                titlesData: {},
                currentOrg: {},
                //弹框隐藏
                delText: this.$t('position.delText'),
                titlesUrl: '', //titles表格地址
                positionsUrl: '', //positions表格地址
                jobGroup: {}, //初始化节点对象
                basicinfo: {}, //初始化职群信息对象
                //titles表格字段
                titlesColumns: [{
                    name: 'standardJobName',
                    title: this.$t('position.columns.groupTitle'),
                    callback: function(value, data) {
                        return _self.gotitleDetail(value, data);
                    }
                }, {
                    name: 'standardJobCode',
                    title: this.$t('position.columns.groupTitle')
                }, {
                    name: 'jobFamilyName',
                    title: this.$t('position.columns.groupSuperior')
                }, {
                    name: 'mibGrade',
                    title: this.$t('position.columns.groupMIBGrade')
                }],
                //positions表格字段
                positionsColumns: [{
                    name: 'positionName',
                    title: this.$t('position.columns.groupMIBPosition'),
                    callback: function(value, data) {
                        return _self.goPositionDetail(value, data);
                    }
                }, {
                    name: 'positionCode',
                    title: this.$t('position.columns.groupPositionID')
                }, {
                    name: 'mibGrade',
                    title: this.$t('position.columns.groupPosMIBGrade'),
                    callback: function(value) {
                        return _self.fixMIBType(value);
                    }
                }, {
                    name: 'businessTitle',
                    title: this.$t('position.columns.groupPosition')
                }, {
                    name: 'beginDate',
                    dataClass: 'tr',
                    titleClass: 'mw80',
                    title: this.$t('position.columns.groupEffectiveDate')
                }],
                dist: {
                    MIB_RANK: {}
                },
                //tree
                regions: {},
                levelConfig: {
                    labelProperty: 'jobFamilyName',
                    children: {
                        lazy: true,
                        recursive: true,
                        labelProperty: 'jobFamilyName',
                        load: function(node, callback) {
                            _self.$root.$data.orgGroupTreeCache = _self.$refs.tree.data;
                            if (node.data.isParent) {
                                let parentId = node.data.jobFamilyId;
                                _self.$http.get(`/pos/jobFamilys/${parentId}/children`).then((response) => {
                                    node.children = response.data;
                                    if (callback) {
                                        callback();
                                    }
                                }, (response) => {
                                    Message({
                                        type: 'error',
                                        message: response.statusText
                                    });
                                });
                            } else {
                                node.children = [];
                            }
                        }
                    }
                },
                showCheckbox: false //树隐藏多选框
                    //树点击节点
            };
        },
        mounted() {
            var _self = this;
            getDictMapping('MIB_RANK').then(function(res) {
                _self.dist.MIB_RANK = res;
            });

            this.$nextTick(()=>{
                _self.initHeight();
                window.addEventListener('resize', function() {
                    _self.initHeight();
                })
            })
            var jobFamilyId = this.$route.query.jobFamilyId;
            if (jobFamilyId !== undefined || jobFamilyId !== null) {
                this.$refs.tree.setNodeActive(jobFamilyId, 'jobFamilyId');
            }
        },
        created() {
            this.fetchTree();
        },
        methods: {
            closeModal(ref) {
                    this.$refs[ref].close();
                },
                loadTitles(data) {
                    // this.isLoadTitles = true;
                    this.titlesData = data;
                },
                clickNode: function(node) {
                    this.currentOrg = node;
                    this.isLoadTitles = true;
                    let _self = this;
                    //titles 表格url
                    _self.titlesUrl = "/pos/jobFamilys/" + node.jobFamilyId + "/titles";
                    //positions 表格url
                    _self.positionsUrl = "/pos/jobFamilys/" + node.jobFamilyId + "/positions";
                    _self.jobGroup = node; //树节点对象
                    //请求当前节点数据
                    _self.$http.get("/pos/jobFamilys/" + node.jobFamilyId + "/basicinfo").then((response) => {
                        _self.basicinfo = response.data;
                    }, (response) => {
                        Message({
                            type: 'error',
                            message: response.statusText
                        });
                    });
                },
                fetchTree() {
                    let _self = this;
                    var cache = this.$root.$data.orgGroupTreeCache;
                    if (cache) {
                        this.currentOrg = cache[0];
                        if (cache instanceof Array) {
                            //TODO load  node organization detail
                            let org = cache[0];
                            var jobFamilyId = this.$route.query.jobFamilyId;
                            var walk = function(data) {
                                if (data && data.length > 0) {
                                    data.forEach(function(child, key) {
                                        if (jobFamilyId === String(child['jobFamilyId'])) {
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
                                if (org.jobFamilyId) {
                                    this.clickNode(org);
                                }
                            }
                        }
                        this.regions = cache;
                    } else {
                        // 初始化加载职群树
                        this.$http.get('/pos/jobFamilys/0/children').then((response) => {
                            let Items = [];
                            Items.push(response.data);
                            this.regions = Items;
                            //titles 表格url
                            this.titlesUrl = `/pos/jobFamilys/${response.data.jobFamilyId}/titles`;
                            //positions 表格url
                            this.positionsUrl = `/pos/jobFamilys/${response.data.jobFamilyId}/positions`;
                            this.$http.get(`/pos/jobFamilys/${response.data.jobFamilyId}/basicinfo`).then((response) => {
                                this.basicinfo = response.data;
                            }, (response) => {
                                Message({
                                    type: 'error',
                                    message: response.statusText
                                });
                            });
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
                add() {
                    this.checkIsSelectNode('addGroup');
                },
                deleteBtn(ref) {
                    let _self = this;
                    let jobFamilyId = _self.jobGroup.jobFamilyId;
                    if (jobFamilyId) {
                        var msg1, msg2;
                        if (_self.jobGroup.isParent === 'true') {
                            msg1 = _self.$t('position.deleteMsg1');
                        }
                        if (_self.titlesData.data.length > 0) {
                            msg2 = _self.$t('position.deleteMsg2');
                        }
                        if (msg1 || msg2) {
                            Message({
                                type: 'error',
                                message: msg1,
                                extralMessage: [msg2]
                            });
                            return;
                        }
                        _self.$refs[ref].open();
                    } else {
                        Message({
                            type: 'error',
                            message: _self.$t('position.message.selectFamilyNode')
                        })
                    }

                },
                deleteAlert() {
                    let _self = this;
                    let jobFamilyId = _self.jobGroup.jobFamilyId;
                    _self.$http.delete(`/pos/jobFamilys/${jobFamilyId}`).then((response) => {
                        Message({
                            type: 'success',
                            message: _self.$t('common.deleteSuccess')
                        });
                        _self.$refs.tree.delCheckedNodes(_self.jobGroup, 'jobFamilyId');
                        _self.$root.$data.orgGroupTreeCache = _self.$refs.tree.data;
                    });
                    _self.$refs['confirm'].close();
                },
                edit() {
                    this.checkIsSelectNode('editGroup');
                },
                checkIsSelectNode(_pathName) {
                    let _self = this;
                    if (!_self.jobGroup.jobFamilyId) {
                        Message({
                            type: 'error',
                            message: _self.$t('position.message.selectFamilyNode')
                        })
                        return;
                    }
                    _self.$router.push({
                        name: _pathName,
                        params: {
                            jobFamilyId: _self.jobGroup.jobFamilyId,
                            jobFamilyName: _self.jobGroup.jobFamilyName
                        }
                    });
                },
                fixDist(value, option) {
                    var dist = {};
                    switch (option) {
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
                fixMIBType(value) {
                    return this.fixDist(value, 'MIB_RANK');
                },
                gotitleDetail(value, data) {
                    return `<a href="${location.href}/titleDetails/${data.standardJobId}?jobFamilyId=${this.jobGroup.jobFamilyId}&backName=${this.$route.name}">${value}</a>`;
                },
                goPositionDetail(value, data) {
                    var currentOrg = this.currentOrg;
                    return `<a href="${location.href}/positionDetails/${data.positionId}/${this.jobGroup.jobFamilyId}?backName=${this.$route.name}">${value}</a>`;
                },
        },
        components: {
            Tree: require('../../components/tree/tree.vue')
        }
};

</script>
