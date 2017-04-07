<style lang="less">

.ihr-position-title {
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
        padding-top: 0;
        margin-left: 0;
    }
}

</style>

<template lang="html">

<div class="content-wrap fix ihr-position-title">
    <div class="group" id="group" style="height:40px;">
        <ui-button class="mr10 dis-tc btn-primary-bd" icon="fa-plus" color="primary" @click="add" button-type="button">{{$t('button.add')}}</ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-pencil-square-o" type="flat" @click="edit" button-type="button">{{$t('button.edit')}}</ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" icon="fa-remove" type="flat" @click="deleteBtn" button-type="button">{{$t('button.delete')}}</ui-button>
        <!-- <ui-button @opened="openMenu" class="dis-tc-t btn-default-bd" type="flat" show-menu-icons has-dropdown-menu :menu-options="shareMenuOptions" button-type="button" icon="fa-caret-down" :icon-right="true" open-dropdown-on="click" @menu-option-selected="menuOptionSelected" :text="$t('button.more')"></ui-button> -->
        <!-- <input id="excelFile" class="dn" type="file" name="file" v-on:change="uploadExcel($event)"> -->
        <file-upload :title="$t('button.upload')" id="excelFile" class="menu-option-upload file-upload" name="file" :post-action="files.url" :extensions="files.extensions" :accept="files.accept" :multiple="files.multiple" :size="files.size" ref="upload" :drop="files.drop"></file-upload>
        <!-- <ui-button class="dis-tc-t btn-default-bd" icon="fa-download" type="flat" text="Download"></ui-button> -->
    </div>
    <ui-modal ref="showDelTips" :title="$t('position.titleDeleteModalHeader')">
        {{delText}}
        <div slot="footer">
            <ui-button @click="deleteAlert" color="primary">{{$t('button.confirm')}}</ui-button>
            <ui-button @click="close('showDelTips')">{{$t('button.close')}}</ui-button>
        </div>
    </ui-modal>
    <div class="tree-panel fix">
        <div class="treelist" id="treePanel">
            <tree :data="regions" :level-config="levelConfig" :show-checkbox="showCheckbox" ref="tree" :click-node="clickNode"></tree>
        </div>
        <div class="help-desk treelist-detail" id="treelistDetail">
            <div class="vuetable-wrapper">
                <vuetable ref="protable" :api-url="titlesUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="titlesColumns" :item-actions="itemActions" per-page="10">
                </vuetable>
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
    downloadFile
}
from '../../util/assist.js';
export default {
    data() {
            let _self = this;
            return {
                delText: _self.$t('position.titleDelText'),
                selectedRow: [],
                jobGroup: {},
                files: {
                    url: Vue.config.APIURL + '/pos/standardJobs/importStandardJobInfo',
                    accept: '',
                    size: 1024 * 1024 * 2,
                    multiple: false,
                    extensions: 'xlsx,xls',
                    // extensions: ['gif','jpg','png'],
                    // extensions: /\.(gif|png|jpg)$/i,
                    files: [],
                    upload: {},
                    drop: true,
                    auto: true
                },
                disabled: true,
                titlesUrl: "",
                isParent: '',
                titlesColumns: [{
                    name: '__checkbox:standardJobId',
                    title: ''
                }, {
                    name: 'standardJobName',
                    title: this.$t('position.columns.titleTitleName'),
                    callback: 'goTitleDetail'
                }, {
                    name: 'standardJobCode',
                    title: this.$t('position.columns.titleTitleID')
                }, {
                    name: 'mibGrade',
                    title: this.$t('position.columns.titleMIBGrade')
                }],
                shareMenuOptions: [{
                    id: 'downloadTemplate',
                    text: this.$t('position.titleDownloadTemplate')
                }, {
                    id: 'import',
                    text: this.$t('button.batchImport')
                }],
                //tree
                regions: {},
                levelConfig: {
                    labelProperty: 'jobFamilyName',
                    children: {
                        lazy: true,
                        recursive: true,
                        labelProperty: 'jobFamilyName',
                        load: function(node, callback) {
                            _self.$root.$data.orgTitleTreeCache = _self.$refs.tree.data;
                            if (node.data.isParent === 'true') {
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
                showCheckbox: false
            };
        },
        computed: {},
        mounted() {
            let _self = this;
            _self.initHeight();
            window.addEventListener('resize', function() {
                _self.initHeight();
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
            close(type) {
                this.$refs[type].close()
            },
            openMenu() {
                    var el = document.getElementById('excelFile');
                    el.style.display = "block";
                    document.getElementsByClassName('ui-menu-option')[1].appendChild(el);
                },
                clickNode: function(node) {
                    let _self = this;
                    _self.isParent = node.isParent;
                    _self.jobGroup = node;
                    if (_self.isParent === 'false') {
                        _self.titlesUrl = `/pos/standardJobs?jobFamilyId=${node.jobFamilyId}`;
                        _self.jobGroup = node;
                        _self.disabled = false;
                    } else if (_self.isParent === 'true' && node.jobFamilyId === 1) {
                        _self.titlesUrl = `/pos/standardJobs`;
                        _self.jobGroup = node;
                        _self.disabled = false;
                    }
                },
                fetchTree() {
                    let _self = this;
                    var cache = this.$root.$data.orgTitleTreeCache;
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
                        _self.$http.get('/pos/jobFamilys/0/children', {}, {}).then((response) => {
                            let Items = [];
                            Items.push(response.data);
                            _self.regions = Items;
                            var jobFamilyId = this.$route.query.jobFamilyId || response.data.jobFamilyId;
                            _self.titlesUrl = `/pos/standardJobs?jobFamilyId=${jobFamilyId}`;
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
                    let _self = this;
                    let jobFamilyId = _self.jobGroup.jobFamilyId;
                    let jobFamilyName = _self.jobGroup.jobFamilyName ? _self.jobGroup.jobFamilyName : '';
                    //只有子节点可以选择
                    if (_self.isParent === 'true' || !_self.isParent) {
                        Message({
                            type: 'error',
                            message: _self.$t('position.message.selectChildGroup') + ' ' + jobFamilyName
                        })
                        return;
                    }
                    if (_self.jobGroup.jobFamilyId) {
                        _self.$router.push({
                            name: 'addTitle',
                            params: {
                                jobFamilyId: _self.jobGroup.jobFamilyId,
                                jobFamilyName: _self.jobGroup.jobFamilyName
                            }
                        });
                    }
                },
                deleteBtn() {
                    let rows = this.selectedRow;
                    if (!rows.length == 0) {
                        this.$http.post('/pos/standardJobs/checkContainPosition', {
                            standardJobIds: rows
                        }, {
                            emulateJSON: true
                        }).then(function(res) {
                            if (res.data > 0) {
                                Message({
                                    type: 'error',
                                    message: 'There are valid MIB positions under this job title,you need to delete those MIB positions before deleting it.'
                                })
                            } else {
                                this.$refs.showDelTips.open();
                            }

                        });

                    } else {
                        Message({
                            type: 'error',
                            message: this.$t('position.message.selectDeltitle')
                        })
                    }
                },
                deleteAlert() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    _self.$http.post('/pos/standardJobs/deleteStandardJobs', {
                        standardJobIds: rows
                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        Message({
                            type: 'success',
                            message: _self.$t('position.message.deleteSuccess')
                        });
                        this.$refs.protable.reloadData(); //刷新表格
                    });
                    this.close('showDelTips');
                },
                edit() {
                    let _self = this;
                    let rows = _self.selectedRow;
                    let standardJobId = rows[0];
                    if (rows.length === 1) {

                        _self.$http.get(`/pos/standardJobs/${rows[0]}/validation`).then(function(response) {
                            if (response.data) {
                                // window.open(`${location.href}/edit/${standardJobId}`);
                                _self.$router.push({
                                    name: 'editTitle',
                                    params: {
                                        standardJobId: `${rows[0]}`
                                    }
                                });
                            } else {
                                Message({
                                    type: 'error',
                                    message: this.$t('position.message.positionUse')
                                })
                            }
                        });

                    } else {
                        Message({
                            type: 'error',
                            message: this.$t('position.message.selectTitle')
                        })
                    }
                },
                goTitleDetail(value, data) {
                    return `<a href="${location.href}/titleDetails/${data.standardJobId}?jobFamilyId=${this.jobGroup.jobFamilyId}&backName=${this.$route.name}">${value}</a>`;
                },
                menuOptionSelected(option) {
                    switch (option.id) {
                        case 'import':
                            // document.getElementById('excelFile').click();
                            break;
                        case 'downloadTemplate':
                            this.download();
                            break;
                    }
                },
                download() {
                    downloadFile('/pos/standardJobs/dowloadStandardJobInfo');
                }
        },
        events: {
            addFileUpload(file, component) {
                    if (this.files.auto) {
                        component.active = true;
                    }
                },
                afterFileUpload(file, component) {
                    if (file.data === 'true' || file.data === true) {
                        Message({
                            type: 'success',
                            message: this.$t('staff.message.importSuccess')
                        });
                    } else {
                        if (!file.error) {
                            downloadFile('/system/attachment/downloadFile', {
                                attachmentId: file.data
                            });
                        }
                        Message({
                            type: 'error',
                            message: file.data.message || 'Template error, please select valid one for import!'
                        });
                    }
                },
                fileUploadFail(file, component) {
                    Message({
                        type: 'error',
                        message: 'Template error, please select valid one for import!'
                    });
                }
        },
        components: {
            Tree: require('../../components/tree/tree.vue'),
            FileUpload: require('../../components/basic/FileUpload.vue')
        }
};

</script>
