<style lang="less">

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
        overflow: auto;
        float: left;
        box-sizing: border-box;
    }

    .treelist-detail {
        margin-left: 230px !important;
        border-left: 2px solid #eee;
    }

    .help-desk {
        padding: 16px 16px 0 16px;
        background-color: #fff;
        height: 100%;
        overflow: auto;
        .help-desk-header {
            position: relative;
            box-sizing: border-box;
            display: inline-block;
            width: 100%;
            overflow: hidden;
            // padding: 12px 0px;
        }
        .headline {
            display: inline-block;
            font-size: 20px;
        }
        .subhead {
            display: inline-block;
            font-size: 14px;
            color: #a5acbe;
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
        }
        .prop-name,
        .prop-val {
            box-sizing: border-box;
            display: inline-flex;
            width: 50%;
            text-align: left;
        }
        .prop-name {
            color: #a5acbe;
        }
        .prop-val {
            color: #6a707d;
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
                // border-bottom:1px solid #ccc;
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
        * {
            box-sizing: border-box;
        }
        .vuetable th,
        .vuetable tbody td {
            border: 1px solid #e4e4e4;
        }
        .group {
            border: none;
            padding-top: 0px;
            margin-left: 0px;
        }
    }

    // company licnese list
    .company-license-list {
        width: 70%;
        // border:1px solid red;
        margin-left: 80px;
        float: left;
        overflow-y: auto;
    }

    .company-license-list li {
        float: left;
        width: 100px;
        overflow: hidden;
        margin-left: 10px;
    }

    .company-license-list a {
        display: block;
        hieght: 36px;
    }

    .company-license-list p {
        width: 74px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .company-license {
        width: 80%;
        height: 90%;
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
    }
</style>

<template lang="html">

<div class="content-wrap ihr-org-operate">
    <!-- 查询 -->
    <div class="group" id="group" style="height:40px;">
        <ui-button class="mr10 dis-tc btn-primary-bd" @click="handleAdd" color="primary" icon="fa-plus"  button-type="button">{{$t('button.add')}}</ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" @click="handleEdit" color="white" icon="fa-pencil-square-o" button-type="button">{{$t('button.edit')}}</ui-button>
        <ui-button class="mr10 dis-tc btn-default-bd" @click="handleDelete" color="white" icon="fa-remove" button-type="button">{{$t('button.delete')}}</ui-button>
        <ui-button color="primary" icon="fa-caret-down" has-dropdown ref="dropdownButton" :size="size">
            <ui-menu contain-focus has-icons has-secondary-text slot="dropdown"
                :options="menuOptions"
                @select="menuOptionSelected"
            ></ui-menu>
           {{$t('button.more')}}
        </ui-button>
<!--         <ui-confirm :header="$t('organization.confirmBox.title')" type="danger" :confirm-button-text="$t('button.delete')" confirm-button-icon="delete" :deny-button-text="$t('button.cancel')" @confirmed="deleteConfirmed" @denied="deleteDenied" :show.sync="show.deleteConfirm" close-on-confirm>
            {{$t('organization.confirmBox.infoText')}}
        </ui-confirm> -->
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
                <div class="help-desk-cnt">
                    <ul class="regular fix">
                        <li>
                            <span class="prop-name">{{$t('organization.orgInfo.effectDate')}}</span>
                            <span class="prop-val">{{orgNodeDetail.beginDate}}</span>
                        </li>
                        <li>
                            <span class="prop-name">{{$t('organization.orgInfo.orgId')}}</span>
                            <span class="prop-val">{{orgNodeDetail.unitCode}}</span>
                        </li>
                        <li>

                            <span class="prop-name">{{$t('organization.orgInfo.headOfOrg')}}</span>
                            <span class="prop-val">{{orgNodeDetail.unitLeaderName}}</span>
                        </li>
                        <li>
                            <span class="prop-name">{{$t('organization.orgInfo.superiorOrg')}}</span>
                            <span class="prop-val" :title="orgNodeDetail.parentUnitName">{{orgNodeDetail.parentUnitName}}</span>
                        </li>
                    </ul>
                </div>
                <div class="tabs">
                    <ui-tabs type="text" background-color="clear" text-color="gray" text-color-active="primary" @tab-change="changeTab">
                        <ui-tab :title="$t('organization.tapButton.orgDetail')" id="org-details" style="position:relative;">
                            <ul id="props-57875212" class="org-details">
                                <li>
                                    <span class="prop-name">{{$t('organization.orgDetails.org')}}</span>
                                    <span class="prop-val">{{orgNodeDetail.unitShortName}}</span>
                                </li>
                                <li>
                                    <span class="prop-name">{{$t('organization.orgDetails.abbreviation')}}</span>
                                    <span class="prop-val">{{orgNodeDetail.abbreviation}}</span>
                                </li>
                                <li>
                                    <span class="prop-name">{{$t('organization.orgInfo.orgId')}}</span>
                                    <span class="prop-val">{{orgNodeDetail.unitCode}}</span>
                                </li>
                                <li>
                                    <span class="prop-name">{{$t('organization.orgDetails.location')}}</span>
                                    <span class="prop-val">{{(orgNodeDetail.city ? (orgNodeDetail.city + ",") : '') + (orgNodeDetail.stateName ? (orgNodeDetail.stateName + ",") : '') + (orgNodeDetail.countryName ? (orgNodeDetail.countryName) : '') }}</span>
                                </li>
                                <li>
                                    <span class="prop-name">{{$t('organization.orgDetails.countryScope')}}</span>
                                    <span class="prop-val">{{orgNodeDetail.countryScopeName}}</span>
                                </li>
                                <li>
                                    <span class="prop-name">{{$t('organization.orgDetails.legalEntity')}}</span>
                                    <span class="prop-val">{{orgNodeDetail.legalentity}}</span>
                                </li>
                                <li>
                                    <span class="prop-name">{{$t('organization.orgDetails.legalRepresentative')}}</span>
                                    <span class="prop-val">{{orgNodeDetail.corporation}}</span>
                                </li>
                                <li>
                                    <span class="prop-name">{{$t('organization.orgInfo.effectDate')}}<i style="color:red;">*</i></span>
                                    <span class="prop-val">{{orgNodeDetail.beginDate}}</span>
                                </li>
                                <li>
                                    <span class="prop-name">{{$t('organization.orgDetails.orgSize')}}</span>
                                    <span class="prop-val">{{orgNodeDetail.unitSize == 0 ? "" : orgNodeDetail.unitSize}}</span>
                                </li>
                                <li>
                                    <span class="prop-name">{{$t('organization.orgInfo.superiorOrg')}}</span>
                                    <span class="prop-val">{{orgNodeDetail.parentUnitName}}</span>
                                </li>
                                <li>
                                    <span class="prop-name">{{$t('organization.orgInfo.headOfOrg')}}</span>
                                    <span class="prop-val">{{orgNodeDetail.unitLeaderName}}</span>
                                </li>
                                <li>
                                    <span class="prop-name">{{$t('organization.orgDetails.orgTier')}}</span>
                                    <span class="prop-val">{{orgNodeDetail.unitTier}}</span>
                                </li>
                                <li>
                                    <span class="prop-name">{{$t('organization.orgDetails.headCount')}}</span>
                                    <span class="prop-val">{{orgNodeDetail.unitSize == 0 ? "" : orgNodeDetail.unitSize}}</span>
                                </li>
                                <li class="fix">
                                    <span style="float:left;display:block;height:36px;line-height:36px;">{{$t('organization.orgDetails.companyLicense')}}</span>
                                    <ul class="company-license-list">
                                        <li class="extra-download" v-for="list in companyLicense">
                                            <a href="javascript:;" @click="downFile(list.attachmentId)" v-if="!list.isPicture">
                                                <img src="assets/images/other.png" alt="" style="width:26px;float:left;margin-top:5px;" :title="list.attachmentName" />
                                                <p>
                                                    {{list.attachmentName}}
                                                </p>
                                            </a>
                                            <a v-else>
                                                <img id="license-pic" v-on:click="showBig($event)" v-bind:src="imgUrl + list.attachmentId" alt="" style="height:100px;" :title="list.attachmentName" />
                                            </a>
                                        </li>
                                    </ul>

                                </li>
                                <li>
                                    <span class="prop-name">{{$t('organization.orgDetails.orgResponsibility')}}</span>
                                    <span class="prop-val">{{orgNodeDetail.unitResponsibility}}</span>
                                </li>
                                <li>
                                    <span class="prop-name">{{$t('organization.orgDetails.additionalInfo')}}</span>
                                    <span class="prop-val">{{orgNodeDetail.remark}}</span>
                                </li>
                            </ul>
                            <div v-on:click="hideLicenseBox();" id="license-box" class="company-license" style="display:none;">
                                <img v-bind:src="showPic" alt="" style="width:100%;" />
                            </div>

                        </ui-tab>

                        <ui-tab :title="$t('organization.tapButton.positions')" id="positions">
                            <!-- <div class="pt10 pb10"><span class="items">Positions <i class="item-number">{{positionsTotal}}</i> Items<span></div> -->
                            <vuetable :load-success-callback="positionsSuccess" :api-url="positionsUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="columns.positions" :sort-order="sortOrder" per-page="10">
                            </vuetable>
                        </ui-tab>

                        <ui-tab :title="$t('organization.tapButton.members')" id="members">
                            <!-- <div class="pt10 pb10"><span class="items">Members <i class="item-number">{{membersTotal}}</i> Items<span></div> -->
                            <vuetable :load-success-callback="membersSuccess" :api-url="memUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="columns.members" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                            </vuetable>
                        </ui-tab>

                        <ui-tab :title="$t('organization.tapButton.history')" id="history-records">
                            <!-- <div class="pt10 pb10"><span class="items">History Records <i class="item-number">{{recordsTotal}}</i> Items<span></div> -->
                            <vuetable :load-success-callback="recordsSuccess" :api-url="hisRecUrl" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="columns.hisRecords" :sort-order="sortOrder" :item-actions="itemActions" per-page="10">
                            </vuetable>
                        </ui-tab>
                    </ui-tabs>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import {formatDate, getDictMapping, downloadFile} from '../../util/assist.js';
import {default as Message} from '../../components/basic/message';
export default {
    data() {
            let _self = this;
            return {
                show: {
                    deleteConfirm: false
                },
                columns: {
                    positions: [{
                        name: 'positionName',
                        title: this.$t('organization.positionTabel.MIBPosition')
                    }, {
                        name: 'positionCode',
                        title: this.$t('organization.positionTabel.positionID')
                    }, {
                        name: 'positioCategory',
                        title: this.$t('organization.positionTabel.jobCategory'),
                        callback(value) {
                            return _self.fixPositionCategory(value);
                        }
                    }, {
                        name: 'mibGrade',
                        title: this.$t('organization.positionTabel.MIBGrade')
                    }, {
                        name: 'businessTitle',
                        title: this.$t('organization.positionTabel.position')
                    }, {
                        name: 'beginDate',
                        dataClass: 'tr',
                        titleClass: 'mw80',
                        title: this.$t('organization.positionTabel.effectDate')
                    }],
                    members: [{
                        name: 'employeeName',
                        title: this.$t('organization.members.employeeName')
                    }, {
                        name: 'employeeCode',
                        dataClass: 'tr',
                        title: this.$t('organization.members.employeeID')
                    }, {
                        name: 'positionName',
                        title: this.$t('organization.members.MIBPosition')
                    }, {
                        name: 'officePhone',
                        dataClass: 'tr',
                        title: this.$t('organization.members.phone')
                    }, {
                        name: 'email',
                        title: this.$t('organization.members.email')
                    }, {
                        name: 'officeAddress',
                        title: this.$t('organization.members.location')
                    }],
                    hisRecords: [{
                        name: 'operateTypeName',
                        title: this.$t('organization.historyRecord.operatType')
                    }, {
                        name: 'unitName',
                        title: this.$t('organization.historyRecord.orgName')
                    }, {
                        name: 'tier',
                        dataClass: 'tr',
                        title: this.$t('organization.historyRecord.tier')
                    }, {
                        name: 'effectiveDate',
                        dataClass: 'tr',
                        titleClass: 'mw80',
                        title: this.$t('organization.historyRecord.effectDate')
                    }, {
                        name: 'superioirOrgName',
                        title: this.$t('organization.historyRecord.superioirOrg')
                    }, {
                        name: 'superioirOrgCode',
                        title: this.$t('organization.historyRecord.superiorOrgId')
                    }]
                },
                menuOptions: [{
                    id: 'changeOrg',
                    label: this.$t('organization.moreSelection.changeOrg'),
                    icon: '',
                    secondaryText: 'Ctrl+E'
                }, {
                    id: 'changeTir',
                    label: this.$t('organization.moreSelection.changeTier'),
                    icon: '',
                    secondaryText: 'Ctrl+D'
                }, {
                    id: 'mergeOrg',
                    label: this.$t('organization.moreSelection.mergeOrg'),
                    icon: '',
                    secondaryText: 'Ctrl+Shift+S'
                }, {
                    id: 'annulOrg',
                    label: this.$t('organization.moreSelection.cancelOrg'),
                    icon: '',
                    secondaryText: 'Del'
                }],
         
                companyLicense: [],
                showPic: '',
                breadCrumbItem: [],
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
                            _self.$root.$data.orgSettingTreeCache = _self.$refs.tree.data;
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
                positionsUrl: '',
                memUrl: '',
                hisRecUrl: '',
                positionsTotal: 0,
                membersTotal: 0,
                recordsTotal: 0,
                loadTime: 0,
                curTab: 'org-details',
                positionCategory: {},
                mibGradeDist: {},
                imgUrl: Vue.config.APIURL + '/system/attachment/downloadImg/'
            };
        },
        computed: {
            showCheckbox() {
                return false;
            }
        },
        created() {
            this.fetchTree();
            var self = this;
            getDictMapping('POSITION_CATEGORY').then(function(res) {
                self.positionCategory = res;
            });
            getDictMapping('MIB_RANK').then(function(res) {
                self.mibGradeDist = res;
            })
        },
        mounted() {
            let that = this;
            that.initHeight();
            window.addEventListener('resize', function() {
                that.initHeight();
            })
            var orgId = that.$route.query.orgId;
            if (orgId !== undefined && orgId !== null) {
              that.$refs.tree.setNodeActive(orgId, 'orgId');
            }
           
        },
        methods: {
                downFile(id) {
                    downloadFile('/system/attachment/downloadFile', {
                        attachmentId: id
                    });
                },
                //company license 是图片就放大展示
                showBig(ev) {
                    var box = document.getElementById('license-box');
                    this.showPic = ev.target.src;
                    box.style.display = 'block';
                },

                //展示图片再点击隐藏
                hideLicenseBox() {
                    var box = document.getElementById('license-box');
                    // this.showPic = src;
                    box.style.display = 'none';
                },



                fixPositionCategory(value) {
                    var result = '';
                    var dist = this.positionCategory;
                    for (let key of Object.keys(dist)) {
                        if (dist[key] === value) {
                            result = key;
                            break;
                        }
                    }
                    return result;
                },
                fixMibGradeDist(value) {
                    var result = '';
                    var dist = this.mibGradeDist;
                    for (let key of Object.keys(dist)) {
                        if (dist[key] === value) {
                            result = key;
                            break;
                        }
                    }
                    return result;
                },
                fetchTree() {
                    var cache = this.$root.$data.orgSettingTreeCache;
                    if (cache) {
                        var orgId = this.$route.query.orgId || cache[0].orgId;
                        if (this.$route.query) {
                            this.loadTime++;
                        }
                        this.currentOrg.orgId = orgId;
                        this.loadNodeDetail(orgId);
                        this.trees = cache;
                        return;
                    }

                    const currentNode = this.currentNode;

                    //TODO Initialize root node
                    this.$http.get(`/org/orgs/parent`).then((response) => {
                        this.trees = response.data;
                        this.currentOrg = response.data[0];
                    }).then(() => {
                        if (this.trees instanceof Array) {
                            //TODO load  node organization detail
                            let org = this.trees[0];
                            var orgId = this.$route.query.orgId || org.orgId;
                            this.loadNodeDetail(orgId);
                        }
                    });
                },

                /**
                 * On the node to Click get the detail
                 */

                loadNodeDetail(node) {

                    if (this.loadTime !== 2) {
                        this.loadTime++;
                    }
                    var self = this;
                    if (node && node instanceof Object) {

                        this.currentOrg = Object.assign({}, node);
                        node = this.currentOrg.orgId;
                    }
                    this.$http.get('/employee/employees/attachment?businessId=' + node).then(function(response) {
                        self.companyLicense = response.data;
                        var type = '';
                        for (let list in self.companyLicense) {
                            type = self.companyLicense[list].attachmentName.split('.')[1];
                            type = type.toLowerCase();
                            if (type == 'jpg' || type == 'jpeg' || type == 'png' || type == 'bmp' || type == 'gif') {
                                self.companyLicense[list].isPicture = true;
                            }
                        }
                    })

                    // 更改组织时刷新表格的值
                    if (this.curTab !== 'org-details') {
                        this.$dispatch('active-tab-changed', this.curTab);
                    }

                    let data;
                    this.$http.get(`/org/orgs/${node}/orgdetails`).then((response) => {
                        data = response.data;
                        if (data) {
                            if (data.beginDate) data.beginDate = formatDate(new Date(data.beginDate));

                            this.orgNodeDetail = data;
                        }
                    });
                },


                /**
                 * Add an organization
                 */

                handleAdd() {
                    if (!this.checkIsSelectNode()) return;
                    this.forwardUrl('add_organization', {
                        'oid': this.currentOrg.orgId,
                        'fullUnitName': this.orgNodeDetail.fullUnitName
                    });
                },
                /**
                 * edit an organization
                 */
                handleEdit() {
                    if (!this.checkIsSelectNode()) return;
                    this.forwardUrl('edit_organization');
                },
                /**
                 * enter to delete
                 */
                deleteConfirmed() {

                    this.$http.post(`/org/orgs/org/units/${this.currentOrg.orgId}/delete`).then((response) => {
                        if (response.data) {
                            Message({
                                type: 'success',
                                message: this.$t('organization.message.orgSettingDelete')
                            });
                            this.$refs.tree.delCheckedNodes(this.currentOrg, 'orgId');
                            this.currentOrg = {};
                            this.$root.$data.orgSettingTreeCache = this.$refs.tree.data;
                        }
                    });
                },
                /**
                 * not delete
                 */
                deleteDenied() {},
                /**
                 * delete an organization
                 */
                handleDelete() {
                    if (!this.checkIsSelectNode()) return;
                    this.show.deleteConfirm = true;
                    // Message({
                    //     type: 'success',
                    //     message: this.$t('organization.message.orgDeleteSucceed')
                    // });
                },
                /**
                 * edit an organization
                 */
                handleChange() {
                    if (!this.checkIsSelectNode()) return;
                    this.forwardUrl('change_organization');
                },
                handleChangeTir() {
                    if (!this.checkIsSelectNode()) return;
                    this.forwardUrl('change_tir');
                },
                handleMergeOrg() {
                    if (!this.checkIsSelectNode()) return;
                    this.forwardUrl('merge_organization');
                },
                handleAnnulOrg() {
                    if (!this.checkIsSelectNode()) return;
                    this.forwardUrl('annul_organization');
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
                    if ((this.currentOrg.orgId || this.currentOrg.orgId === 0) && this.loadTime === 2) return true;
                    Message({
                        type: 'error',
                        message: this.$t('organization.message.checkIsSelectNode')
                    });
                    return false;
                },
                changeTab(tabId) {
                    switch (tabId) {
                        case 'org-details':
                            // this.loadNodeDetail(this.currentOrg.orgId);
                            this.curTab = 'org-details';
                            break;
                        case 'positions':
                            this.positionsUrl = `/org/orgs/${this.currentOrg.orgId}/positions`;
                            this.curTab = 'positions';
                            break;
                        case 'members':
                            this.memUrl = `/org/orgs/${this.currentOrg.orgId}/members`;
                            this.curTab = 'members';
                            break;
                        case 'history-records':
                            this.hisRecUrl = `/org/orgs/${this.currentOrg.orgId}/historyrecords`;
                            this.curTab = 'history-records';
                            break;
                        default:
                            Message({
                                type: 'error',
                                message: this.$t('organization.message.orgSettingServerError')
                            });
                    }
                },
                menuOptionSelected(option) {
                    if (!this.checkIsSelectNode()) return;

                    option = option || null;

                    if (!option) return;
                    switch (option.id) {
                        case 'changeOrg':
                            this.handleChange();
                            break;
                        case 'changeTir':
                            this.handleChangeTir();
                            break;
                        case 'mergeOrg':
                            this.handleMergeOrg();
                            break;
                        case 'annulOrg':
                            this.handleAnnulOrg();
                            break;
                        default:
                            Message({
                                type: 'error',
                                message: this.$t('organization.message.orgSettingServerError')
                            });

                    }

                },
                positionsSuccess(data) {
                    this.positionsTotal = data.total;
                },
                membersSuccess(data) {
                    this.membersTotal = data.total;
                },
                recordsSuccess(data) {
                    this.recordsTotal = data.total;
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
        },
        events: {
            'vuetable:action': function(action, data) {
                if (action == 'view-item') {
                    this.viewProfile(data.id)
                }
            },
            'vuetable:load-error': function(response) {
                Message({
                    type: 'error',
                    message: this.$t('organization.message.orgSettingLoadError')
                });
            }
        },
        components: {
          Tree: require('../../components/tree/tree.vue')
        }
};

</script>
