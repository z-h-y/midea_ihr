<style lang="less">

.indTable-selector {
    * {
        box-sizing: border-box;
    }
    .ui-modal-wrapper .ui-modal-container {
        height: 600px;
    }
    .vuetable th {
        padding: 6px 10px;
    }
    .vuetable tbody td {
        padding: 5px 10px;
    }
    .search-ctx {
        position: relative;
        height: 48px;
    }
    .search-pos {
        position: absolute;
        right: 14px;
        top: 16px;
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
    .ui-modal-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    .leftRight-panel {
        height: 419px;
        border: none;
    }
    .left-panel {
        height: 418px;
    }
    .right-panel {
        paddind: 0 16px;
        margin-left: 0;
    }
    .bottom-panel {
        margin-top: 16px;
        height: 44px;
        border: 1px solid #eee;
        overflow: auto;
    }
    .all-selected-person {
        display: inline-block;
        line-height: 42px;
        padding: 0 16px;
        position: relative;
    }
    .rm-btn {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
    }
    .vuetable-pagination {
        margin-top: 16px;
        padding-right: 16px;
    }
    .vuetable-wrapper {
        width: 100%;
        height: 369px;
        padding-bottom: 16px;
        overflow: auto;
    }
    .searchModel-form {
        padding: 16px 0 0 0;
        position: relative;
        z-index: 9;
    }
}

</style>

<template lang="html">

<ui-modal class="indTable-selector" :show.sync="show.modal" type="large" header="Select Indicators" body="" :backdrop-dismissible="false">
    <div class="leftRight-panel bg-f5f5f5 fix">
        <div class="right-panel">
            <div class="fix">
                <v-form :model="searchModel" :schema="searchSchema" label-width="100" label-suffix="" :cols="2" form-style="searchModel-form l">
                    <select-field property='indicatorFunction' editor-width="150"></select-field>
                    <select-field property='subFunction' editor-width="150"></select-field>
                </v-form>
                <div class="search-ctx">
                    <div class="search-pos">
                        <span class="search-bg">
                         <input @keydown="goSearch($event)" class="search-input" placeholder="Search" type="text" v-model="searchTxt" />
                         <span @click="search" class="search-btn"><i class="fa fa-search"></i></span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="vuetable-wrapper l">
                <vuetable v-ref:vuetable :api-url="selectedTableUrl" :append-params="queryParams" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="tableColumns" per-page="10" :load-success-callback="loadSuccessCallback">
                </vuetable>
            </div>
        </div>
    </div>
    <div class="bottom-panel">
        <span class="all-selected-person" v-for="item in allSelectedPer" track-by="$index">
        {{item.indicatorName}}
        <i class="rm-btn fa fa-times" aria-hidden="true" @click="delPer($index)"></i>
      </span>
    </div>
    <div slot="footer">
        <ui-button @click="yes" color="primary">Confirm</ui-button>
        <ui-button @click="show.modal = false">Cancel</ui-button>
    </div>
</ui-modal>

</template>

<script type="text/ecmascript-6">

import {
    default as Schema
}
from '../../schema/index';
import {
    default as Message
}
from '../../components/basic/message';
import {
    convert, getDictMapping, formatDate
}
from '../../util/assist.js';
let searchSchema = new Schema({
    indicatorFunction: {
        label: 'Function',
        mapping: function() {
            return getDictMapping('INDICATOR_FUNCTION');
        }
    },
    subFunction: {
        label: 'Sub-Function',
        mapping: function() {
            return getDictMapping('SUB_FUNCTION');
        }
    }
});

export default {
    props: {
        show: {},
        multiSelected: {
            type: Boolean,
            default: true
        },
        handleComfirmed: {
            type: Function,
            default () {
                return function() {};
            }
        },
        limit: {
            type: Boolean,
            default: true
        },
        indType: {
            type: Array,
            default: []
        }
    },
    data() {
        let _self = this;
        let tableColumns = [{
            name: '__radio:',
            title: ''
        }, {
            name: 'indicatorName',
            title: 'Indicator Name'
        }, {
            name: 'indicatorCategoryName',
            title: 'Indicator Category'
        }, {
            name: 'indicatorFunctionName',
            title: 'Indicator Function'
        }, {
            name: 'dataSources',
            title: 'DataSources'
        }];
        if (this.multiSelected) {
            tableColumns[0].name = '__checkbox:';
        }
        return {
            searchTxt: '',
            searchSchema: searchSchema,
            searchModel: searchSchema.newModel(),
            orgGroup: {},
            indGroup: {},
            selData: [],
            tableData: [],
            selectedRow: [],
            allSelectedPer: [],
            loadTableData: false,
            tableColumns: tableColumns,
            regions: [],
            indtypes: {
                organization: 1,
                individual: 2,
                fundamentals: 3
            },
            showCheckbox: false,
            // 弹框选择器表格接口
            selectedTableUrl: '/performance/indicators/getIndicatorList'
        }
    },
    watch: {
        'selectedRow': function(newVal) {
            if (!this.loadTableData) {
                this.setAllSelectedPer(newVal);
            }

        }
    },
    computed: {
        queryParams() {
            let indCategoryIds = [];
            let result = [];
            if (this.indType.length > 0) {
                for (let item of this.indType) {
                    indCategoryIds.push(this.indtypes[item]);
                }
            } else {
                indCategoryIds = [1, 2, 3];
            }

            for (let i = 0; i < indCategoryIds.length; i++) {
                result.push('indicatorCategorys[]=' + indCategoryIds[i]);
            }

            result.push('indicatorName=' + this.searchTxt);

            let indicatorFunction = this.searchModel.indicatorFunction || "";
            let subFunction = this.searchModel.subFunction || "";

            result.push(`indicatorFunction=${indicatorFunction}`);
            result.push(`subFunction=${subFunction}`);

            return result;
        }
    },
    ready() {


    },
    methods: {
        yes() {
                if (this.allSelectedPer.length > 0) {
                    this.show.modal = false;
                    this.handleComfirmed(this.allSelectedPer, this.orgGroup);
                    // this.$dispatch('selected-person', this.allSelectedPer);
                } else {
                    Message({
                        type: 'error',
                        message: 'Please select a valid node.'
                    })
                }
            },
            goSearch(event) {
                if (event.keyCode === 13) {
                    this.search();
                }
            },
            search() {


                this.$broadcast('vuetable:refresh');
            },
            // 删除人员
            delPer(index) {
                var tableData = this.tableData;
                var isExist = false;
                for (var i = 0, len = tableData.length; i < len; i++) {
                    if (this.allSelectedPer[index].indicatorId === tableData[i].indicatorId) {
                        for (var j = 0; j < this.selectedRow.length; j++) {
                            if (this.selectedRow[j] === i) {
                                this.selectedRow.splice(j, 1);
                                break;
                            }
                        }
                        this.$refs.vuetable.checkAll = false;
                        isExist = true;
                        break;
                    }
                }
                if (!isExist) {
                    this.allSelectedPer.splice(index, 1);
                }
            },
            // 设置所有的选择人员
            setAllSelectedPer(selectedRow) {
                var self = this;
                var i, j;
                var allSelectedPer = self.allSelectedPer;
                var tableData = self.tableData;
                var delArr = [];
                for (i = 0; i < allSelectedPer.length; i++) {
                    for (j = 0; j < tableData.length; j++) {
                        if (allSelectedPer[i].indicatorId === tableData[j].indicatorId) {
                            delArr.push(i);
                            break;
                        }
                    }
                }
                for (i = delArr.length - 1; i > -1; i--) {
                    allSelectedPer.splice(delArr[i], 1);
                }
                if (!this.multiSelected && selectedRow.length > 0) {
                    self.allSelectedPer.splice(0, self.allSelectedPer.length);
                }
                selectedRow.forEach(function(item) {
                    var isExist = false;
                    for (i = 0; i < allSelectedPer.length; i++) {
                        if (tableData[item].indicatorId === self.allSelectedPer[i].indicatorId) {
                            isExist = true;
                        }
                    }
                    if (!isExist) {
                        self.allSelectedPer.push(self.tableData[item]);
                    }
                });
            },
            // 表格刷新时重新设置selectedRow
            setSelectedRow() {
                this.loadTableData = true;
                var allSelectedPer = this.allSelectedPer;
                var tableData = this.tableData;
                for (var i = 0; i < allSelectedPer.length; i++) {
                    for (var j = 0; j < tableData.length; j++) {
                        if (allSelectedPer[i].employeeId === tableData[j].employeeId) {
                            this.selectedRow.push(j);
                            break;
                        }
                    }
                }
                this.loadTableData = false;
            },
            // 表格数据加载完成后的回调事件
            loadSuccessCallback(response) {
                this.tableData = response.data;
                this.setSelectedRow();
            }
    }
}

</script>
