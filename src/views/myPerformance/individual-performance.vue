
<style lang="less">

#ind-panel {
    .d-panel-content {
        padding: 0px;
    }
}

#ind-per {
    padding: 20px 16px;
    .help-desk-ctn {
        background: transparent;
    }
}


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
                display: block;
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
                height: 45px;
                box-sizing: border-box;
                display: table-cell;
                vertical-align: middle;
                width: 60%;
                .number {
                    display: inline-block;
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
                display: table-cell;
                text-align: right;
                color: #c6cbcf;
                font-size: 16px;
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
                width:40%;
            }
        }
        .indicators-body {
            padding: 16px;
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
                margin-left: 160px;
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
        padding: 0 20px;
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
    overflow: hidden;
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
            padding: 20px 48px;
        }
        .process-history-item {
            position: relative;
            float: left;
            width: 138px;
            height: 180px;
            margin: 0px 20px;
            display: list-item;
            padding: 10px 35px;
            &:nth-child(odd){
              .user-area{
                left: 0px;
              }
            }
            .img-wrap {
                width: 70px;
                height: 70px;
                margin: 0px auto;
                .valign {
                    display: table;
                    overflow: hidden;
                    height: 100%;
                    .valign-ctn {
                        display: table-cell;
                        vertical-align: middle;
                        text-align: center;
                        .valign-inner {
                            max-width: 70px;
                            max-height: 70px;
                            border-radius: 50%;
                        }
                    }
                }
            }
            .text {
                position: absolute;
                bottom: 5px;
                padding: 5px 0px;
                background-color: #fff;
                text-align: center;
                width: 138px;
                p {
                    line-height: 30px;
                    font-size: 16px;
                    color: #2a3c59;
                }
                p:nth-child(2) {
                    color: #a5acbe;
                }
                .modify {
                    font-size: 12px;
                    color: #838892;
                }
            }
        }
        .process-history-item:after {
            content: '';
            display: inline-block;
            position: absolute;
            top: 54px;
            right: -40px;
            width: 40px;
            height: 1px;
            background: #68b8f0;
            transform: translate(-50%, 0, 0);
        }
        li:first-child {
            margin-left: 0px;
            .text {
                bottom: 45px;
            }
        }
        li:last-child {
            margin-right: 0px;
            &:after {
                display: none;
            }
        }
    }
}

#process-history-list {
    .process-history-ctn {
        .vuetable thead {
            background: #fff;
        }
    }
}

.form-edit-ctn {
    padding: 20px;
    background-color: #fefef2;
    .field {
        .btn-wrap {
            margin-left: 150px;
        }
    }
}

</style>

<template lang="html">

<panel id="ind-panel" :title="panelTitle" class=" panel-b mt20 ml20 mb100 mr20" header="panel-header">
    <div id="ind-per" class="help-desk ind-per">
        <div class="help-desk-ctn">
            <ul class="regular fix">
                <li>
                    <span class="prop-name">Employee Name</span>
                    <span class="prop-val">{{basicInfo.employeeName}}</span>
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
    <div class="total-indicators-head">
        <div class="bte bg">
            <h3 class="head-title"> Indicators（Weight 100%）</h3>
        </div>
    </div>
    <div id="indicators-ctn-wrap" class="indicators-ctn-wrap">
        <template v-for="(index,item) in indicatorList">
            <div class="indicators-item" v-show="!item.isEdit">
                <div class="indicators-head">
                    <div class="title">
                        <i class="number">{{ index + 1}}</i>
                        <span class="indicators-weight-title">{{item.indicatorName}} ({{item.unit}})</span>
                    </div>
                    <div class="operate"><i class="fa fa-trash" :class="{'cursor-default':edit}" @click="handleDelete(index,item)" aria-hidden="true"></i><i class="fa fa-pencil" :class="{'cursor-default':edit}" @click="handleEdit(index,item)" aria-hidden="true"></i><i @click="handleUp(index)"
                        class="fa fa-arrow-up" :class="{'cursor-default':edit}" aria-hidden="true"></i><i @click="handleDown(index)" class="fa fa-arrow-down" :class="{'cursor-default':edit}" aria-hidden="true"></i></div>
                </div>
                <div class="indicators-body">
                    <div class="cell-1-1">
                        <label class="prop-name">Weight</label>
                        <div class="field-content"><span class="text-editor">{{item.weight}}%</span></div>
                    </div>
                    <div class="cell-1-1">
                        <label class="prop-name">Targets</label>
                        <div class="field-content"><span class="text-editor">{{item.target}}%</span></div>
                    </div>
                    <div class="cell-1-1">
                        <label class="prop-name">Criteria/Formula</label>
                        <div class="field-content"><span class="text-editor">{{item.criteria}}</span></div>
                    </div>
                    <div class="cell-1-1">
                        <label class="prop-name">Data Source Dept</label>
                        <div class="field-content"><span class="text-editor">{{item.dataSources}}</span></div>
                    </div>
                </div>
            </div>
            <v-form :model="item.model" :schema="item.schema" label-width="150" label-suffix="" :cols="1" v-show="item.isEdit" class="form-edit-ctn">
                <text-field property='indicatorName' editor-width="400"></text-field>
                <text-field property='unit' editor-width="400"></text-field>
                <text-field property='weight' editor-width="400"></text-field>
                <text-field property='target' editor-width="400"></text-field>
                <text-field property='criteria' editor-width="400"></text-field>
                <text-field property='dataSources' editor-width="400"></text-field>
                <div class='field'>
                    <div class="btn-wrap">
                        <ui-button color="primary mr10" @click="handleItemSubmit(item.model,index,item)">Submit</ui-button>
                        <ui-button class="btn-default-bd" @click="handleCancelEdit(index,item)" type="flat">Cancel</ui-button>
                    </div>
                </div>
            </v-form>
        </template>
        <div class="indicators-item" v-for="(index,item) in newIndicator">
            <v-form :model="item" :schema="schema" label-width="150" label-suffix="" :cols="1" class="form-edit-ctn">
                <text-field property='indicatorName' editor-width="400"><a class="select-indicator" href="javascript:;" @click="showModel.modal = true">从指标库中选择</a></text-field>
                <text-field property='unit' editor-width="400"></text-field>
                <text-field property='weight' editor-width="400" type="number"></text-field>
                <text-field property='target' editor-width="400" type="number"></text-field>
                <text-field property='criteria' editor-width="400"></text-field>
                <text-field property='dataSources' editor-width="400"></text-field>
                <div class='field'>
                    <div class="btn-wrap">
                        <ui-button color="primary mr10" @click="handleAddSubmit(item)">Submit</ui-button>
                        <ui-button class="btn-default-bd" @click="handleCancelAdd()" type="flat">Cancel</ui-button>
                    </div>
                </div>
            </v-form>
        </div>
        <div class="loadding" v-show="loadding"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
        <div class="alert" v-show="isHasIndicator">
            <div class="alert-ctn">
                <i class="fa fa-exclamation-triangle warning-Icon" aria-hidden="true"></i>
                <span>No Data</span>
            </div>
        </div>
        <div class="indicators-item">
            <div class="add-indicators">
                <i class="fa fa-plus-circle" aria-hidden="true" @click="handleAdd"></i><span class="add-txt">Add New Indicator</span>
            </div>
        </div>
    </div>
    <div id="process-history" class="process-history">
        <div class="process-history-head">
            <div class="bte bg">
                <h3 class="head-title">Process History</h3>
            </div>
        </div>
        <div class="process-history-ctn">
            <ul class="fix">
                <li class="process-history-item">
                    <div class="img-wrap">
                        <div class="valign">
                            <div class="valign-ctn">
                                <img class="valign-inner" src='/static/images/public/xwz.png'>
                            </div>
                        </div>
                    </div>
                    <div class="text">
                        <p class="one">Tom</p>
                        <p>Applicant</p>
                    </div>
                </li>
                <li class="process-history-item">
                    <div class="img-wrap">
                        <div class="valign">
                            <div class="valign-ctn">
                                <img class="valign-inner" src='/static/images/public/xwz1.png'>
                            </div>
                        </div>
                    </div>
                    <div class="text">
                        <p class="one">Tom</p>
                        <p>Applicant</p>
                        <ui-button class="btn-default-bd modify" @click="handleCancel" type="flat">Modify Approval</ui-button>
                    </div>
                </li>
                <li class="process-history-item">
                    <div class="img-wrap">
                        <div class="valign">
                            <div class="valign-ctn">
                                <img class="valign-inner" src='/static/images/public/xwz2.png'>
                            </div>
                        </div>
                    </div>
                    <div class="text">
                        <p class="one">Tom</p>
                        <p>Applicant</p>
                        <ui-button class="btn-default-bd modify" @click="handleCancel" type="flat">Modify Approval</ui-button>
                    </div>
                </li>
                <li class="process-history-item">
                    <div class="img-wrap">
                        <div class="valign">
                            <div class="valign-ctn">
                                <img class="valign-inner" src='/static/images/public/xwz3.png'>
                            </div>
                        </div>
                    </div>
                    <div class="text">
                        <p class="one">Tom</p>
                        <p>Applicant</p>
                        <ui-button class="btn-default-bd modify" @click="handleCancel" type="flat">Modify Approval</ui-button>
                    </div>
                </li>
                <li class="process-history-item">
                    <div class="img-wrap">
                        <div class="valign">
                            <div class="valign-ctn">
                                <img class="valign-inner" src='/static/images/public/xwz3.png'>
                            </div>
                        </div>
                    </div>
                    <div class="text">
                        <p class="one">Tom</p>
                        <p>Applicant</p>
                        <ui-button class="btn-default-bd modify" @click="handleCancel" type="flat">Modify Approval</ui-button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div id="process-history-list">
        <div class="process-history-head">
            <div class="bte bg">
                <h3 class="head-title">Click Here To Hide Process Record</h3>
            </div>
        </div>
        <div class="process-history-ctn">
            <vuetable api-url="" :selected-to="selectedRow" :show-pagination="false" table-wrapper=".vuetable-wrapper" :fields="columns.processHistory" :sort-order="sortOrder" per-page="10">
            </vuetable>
        </div>
    </div>

</panel>
<ui-confirm header="Delete" type="danger" confirm-button-text="Delete" confirm-button-icon="delete" deny-button-text="Cancel" @confirmed="deleteConfirmed" @denied="deleteDenied" :show.sync="show.deleteConfirm" close-on-confirm>
    Are you sure you want to delete this?
</ui-confirm>
<indicator-selector v-ref:indicatorselector :show.sync="showModel" :multiple="false" :handle-comfirmed.sync="indicatorCallBack">

</indicator-selector>

</template>

<script>

import {
    default as performance
}
from './performance-schema';
import {
    default as Schema
}
from '../../schema/index';
import {
    default as Message
}
from '../../components/basic/message';
export default {
    data() {
            return {
                show: {
                    deleteConfirm: false

                },
                showModel: {
                    modal: false
                },
                panelTitle: 'MBO  Management Agreement (Organizational)',
                columns: {
                    processHistory: [{
                            name: 'Stage',
                            title: 'Stage'
                        }, {
                            name: 'Role',
                            title: 'Role'
                        }, {
                            name: 'Recipient',
                            title: 'Recipient',
                        }, {
                            name: 'Operation',
                            title: 'Operation'
                        }, {
                            name: 'Suggestion',
                            title: 'Suggestion'
                        }, {
                            name: 'Date',
                            dataClass: 'tr',
                            titleClass: 'mw80',
                            title: 'Suggestion'
                        }

                    ]
                },
                index: '', //保存点击编辑时保存索引
                basicInfo: {}, //基本信息
                indicatorList: [],
                edit: false,
                loadding: false, //加载中
                newIndicator: [], //新增
                isHasIndicator: false, //显示无数据
                deleteItemObject: {} //删除对象
            };
        },
        computed: {
            schema: function() {
                return new Schema(performance);
            }
        },
        created() {

            this.fetchBasicInfo();
            this.fetchIndicators();
        },
        ready() {

        },
        methods: {
            /**
             * 向上移动
             */
            handleUp(index) {
                var tmp = Object.assign({},this.indicatorList[index]);
                let target = index;
                 if(index === 0) {
                   return;
                 }else{
                   this.indicatorList.splice(target,1);
                   this.indicatorList.splice(target-1,0,tmp);
                 }

                },
                /**
                 * 向下移动
                 */
                handleDown(index) {
                   var tmp = Object.assign({},this.indicatorList[index]);
                   let target = index;
                   if(index === this.indicatorList.length -1){
                    return;
                   }else{
                      this.indicatorList.splice(target,1);
                      this.indicatorList.splice(target+1,0,tmp);
                   }
                },

                /**
                 * 指标选择器回调
                 */
                indicatorCallBack(data) {
                    if (data && data instanceof Array) {

                        let indicator = this.newIndicator[0],
                            dataIndicator = data[0];
                        indicator.indicatorName = dataIndicator.indicatorName;
                        indicator.criteria = dataIndicator.formula;
                        indicator.dataSources = dataIndicator.dataSources;
                        indicator.unit = dataIndicator.unit;
                    }

                    this.$refs.indicatorselector.selectedIndicators = [];
                },
                /*
                 * 查询顶头信息
                 */
                fetchBasicInfo() {
                    this.$http.get('/performance/schemeEmployees/basicInfo', {
                        params: {
                            schemeInfoId: this.$route.params.sid
                        }
                    }).then((response) => {
                        if (response.data) this.basicInfo = response.data;
                    });
                },
                /**
                 * 查询个人指标
                 */
                fetchIndicators() {
                    this.loadding = true;
                    this.$http.get('/performance/employeeIndicators', {
                        params: {
                            schemeInfoId: this.$route.params.sid
                        }
                    }).then((response) => {

                        let indicatorData = response.data;
                        if (indicatorData.length === 0) {
                            this.isHasIndicator = true;
                        } else {
                            for (let key of indicatorData.keys()) {
                                let schema = this.schema;
                                Object.assign(indicatorData[key], {
                                    isEdit: false,
                                    schema: schema,
                                    model: schema.newModel()
                                });
                            }
                            this.indicatorList = indicatorData;
                        }
                        this.loadding = false;
                    });
                },
                /**
                 * 编辑指标
                 * 处理点击编辑时让model对象得到值
                 */
                handleEdit(index, item) {
                    if (this.edit) {
                        return;
                    }
                    this.edit = true;
                    this.indicatorList[index].model.indicatorName = item.indicatorName;
                    this.indicatorList[index].model.unit = item.unit;
                    this.indicatorList[index].model.weight = item.weight;
                    this.indicatorList[index].model.target = item.target;
                    this.indicatorList[index].model.criteria = item.criteria;
                    this.indicatorList[index].model.dataSources = item.dataSources;
                    this.indicatorList[index].isEdit = true;
                },
                handleCancelEdit(index, item) {
                    item.isEdit = false;
                    this.edit = false;
                },
                /**
                 * 提交每条指标
                 */
                handleItemSubmit(model, index, item) {
                    this.edit = false;
                    this.$http.put(`/performance/employeeIndicators/${item.employeeIndicatorId}`, {

                    }, {
                        emulateJSON: true
                    }).then((response) => {
                        if (response.data) {
                            Message({
                                type: 'success',
                                message: 'Update Success.'
                            });
                            this.indicatorList[index].isEdit = false;
                        }
                    });
                },
                /**
                 * 添加指标
                 */
                handleAdd() {
                    if (this.edit) {
                        return;
                    }
                    this.edit = true;
                    this.isHasIndicator = false;
                    this.newIndicator.push(this.schema.newModel());
                },
                /**
                 * 添加指标(submit)
                 */
                handleAddSubmit(item) {
                    let indicator = item,
                        params = {
                            indicatorName: indicator.indicatorName,
                            unit: indicator.unit,
                            weight: indicator.weight,
                            target: indicator.target,
                            criteria: indicator.criteria,
                            dataSources: indicator.dataSources
                        };

                    params.schemeInfoId = this.$route.params.sid;


                    this.$http.post('/performance/employeeIndicators', params, {
                        emulateJSON: true
                    }).then((response) => {
                        if (response.body) {
                            let schema = this.schema;
                            let newIndicator = Object.assign(params, {
                                employeeIndicatorId:response.body,
                                isEdit: false,
                                schema: schema,
                                model: schema.newModel()
                            });
                            this.indicatorList.push(newIndicator);
                            this.newIndicator.splice(0, 1);
                            this.edit = false;
                            Message({
                                type: 'success',
                                message: 'Added Success.'
                            });
                        }
                    });
                },
                /**
                 * 取消新增
                 */
                handleCancelAdd() {
                    this.newIndicator.splice(0, 1);
                    this.edit = false;
                    if(this.indicatorList.length < 1){
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
                 * enter to delete
                 */
                deleteConfirmed() {
                    let deleteItemObject = this.deleteItemObject;
                    this.$http.delete(`/performance/employeeIndicators/${deleteItemObject.item.employeeIndicatorId}`).then((response) => {
                        if (response.data) {
                            this.indicatorList.splice(deleteItemObject.index, 1);
                            Message({
                                type: 'success',
                                message: 'Success.'
                            });
                        }
                    });
                },
                /**
                 * not delete
                 */
                deleteDenied() {},
                handleSubmit() {

                },
                handleCancel() {

                }
        },
        components: {
          Panel: require('../../components/basic/panel.vue')
        }
};

</script>
