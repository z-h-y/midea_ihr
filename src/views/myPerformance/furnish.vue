<style lang="less">

// 公共样式
@import "./style/ihr-annualPerformance-commom.less";
#ind-per {
    padding: 16px 16px;
    .help-desk-ctn {
        background: transparent;
    }
}

.total-indicators-head,
.process-history-head {
    width: 100%;
    overflow: hidden;
    .bte {
        border-bottom-color: #f2f2f2;
    }
    .bg {
        background: #fafafa;
    }
    .head-title {
        padding-left: 16px;
        line-height: 45px;
        color: #72777c;
        font-size: 16px;
    }
}

.indicators-ctn-wrap {
    position: relative;
    overflow: hidden;
    .indicators-item {
        padding: 0px 16px;
        .add-indicators {
            user-select: none;
            align-items: center;
            display: inline-flex;
            padding-bottom: 7px;
            padding-top: 7px;
            color: #3aa2eb;
            font-size: 24px;
            padding-left: 16px;
            .fa {
                cursor: pointer;
                vertical-align: middle;
            }
            .add-txt {
                cursor: pointer;
                display: inline-block;
                margin-left: 12px;
                font-size: 14px;
            }
        }
        .indicators-head {
            border-bottom: 1px solid #f2f2f2;
            width: 100%;
            display: table;
            .title {
                width: 100%;
                height: 45px;
                box-sizing: border-box;
                display: table-cell;
                vertical-align: middle;
                .number {
                    float: left;
                    vertical-align: middle;
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    color: #fff;
                    font-size: 16px;
                    text-align: center;
                    background: #97caff;
                }
                .indicators-weight-title {
                    height: 20px;
                    line-height: 20px;
                    padding-left: 8px;
                    font-weight: bold;
                    vertical-align: middle;
                    font-size: 14px;
                    color: #2a3c59;
                }
            }
            .operate {
                padding-right: 5px;
                box-sizing: border-box;
                vertical-align: middle;
                text-align: right;
                color: #c6cbcf;
                font-size: 16px;
                width: 145px;
                margin: 13px 0;
                i {
                    cursor: pointer;
                    margin-right: 20px;
                }
                i:hover {
                    color: #2a3c59;
                }
                i:last-child {
                    margin-right: 0px;
                }
            }
        }
        .indicators-body {
            padding: 16px 0;
            .prop-name {
                float: left;
                white-space: nowrap;
                box-sizing: border-box;
                overflow: hidden;
                text-overflow: ellipsis;
                height: 28px;
                padding-right: 10px;
                line-height: 28px;
                width: 160px;
                text-align: left;
                line-height: 28px;
                font-size: 14px;
                color: #a5acbe;
            }
            .field-content {
                margin-left: 175px;
                .text-editor {
                    width: 100%;
                }
            }
        }
    }
    .loadding {
        padding: 20px;
        text-align: center;
    }
    .alert {
        padding: 0px;
        .alert-ctn {
            padding: 20px;
            background-color: #fcf8e3;
            border-color: #faebcc;
            color: #8a6d3b;
            font-size: 16px;
        }
    }
    .select-indicator {
        text-decoration: underline;
        font-size: 14px;
        text-indent: 2px;
    }
}

#process-history {
    .ui-popover {
        width: 100px;
        padding: 16px 5px;
    }
}

.operate {
    i.cursor-default {
        cursor: default !important;
        &:hover {
            color: #c6cbcf !important;
        }
    }
}

.process-history {
    .process-history-ctn {
        ul {
            overflow: hidden;
            position: relative;
            z-index: 1;
            padding: 10px;
        }
        .process-history-item {
            min-height: 198px;
            padding: 2px;
            position: relative;
            margin-bottom: 10px;
            &:nth-child(odd){
              .user-area{
                left: 0px;
              }
            }
            .img-wrap {
                display: block;
                width: 80px;
                height: 80px;
                margin: 0px auto;
                .valign {
                    display: table;
                    overflow: hidden;
                    height: 100%;
                    .valign-ctn {
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        text-align: center;
                        position: relative;
                        .valign-inner {
                            width: 70px;
                            height: 70px;
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            margin: -35px 0 0 -35px;
                        }
                    }
                    .valign-ctn.active {
                        border: 2px solid #3aa2eb;
                    }
                }
            }
            .text {
                position: relative;
                text-align: center;
                min-height: 55px;
                margin-bottom: 10px;
                p {
                    font-size: 14px;
                    color: #2a3c59;
                    margin: 10px 0 0 0;
                }
                p:nth-child(2) {
                    color: #a5acbe;
                }
                .ui-button {
                    padding: 4px 6px;
                }
            }
        }
        .process-history-item:after {
            content: '';
            display: inline-block;
            position: absolute;
            top: 36px;
            right: -6px;
            content: url(../../static/images/public/arrow-blue.png);
        }
        .process-history-item.gray:after {
            content: url(../../static/images/public/arrow-gray.png);
        }
        li:first-child {
            .text {
                height: 55px;
            }
        }
        li:last-child {
            &:after {
                display: none;
            }
        }
    }
    .person-ico {
        position: absolute;
        top: 0px;
        left: 92px;
        font-size: 16px;
        cursor: pointer;
        z-index: 9;
    }
}

#process-history-list {
    .process-history-ctn {
        .vuetable thead {
            background: #fff;
        }
    }
    .process-history-ctn ul {
        overflow: initial;
    }
}

// 业务样式
.ihr-furnish {
    .form-edit-ctn {
        padding: 20px;
        background-color: #fefef2;
        .field {
            .btn-wrap {
                margin-left: 150px;
            }
        }
    }
    .regular li {
        width: 50% !important;
    }
    .help-desk .prop-name {
        width: 160px;
        margin-right: 10px;
    }
    .help-desk .prop-val {
        width: 295px;
        margin-right: 10px;
    }
    .role-nodeName {
        min-height: 21px;
    }
    .modify {
        font-size: 12px;
        color: #838892;
        width: 80px;
        position: absolute;
        left: 50%;
        margin-left: -40px;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-annualPerformance ihr-furnish">
    <panel :title="panelTitle" class="panel-b" header="panel-header">
        <div id="ind-per" class="help-desk ind-per">
            <div class="help-desk-ctn">
                <ul class="regular fix">
                    <li>
                        <span class="prop-name">Employee Name</span>
                        <span class="prop-val">{{basicInfo.employeeName}}</span>
                    </li>
                    <li v-if="basicInfo.pfmType==='1'">
                        <span class="prop-name">Unit Name</span>
                        <span class="prop-val">{{basicInfo.unitName}}</span>
                    </li>
                    <li>
                        <span class="prop-name">Position</span>
                        <span class="prop-val">{{basicInfo.positionName}}</span>
                    </li>
                    <li>
                        <span class="prop-name">Restrict To Year</span>
                        <span class="prop-val">{{basicInfo.restrictYear}}</span>
                    </li>
                    <li>
                        <span class="prop-name">Evaluation Location</span>
                        <span class="prop-val">{{basicInfo.startDate | formatDate }} To {{basicInfo.endDate | formatDate}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div id="total-indicators" class="total-indicators-head">
            <div class="bte bg">
                <h3 class="head-title"> Indicators（Weight {{sumWeight()}}）</h3>
            </div>
        </div>
        <div id="indicators-ctn-wrap" class="indicators-ctn-wrap">
            <furnish-indicator v-ref:indicators :data.sync="indicatorList"></furnish-indicator>
            <div class="indicators-item" v-show="newIndicator">
                <v-form v-ref:indicatorform :model="indicator" :schema="indicatorSchema" label-width="150" label-suffix="" :cols="1" class="form-edit-ctn">
                    <text-field property='indicatorName' editor-width="400"><a class="select-indicator" href="javascript:;" @click="showModel.modal = true">Select from indicators pool</a></text-field>
                    <text-field property='unit' editor-width="400"></text-field>
                    <text-field property='weight' editor-width="400" type="number"></text-field>
                    <text-field property='target' editor-width="400"></text-field>
                    <text-field property='criteria' editor-width="400"></text-field>
                    <text-field property='dataSources' editor-width="400"></text-field>
                    <div class='field'>
                        <div class="btn-wrap">
                            <ui-button color="primary mr10" @click="handleAddSubmit()">Save</ui-button>
                            <ui-button class="btn-default-bd" @click="handleCancelAdd()" type="flat">Cancel</ui-button>
                        </div>
                    </div>
                </v-form>
            </div>
            <div class="loadding" v-show="loadding"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
            <!-- <div class="alert" v-show="isHasIndicator">
                <div class="alert-ctn">
                    <i class="fa fa-exclamation-triangle warning-Icon" aria-hidden="true"></i>
                    <span>No Data</span>
                </div>
            </div> -->
            <div class="indicators-item" v-show="isAdmin">
                <div class="add-indicators" @click="handleAdd">
                    <i class="fa fa-plus-circle" aria-hidden="true"></i><span class="add-txt">Add New Indicator</span>
                </div>
            </div>
        </div>
        <ui-collapsible :open="true" id="coll-process-history" header="Process History">

            <div id="process-history" class="process-history">
                <div class="process-history-ctn">
                    <ul class="fix cell-g ">
                        <template v-for="(index,item) in processHistory">

                            <li class="process-history-item cell-1-6">
                                <div class="img-wrap rel">
                                    <div class="valign">
                                        <div v-bind:class="{'valign-ctn active':item.nowNode,'valign-ctn': !item.nowNode}">
                                            <img v-if="item.nodeUserDetailList.length > 0" class="valign-inner" :src='photoUrl(item.nodeUserDetailList[0].photoId)' />
                                            <img v-if="item.nodeUserDetailList.length == 0" class="valign-inner" src='/static/images/public/xwz.png' />
                                        </div>
                                    </div>
                                    <div class="person-ico" v-if="item.templateRoleId && item.nodeUserDetailList.length > 1">
                                        <i class="fa fa-users" aria-hidden="true"></i>
                                        <div class="user-area">
                                            <div class="tc l user-msg" v-for="(index,u) in item.nodeUserDetailList">
                                                <img class="user-valign-inner-img" :src='photoUrl(u.photoId)' />
                                                <div class="mt5 mb16 c-c6a707d">
                                                    <p class="f12">{{u.employeeName}}</p>
                                                    <p class="f12">{{u.nodeName}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text">
                                    <p class="employee-name" v-if="item.nodeUserDetailList.length > 0">{{item.nodeUserDetailList[0].employeeName}}</p>
                                    <div class="role">
                                        <p style="role-nodeName">{{item.nodeName}}</p>
                                    </div>
                                </div>
                                <ui-button v-if="item.modify" class="btn-default-bd modify" @click="showPerson($index,item.nodeUserDetailList)" type="flat">Modify Approval</ui-button>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </ui-collapsible>
        <ui-collapsible class="mt16" :open="true" id="coll-memo" header="Process Record">
            <div id="process-history-list">
                <div class="process-history-ctn">
                    <table class="vuetable ui blue striped selectable celled stackable attached table">
                        <thead>
                            <tr>
                                <th>Stage</th>
                                <th>Role</th>
                                <th>Recipient</th>
                                <th>Operation</th>
                                <th>Suggestion</th>
                                <!-- <th></th> -->
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="m in memolist">
                                <td>
                                    <span class="num">{{$index+1}}</span>
                                </td>
                                <td>{{m.roleName}}</td>
                                <td>
                                    <div class="lh">{{m.employeeName}}</div>
                                </td>
                                <td>
                                    <div class="lh">{{m.operation}}</div>
                                </td>
                                <td>{{m.suggestion}}</td>
                                <td>
                                    <div class="lh">{{m.createTime | formatDate }}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </ui-collapsible>
    </panel>
    <ind-table-selector v-ref:indicatorselector :show.sync="showModel" :multi-selected="false" :selected-indicators="selectedInds"  :handle-comfirmed="indicatorCallBack" :ind-type="indtypes"></ind-table-selector>
    <div class="btn-group">
        <ui-button color="primary mr16" @click="handleSubmit('1')">Submit</ui-button>
        <ui-button class="btn-default-bd mr16 ml-4" @click="handleSubmit('0')" type="flat">Save</ui-button>
        <ui-button class="btn-default-bd ml-4" @click="handleCancel" type="flat">Cancel</ui-button>
    </div>

    <process-person-selector v-ref:pselector :show.sync="personShowModel" :all-selected-per.sync="selectedPer"></process-person-selector>

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
    formatDate, convert
}
from '../../util/assist';

let indicatorSchema = new Schema({
    indicatorName: {
        label: 'Indicator Name',
        required: true,
        whitespace: false,
    },
    unit: {
        label: 'Unit',
        required: true,
        whitespace: false,
    },
    weight: {
        label: 'Weight',
        required: true,
        whitespace: false,
        rules: {
            type: 'custom',
            message: 'Please enter a 1~101 positive integer!',
            validate() {
                var isValidate = true;
                if (this.weight < 1 || this.weight > 100) {
                    isValidate = false;
                } else {
                    if (this.weight % 1 !== 0) {
                        isValidate = false;
                    }
                }
                return isValidate;
            }
        }
    },
    target: {
        label: 'Targets',
        required: true,
        whitespace: false
    },
    criteria: {
        label: 'Criteria/Formula',
        required: true,
        whitespace: false,
    },
    dataSources: {
        label: 'Data Source Dept',
        required: true,
        whitespace: false,
    },
    mandatory: {

    },
    employeeIndicatorId: {

    }
});

export default {
    data() {
            let _self = this;
            return {
                show: {
                    deleteConfirm: false
                },
                showModel: {
                    modal: false
                },
                personShowModel: {
                    modal: false
                },
                indtypes: ['organization', 'fundamentals', 'individual'],
                selectedInds: [],
                panelTitle: '',
                index: '', //保存点击编辑时保存索引
                basicInfo: {}, //基本信息
                indicatorList: [], //指标列表
                memolist: [],
                processHistory: [], //流程节点
                edit: false,
                loadding: false, //加载中
                newIndicator: false, //新增
                isHasIndicator: false, //显示无数据
                deleteItemObject: {}, //删除对象
                indicatorSchema: indicatorSchema,
                indicator: indicatorSchema.newModel(),
                selPersonIndex: 0,
                profile: {},
                selectedPer: [],
                submitLoading: false


            };
        },
        computed: {
            isAdmin() {
                if (this.$route.params.indicatorsSetting === '1')
                    return false;
                return true;
            }
        },
        created() {
            this.fetchBasicInfo();
            this.fetchIndicators();
            this.fetchProcessHistory();
            this.memoList();
            this.initProfile();
        },
        ready() {

        },

        methods: {
            photoUrl(photoId) {
                    if (photoId)
                        return Vue.config.APIURL + `/system/attachment/downloadImg/${photoId}`;
                    else
                        return `/static/images/public/xwz.png`;
                },
                handleFormatDate(value) {
                    return formatDate(new Date(value));
                },
                memoList() {
                    this.$http.get(`/process/performanceApproval/procInst/${this.$route.params.procInstId}/node/memo`).then(response => {
                        if (response.data) this.memolist = response.data.data;
                        this.$nextTick(function() {
                            this.$broadcast('ui-collapsible::refresh-height', 'coll-memo');
                        });
                    });
                },
                sumWeight() {
                    let weight = 0;
                    for (var i of this.indicatorList) {
                        weight = weight + Number(i.weight);
                    }
                    return weight + '%';
                },
                /*
                 * 查询顶头信息
                 */
                fetchBasicInfo() {
                    this.$http.get('/performance/schemeEmployees/basicInfo', {
                        params: {
                            schemeEmployeeId: this.$route.params.schemeEmployeeId
                        }
                    }).then((response) => {
                        if (response.data) {
                            this.basicInfo = response.data;
                            this.panelTitle = response.data.schemeName;
                        }
                    });
                },
                /**
                 * 查询个人指标
                 */
                fetchIndicators() {
                    let _self = this;
                    _self.loadding = true;
                    _self.$http.get('/performance/employeeIndicators', {
                        params: {
                            schemeEmployeeId: _self.$route.params.schemeEmployeeId
                        }
                    }).then((response) => {
                        let indicatorData = response.data;
                        if (indicatorData.length === 0) {
                            _self.isHasIndicator = true;
                        } else {
                            for (let key of indicatorData.keys()) {
                                Object.assign(indicatorData[key], {
                                    isEdit: false,
                                    schema: _self.indicatorSchema,
                                    model: _self.indicatorSchema.newModel()
                                });
                            }
                            _self.$refs.indicators.initList(indicatorData);
                        }
                        _self.loadding = false;
                    });
                },
                handleAdd() {
                    if (this.edit) {
                        return;
                    }
                    this.edit = true;
                    this.isHasIndicator = false;
                    this.newIndicator = true;
                    this.indicator.mandatory = '0';
                },
                /**
                 * 添加指标(submit)
                 */
                handleAddSubmit() {
                    let _self = this;
                    let passed = this.indicator.$schema.isFormValidate(this.$refs.indicatorform);
                    if (!passed) return;
                    let params = {
                        indicatorName: this.indicator.indicatorName,
                        unit: this.indicator.unit,
                        weight: this.indicator.weight,
                        target: this.indicator.target,
                        criteria: this.indicator.criteria,
                        dataSources: this.indicator.dataSources,
                        mandatory: this.indicator.mandatory,
                        schemeEmployeeId: this.$route.params.schemeEmployeeId
                    };
                    params.schemeInfoId = this.$route.params.sid;

                    this.$http.post('/performance/employeeIndicators', params, {
                        emulateJSON: true
                    }).then((response) => {
                        if (response.body) {
                            this.fetchIndicators();
                            this.newIndicator = false;
                            this.edit = false;
                            this.indicator.reset();

                        }
                    });
                },
                /**
                 * 取消新增
                 */
                handleCancelAdd() {
                    this.newIndicator = false;
                    this.edit = false;
                    if (this.indicatorList.length < 1) {
                        this.isHasIndicator = true;
                    }

                },
                handleDelete(index, item) {
                    if (this.edit) {
                        return;
                    }
                    this.deleteItemObject.index = index;
                    this.deleteItemObject.item = item;
                    this.show.deleteConfirm = true;
                },
                /**
                 * 指标选择器回调
                 */
                indicatorCallBack(data) {
                    if (data && data instanceof Array) {
                        if (data.length > 1) {
                            Message({
                                type: 'error',
                                message: this.$t('myperformance.message.furnishindicatorCallBack')
                            });
                        }
                        let indicator = this.indicator,
                            dataIndicator = data[0];
                        indicator.indicatorName = dataIndicator.indicatorName;
                        indicator.criteria = dataIndicator.formula;
                        indicator.dataSources = dataIndicator.dataSources;
                        indicator.unit = dataIndicator.unit;
                    }
                    this.$refs.indicatorselector.selectedIndicators = [];
                },
                /**
                 * enter to delete
                 */
                deleteConfirmed() {
                    let deleteItemObject = this.deleteItemObject;
                    this.$http.delete(`/performance/employeeIndicators/${deleteItemObject.item.employeeIndicatorId}`).then((response) => {
                        if (response.data) {
                            this.indicatorList.splice(deleteItemObject.index, 1);
                            Message({
                                type: 'success',
                                message: this.$t('myperformance.message.furnishdeleteConfirmed')
                            });
                        }
                    });
                },
                /**
                 * not delete
                 */
                deleteDenied() {},
                /**
                 * 流程记录
                 */
                fetchProcessHistory() {
                    let url = `/process/performanceApproval/procInst/${this.$route.params.procInstId}/nodeUsers`;
                    if (this.$route.params.procInstId === '-1')
                        url = `/process/performanceApproval/processTemplate/${this.$route.params.processTemplateId}/${this.$route.params.sid}/nodeUsers`;

                    this.$http.get(url).then(response => {
                        if (response.data) {
                            this.processHistory = response.data;
                            for (let p of this.processHistory) {
                                for (let i of p.nodeUserDetailList) {
                                    if (i.sourceName) {
                                        i.employeeId = i.sourceName;
                                    }
                                }
                            }
                            let flag = false;
                            for (let r of this.processHistory) {
                                if (r.nowNode) {
                                    flag = true;
                                }
                                if (!flag) {
                                    r.arrow = false;
                                } else {
                                    r.arrow = true;
                                }
                            }
                        }
                        this.$nextTick(function() {
                            this.$broadcast('ui-collapsible::refresh-height', 'coll-process-history');
                        });
                    });
                },
                handleSubmit(submitType) {

                    if (this.submitLoading)
                        return

                    if (submitType == '1') {
                        for (let r of this.processHistory) {
                            if (r.modify) {
                                if (r.nodeUserDetailList.length === 0) {
                                    Message({
                                        type: 'error',
                                        message: this.$t('myperformance.message.funnishhandleSubmit')
                                    });
                                    return;
                                }
                            }
                        }
                    }

                    let nodeUsers = [];
                    for (let r of this.processHistory) {
                        if (r.templateRoleId) {
                            if (r.nodeUserDetailList.length > 0) {
                                for (let n of r.nodeUserDetailList) {
                                    let obj = {
                                        employeeId: n.employeeId,
                                        templateRoleId: r.templateRoleId
                                    }
                                    nodeUsers.push(obj);
                                }
                            } else {
                                let obj = {
                                    employeeId: "",
                                    templateRoleId: r.templateRoleId
                                }
                                nodeUsers.push(obj);
                            }
                        }
                    }

                    let tempParams = {
                        schemeId: this.$route.params.sid,
                        nodeUsers: nodeUsers,
                        schemeEmployeeId: this.$route.params.schemeEmployeeId,
                        submitType: submitType
                    }

                    let params = {};
                    convert(tempParams, params, "", true);
                    this.submitLoading = true;
                    this.$http.post('/performance/submitMyAnnualPerformance', params, {
                        emulateJSON: true
                    }).then((response) => {
                        if (response.data) {
                            this.$router.go({
                                name: 'myOrgPerformance',
                                params: {
                                    openId: this.$route.params.openId
                                }
                            });
                            Message({
                                type: 'success',
                                message: this.$t('common.saveSuccess')
                            });
                        }
                        this.submitLoading = false;
                    }, (response) => {
                        this.submitLoading = false;
                    });
                },
                handleCancel() {
                    this.$router.go({
                        name: 'myOrgPerformance',
                        params: {
                            openId: this.$route.params.openId
                        }
                    });
                },
                handleItemSubmit(item) {
                    item.model.schemeEmployeeId = this.$route.params.schemeEmployeeId;
                    this.$http.put(`/performance/employeeIndicators/${item.employeeIndicatorId}`, item.model, {
                        emulateJSON: true
                    }).then((response) => {
                        if (response.data) {
                            this.fetchIndicators();
                        }
                    });
                },
                showPerson(index, item) {
                    let data = [];
                    item.forEach(function(item, index) {
                        var obj = Object.assign({}, item);
                        data.push(obj);
                    })
                    this.personShowModel.modal = true;
                    this.selPersonIndex = index;
                    this.selectedPer = data;
                    this.$refs.pselector.initSelectedRow();
                },
                initProfile() {
                    this.$http.get(`/employee/employees/profile`).then((response) => {
                        if (response.data) {
                            this.profile = response.data;
                        }
                    });
                },
        },
        components: {
            furnishIndicator: require('./furnish-indicator.vue'),
            Panel: require('../../components/basic/panel.vue')
        },
        events: {
            'check-i': function(data) {
                let _self = this,
                    passed;
                _self.indicatorList.forEach(function(item, index) {
                    if (data === index) {
                        let vform = _self.$refs.indicators.$children[data + 1];
                        passed = item.$schema.isFormValidate(vform);
                        if (passed) {
                            _self.handleItemSubmit(item);
                        }
                    }
                });
            },
            'selected-person': function(selectedData) {
                let _self = this,
                    flag = false;
                selectedData.forEach(function(item, index) {
                    if (_self.profile.employeeId === item.employeeId || _self.$route.params.employeeId === item.employeeId) {
                        flag = true;
                        return;
                    }
                });
                if (flag) {
                    Message({
                        type: 'error',
                        message: _self.$t('myperformance.message.furnishselectedperson')
                    });
                    return;
                }
                this.processHistory.forEach((item, i) => {
                    if (i === this.selPersonIndex) {
                        item.nodeUserDetailList = selectedData;
                    }
                })

            }
        }
};

</script>
