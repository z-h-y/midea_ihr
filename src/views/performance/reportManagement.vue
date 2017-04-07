<style lang="less">

.ihr-performance-reporting {
    .mb-suitable {
        margin-bottom: 89px;
    }
    .text-color-gray {
        color: #6a707d;
    }
    .tree-panel {
        box-sizing: border-box;
        width: 100%;
        border: 1px solid #ecedee;
        overflow: hidden;
        float: left;
        background-color: #fff;
    }
    .treelist {
        margin: 1px;
        width: 230px;
        max-height: 100%;
        padding: 8px;
        // overflow-x: hidden;
        overflow-y: auto;
        float: left;
        box-sizing: border-box;
    }
    .treelist-detail {
        margin-left: 230px !important;
        border-left: 2px solid #eee;
    }
    .help-desk {
        padding: 15px 15px 15px 16px;
        margin: 1px;
        background-color: #fff;
        height: 100%;
        .help-desk-header {
            position: relative;
            box-sizing: border-box;
            display: inline-block;
            width: 100%;
            overflow: hidden;
            padding: 12px 0px;
            .headline {
                display: inline-flex;
                font-size: 20px;
            }
            .subhead {
                display: inline-flex;
                font-size: 14px;
                color: #a5acbe;
            }
        }
        .regular {
            overflow: hidden;
            li {
                box-sizing: border-box;
                display: inline-block;
                float: left;
                width: 50%;
                overflow: hidden;
                font-size: 14px;
                height: 36px;
                line-height: 36px;
                vertical-align: middle;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: #a5acbe;
            }
            .prop-name,
            .prop-val {
                box-sizing: border-box;
                display: inline-flex;
                width: 50%;
                text-align: left;
                color: #a5acbe;
            }
        }
        .org-details {
            li {
                box-sizing: border-box;
                font-size: 14px;
                min-height: 36px;
                line-height: 36px;
                vertical-align: middle;
                color: #a5acbe;
                word-break: break-word;
            }
            .prop-name {
                float: left;
                width: 200px;
                box-sizing: border-box;
                text-align: left;
            }
            .prop-val {
                display: block;
                color: #545454;
                margin-left: 200px;
            }
        }
        .tabs {
            margin-top: 16px;
        }
    }
    .ihr-org-operate {
        .vuetable th,
        .vuetable tbody td {
            border: 1px solid #e4e4e4;
        }
    }
    .mb16 {
        margin-bottom: 16px;
    }
    .desk-bord {
        border-bottom: 1px solid #ecedee;
        padding-bottom: 16px;
    }
    .report-form {
        margin-top: 20px;
    }
    .group {
        margin-left: 0px;
        padding-top: 0px;
        border: none;
    }
    .text-editor [readonly] {
        background: #f5f5f5;
    }
}

</style>

<template lang="html">
<div>
<div class="content-wrap ihr-org-operate ihr-performance-reporting">
    <!-- 查询 -->
    <div class="mb16">
        <div class="group" id="group" style="height:40px;">
            <ui-button class="mr10 dis-tc btn-default-bd" @click="handleEdit" color="white" icon="fa-pencil-square-o" button-type="button">{{$t('button.edit')}}</ui-button>
        </div>
    </div>
    <div class="content-main fix">
        <div class="tree-panel fix">
            <div class="treelist" id="treePanel">
                <tree :data="trees" :level-config="levelConfig" :show-checkbox="showCheckbox" ref="tree" :click-node="loadNodeDetail"></tree>
            </div>

            <div id="treelistDetail" class="help-desk treelist-detail">
                <div class="help-desk-header">
                    <h3 class="headline">{{orgNodeDetail.unitShortName}}</h3>
                    <span class="subhead">{{orgNodeDetail.abbreviation ? '(' + orgNodeDetail.abbreviation + ')' : ''}}</span>
                </div>
                <div class="help-desk-cnt desk-bord">
                    <ul class="regular fix">
                        <li>
                            <span class="prop-name">{{$t('staff.effectiveDate')}}</span>
                            <span class="prop-val">{{orgNodeDetail.beginDate}}</span>
                        </li>
                        <li>
                            <span class="prop-name">{{$t('performance.organizationID')}}</span>
                            <span class="prop-val">{{orgNodeDetail.unitCode}}</span>
                        </li>
                        <li>
                            <span class="prop-name">{{$t('performance.headOfOrganization')}}</span>
                            <span class="prop-val">{{orgNodeDetail.unitLeaderName}}</span>
                        </li>
                        <li>
                            <span class="prop-name">{{$t('performance.superiorOrganization')}}</span>
                            <span class="prop-val" :title="orgNodeDetail.parentUnitName">{{orgNodeDetail.parentUnitName}}</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <v-form v-show="!readonlyFlag" ref="relation" :model="reportManageModel" :schema="reportManageScheme" label-width="300" label-suffix="" :cols="1" form-style="report-form">
                        <select-field property="orgType" editor-width="300" :readonly="readonlyFlag"></select-field>
                        <text-field property='responsibleName' @open-selector="openSelector('perselect')" type="selector" :readonly="readonlyFlag" :show="show" editor-width="300"></text-field>
                    </v-form>
                    <v-form v-show="readonlyFlag" ref="relationr" :model="reportManageModelR" :schema="reportManageSchemeR" label-width="300" label-suffix="" :cols="1" form-style="report-form">
                        <select-field property="orgTypeR" editor-width="300" :readonly="readonlyFlag"></select-field>
                        <text-field property='responsibleNameR' @open-selector="openSelector('perselect')" type="selector" :readonly="readonlyFlag" :show="show" editor-width="300"></text-field>
                    </v-form>

                </div>
            </div>
        </div>
    </div>
    <div class="btn-group" v-show="readonlyFlag == false">
        <ui-button @click="saveReport" color="primary mr10">{{$t('button.submit')}}</ui-button>
        <ui-button @click="handleCancel" class="btn-default-bd" type="flat">{{$t('button.cancel')}}</ui-button>
    </div>
</div>
<person-selector ref="perselect" :show="show" multi-selected="false" v-if="!readonlyFlag" :handle-comfirmed="handleComfirmed"></person-selector>
</div>
</template>

<script>

import {
    formatDate, getDictMapping
}
from '../../util/assist.js';
import {
    default as Message
}
from '../../components/basic/message';
import {
    default as Schema
}
from '../../schema/index';

export default {
    data() {
            let _self = this;
            let reportManageScheme = new Schema({
                orgType: {
                    label: _self.$t('performance.organizationType'),
                    required: true,
                    mapping: function() {
                        return getDictMapping('SCHEME_CATEGORY');
                    }
                },
                responsibleName: {
                    label: _self.$t('performance.responsibleforPerformance'),
                    required: true
                }
            });

            let reportManageSchemeR = new Schema({
                orgTypeR: {
                    label: _self.$t('performance.organizationType'),
                    required: false,
                    mapping: function() {
                        return getDictMapping('SCHEME_CATEGORY');
                    }
                },
                responsibleNameR: {
                    label: _self.$t('performance.responsibleforPerformance'),
                    required: false
                }
            });



            return {
                show: {
                    modal: false,
                    deleteConfirm: false
                },
                readonlyFlag: true,
                trees: {}, // organization trees
                currentNode: 0, //organization trees root node
                currentOrg: {},
                levelConfig: {
                    labelProperty: 'orgShortName',
                    children: {
                        lazy: true,
                        recursive: true,
                        labelProperty: 'orgShortName',
                        load: function(node, callback) {
                            let parentId = node.data.orgId;
                            _self.$http.get(`/org/orgs/${parentId}/children`).then((response) => {
                                node.children = response.data;
                                if (typeof callback === 'function') {
                                    callback();
                                }
                            });
                        }
                    }
                },
                orgNodeDetail: {},
                area: [],
                reportManageSchemeR: reportManageSchemeR,
                reportManageScheme: reportManageScheme,
                reportManageModel: reportManageScheme.newModel(),
                reportManageModelR: reportManageSchemeR.newModel(),
                curTab: 'org-details',
                positionCategory: {},
                mibGradeDist: {}
            };
        },
        computed: {
            showCheckbox() {
                return false;
            }
        },
        mounted() {
            let _self = this;
            _self.initHeight();
            window.addEventListener('resize', function() {
                _self.initHeight();
            })
        },
        created() {
            this.fetchTree();
            this.$http.get('/org/area/0/child').then(function(res) {
                this.area = res.data;
            })
            var self = this;
            getDictMapping('POSITION_CATEGORY').then(function(res) {
                self.positionCategory = res;
            });
            getDictMapping('MIB_RANK').then(function(res) {
                self.mibGradeDist = res;
            })

        },
        methods: {
            handleComfirmed(selectedData) {
                let containArray1 = [],
                    containArray2 = [];
                for (let i = 0; i < selectedData.length; i++) {
                    containArray1[i] = selectedData[i].employeeName
                    containArray2[i] = selectedData[i].employeeId
                }
                this.reportManageModel.responsibleName = containArray1.join(',');
                this.reportManageModel.responsibleId = containArray2.join(',');
            },
            openSelector(selector) {
              this.$refs[selector].open();
            },
            handleCancel() {
                    this.readonlyFlag = true;
                },




                fetchTree() {
                    const currentNode = this.currentNode;
                    //TODO Initialize root node
                    this.$http.get(`/org/orgs/parent`).then((response) => {
                        this.trees = response.data;
                        this.currentOrg = response.data[0];
                    }).then(() => {
                        if (this.trees instanceof Array) {
                            //TODO load  node organization detail
                            let org = this.trees[0];
                            if (org instanceof Object) {
                                if (org.orgId) {
                                    this.loadNodeDetail(org.orgId);
                                }
                            }
                        }
                    });
                },

                /**
                 * On the node to Click get the detail
                 */

                loadNodeDetail(node) {
                    if (node && node instanceof Object) {

                        this.currentOrg = Object.assign({}, node);
                        node = this.currentOrg.orgId;
                    }
                    // 更改组织时刷新表格的值
                    if (this.curTab !== 'org-details') {
                        // unknow 暂时还不知道这一项的作用，这里先注释掉
                        // this. $dispatch('active-tab-changed', this.curTab);
                    }

                    let data;
                    this.$http.get(`/org/orgs/${node}/orgdetails`).then((response) => {
                        data = response.data;
                        if (data) {
                            if (data.countryScope) {
                                data.countryScope = data.countryScope.split(',');
                                var area = this.area;
                                var countryScope = [];
                                data.countryScope.forEach(function(item) {
                                    for (var i = 0, len = area.length; i < len; i++) {
                                        if (area[i].areaId === item) {
                                            countryScope.push(area[i].areaName);
                                            break;
                                        }
                                    }
                                });
                                data.countryScope = countryScope.join(',');
                            }

                            if (data.beginDate) data.beginDate = formatDate(new Date(data.beginDate));

                            this.orgNodeDetail = data;
                            this.readonlyFlag = true;
                        }
                    });

                    this.$http.get(`/performance/schemeInfo/findUnitLeader`, {
                        params: {
                            unitId: node
                        }
                    }).then((response) => {
                        let data = response.data;
                        // this.$refs.relationForm.reset();
                        this.reportManageModel.reset();
                        this.reportManageModel.schemeUnitLeaderId = data.schemeUnitLeaderId;
                        this.reportManageModel.orgType = data.schemeCategory;
                        this.reportManageModelR.orgTypeR = data.schemeCategory;
                        this.reportManageModel.responsibleName = data.employeeName;
                        this.reportManageModelR.responsibleNameR = data.employeeName;
                        this.reportManageModel.responsibleId = data.employeeId;
                    });
                },

                handleEdit() {
                    this.show.modal = false;
                    this.readonlyFlag = false;
                },

                saveReport() {
                    let passed = this.$refs.relation.isFormValidate();
                    if (!passed) return;

                    let dto = {
                        unitId: this.orgNodeDetail.unitId,
                        employeeId: this.reportManageModel.responsibleId,
                        schemeCategory: this.reportManageModel.orgType
                    };
                    let schemeUnitLeaderId = this.reportManageModel.schemeUnitLeaderId;
                    let url = "";
                    if (!schemeUnitLeaderId) {
                        url = "/performance/schemeInfo/createUnitLeader";
                    } else {
                        url = "/performance/schemeInfo/updateUnitLeader";
                        dto.schemeUnitLeaderId = this.reportManageModel.schemeUnitLeaderId
                    }


                    this.$http.post(url, dto, {
                        emulateJSON: true
                    }).then((response) => {
                        if (response.body) {
                            this.readonlyFlag = true;
                            this.loadNodeDetail(this.orgNodeDetail.unitId);
                            Message({
                                type: 'success',
                                message: this.$t('common.saveSuccess')
                            })
                        }
                    })
                },

                /**
                 * forward to url
                 */
                forwardUrl(pathName, params) {
                    params = params || {
                        'oid': this.currentOrg.orgId
                    };
                    this.$router.push({
                        name: pathName,
                        params: params
                    });

                    this.$router.push({
                        name: pathName,
                        params: params
                    });
                },
                /**
                 * Check whether the node is selected
                 */
                checkIsSelectNode() {
                    if (this.currentOrg.orgId || this.currentOrg.orgId === 0) return true;
                    Message({
                        type: 'error',
                        message: this.$t('performance.message.reportManage')
                    });
                    return false;
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
                }
        },
        components: {
            Tree: require('../../components/tree/tree.vue')
        }
};

</script>
